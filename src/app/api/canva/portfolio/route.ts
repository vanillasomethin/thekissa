import { NextRequest, NextResponse } from "next/server";
import { fetchPortfolioDesigns } from "@/lib/canva";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("canva_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  try {
    const designs = await fetchPortfolioDesigns(accessToken);
    return NextResponse.json({ designs });
  } catch (err) {
    console.error("Portfolio fetch error:", err);
    return NextResponse.json({ error: "fetch_failed" }, { status: 500 });
  }
}
