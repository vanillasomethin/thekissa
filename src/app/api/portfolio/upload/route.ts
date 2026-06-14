import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getManifest, saveManifest } from "@/lib/portfolioMedia";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");
  const slug = formData.get("slug");

  if (!(file instanceof File) || typeof slug !== "string" || !slug) {
    return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
  }

  const type: "image" | "video" = file.type.startsWith("video") ? "video" : "image";
  const ext = file.name.split(".").pop()?.toLowerCase() || (type === "video" ? "mp4" : "jpg");
  const path = `portfolio/${slug}.${ext}`;

  let blob;
  try {
    blob = await put(path, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: file.type,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload to storage failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const manifest = await getManifest();
  manifest[slug] = { url: blob.url, type };
  await saveManifest(manifest);

  return NextResponse.json({ slug, url: blob.url, type });
}
