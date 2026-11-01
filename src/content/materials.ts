import type { StaticImageData } from "next/image";
import type { MaterialSlug } from "./material-slugs";
import chips from "../../public/images/foto/pine-wood-chips-at-hatfield-broad-oak.jpg";
import pellets from "../../public/images/foto/holzpellets.jpg";
import logs from "../../public/images/foto/pine-log-cross-sections-teutendorf-2016-09.jpg";
import sawdust from "../../public/images/foto/sawdust-pile-at-bbq-charcoal-factory-in.jpg";

// The wood commodities from the owner's brief, awaiting confirmation (/podklady, question 1).
// Texts live in messages under Materials.items.<key>; photographs are credited in the footer.
export type Material = {
  slug: MaterialSlug;
  key: "chips" | "sawdust" | "pellets" | "byproducts";
  image: StaticImageData;
  position: string;
};

export const materials: Material[] = [
  { slug: "stepka", key: "chips", image: chips, position: "object-center" },
  { slug: "piliny", key: "sawdust", image: sawdust, position: "object-[60%_75%]" },
  { slug: "pelety", key: "pellets", image: pellets, position: "object-center" },
  { slug: "vedlejsi-produkty", key: "byproducts", image: logs, position: "object-center" },
];

export const findMaterial = (slug: string) => materials.find((m) => m.slug === slug);
