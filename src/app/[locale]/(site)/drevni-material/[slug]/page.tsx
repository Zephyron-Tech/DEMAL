import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MaterialTiles } from "@/components/material-tiles";
import { PendingNotice } from "@/components/pending-notice";
import { findMaterial, materials } from "@/content/materials";
import { Link } from "@/i18n/navigation";

// One page per commodity. Skeleton with a short general description until the owner
// supplies parameters and prices; kept out of search until then.
// Unknown slugs never reach this page: src/proxy.ts answers them with a real 404.
export function generateStaticParams() {
  return materials.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/drevni-material/[slug]">): Promise<Metadata> {
  const material = findMaterial((await params).slug);
  if (!material) return {};
  const t = await getTranslations("Materials");
  return {
    title: t(`items.${material.key}.name`),
    description: t(`items.${material.key}.description`),
    robots: { index: false, follow: true },
  };
}

export default async function MaterialPage({ params }: PageProps<"/[locale]/drevni-material/[slug]">) {
  const material = findMaterial((await params).slug);
  if (!material) notFound();
  const t = await getTranslations("Materials");
  const name = t(`items.${material.key}.name`);

  return (
    <main className="pb-24">
      <div className="relative h-[34svh] min-h-56 w-full bg-plate sm:h-[42svh]">
        <Image
          src={material.image}
          alt={t(`items.${material.key}.alt`)}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className={`object-cover ${material.position}`}
        />
      </div>

      <div className="mx-auto max-w-(--container-page) px-4 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/drevni-material"
          className="font-semibold text-demal underline underline-offset-4 hover:text-demal-deep"
        >
          {t("backLink")}
        </Link>
        <h1 className="mt-4 text-4xl font-extrabold italic uppercase">{name}</h1>
        <p className="mt-2 font-display text-lg font-bold font-wide text-graphite">
          {t(`items.${material.key}.note`)}
        </p>
        <p className="mt-6 max-w-(--container-prose) text-lg">
          {t(`items.${material.key}.description`)}
        </p>

        <div className="mt-12">
          <PendingNotice
            ctaLabel={t("ctaItem", { name: t(`items.${material.key}.ctaName`) })}
          />
        </div>

        <section aria-labelledby="other-title" className="mt-20">
          <h2 id="other-title" className="text-2xl font-bold italic">
            {t("otherTitle")}
          </h2>
          <div className="mt-6">
            <MaterialTiles exclude={material.slug} />
          </div>
        </section>
      </div>
    </main>
  );
}
