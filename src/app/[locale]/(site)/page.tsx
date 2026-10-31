import { Branches } from "@/components/home/branches";
import { Fleet } from "@/components/home/fleet";
import { Hero } from "@/components/home/hero";
import { WhyDemal } from "@/components/home/why-demal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Branches />
      <Fleet />
      <WhyDemal />
    </main>
  );
}
