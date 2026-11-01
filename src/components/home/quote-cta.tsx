import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";

// What a dispatcher needs to price a load; the same fields come back on /poptavka.
const needs = ["route", "date", "cargo", "temp"] as const;

export async function QuoteCta() {
  const t = await getTranslations("Home.quote");

  return (
    <section aria-labelledby="quote-title" className="border-y-2 border-asphalt bg-white">
      <div className="mx-auto grid max-w-(--container-page) gap-8 px-4 py-12 sm:gap-10 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="quote-title" className="text-3xl font-extrabold italic">
            {t("title")}
          </h2>
          <Link
            href="/poptavka"
            className="mt-6 flex min-h-12 w-full items-center justify-between bg-marking px-4 font-display font-bold font-wide text-asphalt press hover:bg-marking-deep sm:mt-8 sm:inline-flex sm:w-auto sm:px-6"
          >
            {t("cta")}
            <span aria-hidden="true" className="h-0.5 w-6 bg-current sm:hidden" />
          </Link>
          <p className="mt-6 text-graphite">
            {t("orCall")}
            <a
              href={company.dispatch.phoneHref}
              className="mt-1 flex min-h-11 items-center font-display text-2xl font-bold font-wide text-asphalt tabular-nums link-reveal lg:block lg:min-h-0"
            >
              {company.dispatch.phone}
            </a>
          </p>
        </div>

        {/* The note a dispatcher fills in: four filled boxes, each with a sample entry. */}
        <div className="bg-plate p-5 sm:p-6">
          <h3 className="font-sans text-base font-semibold">{t("needsTitle")}</h3>
          <dl className="mt-2 grid gap-1 sm:mt-4 sm:grid-cols-2">
            {needs.map((need) => (
              <div
                key={need}
                className="border-b border-rule py-3 last:border-b-0 sm:border-b-0 sm:bg-white sm:px-5 sm:py-4"
              >
                <dt className="font-display text-base font-bold font-wide sm:text-lg">
                  {t(`needs.${need}.label`)}
                </dt>
                <dd className="mt-1 text-graphite">
                  <span className="text-graphite sm:text-steel">{t("examplePrefix")}</span>{" "}
                  {t(`needs.${need}.example`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
