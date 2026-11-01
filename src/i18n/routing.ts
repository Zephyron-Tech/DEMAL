import { defineRouting } from "next-intl/routing";

// Czech stays unprefixed at the domain root; German and English live under /de/ and /en/ with
// translated paths. Internal keys (the pathname map's left side) are the Czech folder names.
export const routing = defineRouting({
  locales: ["cs", "de", "en"],
  defaultLocale: "cs",
  localePrefix: "as-needed",
  // No language cookie and no redirect by browser language: the site shows the language in the
  // URL the visitor chose, so the privacy notice can say that no cookies are set.
  localeCookie: false,
  localeDetection: false,
  // hreflang comes from each page's metadata (src/i18n/alternates.ts) with the canonical origin;
  // the middleware's Link header would repeat it with whatever host served the request.
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/doprava": { cs: "/doprava", de: "/transport", en: "/freight" },
    "/drevni-material": {
      cs: "/drevni-material",
      de: "/holzmaterial",
      en: "/wood-materials",
    },
    "/drevni-material/[slug]": {
      cs: "/drevni-material/[slug]",
      de: "/holzmaterial/[slug]",
      en: "/wood-materials/[slug]",
    },
    "/vozovy-park": { cs: "/vozovy-park", de: "/fuhrpark", en: "/fleet" },
    "/o-nas": { cs: "/o-nas", de: "/ueber-uns", en: "/about-us" },
    "/kontakt": { cs: "/kontakt", de: "/kontakt", en: "/contact" },
    "/poptavka": { cs: "/poptavka", de: "/anfrage", en: "/quote" },
    "/ochrana-osobnich-udaju": {
      cs: "/ochrana-osobnich-udaju",
      de: "/datenschutz",
      en: "/privacy",
    },
    "/impressum": { cs: "/provozovatel", de: "/impressum", en: "/imprint" },
    "/zdroje-fotografii": {
      cs: "/zdroje-fotografii",
      de: "/bildquellen",
      en: "/photo-credits",
    },
  },
});

export type Pathname = keyof typeof routing.pathnames;

// Routes without dynamic segments: usable as a plain href.
export type StaticPathname = Exclude<Pathname, `${string}[${string}`>;
