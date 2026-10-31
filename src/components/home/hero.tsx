import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SpecPlate } from "@/components/spec-plate";
import { Link } from "@/i18n/navigation";
import trailers from "../../../public/images/navesy-demal.jpg";

const plateKeys = [
  "sets",
  "euro",
  "walking",
  "route",
  "reefer",
  "gps",
] as const;

export async function Hero() {
  const t = await getTranslations("Home.hero");

  return (
    <section aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-(--container-page) gap-6 px-4 pt-10 pb-10 sm:px-8 sm:pt-16 sm:pb-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-12">
        <h1
          id="hero-title"
          className="text-3xl font-extrabold italic uppercase sm:text-4xl"
        >
          {t("title")}
        </h1>
        <div>
          <p className="max-w-(--container-prose) text-lg text-graphite">
            {t("lead")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/poptavka"
              className="inline-flex min-h-12 items-center bg-marking px-6 font-display font-bold font-wide text-asphalt transition-colors hover:bg-marking-deep"
            >
              {t("ctaTransport")}
            </Link>
            <Link
              href="/drevni-material"
              className="inline-flex min-h-12 items-center border-2 border-demal px-6 font-display font-semibold font-wide text-demal transition-colors hover:bg-demal hover:text-trailer"
            >
              {t("ctaWood")}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative aspect-4/3 w-full bg-plate sm:aspect-[21/9]">
        <Image
          src={trailers}
          alt={t("photoAlt")}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[50%_72%]"
        />
      </div>

      {/* The plate overlaps the photo's lower edge: the one bold move of the page. */}
      <div className="relative mx-auto -mt-10 max-w-(--container-page) px-4 sm:-mt-20 sm:px-8">
        <SpecPlate
          label={t("plateLabel")}
          className="shadow-plate"
          fields={plateKeys.map((key) => ({
            label: t(`plate.${key}Label`),
            value: t(`plate.${key}`),
          }))}
        />
      </div>
    </section>
  );
}
