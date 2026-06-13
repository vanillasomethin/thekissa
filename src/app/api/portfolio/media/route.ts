import { NextResponse } from "next/server";
import { getManifest } from "@/lib/portfolioMedia";

export async function GET() {
  const media = await getManifest();
  return NextResponse.json({ media });
}
