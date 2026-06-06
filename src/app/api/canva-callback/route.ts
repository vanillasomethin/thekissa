import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/canva";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");

  const origin = request.nextUrl.origin;

  if (error) {
    return NextResponse.redirect(new URL(`/portfolio?error=${encodeURIComponent(error)}`, origin));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/portfolio?error=missing_code", origin));
  }

  const storedState = request.cookies.get("canva_oauth_state")?.value;
  const codeVerifier = request.cookies.get("canva_code_verifier")?.value;

  if (!storedState || storedState !== state) {
    return NextResponse.redirect(new URL("/portfolio?error=invalid_state", origin));
  }

  if (!codeVerifier) {
    return NextResponse.redirect(new URL("/portfolio?error=missing_verifier", origin));
  }

  try {
    const redirectUri = `${origin}/api/canva-callback`;
    const tokens = await exchangeCodeForTokens(code, codeVerifier, redirectUri);

    const cookieOpts = [
      `Path=/`,
      `Max-Age=${tokens.expires_in}`,
      `SameSite=Lax`,
      process.env.NODE_ENV === "production" ? "Secure" : "",
      "HttpOnly",
    ].filter(Boolean).join("; ");

    const refreshOpts = [
      `Path=/`,
      `Max-Age=${60 * 60 * 24 * 30}`,
      `SameSite=Lax`,
      process.env.NODE_ENV === "production" ? "Secure" : "",
      "HttpOnly",
    ].filter(Boolean).join("; ");

    const headers = new Headers({ "Content-Type": "text/html; charset=utf-8" });
    headers.append("Set-Cookie", `canva_access_token=${tokens.access_token}; ${cookieOpts}`);
    if (tokens.refresh_token) {
      headers.append("Set-Cookie", `canva_refresh_token=${tokens.refresh_token}; ${refreshOpts}`);
    }
    headers.append("Set-Cookie", `canva_code_verifier=; Path=/; Max-Age=0`);
    headers.append("Set-Cookie", `canva_oauth_state=; Path=/; Max-Age=0`);

    return new Response(
      `<!DOCTYPE html><html><head>
        <meta http-equiv="refresh" content="0;url=/portfolio">
      </head><body>
        <script>window.location.replace("/portfolio");</script>
      </body></html>`,
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Canva token exchange error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.redirect(
      new URL(`/portfolio?error=${encodeURIComponent(msg)}`, origin)
    );
  }
}
