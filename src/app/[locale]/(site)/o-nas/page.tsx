import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { QuoteCta } from "@/components/home/quote-cta";
import { Link } from "@/i18n/navigation";
import tractors from "../../../../../public/images/tahace-scania.jpg";
import { alternatesFor } from "@/i18n/alternates";

// Founding year from ARES (19. 7. 2012); the rest from the current demalspedition.cz "O nás".
const milestones = ["2012", "2016", "dnes"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About");
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: await alternatesFor("/o-nas"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  return (
    <main>
      <div className="mx-auto max-w-(--container-page) px-4 pt-12 sm:px-8 sm:pt-16">
        <h1 className="text-4xl font-extrabold italic uppercase">{t("title")}</h1>
        <p className="mt-4 max-w-(--container-prose) text-lg text-graphite">{t("lead")}</p>
      </div>

      <section
        aria-labelledby="history-title"
        className="mx-auto mt-16 max-w-(--container-page) px-4 sm:mt-20 sm:px-8"
      >
        <h2 id="history-title" className="text-3xl font-extrabold italic">
          {t("historyTitle")}
        </h2>
        {/* A real sequence, so an ordered list with the years as markers. */}
        <ol className="mt-8 border-t-2 border-asphalt">
          {milestones.map((key) => (
            <li
              key={key}
              className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
            >
              <span className="font-display text-3xl font-extrabold italic font-wide text-demal tabular-nums">
                {t(`history.${key}.year`)}
              </span>
              <div>
                <h3 className="text-xl font-bold">{t(`history.${key}.title`)}</h3>
                <p className="mt-1 max-w-(--container-prose) text-graphite">
                  {t(`history.${key}.text`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="people-title"
        className="mx-auto mt-20 grid max-w-(--container-page) gap-8 px-4 sm:mt-28 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16"
      >
        <div>
          <h2 id="people-title" className="text-3xl font-extrabold italic">
            {t("peopleTitle")}
          </h2>
          <p className="mt-4 font-display text-2xl font-bold font-wide">{t("peopleCount")}</p>
          <p className="mt-3 max-w-(--container-prose) text-graphite">{t("peopleText")}</p>

          <h3 className="mt-10 text-sm font-normal text-graphite">{t("more")}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {(
              [
                { href: "/doprava", label: t("moreTransport") },
                { href: "/vozovy-park", label: t("moreFleet") },
              ] as const
            ).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center border-2 border-asphalt px-4 font-display font-bold font-wide press hover:bg-asphalt hover:text-trailer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-4/3 w-full overflow-hidden bg-plate">
          <Image
            src={tractors}
            alt={t("photoAlt")}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_65%]"
          />
        </div>
      </section>

      <div className="mt-20 sm:mt-28">
        <QuoteCta />
      </div>
    </main>
  );
}
