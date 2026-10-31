import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Pathname } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

// Public pages only; internal ones (/podklady, /styleguide) stay out.
const pages: Pathname[] = [
  "/",
  "/doprava",
  "/vozovy-park",
  "/o-nas",
  "/kontakt",
  "/poptavka",
  "/ochrana-osobnich-udaju",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}${getPathname({ locale, href })}`,
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.7,
    })),
  );
}
