import { getLocale } from "next-intl/server";
import { siteUrl } from "@/lib/site";
import { getPathname } from "./navigation";
import { routing, type StaticPathname } from "./routing";

// Canonical URL and hreflang alternates for a static page, in the current locale. Czech is the
// default, so it also serves as x-default.
export async function alternatesFor(href: StaticPathname) {
  const locale = await getLocale();
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteUrl}${getPathname({ locale: l, href })}`]),
  );
  return {
    canonical: `${siteUrl}${getPathname({ locale, href })}`,
    languages: { ...languages, "x-default": languages[routing.defaultLocale] },
  };
}

// Open Graph locale tags for each site language.
export const ogLocale: Record<string, string> = {
  cs: "cs_CZ",
  de: "de_DE",
  en: "en_GB",
};
