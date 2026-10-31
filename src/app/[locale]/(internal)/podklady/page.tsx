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
      <p className="mt-6 max-w-(--container-prose) text-lg text-graphite">
        Připravujeme nový web demalspedition.cz. Aby na něm byla jen pravdivá a
        aktuální fakta, potřebujeme od vás odpovědi na pár otázek. U&nbsp;každé
        je napsané, co víme ze současného webu. Odpovídejte jen tam, kde něco
        víte, stačí stručně a&nbsp;vlastními slovy. Až budete hotovi, klikněte
        dole na Odeslat odpovědi.
      </p>
      <p className="mt-4 max-w-(--container-prose) text-graphite">
        Fotky a&nbsp;logo sem nahrát nejde. Pošlete je prosím e-mailem nebo přes
        úložiště (Google Drive, Úschovna) a&nbsp;do odpovědi napište, kam jste
        je dali.
      </p>
      <AnswersForm />
    </main>
  );
}
