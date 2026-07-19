import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Drag-drop asset upload for a case study.
// Returns { url, type } which the admin drops into cover / section media.
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");
  const slug = formData.get("slug");

  if (!(file instanceof File) || typeof slug !== "string" || !slug) {
    return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
  }

  const type: "image" | "video" = file.type.startsWith("video") ? "video" : "image";
  const ext = file.name.split(".").pop()?.toLowerCase() || (type === "video" ? "mp4" : "jpg");
  // random suffix so multiple assets per project never collide
  const path = `case-studies/${slug}/asset.${ext}`;

  try {
    const blob = await put(path, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url, type });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
