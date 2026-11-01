import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { company } from "@/lib/company";
import { QuoteForm, QuoteFormFromUrl } from "./quote-form";
import { alternatesFor } from "@/i18n/alternates";
import { CopyEmail } from "@/components/copy-email";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Quote");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: await alternatesFor("/poptavka"),
  };
}

export default async function QuotePage() {
  const t = await getTranslations("Quote");

  return (
    <main className="mx-auto grid w-full max-w-(--container-page) grid-cols-[minmax(0,1fr)] gap-12 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        <h1 className="text-4xl font-extrabold italic uppercase">{t("title")}</h1>
        <p className="mt-4 max-w-(--container-prose) text-lg text-graphite">{t("lead")}</p>
        <div className="mt-10">
          {/* Prerendered with the transport variant; ?typ=drevo switches it once the URL is known. */}
          <Suspense fallback={<QuoteForm initialType="transport" />}>
            <QuoteFormFromUrl />
          </Suspense>
        </div>
      </div>

      <aside className="lg:pt-24">
        <div className="border-2 border-asphalt bg-plate p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl font-bold italic">{t("asideTitle")}</h2>
          <p className="mt-3 text-sm text-graphite">{t("asideText")}</p>
          <a
            href={company.dispatch.phoneHref}
            className="mt-1 block font-display text-xl font-bold font-wide whitespace-nowrap tabular-nums link-reveal"
          >
            {company.dispatch.phone}
          </a>
          <CopyEmail email={company.dispatch.email} className="mt-3 block max-w-full" />
        </div>
      </aside>
    </main>
  );
}
