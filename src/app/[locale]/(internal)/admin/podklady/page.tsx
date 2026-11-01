import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { listAnswers } from "@/lib/answers-store";
import { requireAdmin } from "@/lib/admin-auth";
import { AdminBar } from "../admin-bar";
import { formatTime } from "../poptavky/format";
import { questions } from "../../podklady/questions";

export const metadata: Metadata = {
  title: "Podklady",
  robots: { index: false, follow: false },
};

async function AnswerList() {
  await requireAdmin();
  const submissions = await listAnswers();

  if (submissions.length === 0) {
    return (
      <p className="mt-8 bg-plate px-6 py-8 text-lg">
        Zatím nepřišla žádná odpověď na podklady. Jakmile je odešlete na{" "}
        <span className="whitespace-nowrap">/podklady</span>, objeví se tady.
      </p>
    );
  }

  return (
    <>
      <p className="mt-3 text-graphite">Celkem odeslání: {submissions.length}.</p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-asphalt text-sm text-graphite">
              <th scope="col" className="py-2 pr-4 font-normal">Odesláno</th>
              <th scope="col" className="py-2 font-normal">Zodpovězeno</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => {
              const answered = questions.filter((q) => s.answers[q.id]).length;
              return (
                <tr key={s.id} className="border-b border-rule align-top">
                  <td className="py-3 pr-4 whitespace-nowrap tabular-nums">
                    <Link href={`/admin/podklady/${s.id}`} className="font-semibold link-underline">
                      {formatTime(s.savedAt)}
                    </Link>
                  </td>
                  <td className="py-3 tabular-nums">
                    {answered} z {questions.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function PodkladyPage() {
  return (
    <>
      <AdminBar />
      <main className="mx-auto w-full max-w-(--container-page) px-4 py-10 sm:px-8">
        <h1 className="text-3xl font-extrabold italic">Podklady</h1>
        <Suspense fallback={<p className="mt-8 text-graphite">Načítám odpovědi…</p>}>
          <AnswerList />
        </Suspense>
      </main>
    </>
  );
}
