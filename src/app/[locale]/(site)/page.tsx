import { Branches } from "@/components/home/branches";
import { Fleet } from "@/components/home/fleet";
import { Hero } from "@/components/home/hero";
import { QuoteCta } from "@/components/home/quote-cta";
import { WhyDemal } from "@/components/home/why-demal";
import { OrganizationJsonLd } from "@/components/organization-json-ld";

export default function Home() {
  return (
    <main>
      <OrganizationJsonLd />
      <Hero />
      <Branches />
      <Fleet />
      <WhyDemal />
      <QuoteCta />
    </main>
  );
}
