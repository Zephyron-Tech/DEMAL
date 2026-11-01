import Image from "next/image";
import { getTranslations } from "next-intl/server";
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
      className={`grid grid-cols-2 gap-3 ${shown.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
    >
      {shown.map((item) => (
        <li key={item.slug} className="flex">
          <Link
            href={{ pathname: "/drevni-material/[slug]", params: { slug: item.slug } }}
            className="group flex w-full flex-col bg-white transition-colors hover:bg-asphalt hover:text-trailer"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-plate">
              <Image
                src={item.image}
                alt={t(`items.${item.key}.alt`)}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-[1.05] ${item.position}`}
              />
            </div>
            <div className="flex flex-1 items-end justify-between gap-3 px-4 py-4 sm:px-5">
              <div>
                <Heading className="font-display text-base font-bold not-italic font-wide sm:text-lg">
                  {t(`items.${item.key}.name`)}
                </Heading>
                <p className="text-sm text-graphite group-hover:text-rule">
                  {t(`items.${item.key}.note`)}
                </p>
              </div>
              {/* The square marks the whole tile as a way in; it turns yellow on hover. */}
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center bg-asphalt text-trailer transition-colors group-hover:bg-marking group-hover:text-asphalt"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
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
