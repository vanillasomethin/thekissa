// Canva OAuth 2.0 with PKCE helpers

const CANVA_CLIENT_ID = process.env.CANVA_CLIENT_ID ?? "OC-AZ6Nsdbwphgy";
const CANVA_CLIENT_SECRET = process.env.CANVA_CLIENT_SECRET ?? "";
const REDIRECT_URI =
  process.env.CANVA_REDIRECT_URI ?? "https://www.thekissa.com/api/auth/canva/callback";
const PORTFOLIO_FOLDER_ID = "FAF1YBxSNTM";

export const CANVA_AUTH_URL = "https://www.canva.com/oauth2/authorize";
export const CANVA_TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
export const CANVA_API_BASE = "https://api.canva.com/rest/v1";

// ── PKCE ──────────────────────────────────────────────────────────────────────

export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64urlEncode(array);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64urlEncode(new Uint8Array(digest));
}

function base64urlEncode(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// ── Auth URL builder ──────────────────────────────────────────────────────────

export function buildAuthUrl(codeChallenge: string, state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CANVA_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: [
      "folder:read",
      "design:content:read",
      "design:meta:read",
      "asset:read",
    ].join(" "),
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    state,
  });
  return `${CANVA_AUTH_URL}?${params}`;
}

// ── Token exchange ────────────────────────────────────────────────────────────

export interface CanvaTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string
): Promise<CanvaTokens> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier,
    client_id: CANVA_CLIENT_ID,
  });

  if (CANVA_CLIENT_SECRET) {
    body.set("client_secret", CANVA_CLIENT_SECRET);
  }

  const res = await fetch(CANVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
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
  const params = new URLSearchParams({
    ownership: "owned",
  });

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
