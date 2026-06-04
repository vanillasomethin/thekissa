import { NextRequest, NextResponse } from "next/server";
import { CANVA_API_BASE } from "@/lib/canva";

const PORTFOLIO_FOLDER_ID = "FAF1YBxSNTM";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("canva_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  try {
    const res = await fetch(
      `${CANVA_API_BASE}/folders/${PORTFOLIO_FOLDER_ID}/items`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const body = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "canva_api_error", status: res.status, detail: body },
        { status: 502 }
      );
    }

    // Canva returns items as { items: [{ type, design? }] }
    const items = body.items ?? [];
    const designs = items
      .filter((item: { type: string }) => item.type === "design")
      .map((item: { design: unknown }) => item.design);

    return NextResponse.json({ designs, raw_count: items.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
