import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Allow all crawlers everywhere, and point them at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
