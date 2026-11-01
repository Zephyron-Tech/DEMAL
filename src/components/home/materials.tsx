import Image, { type StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import chips from "../../../public/images/foto/pine-wood-chips-at-hatfield-broad-oak.jpg";
import logs from "../../../public/images/foto/pine-log-cross-sections-teutendorf-2016-09.jpg";
import sawdust from "../../../public/images/foto/sawdust-pile-at-bbq-charcoal-factory-in.jpg";
import pellets from "../../../public/images/foto/holzpellets.jpg";

// The commodities from the owner's brief, awaiting confirmation (/podklady, question 1).
// Photographs are openly licensed stand-ins, credited in the footer.
const items: { key: string; image: StaticImageData; position: string }[] = [
  { key: "chips", image: chips, position: "object-center" },
  { key: "sawdust", image: sawdust, position: "object-[60%_75%]" },
  { key: "pellets", image: pellets, position: "object-center" },
  { key: "byproducts", image: logs, position: "object-center" },
];

export async function Materials() {
  const t = await getTranslations("Home.materials");

  return (
    <section
      aria-labelledby="materials-title"
      className="mx-auto mt-24 max-w-(--container-page) px-4 sm:mt-32 sm:px-8"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <h2 id="materials-title" className="text-3xl font-extrabold italic">
          {t("title")}
        </h2>
        <div>
          <p className="max-w-[46ch] text-graphite">{t("lead")}</p>
          <Link
            href="/drevni-material"
            className="mt-3 inline-block font-display font-bold font-wide text-demal underline decoration-2 underline-offset-6 hover:text-demal-deep"
          >
            {t("link")}
          </Link>
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.key} className="flex">
            <Link href="/drevni-material" className="group flex w-full flex-col bg-white">
              <div className="relative aspect-4/3 overflow-hidden bg-plate">
                <Image
                  src={item.image}
                  alt={t(`items.${item.key}.alt`)}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className={`object-cover transition-transform duration-500 group-hover:scale-[1.04] ${item.position}`}
                />
              </div>
              <div className="flex-1 px-4 py-4 sm:px-5">
                <span className="block font-display text-base font-bold font-wide group-hover:text-demal sm:text-lg">
                  {t(`items.${item.key}.name`)}
                </span>
                <span className="text-sm text-graphite">{t(`items.${item.key}.note`)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
