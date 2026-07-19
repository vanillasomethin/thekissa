// Server-only: reads/writes the case-study manifest in Vercel Blob.
// (Only imported from server components & route handlers.)
import { put, list } from "@vercel/blob";
import type { CaseStudyManifest } from "./caseStudies";
import { mergeWithSeed } from "./caseStudies";

const MANIFEST_PATH = "case-studies/manifest.json";

/** Raw saved manifest (no seed merge). */
export async function getSavedManifest(): Promise<CaseStudyManifest> {
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH });
    const found = blobs.find((b) => b.pathname === MANIFEST_PATH);
    if (!found) return {};
    const res = await fetch(found.url, { cache: "no-store" });
    if (!res.ok) return {};
    return (await res.json()) as CaseStudyManifest;
  } catch {
    return {};
  }
}

/** Saved manifest merged over the autofill seed — what the site renders. */
export async function getMergedManifest(): Promise<CaseStudyManifest> {
  return mergeWithSeed(await getSavedManifest());
}

export async function saveManifest(manifest: CaseStudyManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
