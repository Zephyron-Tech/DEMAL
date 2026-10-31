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
      className="mx-auto mt-16 grid max-w-(--container-page) px-4 sm:mt-24 sm:px-8 md:grid-cols-2"
    >
      <article
        aria-labelledby="branch-transport"
        className="flex flex-col bg-asphalt px-6 py-10 text-trailer sm:px-10 sm:py-12"
      >
        <h2 id="branch-transport" className="text-3xl font-extrabold italic">
          {t("transport.title")}
        </h2>
        <p className="mt-4 max-w-md text-rule">{t("transport.lead")}</p>
        <ul className="mt-8 border-t border-graphite">
          {transportItems.map((item) => (
            <li key={item} className="border-b border-graphite py-3">
              <span className="block font-display text-lg font-bold font-wide">
                {t(`transport.items.${item}`)}
              </span>
              <span className="text-sm text-rule">{t(`transport.items.${item}Note`)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <Link
            href="/doprava"
            className="inline-flex min-h-12 items-center border-2 border-trailer px-6 font-display font-bold font-wide transition-colors hover:bg-trailer hover:text-asphalt"
          >
            {t("transport.link")}
          </Link>
        </div>
      </article>

      <article
        aria-labelledby="branch-wood"
        className="flex flex-col bg-demal px-6 py-10 text-trailer sm:px-10 sm:py-12"
      >
        <h2 id="branch-wood" className="text-3xl font-extrabold italic">
          {t("wood.title")}
        </h2>
        <p className="mt-4 max-w-md text-trailer/85">{t("wood.lead")}</p>
        <ul className="mt-8 border-t border-trailer/30">
          {woodItems.map((item) => (
            <li
              key={item}
              className="border-b border-trailer/30 py-3 font-display text-lg font-bold font-wide"
            >
              {t(`wood.items.${item}`)}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <Link
            href="/drevni-material"
            className="inline-flex min-h-12 items-center border-2 border-trailer px-6 font-display font-bold font-wide transition-colors hover:bg-trailer hover:text-demal"
          >
            {t("wood.link")}
          </Link>
        </div>
      </article>
    </section>
  );
}
