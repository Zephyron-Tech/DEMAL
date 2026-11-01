import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CopyEmail } from "@/components/copy-email";
import { alternatesFor } from "@/i18n/alternates";
import { company } from "@/lib/company";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Imprint");
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: await alternatesFor("/impressum"),
  };
}

export default async function ImprintPage() {
  const t = await getTranslations("Imprint");
  const tCompany = await getTranslations("Company");

  return (
    <main className="mx-auto w-full max-w-(--container-page) px-4 py-12 sm:px-8 sm:py-16">
      <h1 className="text-4xl font-extrabold italic uppercase">{t("title")}</h1>
      <div className="mt-10 max-w-(--container-prose) space-y-10 border-t-2 border-asphalt pt-8">
        <section aria-labelledby="imprint-provider">
          <h2 id="imprint-provider" className="text-2xl font-bold italic">
            {t("provider")}
          </h2>
          <dl className="mt-4 grid gap-4">
            <div>
              <dt className="text-sm text-graphite">{t("provider")}</dt>
              <dd className="font-semibold">
                {company.name}
                <span className="block font-normal">{t("legalForm")}</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-graphite">{t("seat")}</dt>
              <dd>
                {company.street}, {company.city}, {t("country")}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-graphite">{t("representative")}</dt>
              <dd className="font-semibold">{t("representativeValue")}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="imprint-contact">
          <h2 id="imprint-contact" className="text-2xl font-bold italic">
            {t("contact")}
          </h2>
          <dl className="mt-4 grid gap-4">
            <div>
              <dt className="text-sm text-graphite">{t("phone")}</dt>
              <dd>
                <a href={company.dispatch.phoneHref} className="tabular-nums link-reveal">
                  {company.dispatch.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-graphite">{t("email")}</dt>
              <dd>
                <CopyEmail email={company.dispatch.email} variant="inline" />
              </dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="imprint-register">
          <h2 id="imprint-register" className="text-2xl font-bold italic">
            {t("register")}
          </h2>
          <dl className="mt-4 grid gap-4">
            <div>
              <dt className="text-sm text-graphite">{t("register")}</dt>
              <dd>{t("registerValue", { register: company.register, court: tCompany("court") })}</dd>
            </div>
            <div>
              <dt className="text-sm text-graphite">{t("ico")}</dt>
              <dd className="tabular-nums">{company.ico}</dd>
            </div>
            <div>
              <dt className="text-sm text-graphite">{t("dic")}</dt>
              <dd className="tabular-nums">{company.dic}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="imprint-disputes">
          <h2 id="imprint-disputes" className="text-2xl font-bold italic">
            {t("disputes")}
          </h2>
          <p className="mt-4">{t("disputesText")}</p>
        </section>

        <section aria-labelledby="imprint-copyright">
          <h2 id="imprint-copyright" className="text-2xl font-bold italic">
            {t("copyrightTitle")}
          </h2>
          <p className="mt-4">{t("copyright")}</p>
        </section>
      </div>
    </main>
  );
}
