import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Branches } from "@/components/home/branches";
import { Fleet } from "@/components/home/fleet";
import { Hero } from "@/components/home/hero";
import { Materials } from "@/components/home/materials";
import { QuoteCta } from "@/components/home/quote-cta";
import { WhyDemal } from "@/components/home/why-demal";
import { OrganizationJsonLd } from "@/components/organization-json-ld";
import { alternatesFor } from "@/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return { title: { absolute: t("title") }, description: t("description"), alternates: await alternatesFor("/") };
}

export default function Home() {
  return (
    <main>
      <OrganizationJsonLd />
      <Hero />
      <Branches />
      <Materials />
      <Fleet />
      <WhyDemal />
      <QuoteCta />
    </main>
  );
}
