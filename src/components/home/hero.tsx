import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import road from "../../../public/images/foto/europabrucke-brenner-autobahn-a13.jpg";

// Composition from the owner's brief (docs/reference/ai_preview.png): road photograph with the
// trucks on the right, title and actions on the darker left, a band of facts underneath.
// The photograph is an openly licensed stand-in (credited in the footer) until the fleet's own.
const facts = [
  {
    key: "fleet",
    icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  },
  { key: "euro", icon: "M12 3c4 3 6 6 6 9a6 6 0 0 1-12 0c0-3 2-6 6-9zM12 21v-8" },
  {
    key: "gps",
    icon: "M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  },
  {
    key: "eu",
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z",
  },
] as const;

export async function Hero() {
  const t = await getTranslations("Home.hero");

  return (
    <section aria-labelledby="hero-title">
      <div className="relative isolate bg-asphalt text-white">
        {/* Phones: the photograph sits above the text. Desktop: it fills the hero behind it. */}
        <div className="relative h-[40svh] min-h-60 lg:absolute lg:inset-0 lg:-z-20 lg:h-auto">
          <Image
            src={road}
            alt={t("photoAlt")}
            fill
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[65%_55%]"
          />
        </div>
        {/* Neutral scrim under the text only; the trucks on the right stay clear. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,rgb(30_34_38/0.88)_0%,rgb(30_34_38/0.7)_38%,rgb(30_34_38/0)_68%)] lg:block"
        />
        <div className="@container mx-auto flex max-w-(--container-page) flex-col justify-center px-4 py-10 sm:px-8 sm:py-14 lg:min-h-[min(68svh,46rem)] lg:py-24">
          <div className="max-w-[50rem]">
            {/* "Kamionová doprava" is 12.3em wide: sizing by the column keeps two lines. */}
            <h1
              id="hero-title"
              className="text-[min(calc(100cqi/12.6),4rem)] leading-[0.98] font-extrabold italic"
            >
              {t("title")}
            </h1>
            <p className="mt-4 font-display text-base font-bold font-wide sm:mt-5 sm:text-xl">
              {t("subtitle")}
            </p>
            <p className="mt-4 max-w-[46ch] text-lg text-white/90">{t("lead")}</p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/poptavka"
                className="inline-flex min-h-12 items-center bg-marking px-6 font-display font-bold font-wide text-asphalt transition-colors hover:bg-marking-deep"
              >
                {t("ctaTransport")}
              </Link>
              <Link
                href={{ pathname: "/poptavka", query: { typ: "drevo" } }}
                className="inline-flex min-h-12 items-center border-2 border-white px-6 font-display font-bold font-wide transition-colors hover:bg-white hover:text-asphalt"
              >
                {t("ctaWood")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-demal text-white">
        <ul
          aria-label={t("factsLabel")}
          className="mx-auto grid max-w-(--container-page) grid-cols-2 gap-x-4 gap-y-6 px-4 py-7 sm:px-8 lg:grid-cols-4 lg:gap-x-6"
        >
          {facts.map((fact) => (
            <li key={fact.key} className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-7 shrink-0 lg:size-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              >
                <path d={fact.icon} />
              </svg>
              <span>
                <span className="block font-display font-bold font-wide">
                  {t(`facts.${fact.key}.title`)}
                </span>
                <span className="text-sm text-white/85">{t(`facts.${fact.key}.text`)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
