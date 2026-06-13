import { put, list } from "@vercel/blob";

export interface PortfolioMediaEntry {
  url: string;
  type: "image" | "video";
}

export type PortfolioMediaManifest = Record<string, PortfolioMediaEntry>;

const MANIFEST_PATH = "portfolio/manifest.json";

export async function getManifest(): Promise<PortfolioMediaManifest> {
  const { blobs } = await list({ prefix: MANIFEST_PATH });
  const found = blobs.find((b) => b.pathname === MANIFEST_PATH);
  if (!found) return {};
  const res = await fetch(found.url, { cache: "no-store" });
  if (!res.ok) return {};
  return (await res.json()) as PortfolioMediaManifest;
}

export async function saveManifest(manifest: PortfolioMediaManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
