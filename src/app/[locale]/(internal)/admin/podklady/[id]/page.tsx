import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAnswers } from "@/lib/answers-store";
import { requireAdmin } from "@/lib/admin-auth";
import { AdminBar } from "../../admin-bar";
import { formatTime } from "../../poptavky/format";
import { questions } from "../../../podklady/questions";

export const metadata: Metadata = {
  title: "Odpovědi na podklady",
  robots: { index: false, follow: false },
};

async function AnswerDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const submission = await getAnswers((await params).id);
  if (!submission) notFound();

  return (
    <>
      <p className="mt-2 text-graphite">Odesláno {formatTime(submission.savedAt)}</p>
      {submission.name ? (
        <p className="mt-1 text-graphite">Uvedené jméno: {submission.name}</p>
      ) : null}

      <ol className="mt-8">
        {questions.map((q, index) => (
          <li key={q.id} className="grid gap-2 border-t border-rule py-6 sm:grid-cols-[2.5rem_1fr]">
            <span
              aria-hidden="true"
              className="font-display text-lg font-bold text-demal font-wide tabular-nums"
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-xl font-bold">{q.title}</h2>
              {submission.answers[q.id] ? (
                <p className="mt-2 max-w-(--container-prose) whitespace-pre-line">
                  {submission.answers[q.id]}
                </p>
              ) : (
                <p className="mt-2 text-steel">Bez odpovědi.</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

export default function PodkladyDetailPage({ params }: PageProps<"/[locale]/admin/podklady/[id]">) {
  return (
    <>
      <AdminBar />
      <main className="mx-auto w-full max-w-(--container-page) px-4 py-10 sm:px-8">
        <Link href="/admin/podklady" className="font-semibold text-demal link-underline">
          Všechna odeslání
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold italic">Odpovědi na podklady</h1>
        <Suspense fallback={<p className="mt-6 text-graphite">Načítám odpovědi…</p>}>
          <AnswerDetail params={params} />
        </Suspense>
      </main>
    </>
  );
}
