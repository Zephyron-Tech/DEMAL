import { Branches } from "@/components/home/branches";
import { Fleet } from "@/components/home/fleet";
import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <main className="pb-24">
      <Hero />
      <Branches />
      <Fleet />
    </main>
  );
}
