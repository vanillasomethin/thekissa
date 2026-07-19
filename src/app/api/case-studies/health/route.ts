import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

// Reports whether the Vercel Blob token is present and storage is reachable.
// Never returns the token value itself.
export async function GET() {
  const tokenPresent = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (!tokenPresent) {
    return NextResponse.json(
      {
        ok: false,
        tokenPresent: false,
        storageReachable: false,
        message:
          "BLOB_READ_WRITE_TOKEN is not set for this environment. Add it in Vercel → Settings → Environment Variables and redeploy.",
      },
      { status: 503 }
    );
  }

  // Token exists — confirm it actually authenticates against the store.
  try {
    await list({ limit: 1 });
    return NextResponse.json({
      ok: true,
      tokenPresent: true,
      storageReachable: true,
      message: "Blob storage is configured and reachable. Uploads should work.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        tokenPresent: true,
        storageReachable: false,
        message:
          "Token is set but the store rejected it. Check the token is valid and matches this project's Blob store.",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 502 }
    );
  }
}
