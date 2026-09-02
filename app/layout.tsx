import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ScrollReset from "@/components/ScrollReset";
import { site } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// One family, played across weights. 300/400 for body, 600/700 for headings.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase resolves all relative URLs (OG/twitter images, canonicals).
  metadataBase: new URL(site.url),
  title: {
    // Home page uses `default`; sub-pages flow through `template`
    // → e.g. "Lawang Sewu POS — Sebastian Augustino Lie".
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "fullstack developer",
    "React",
    "Laravel",
    "Next.js",
    "Bandung",
    "Universitas Padjadjaran",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    // Image is supplied by app/opengraph-image.tsx (file-based convention),
    // which applies to every route unless a child overrides it.
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    // twitter:image falls back to the opengraph-image when no twitter-image exists.
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#070b18" },
  ],
};

// Structured data so Google (and AI crawlers) understand who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Fullstack Developer",
  description: site.description,
  sameAs: [site.github, site.linkedin, site.instagram],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: site.university,
  },
  knowsAbout: ["React", "Laravel", "Next.js", "Machine Learning", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-text">
        {/* JSON-LD Person schema. The `<` → `<` scrub guards against XSS. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>
          <ScrollReset />
          <Starfield />
          <Navbar />
          {children}
          <Footer />
        </Providers>
        {/* Zero-layout analytics — render nothing visible, sit outside Providers. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
