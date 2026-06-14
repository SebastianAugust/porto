import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// One family, played across weights. 300/400 for body, 600/700 for headings.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sebastian August — Fullstack Developer",
  description:
    "Informatics Engineering student at Universitas Padjadjaran who ships real products — from kasir systems for warung makan to AI-powered solar monitoring.",
  authors: [{ name: "Sebastian August" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#070b18" },
  ],
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
        <Providers>
          <Starfield />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
