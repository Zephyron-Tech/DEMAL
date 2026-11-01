import type { Locale } from "next-intl";
import { routing } from "./routing";

// Server components render in the request's locale unless told otherwise. app/global-not-found.tsx
// has no locale segment and renders the shell once per language, so it passes `locale`; server
// Links then need it too. Czech is that page's request locale and stays unprefixed.
export const linkLocale = (locale?: Locale) => (locale === routing.defaultLocale ? undefined : locale);
