import { NextRequest, NextResponse } from "next/server";
import { generateCodeVerifier, generateCodeChallenge, generateState, buildAuthUrl } from "@/lib/canva";

export async function GET(request: NextRequest) {
  const verifier = generateCodeVerifier();
  const challenge = generateCodeChallenge(verifier);
  const state = generateState();

  // Use the same origin so cookies survive the round-trip
  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/api/auth/canva/callback`;

  const authUrl = buildAuthUrl(challenge, state, redirectUri);

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("canva_code_verifier", verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 900,
    path: "/",
  });
  response.cookies.set("canva_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 900,
    path: "/",
  });

  return response;
}
