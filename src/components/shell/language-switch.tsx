"use client";

import { useEffect, useId, useRef, useState } from "react";
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
export function LanguageSwitch({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const t = useTranslations("Shell");
  const locale = useLocale();
  const pathname = usePathname();
  const commodity = pathname.match(/^\/drevni-material\/([^/]+)$/);
  const href = commodity
    ? { pathname: "/drevni-material/[slug]" as const, params: { slug: commodity[1] } }
    : (pathname as StaticPathname);

  return (
    <nav aria-label={t("switchLanguage")} className={className}>
      <ul className="flex items-center gap-1 text-sm font-semibold">
        {routing.locales.map((l) => (
          <li key={l}>
            <Link
              href={href}
              locale={l}
              hrefLang={l}
              lang={l}
              aria-current={l === locale ? "true" : undefined}
              className={`inline-flex min-h-11 items-center px-2 link-reveal ${
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

// Compact language dropdown for the header: the current language on the button, the other two
// in a popup. Escape and clicks outside close it; the popup is plain links, so it works without JS too.
export function LanguageMenu({ className = "" }: { className?: string }) {
  const t = useTranslations("Shell");
  const locale = useLocale();
  const pathname = usePathname();
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const commodity = pathname.match(/^\/drevni-material\/([^/]+)$/);
  const href = commodity
    ? { pathname: "/drevni-material/[slug]" as const, params: { slug: commodity[1] } }
    : (pathname as StaticPathname);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="press flex min-h-11 items-center gap-1.5 border-2 border-asphalt px-3 font-display text-sm font-bold font-wide hover:bg-asphalt hover:text-trailer"
      >
        {languages[locale].short}
        <span className="sr-only">, {t("switchLanguage")}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className={`size-3.5 transition-transform duration-(--duration-ui) ease-(--ease-out) ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <ul id={menuId} className="absolute right-0 top-full z-50 mt-2 min-w-40 border-2 border-asphalt bg-white py-1 motion-safe:animate-field-in">
          {routing.locales.map((l) => (
            <li key={l}>
              <Link
                href={href}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 items-center justify-between gap-4 px-4 hover:bg-plate ${
                  l === locale ? "font-bold text-demal" : "font-semibold"
                }`}
              >
                {languages[l].name}
                <span className="text-sm text-graphite">{languages[l].short}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
