import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "./language-switch";
import type { StaticPathname } from "@/i18n/routing";
import { company } from "@/lib/company";

// Resolved at prerender and refreshed with each deploy.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

// Company details as filled boxes of a consignment note: separated by tone, no rules.
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 bg-white/[0.06] px-4 py-3">
      <dt className="text-xs text-rule">{label}</dt>
      <dd className="mt-0.5 font-semibold text-trailer">{children}</dd>
    </div>
  );
}

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const year = await currentYear();

  const pages: { href: StaticPathname; label: string }[] = [
    { href: "/doprava", label: nav("doprava") },
    { href: "/drevni-material", label: nav("drevo") },
    { href: "/vozovy-park", label: nav("vozovyPark") },
    { href: "/o-nas", label: nav("oNas") },
    { href: "/kontakt", label: nav("kontakt") },
  ];

  return (
    <footer className="focus-on-dark mt-auto bg-asphalt text-trailer">
      <div className="mx-auto max-w-(--container-page) px-4 pt-10 pb-8 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p translate="no" className="font-display text-2xl font-extrabold italic font-wide">
              DEMAL SPEDITION
            </p>
            <p className="mt-1 text-rule">{t("tagline")}</p>
          </div>
          <nav aria-label={t("pages")}>
            <ul className="flex flex-wrap gap-x-6 font-semibold max-lg:gap-y-0 lg:gap-y-2">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="link-reveal max-lg:inline-flex max-lg:min-h-11 max-lg:items-center"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <section aria-label={t("label")} className="mt-8">
          <dl className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
            <Field label={t("seat")}>
              {company.street}, {company.city}
            </Field>
            <Field label={t("icoDic")}>
              <span className="tabular-nums">
                {company.ico} / {company.dic}
              </span>
            </Field>
            <Field label={t("phone")}>
              <a
                href={company.dispatch.phoneHref}
                className="tabular-nums link-reveal max-lg:-my-2.5 max-lg:flex max-lg:min-h-11 max-lg:items-center"
              >
                {company.dispatch.phone}
              </a>
            </Field>
            <Field label={t("email")}>
              <a href={`mailto:${company.dispatch.email}`} className="break-all link-reveal max-lg:-my-2.5 max-lg:flex max-lg:min-h-11 max-lg:items-center">
                {company.dispatch.email}
              </a>
            </Field>
          </dl>
        </section>
      </div>

      <div className="mx-auto max-w-(--container-page) px-4 sm:px-8">
        <div className="flex flex-col gap-y-3 border-t border-white/10 pt-5 pb-6 text-sm text-rule sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-6 sm:gap-y-2 sm:py-5">
          <p>
            {t("copyright", { year })} {t("register", { register: company.register, court: company.registerCourt })}
          </p>
          <div className="flex flex-col items-start sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
          <ul className="flex flex-wrap gap-x-6 max-lg:gap-y-0 lg:gap-y-2">
            <li>
              <Link
                href="/ochrana-osobnich-udaju"
                className="link-reveal max-lg:inline-flex max-lg:min-h-11 max-lg:items-center"
              >
                {t("privacy")}
              </Link>
            </li>
            {/* Attribution required by the CC BY / CC BY-SA photographs lives on its own page. */}
            <li>
              <Link
                href="/zdroje-fotografii"
                className="link-reveal max-lg:inline-flex max-lg:min-h-11 max-lg:items-center"
              >
                {t("photoSources")}
              </Link>
            </li>
          </ul>
          <LanguageSwitch dark className="max-sm:-ml-2" />
          </div>
        </div>
      </div>
    </footer>
  );
}
