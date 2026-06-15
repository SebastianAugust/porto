/**
 * Single source of truth for site-wide identity + SEO. Imported by the root
 * metadata, sitemap, robots, OG image, and JSON-LD so they never drift.
 *
 * TODO: replace `url` with the real production domain once it's live. Everything
 * downstream (canonical URLs, OG image absolute paths, sitemap, robots) derives
 * from this one value.
 */
export const site = {
  name: "Sebastian August",
  // Used in the title template: "<page> — Sebastian August".
  title: "Sebastian August — Fullstack Developer",
  description:
    "Informatics Engineering student at Universitas Padjadjaran who ships real products — from POS systems for warung makan to AI-powered solar monitoring.",
  // TODO: update to the real domain (no trailing slash). Placeholder for now.
  url: "https://sebastianaugust.vercel.app",
  role: "Fullstack Developer & ML Enthusiast",
  // Profiles for JSON-LD `sameAs`. TODO: fill in the real LinkedIn URL.
  github: "https://github.com/SebastianAugust",
  linkedin: "https://www.linkedin.com/in/", // TODO: add the LinkedIn handle
  university: "Universitas Padjadjaran",
  location: "Bandung, West Java, Indonesia",
} as const;
