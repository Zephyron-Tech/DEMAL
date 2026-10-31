import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";
import { company } from "@/lib/company";

// Resolved at prerender and refreshed with each deploy.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

// Company details set as labelled boxes, the way a CMR consignment note lays out its fields.
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="-mb-px -mr-px border-r border-b border-graphite px-4 py-3">
      <dt className="text-xs text-rule">{label}</dt>
      <dd className="mt-1 font-semibold text-trailer">{children}</dd>
    </div>
  );
}

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const year = await currentYear();

  const pages: { href: Pathname; label: string }[] = [
    { href: "/doprava", label: nav("doprava") },
    { href: "/drevni-material", label: nav("drevo") },
    { href: "/vozovy-park", label: nav("vozovyPark") },
    { href: "/o-nas", label: nav("oNas") },
    { href: "/kontakt", label: nav("kontakt") },
  ];

  return (
    <footer className="mt-auto bg-asphalt text-trailer">
      <div className="mx-auto grid max-w-(--container-page) gap-10 px-4 py-14 sm:px-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-display text-2xl font-extrabold italic font-wide">
            DEMAL SPEDITION
          </p>
          <p className="mt-3 max-w-xs text-rule">{t("tagline")}</p>
        </div>

        <section aria-label={t("label")}>
          <dl className="grid border border-graphite sm:grid-cols-2 lg:grid-cols-3">
            <Field label={t("carrier")}>{company.name}</Field>
            <Field label={t("seat")}>
              {company.street}
              <br />
              {company.city}
            </Field>
            <Field label={t("icoDic")}>
              <span className="tabular-nums">
                {company.ico}
                <br />
                {company.dic}
              </span>
            </Field>
            <Field label={t("phone")}>
              <a
                href={company.dispatch.phoneHref}
                className="tabular-nums underline-offset-4 hover:underline"
              >
                {company.dispatch.phone}
              </a>
            </Field>
            <Field label={t("email")}>
              <a
                href={`mailto:${company.dispatch.email}`}
                className="break-all underline-offset-4 hover:underline"
              >
                {company.dispatch.email}
              </a>
            </Field>
            <Field label={t("pages")}>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 font-normal">
                {pages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="underline-offset-4 hover:underline">
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Field>
          </dl>
        </section>
      </div>

      <div className="border-t border-graphite">
        <div className="mx-auto flex max-w-(--container-page) flex-wrap justify-between gap-x-6 gap-y-2 px-4 py-5 text-sm text-rule sm:px-8">
          <div>
            <p>{t("copyright", { year })}</p>
            <p>{t("register", { register: company.register, court: company.registerCourt })}</p>
          </div>
          <Link href="/ochrana-osobnich-udaju" className="underline-offset-4 hover:underline">
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
