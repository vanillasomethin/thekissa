import { NextResponse } from "next/server";
import { generateCodeVerifier, generateCodeChallenge, generateState, buildAuthUrl } from "@/lib/canva";

export async function GET() {
  const verifier = generateCodeVerifier();
  const challenge = generateCodeChallenge(verifier);
  const state = generateState();

  const authUrl = buildAuthUrl(challenge, state);

  const response = NextResponse.redirect(authUrl);

  // Store verifier and state in httpOnly cookies (15-min TTL)
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
