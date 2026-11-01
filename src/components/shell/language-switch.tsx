"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type StaticPathname } from "@/i18n/routing";

const languages: Record<string, { short: string; name: string }> = {
  cs: { short: "CZ", name: "Čeština" },
  de: { short: "DE", name: "Deutsch" },
  en: { short: "EN", name: "English" },
};

// Switches the language of the current page. The URL changes to the same page in the other language,
// including its translated path; the link is a plain Link, so no cookie is set.
// `dark` is for the footer's asphalt ground, where the light-ground colours would not pass contrast.
// `bar` is the mobile header bar: plain codes, 44px touch targets side by side, active one in bold.
export function LanguageSwitch({
  className = "",
  dark = false,
  bar = false,
}: {
  className?: string;
  dark?: boolean;
  bar?: boolean;
}) {
  const t = useTranslations("Shell");
  const locale = useLocale();
  const pathname = usePathname();
  const commodity = pathname.match(/^\/drevni-material\/([^/]+)$/);
  const href = commodity
    ? { pathname: "/drevni-material/[slug]" as const, params: { slug: commodity[1] } }
    : (pathname as StaticPathname);

  return (
    <nav aria-label={t("switchLanguage")} className={className}>
      <ul className={`flex items-center text-sm font-semibold ${bar ? "gap-0" : "gap-1"}`}>
        {routing.locales.map((l) => (
          <li key={l}>
            <Link
              href={href}
              locale={l}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? "true" : undefined}
              className={`inline-flex min-h-11 items-center ${
                bar ? "min-w-11 justify-center px-1 font-bold no-underline" : "px-2 link-reveal"
              } ${
                dark
                  ? l === locale
                    ? "text-marking"
                    : "text-trailer/80 hover:text-trailer"
                  : l === locale
                    ? "text-demal"
                    : "text-graphite hover:text-asphalt"
              }`}
            >
              {languages[l].short}
              <span className="sr-only">, {languages[l].name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

