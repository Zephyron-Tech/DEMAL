import { Branches } from "@/components/home/branches";
import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <main className="pb-24">
      <Hero />
      <Branches />
    </main>
  );
}
