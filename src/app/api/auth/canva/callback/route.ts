import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/canva";

export async function GET(request: NextRequest) {
  // Check every possible place the URL could be
  const rawUrl = request.url;
  const nextUrl = request.nextUrl.toString();
  const xForwardedHost = request.headers.get("x-forwarded-host") ?? "";
  const xOrigUrl = request.headers.get("x-original-url") ?? "";
  const xRealIp = request.headers.get("x-real-ip") ?? "";
  const xVercelId = request.headers.get("x-vercel-id") ?? "";
  const referer = request.headers.get("referer") ?? "";

  // Pull params from ALL possible sources
  let code: string | null = null;
  let state: string | null = null;
  let error: string | null = null;

  // 1. Try request.nextUrl first
  code = request.nextUrl.searchParams.get("code");
  state = request.nextUrl.searchParams.get("state");
  error = request.nextUrl.searchParams.get("error");

  // 2. If missing, try parsing request.url directly
  if (!code && rawUrl.includes("?")) {
    try {
      const raw = new URL(rawUrl);
      code = raw.searchParams.get("code");
      state = raw.searchParams.get("state");
      error = raw.searchParams.get("error");
    } catch {}
  }

  // 3. If still missing, try x-original-url header (some reverse proxies)
  if (!code && xOrigUrl.includes("?")) {
    try {
      const origParams = new URL(xOrigUrl, "https://thekissa.vercel.app").searchParams;
      code = origParams.get("code");
      state = origParams.get("state");
      error = origParams.get("error");
    } catch {}
  }

  const origin = request.nextUrl.origin || "https://thekissa.vercel.app";

  if (!code) {
    const debug = {
      rawUrl: rawUrl.slice(0, 150),
      nextUrl: nextUrl.slice(0, 150),
      xOrigUrl: xOrigUrl.slice(0, 100),
      xForwardedHost,
      hasQS_raw: rawUrl.includes("?"),
      hasQS_next: nextUrl.includes("?"),
    };
    return NextResponse.redirect(
      new URL(`/portfolio?error=missing_code&d=${encodeURIComponent(JSON.stringify(debug))}`, origin)
    );
  }

  if (error) {
    return NextResponse.redirect(new URL(`/portfolio?error=${encodeURIComponent(error)}`, origin));
  }

  const storedState = request.cookies.get("canva_oauth_state")?.value;
  const codeVerifier = request.cookies.get("canva_code_verifier")?.value;

  if (!storedState || storedState !== state) {
    return NextResponse.redirect(
      new URL(`/portfolio?error=invalid_state&got=${encodeURIComponent(state ?? "none")}&stored=${encodeURIComponent(storedState ?? "none")}`, origin)
    );
  }

  if (!codeVerifier) {
    return NextResponse.redirect(new URL("/portfolio?error=missing_verifier", origin));
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
