/**
 * Single source of truth for site-wide identity + SEO. Imported by the root
 * metadata, sitemap, robots, OG image, and JSON-LD so they never drift.
 *
 * Everything downstream (canonical URLs, OG image absolute paths, sitemap,
 * robots) derives from `url`.
 */
export const site = {
  name: "Sebastian Augustino Lie",
  // Used in the title template: "<page> — Sebastian Augustino Lie".
  title: "Sebastian Augustino Lie — Fullstack Developer",
  description:
    "Informatics Engineering student at Universitas Padjadjaran who ships real products — from POS systems for warung makan to AI-powered solar monitoring.",
  // Production domain (no trailing slash).
  url: "https://sebastianaugust.dev",
  role: "Fullstack Developer & ML Enthusiast",
  email: "sebastianagustinolie@gmail.com",
  // Profiles — also fed to JSON-LD `sameAs`.
  github: "https://github.com/SebastianAugust",
  linkedin: "https://www.linkedin.com/in/sebastianaugust",
  instagram: "https://instagram.com/sebastianaugustt",
  university: "Universitas Padjadjaran",
  location: "Bandung, West Java, Indonesia",
} as const;
