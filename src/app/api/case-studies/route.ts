import { NextRequest, NextResponse } from "next/server";
import { getMergedManifest, getSavedManifest, saveManifest } from "@/lib/caseStudyStore";
import type { CaseStudy } from "@/lib/caseStudies";

// GET  → merged manifest (seed + saved), for the admin & site
export async function GET() {
  const manifest = await getMergedManifest();
  return NextResponse.json({ caseStudies: manifest });
}

// POST → upsert a single case study { slug, data }
export async function POST(request: NextRequest) {
  let body: { slug?: string; data?: CaseStudy };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { slug, data } = body;
  if (!slug || !data) {
    return NextResponse.json({ error: "Missing slug or data" }, { status: 400 });
  }

  const saved = await getSavedManifest();
  saved[slug] = { ...data, slug };
  await saveManifest(saved);

  return NextResponse.json({ ok: true, slug });
}
