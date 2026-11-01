import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/podklady", "/styleguide", "/admin", "/de/podklady", "/de/styleguide", "/de/admin", "/en/podklady", "/en/styleguide", "/en/admin"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
