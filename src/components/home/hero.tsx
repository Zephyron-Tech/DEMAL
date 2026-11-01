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

function FactIcon({ d }: { d: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-7 shrink-0 lg:size-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

export async function Hero() {
  const t = await getTranslations("Home.hero");

  return (
    <section aria-labelledby="hero-title" className="lg:flex lg:min-h-[max(36rem,calc(100svh_-_7.25rem))] lg:flex-col">
      <div className="focus-on-dark relative isolate flex-1 bg-asphalt text-white lg:flex lg:flex-col">
        {/* Phones: a tall photograph whose lower edge fades into the panel, the title set across that
            fade. Desktop: the photograph fills the hero behind the text. */}
        <div className="relative h-[58svh] min-h-80 overflow-hidden lg:absolute lg:inset-0 lg:-z-20 lg:h-auto">
          <Image
            src={road}
            alt={t("photoAlt")}
            fill
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[62%_45%] motion-safe:animate-hero-photo lg:object-[65%_55%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(0deg,var(--color-asphalt)_8%,rgb(30_34_38/0.7)_45%,rgb(30_34_38/0)_100%)] lg:hidden"
          />
        </div>
        {/* Neutral scrim under the text only; the trucks on the right stay clear. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,rgb(30_34_38/0.88)_0%,rgb(30_34_38/0.7)_38%,rgb(30_34_38/0)_68%)] lg:block"
        />
        <div className="@container relative mx-auto -mt-36 flex max-w-(--container-page) flex-col justify-center px-4 pb-10 sm:-mt-40 sm:px-8 sm:pb-14 lg:mt-0 lg:w-full lg:flex-1 lg:py-24">
          <div className="max-w-[50rem]">
            {/* "Kamionová doprava" is 12.3em wide: sizing by the column keeps two lines. */}
            <h1
              id="hero-title"
              className="text-[min(calc(100cqi/12.6),4rem)] leading-[0.98] font-extrabold italic motion-safe:animate-hero-title"
            >
              {t("title")}
            </h1>
            <p
              className="mt-4 font-display text-base font-bold font-wide motion-safe:animate-hero-rise sm:mt-5 sm:text-xl"
              style={{ animationDelay: "380ms" }}
            >
              {t("subtitle")}
            </p>
            <p
              className="mt-4 max-w-[46ch] text-white/90 motion-safe:animate-hero-rise sm:text-lg"
              style={{ animationDelay: "450ms" }}
            >
              {t("lead")}
            </p>
            <div
              className="mt-7 grid gap-3 motion-safe:animate-hero-rise sm:mt-8 sm:flex sm:flex-wrap sm:gap-4"
              style={{ animationDelay: "540ms" }}
            >
              <Link
                href="/poptavka"
                className="inline-flex min-h-12 items-center justify-center bg-marking px-6 font-display font-bold font-wide text-asphalt press hover:bg-marking-deep"
              >
                {t("ctaTransport")}
              </Link>
              <Link
                href={{ pathname: "/poptavka", query: { typ: "drevo" } }}
                className="inline-flex min-h-12 items-center justify-center border-2 border-white px-6 font-display font-bold font-wide press hover:bg-white hover:text-asphalt"
              >
                {t("ctaWood")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Phones: the four facts take turns in a single slot, sliding along a track. Desktop: a row. */}
      <div className="overflow-hidden bg-demal text-white">
        <div className="mx-auto max-w-(--container-page) lg:px-8">
          <ul
            aria-label={t("factsLabel")}
            className="flex w-[800%] motion-safe:animate-fact-ticker lg:grid lg:w-auto lg:animate-none lg:grid-cols-4 lg:gap-x-6"
          >
            {/* The list runs twice, so the drift loops without a seam; the second run is hidden from
                assistive tech and, on desktop, from view. */}
            {[0, 1].map((run) =>
              facts.map((fact) => (
                <li
                  key={`${run}-${fact.key}`}
                  aria-hidden={run === 1 || undefined}
                  className={`flex w-1/8 shrink-0 flex-col gap-2 px-4 py-7 sm:px-8 lg:w-auto lg:flex-row lg:items-center lg:gap-4 lg:px-0 ${
                    run === 1 ? "lg:hidden" : ""
                  }`}
                >
                  <FactIcon d={fact.icon} />
                  <span>
                    <span className="block font-display font-bold font-wide">
                      {t(`facts.${fact.key}.title`)}
                    </span>
                    <span className="text-sm text-white/85">{t(`facts.${fact.key}.text`)}</span>
                  </span>
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
