// Case-study data model + autofill seed.
// Client-safe: NO blob/server imports here.

export interface CaseStudyMedia {
  type: "image" | "video";
  url: string;
  /** optional short caption */
  caption?: string;
}

export interface CaseStudySection {
  num: string; // "01"
  title: string; // "Brand Story"
  body: string;
  media: CaseStudyMedia[];
}

export interface CaseStudy {
  slug: string;
  brand: string;
  industry: string;
  year: string;
  services: string[];
  accent: string; // hex, drives section background tint
  cover: string; // media url (image or video)
  coverType: "image" | "video";
  intro: string; // one-line tagline under the hero
  sections: CaseStudySection[];
}

export type CaseStudyManifest = Record<string, CaseStudy>;

/** Standard three-block skeleton every confetti-style study uses. */
function defaultSections(): CaseStudySection[] {
  return [
    { num: "01", title: "Brand Story", body: "", media: [] },
    { num: "02", title: "Color Palette & Typography", body: "", media: [] },
    { num: "03", title: "Packaging & Applications", body: "", media: [] },
  ];
}

/**
 * Autofill seed — keyed by slug. Mirrors the `featuredProjects` array on the
 * homepage so the admin has something to edit on first load. The admin/page
 * merge this with whatever has been saved to blob storage.
 */
export const CASE_STUDY_SEED: CaseStudyManifest = {
  fyture: {
    slug: "fyture",
    brand: "FYTURE",
    industry: "Branding",
    year: "2024",
    services: ["Brand strategy", "Visual identity"],
    accent: "#C4455E",
    cover: "",
    coverType: "image",
    intro: "An identity built to hold its own.",
    sections: defaultSections(),
  },
  tecfides: {
    slug: "tecfides",
    brand: "Tecfides",
    industry: "Tech & Finance",
    year: "2024",
    services: ["Brand strategy", "Visual identity", "Web"],
    accent: "#4A7FA0",
    cover: "",
    coverType: "image",
    intro: "Trust, made legible.",
    sections: defaultSections(),
  },
  natura: {
    slug: "natura",
    brand: "Natura",
    industry: "Wellness",
    year: "2024",
    services: ["Branding", "Packaging Design"],
    accent: "#6A9A40",
    cover: "",
    coverType: "image",
    intro: "Calm, grown from the ground up.",
    sections: defaultSections(),
  },
  mezze: {
    slug: "mezze",
    brand: "Mezze",
    industry: "Food & Beverage",
    year: "2024",
    services: ["Branding", "Packaging Design"],
    accent: "#5A8A50",
    cover: "",
    coverType: "image",
    intro: "Flavor you can see before you taste it.",
    sections: defaultSections(),
  },
  scribbles: {
    slug: "scribbles",
    brand: "Scribbles",
    industry: "Branding",
    year: "2024",
    services: ["Branding", "Illustration"],
    accent: "#ffffff",
    cover: "",
    coverType: "image",
    intro: "Play, drawn out loud.",
    sections: defaultSections(),
  },
  lyfsense: {
    slug: "lyfsense",
    brand: "Lyfsense",
    industry: "Health",
    year: "2024",
    services: ["Brand strategy", "Visual identity"],
    accent: "#4A9A70",
    cover: "",
    coverType: "image",
    intro: "Health that feels human.",
    sections: defaultSections(),
  },
};

/** Deep-merge saved manifest over the seed so new projects appear automatically. */
export function mergeWithSeed(saved: CaseStudyManifest): CaseStudyManifest {
  const out: CaseStudyManifest = {};
  const slugs = new Set([...Object.keys(CASE_STUDY_SEED), ...Object.keys(saved)]);
  for (const slug of slugs) {
    const seed = CASE_STUDY_SEED[slug];
    const s = saved[slug];
    if (seed && s) out[slug] = { ...seed, ...s, sections: s.sections ?? seed.sections };
    else out[slug] = (s ?? seed) as CaseStudy;
  }
  return out;
}

export function emptyCaseStudy(slug: string): CaseStudy {
  return {
    slug,
    brand: slug,
    industry: "",
    year: "2024",
    services: [],
    accent: "#AD1335",
    cover: "",
    coverType: "image",
    intro: "",
    sections: defaultSections(),
  };
}
