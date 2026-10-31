import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // DE and EN follow later; Czech stays unprefixed at the domain root.
  locales: ["cs"],
  defaultLocale: "cs",
  localePrefix: "as-needed",
  // Internal keys are the Czech paths; DE/EN get translated slugs here later.
  pathnames: {
    "/": "/",
    "/doprava": "/doprava",
    "/drevni-material": "/drevni-material",
    "/vozovy-park": "/vozovy-park",
    "/o-nas": "/o-nas",
    "/kontakt": "/kontakt",
    "/poptavka": "/poptavka",
    "/ochrana-osobnich-udaju": "/ochrana-osobnich-udaju",
  },
});

export type Pathname = keyof typeof routing.pathnames;
