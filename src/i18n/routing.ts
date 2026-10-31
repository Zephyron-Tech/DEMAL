import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // DE and EN follow later; Czech stays unprefixed at the domain root.
  locales: ["cs"],
  defaultLocale: "cs",
  localePrefix: "as-needed",
});
