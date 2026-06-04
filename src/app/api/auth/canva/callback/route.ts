import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/canva";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/portfolio?error=${encodeURIComponent(error)}`, request.url)
    );
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
    const origin = new URL(request.url).origin;
    const redirectUri = `${origin}/api/auth/canva/callback`;
    const tokens = await exchangeCodeForTokens(code, codeVerifier, redirectUri);

    const response = NextResponse.redirect(new URL("/portfolio", request.url));

    // Store access token (expires per token TTL, default 1h)
    response.cookies.set("canva_access_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokens.expires_in,
      path: "/",
    });

    if (tokens.refresh_token) {
      response.cookies.set("canva_refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
    }

    // Clear PKCE cookies
    response.cookies.delete("canva_code_verifier");
    response.cookies.delete("canva_oauth_state");

    return response;
  } catch (err) {
    console.error("Canva token exchange error:", err);
    return NextResponse.redirect(new URL("/portfolio?error=token_exchange", request.url));
  }
}
