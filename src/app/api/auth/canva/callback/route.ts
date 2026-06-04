import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/canva";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const origin = new URL(request.url).origin;

  if (error) {
    return NextResponse.redirect(new URL(`/portfolio?error=${encodeURIComponent(error)}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/portfolio?error=missing_code", request.url));
  }

  const storedState = request.cookies.get("canva_oauth_state")?.value;
  const codeVerifier = request.cookies.get("canva_code_verifier")?.value;

  if (!storedState || storedState !== state) {
    return NextResponse.redirect(new URL("/portfolio?error=invalid_state", request.url));
  }

  if (!codeVerifier) {
    return NextResponse.redirect(new URL("/portfolio?error=missing_verifier", request.url));
  }

  try {
    const redirectUri = `${origin}/api/auth/canva/callback`;
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

    const headers = new Headers({
      "Content-Type": "text/html; charset=utf-8",
    });

    headers.append("Set-Cookie", `canva_access_token=${tokens.access_token}; ${cookieOpts}`);
    if (tokens.refresh_token) {
      headers.append("Set-Cookie", `canva_refresh_token=${tokens.refresh_token}; ${refreshOpts}`);
    }
    headers.append("Set-Cookie", `canva_code_verifier=; Path=/; Max-Age=0`);
    headers.append("Set-Cookie", `canva_oauth_state=; Path=/; Max-Age=0`);

    // Return HTML that sets cookies then redirects — avoids the Set-Cookie-on-redirect problem
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
    return NextResponse.redirect(new URL(`/portfolio?error=${encodeURIComponent(msg)}`, request.url));
  }
}
