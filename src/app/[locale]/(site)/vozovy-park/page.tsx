import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { QuoteCta } from "@/components/home/quote-cta";
import { SpecPlate } from "@/components/spec-plate";
import trailers from "../../../../../public/images/navesy-demal.jpg";
import tractors from "../../../../../public/images/tahace-scania.jpg";
import { alternatesFor } from "@/i18n/alternates";

// Everything here comes from the current demalspedition.cz; technical parameters
// (pallets, volume, temperature range) are left out until the owner supplies them.
const plateKeys = ["sets", "euro", "tractors", "reefer", "walking", "gps"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Fleet");
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: await alternatesFor("/vozovy-park"),
  };
}

export default async function FleetPage() {
  const t = await getTranslations("Fleet");

  return (
    <main>
      <div className="mx-auto max-w-(--container-page) px-4 pt-12 sm:px-8 sm:pt-16">
        <h1 className="text-4xl font-extrabold italic uppercase">{t("title")}</h1>
        <p className="mt-4 max-w-(--container-prose) text-lg text-graphite">{t("lead")}</p>
        <SpecPlate
          label={t("plateLabel")}
          className="mt-10"
          fields={plateKeys.map((key) => ({
            label: t(`plate.${key}Label`),
            value: t(`plate.${key}`),
          }))}
        />
      </div>

      <section
        aria-labelledby="tractors-title"
        className="mx-auto mt-20 grid max-w-(--container-page) gap-8 px-4 sm:mt-28 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-plate">
          <Image
            src={tractors}
            alt={t("tractors.photoAlt")}
            fill
            // First photo on the page; on phones it is the LCP element.
            loading="eager"
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_65%]"
          />
        </div>
        <div>
          <h2 id="tractors-title" className="text-3xl font-extrabold italic">
            {t("tractors.title")}
          </h2>
          <p className="mt-2 font-display text-lg font-bold font-wide text-demal">
            {t("tractors.makes")}
          </p>
          <p className="mt-4 max-w-(--container-prose) text-graphite">{t("tractors.text")}</p>
        </div>
      </section>

      <section
        aria-labelledby="trailers-title"
        className="mx-auto mt-20 grid max-w-(--container-page) gap-8 px-4 sm:mt-28 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16"
      >
        <div className="lg:order-2">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-plate">
            <Image
              src={trailers}
              alt={t("trailers.photoAlt")}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_75%]"
            />
          </div>
        </div>
        <div className="lg:order-1">
          <h2 id="trailers-title" className="text-3xl font-extrabold italic">
            {t("trailers.title")}
          </h2>
          <dl className="mt-6 border-t-2 border-asphalt">
            {(["reefer", "walking"] as const).map((kind) => (
              <div key={kind} className="border-b border-rule py-5">
                <dt>
                  <span className="block font-display text-xl font-bold font-wide">
                    {t(`trailers.${kind}`)}
                  </span>
                  <span className="text-sm font-semibold text-demal">
                    {t(`trailers.${kind}Makes`)}
                  </span>
                </dt>
                <dd className="mt-2 max-w-(--container-prose) text-graphite">
                  {t(`trailers.${kind}Text`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="tracking-title" className="mt-20 bg-asphalt text-trailer sm:mt-28">
        <div className="mx-auto max-w-(--container-page) px-4 py-16 sm:px-8 sm:py-20">
          <h2 id="tracking-title" className="text-3xl font-extrabold italic">
            {t("tracking.title")}
          </h2>
          <dl className="mt-10 grid gap-8 border-t border-graphite pt-8 md:grid-cols-2 md:gap-16">
            {(["position", "temperature"] as const).map((item) => (
              <div key={item}>
                <dt className="font-display text-xl font-bold font-wide">
                  {t(`tracking.${item}`)}
                </dt>
                <dd className="mt-2 max-w-(--container-prose) text-rule">
                  {t(`tracking.${item}Text`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <QuoteCta />
    </main>
  );
}
