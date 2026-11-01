import type { Metadata } from "next";
import { AnswersForm } from "./answers-form";

export const metadata: Metadata = {
  title: "Podklady pro nový web",
  robots: { index: false, follow: false },
};

export default function Podklady() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
      <h1 className="text-4xl font-extrabold italic">
        Podklady pro nový web DEMAL SPEDITION
      </h1>
      <AnswersForm />
    </main>
  );
}
