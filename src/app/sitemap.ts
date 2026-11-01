import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type StaticPathname } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

// Public pages only; internal ones (/podklady, /styleguide) stay out.
const pages: StaticPathname[] = [
  "/",
  "/doprava",
  "/vozovy-park",
  "/o-nas",
  "/kontakt",
  "/poptavka",
  "/ochrana-osobnich-udaju",
  "/zdroje-fotografii",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((href) => {
    // Every language version lists all the others, so search engines pair them up.
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${siteUrl}${getPathname({ locale: l, href })}`]),
    );
    return routing.locales.map((locale) => ({
      url: `${siteUrl}${getPathname({ locale, href })}`,
      alternates: { languages },
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.7,
    }));
  });
}
