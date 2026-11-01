import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ViewTransition } from "react";
import { materials } from "@/content/materials";
import { Link } from "@/i18n/navigation";

type Props = {
  // Leave out the material whose page is showing the list.
  exclude?: string;
  // Heading level of the tile names, so the list fits the page's outline.
  headingLevel?: "h2" | "h3";
};

// Photo tiles for the wood commodities; each opens its own page.
export async function MaterialTiles({ exclude, headingLevel = "h3" }: Props) {
  const t = await getTranslations("Materials");
  const Heading = headingLevel;
  const shown = materials.filter((m) => m.slug !== exclude);

  return (
    <ul
      className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${shown.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
    >
      {shown.map((item) => (
        <li key={item.slug} className="flex">
          <Link
            href={{ pathname: "/drevni-material/[slug]", params: { slug: item.slug } }}
            className="group flex w-full flex-row bg-white sm:flex-col transition-[background-color,color] duration-500 ease-(--ease-out) motion-reduce:transition-none hover:bg-asphalt hover:text-trailer"
          >
            {/* Same name as the photo at the top of the material's page: it travels there. */}
            <ViewTransition name={`material-${item.slug}`} share="material-photo" default="none">
              <div className="relative aspect-square w-28 shrink-0 overflow-hidden bg-plate sm:aspect-4/3 sm:w-auto">
                <Image
                  src={item.image}
                  alt={t(`items.${item.key}.alt`)}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 112px"
                  className={`object-cover transition-transform duration-700 ease-soft motion-safe:group-hover:scale-[1.04] ${item.position}`}
                />
              </div>
            </ViewTransition>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-3 sm:items-start sm:px-5 sm:py-4">
              <div className="min-w-0">
                <Heading className="break-words font-display text-base font-bold not-italic font-wide sm:text-lg">
                  {t(`items.${item.key}.name`)}
                </Heading>
                <p className="text-sm break-words hyphens-auto text-graphite transition-colors duration-500 ease-(--ease-out) group-hover:text-rule">
                  {t(`items.${item.key}.note`)}
                </p>
              </div>
              {/* The square marks the whole tile as a way in; it turns yellow on hover.
                  On phones the tile is a row, so there is room for it beside the text. */}
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center sm:self-end bg-asphalt text-trailer transition-[background-color,color] duration-500 ease-(--ease-out) group-hover:bg-marking group-hover:text-asphalt"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="size-4 transition-transform duration-(--duration-ui) ease-out motion-safe:group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
