// Canva OAuth 2.0 with PKCE helpers
// Docs: https://www.canva.dev/docs/connect/authentication/
import crypto from "crypto";

const CANVA_CLIENT_ID = process.env.CANVA_CLIENT_ID ?? "OC-AZ6Nsdbwphgy";
const CANVA_CLIENT_SECRET = process.env.CANVA_CLIENT_SECRET ?? "";
const REDIRECT_URI =
  process.env.CANVA_REDIRECT_URI ?? "https://www.thekissa.com/api/auth/canva/callback";
const PORTFOLIO_FOLDER_ID = "FAF1YBxSNTM";

export const CANVA_AUTH_URL = "https://www.canva.com/api/oauth/authorize";
export const CANVA_TOKEN_URL = "https://www.canva.com/api/oauth/token";
export const CANVA_API_BASE = "https://api.canva.com/rest/v1";

// ── PKCE ──────────────────────────────────────────────────────────────────────
// Per Canva docs: verifier must be 43–128 chars, randomBytes(96) → base64url = 128 chars

export function generateCodeVerifier(): string {
  return crypto.randomBytes(96).toString("base64url");
}

export function generateCodeChallenge(verifier: string): string {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

export function generateState(): string {
  return crypto.randomBytes(96).toString("base64url");
}

// ── Auth URL builder ──────────────────────────────────────────────────────────

export function buildAuthUrl(codeChallenge: string, state: string, redirectUri?: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CANVA_CLIENT_ID,
    redirect_uri: redirectUri ?? REDIRECT_URI,
    scope: [
      "folder:read",
      "design:content:read",
      "asset:read",
    ].join(" "),
    code_challenge_method: "s256",
    code_challenge: codeChallenge,
    state,
  });
  return `${CANVA_AUTH_URL}?${params}`;
}

// ── Token exchange ────────────────────────────────────────────────────────────
// Per Canva docs: use Basic auth with base64(client_id:client_secret).
// client_id must NOT appear in the request body when using Basic auth.

export interface CanvaTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string,
  redirectUri?: string
): Promise<CanvaTokens> {
  if (!CANVA_CLIENT_SECRET) {
    throw new Error(
      "CANVA_CLIENT_SECRET is not set. Add it to your Vercel environment variables. " +
      "Find it in the Canva Developer Portal under your integration settings."
    );
  }

  const creds = Buffer.from(`${CANVA_CLIENT_ID}:${CANVA_CLIENT_SECRET}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri ?? REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  const res = await fetch(CANVA_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${creds}`,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canva token exchange failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<CanvaTokens>;
}

// ── Refresh token ─────────────────────────────────────────────────────────────

export async function refreshAccessToken(refreshToken: string): Promise<CanvaTokens> {
  if (!CANVA_CLIENT_SECRET) {
    throw new Error("CANVA_CLIENT_SECRET is not set.");
  }

  const creds = Buffer.from(`${CANVA_CLIENT_ID}:${CANVA_CLIENT_SECRET}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const res = await fetch(CANVA_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${creds}`,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Canva token refresh failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<CanvaTokens>;
}

// ── Portfolio fetch ───────────────────────────────────────────────────────────

export interface CanvaDesign {
  id: string;
  name: string;
  urls: {
    view_url: string;
    edit_url?: string;
  };
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
  created_at: number;
  updated_at: number;
}

export async function fetchPortfolioDesigns(
  accessToken: string
): Promise<CanvaDesign[]> {
  const params = new URLSearchParams({ ownership: "owned" });

  const res = await fetch(
    `${CANVA_API_BASE}/folders/${PORTFOLIO_FOLDER_ID}/items?${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error(`Portfolio fetch failed: ${res.status}`);
  }

  const data = (await res.json()) as {
    items: Array<{ design: CanvaDesign }>;
    continuation?: string;
  };

  return data.items.map((item) => item.design);
}
