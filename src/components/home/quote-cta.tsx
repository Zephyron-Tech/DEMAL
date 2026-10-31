import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";

// What a dispatcher needs to price a load; the same fields come back on /poptavka.
const needs = ["route", "date", "cargo", "temp"] as const;

export async function QuoteCta() {
  const t = await getTranslations("Home.quote");

  return (
    <section aria-labelledby="quote-title" className="border-y-2 border-asphalt bg-white">
      <div className="mx-auto grid max-w-(--container-page) gap-10 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="quote-title" className="text-3xl font-extrabold italic">
            {t("title")}
          </h2>
          <Link
            href="/poptavka"
            className="mt-8 inline-flex min-h-12 items-center bg-marking px-6 font-display font-bold font-wide text-asphalt transition-colors hover:bg-marking-deep"
          >
            {t("cta")}
          </Link>
          <p className="mt-6 text-graphite">
            {t("orCall")}
            <a
              href={company.dispatch.phoneHref}
              className="mt-1 block font-display text-2xl font-bold font-wide text-asphalt tabular-nums underline-offset-4 hover:underline"
            >
              {company.dispatch.phone}
            </a>
          </p>
        </div>

        <div>
          <h3 className="font-sans text-base font-semibold">{t("needsTitle")}</h3>
          <ul className="mt-4 border-t border-rule">
            {needs.map((need) => (
              <li
                key={need}
                className="flex items-baseline gap-3 border-b border-rule py-3 text-lg before:size-3.5 before:shrink-0 before:translate-y-0.5 before:border-2 before:border-asphalt before:content-['']"
              >
                {t(`needs.${need}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
