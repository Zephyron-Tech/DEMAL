import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MaterialTiles } from "@/components/material-tiles";
import { PendingNotice } from "@/components/pending-notice";

// Skeleton until the owner describes the wood trade (/podklady, question 1); kept out of search.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Materials");
  return {
    title: t("title"),
    description: t("metaDescription"),
    robots: { index: false, follow: true },
  };
}

export default async function WoodPage() {
  const t = await getTranslations("Materials");

  return (
    <main className="mx-auto w-full max-w-(--container-page) px-4 pt-12 pb-24 sm:px-8 sm:pt-16">
      <h1 className="text-4xl font-extrabold italic uppercase">{t("title")}</h1>
      <p className="mt-4 max-w-(--container-prose) text-lg text-graphite">{t("lead")}</p>

      <section aria-labelledby="list-title" className="mt-14">
        <h2 id="list-title" className="text-2xl font-bold italic">
          {t("listTitle")}
        </h2>
        <div className="mt-6">
          <MaterialTiles />
        </div>
      </section>

      <div className="mt-16">
        <PendingNotice />
      </div>
    </main>
  );
}
