import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PrivacyCs, privacyUpdated } from "@/content/legal/privacy-cs";
import { PrivacyDe, privacyUpdatedDe } from "@/content/legal/privacy-de";
import { PrivacyEn, privacyUpdatedEn } from "@/content/legal/privacy-en";
import { alternatesFor } from "@/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Privacy");
  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: await alternatesFor("/ochrana-osobnich-udaju"),
  };
}

// The Czech notice is the binding version; the DE and EN texts are translations of it.
export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");
  const locale = await getLocale();
  const { Body, date } =
    locale === "de"
      ? { Body: PrivacyDe, date: privacyUpdatedDe }
      : locale === "en"
        ? { Body: PrivacyEn, date: privacyUpdatedEn }
        : { Body: PrivacyCs, date: privacyUpdated };

  return (
    <main className="mx-auto w-full max-w-(--container-page) px-4 py-12 sm:px-8 sm:py-16">
      <h1 className="text-4xl font-extrabold italic uppercase">{t("title")}</h1>
      <p className="mt-3 text-sm text-graphite">{t("updated", { date })}</p>
      <div className="mt-10 max-w-(--container-prose) border-t-2 border-asphalt pt-8 [&_a]:font-semibold [&_a]:text-demal [&_a]:link-underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:italic [&_li]:mt-2 [&_p]:mt-4 [&>p:first-child]:mt-0 [&_strong]:font-semibold [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        <Body />
      </div>
    </main>
  );
}
