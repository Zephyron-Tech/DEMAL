import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import road from "../../../public/images/foto/europabrucke-brenner-autobahn-a13.jpg";

// Composition from the owner's brief (docs/reference/ai_preview.png): road photograph with the
// trucks on the right, title and actions on the darker left, a band of facts underneath.
// The photograph is an openly licensed stand-in (credited in the footer) until the fleet's own.
// Icons: Lucide (ISC licence), drawn on a 24px grid with round caps, as the rest of the site's
// line icons. Each fact lists its shapes.
type IconShape =
  | { tag: "path"; d: string }
  | { tag: "circle"; cx: number; cy: number; r: number };

const facts: { key: string; icon: IconShape[] }[] = [
  {
    key: "fleet",
    icon: [
      { tag: "path", d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" },
      { tag: "path", d: "M15 18H9" },
      { tag: "path", d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" },
      { tag: "circle", cx: 17, cy: 18, r: 2 },
      { tag: "circle", cx: 7, cy: 18, r: 2 },
    ],
  },
  {
    key: "euro",
    icon: [
      { tag: "path", d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" },
      { tag: "path", d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" },
    ],
  },
  {
    key: "gps",
    icon: [
      { tag: "path", d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" },
      { tag: "circle", cx: 12, cy: 10, r: 3 },
    ],
  },
  {
    key: "eu",
    icon: [
      { tag: "circle", cx: 12, cy: 12, r: 10 },
      { tag: "path", d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" },
      { tag: "path", d: "M2 12h20" },
    ],
  },
];

function FactIcon({ shapes }: { shapes: IconShape[] }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-7 shrink-0 lg:size-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes.map((shape, i) =>
        shape.tag === "path" ? (
          <path key={i} d={shape.d} />
        ) : (
          <circle key={i} cx={shape.cx} cy={shape.cy} r={shape.r} />
        ),
      )}
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

      {/* Phones: the facts run on one continuous track, two copies so the drift loops without a seam.
          Desktop: a row of four. */}
      <div className="overflow-hidden bg-demal text-white">
        <div className="mx-auto max-w-(--container-page) py-6 lg:px-8 lg:py-7">
          <div className="flex w-max motion-safe:animate-fact-ticker lg:w-full lg:animate-none">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-label={copy === 0 ? t("factsLabel") : undefined}
                aria-hidden={copy === 1 || undefined}
                className={`flex shrink-0 items-center gap-12 px-4 lg:grid lg:w-full lg:grid-cols-4 lg:gap-x-6 lg:px-0 ${
                  copy === 1 ? "lg:hidden" : ""
                }`}
              >
                {facts.map((fact) => (
                  <li key={fact.key} className="flex shrink-0 items-center gap-3 whitespace-nowrap lg:gap-4">
                    <FactIcon shapes={fact.icon} />
                    <span>
                      <span className="block font-display font-bold font-wide">
                        {t(`facts.${fact.key}.title`)}
                      </span>
                      <span className="block text-sm text-white/85">{t(`facts.${fact.key}.text`)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
