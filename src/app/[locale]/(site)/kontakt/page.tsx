import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact");
  return { title: t("title"), description: t("metaDescription") };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");

  const billing = [
    { label: t("billingName"), value: company.name },
    { label: t("billingSeat"), value: `${company.street}, ${company.city}` },
    { label: t("billingIco"), value: company.ico },
    { label: t("billingDic"), value: company.dic },
    {
      label: t("billingRegister"),
      value: t("registerValue", { register: company.register, court: company.registerCourt }),
    },
  ];

  return (
    <main className="mx-auto w-full max-w-(--container-page) px-4 py-12 sm:px-8 sm:py-16">
      <h1 className="text-4xl font-extrabold italic uppercase">{t("title")}</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
        <section aria-labelledby="dispatch-title" className="border-t-2 border-asphalt pt-6">
          <h2 id="dispatch-title" className="text-2xl font-bold italic">
            {t("dispatchTitle")}
          </h2>
          <p className="mt-3 max-w-(--container-prose) text-graphite">{t("dispatchText")}</p>
          <dl className="mt-8 grid gap-6">
            <div>
              <dt className="text-sm text-graphite">{t("phone")}</dt>
              <dd>
                <a
                  href={company.dispatch.phoneHref}
                  className="font-display text-3xl font-bold font-wide whitespace-nowrap tabular-nums underline-offset-4 hover:underline max-[22rem]:text-2xl"
                >
                  {company.dispatch.phone}
                </a>
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-sm text-graphite">{t("email")}</dt>
              <dd>
                <a
                  href={`mailto:${company.dispatch.email}`}
                  className="text-xl font-semibold break-all underline-offset-4 hover:underline"
                >
                  {company.dispatch.email}
                </a>
              </dd>
            </div>
          </dl>
          <Link
            href="/poptavka"
            className="mt-8 inline-flex min-h-12 items-center bg-marking px-6 font-display font-bold font-wide text-asphalt transition-colors hover:bg-marking-deep"
          >
            {t("quoteCta")}
          </Link>
        </section>

        <section aria-labelledby="seat-title" className="border-t-2 border-asphalt pt-6">
          <h2 id="seat-title" className="text-2xl font-bold italic">
            {t("seatTitle")}
          </h2>
          <address className="mt-3 text-lg not-italic">
            {company.name}
            <br />
            {company.street}
            <br />
            {company.city}
          </address>
          {/* Links instead of an embedded map: an embed would set third-party cookies. */}
          <ul className="mt-6 grid gap-2">
            {[
              { href: company.maps.mapy, label: t("openMapy") },
              { href: company.maps.google, label: t("openGoogle") },
            ].map((map) => (
              <li key={map.href}>
                <a
                  href={map.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-demal underline underline-offset-4"
                >
                  {map.label}
                  <span className="sr-only"> {t("newTab")}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="billing-title" className="mt-16">
        <h2 id="billing-title" className="text-2xl font-bold italic">
          {t("billingTitle")}
        </h2>
        <dl className="mt-6 grid border-2 border-asphalt bg-plate sm:grid-cols-2 lg:grid-cols-3">
          {billing.map((item) => (
            <div
              key={item.label}
              // The register entry is the longest; it closes the grid across two columns.
              className="-mb-px -mr-px min-w-0 border-r border-b border-rule px-5 py-4 last:lg:col-span-2"
            >
              <dt className="text-sm text-graphite">{item.label}</dt>
              <dd className="mt-1 font-semibold tabular-nums">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
