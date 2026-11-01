import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const transportItems = ["reefer", "walking", "spedition", "tracking"] as const;
// Wood commodities come from the owner's brief, not yet confirmed (see docs/sitemap.md, question 1).
const woodItems = ["chips", "sawdust", "pellets", "byproducts"] as const;

export async function Branches() {
  const t = await getTranslations("Home.branches");

  return (
    <section
      aria-label={t("label")}
      className="mx-auto mt-12 grid max-w-(--container-page) gap-3 px-4 sm:mt-24 sm:px-8 md:grid-cols-2 md:gap-0"
    >
      <article
        aria-labelledby="branch-transport"
        className="focus-on-dark flex flex-col bg-asphalt max-md:shadow-[inset_4px_0_0_var(--color-demal)] px-6 py-8 text-trailer sm:px-10 sm:py-12"
      >
        <h2 id="branch-transport" className="text-3xl font-extrabold italic">
          {t("transport.title")}
        </h2>
        <p className="mt-4 max-w-md text-rule">{t("transport.lead")}</p>
        <dl className="mt-6 border-t border-graphite sm:mt-8">
          {transportItems.map((item) => (
            <div
              key={item}
              className="border-b border-graphite py-3 sm:max-md:grid sm:max-md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:max-md:gap-x-6"
            >
              <dt className="font-display text-base font-bold font-wide sm:text-lg">
                {t(`transport.items.${item}`)}
              </dt>
              <dd className="text-sm leading-6 text-rule">{t(`transport.items.${item}Note`)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto pt-8 sm:pt-10">
          <Link
            href="/doprava"
            className="flex min-h-12 w-full items-center gap-3 border-2 border-trailer px-4 font-display font-bold font-wide press hover:bg-trailer hover:text-asphalt md:inline-flex md:w-auto md:px-6"
          >
            {t("transport.link")}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-auto size-5 shrink-0 md:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>

      <article
        aria-labelledby="branch-wood"
        className="focus-on-dark flex flex-col bg-demal max-md:shadow-[inset_4px_0_0_var(--color-trailer)] px-6 py-8 text-trailer sm:px-10 sm:py-12"
      >
        <h2 id="branch-wood" className="text-3xl font-extrabold italic">
          {t("wood.title")}
        </h2>
        <p className="mt-4 max-w-md text-trailer/85">{t("wood.lead")}</p>
        <ul className="mt-6 border-t border-trailer/30 sm:mt-8">
          {woodItems.map((item) => (
            <li
              key={item}
              className="border-b border-trailer/30 py-3 font-display text-base font-bold max-sm:leading-snug font-wide sm:text-lg"
            >
              {t(`wood.items.${item}`)}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8 sm:pt-10">
          <Link
            href="/drevni-material"
            className="flex min-h-12 w-full items-center gap-3 border-2 border-trailer px-4 font-display font-bold font-wide press hover:bg-trailer hover:text-demal md:inline-flex md:w-auto md:px-6"
          >
            {t("wood.link")}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-auto size-5 shrink-0 md:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    </section>
  );
}
