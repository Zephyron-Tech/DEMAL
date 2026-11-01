import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import { listQuotes } from "@/lib/quotes-store";
import { AdminBar } from "../admin-bar";
import { formatTime, typeLabel } from "./format";

export const metadata: Metadata = {
  title: "Poptávky",
  robots: { index: false, follow: false },
};

async function QuoteList() {
  await requireAdmin();
  const quotes = await listQuotes();
  const open = quotes.filter((q) => !q.handledAt).length;

  if (quotes.length === 0) {
    return (
      <p className="mt-8 bg-plate px-6 py-8 text-lg">
        Zatím nepřišla žádná poptávka. Jakmile ji někdo odešle z&nbsp;webu, objeví se tady.
      </p>
    );
  }

  return (
    <>
      <p className="mt-3 text-graphite">
        Celkem {quotes.length}, nevyřízených {open}.
      </p>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-asphalt text-sm text-graphite">
              <th scope="col" className="py-2 pr-4 font-normal">Přijato</th>
              <th scope="col" className="py-2 pr-4 font-normal">Typ</th>
              <th scope="col" className="py-2 pr-4 font-normal">Kdo</th>
              <th scope="col" className="py-2 pr-4 font-normal">Co</th>
              <th scope="col" className="py-2 font-normal">Stav</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => {
              const what =
                q.type === "transport"
                  ? `${q.detail.from} → ${q.detail.to}`
                  : `${q.detail.commodity}, ${q.detail.amount}`;
              return (
                <tr
                  key={q.id}
                  className={`border-b border-rule align-top ${q.handledAt ? "text-steel" : ""}`}
                >
                  <td className="py-3 pr-4 whitespace-nowrap tabular-nums">
                    <Link href={`/admin/poptavky/${q.id}`} className="font-semibold link-underline">
                      {formatTime(q.receivedAt)}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">{typeLabel[q.type]}</td>
                  <td className="py-3 pr-4">
                    {q.contact.name}
                    {q.contact.company ? (
                      <span className="block text-sm text-graphite">{q.contact.company}</span>
                    ) : null}
                  </td>
                  <td className="py-3 pr-4">{what}</td>
                  <td className="py-3">
                    {q.handledAt ? (
                      "vyřízeno"
                    ) : (
                      <span className="bg-marking px-2 py-0.5 font-semibold text-asphalt">nová</span>
                    )}
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

export default function QuotesPage() {
  return (
    <>
      <AdminBar />
      <main className="mx-auto w-full max-w-(--container-page) px-4 py-10 sm:px-8">
        <h1 className="text-3xl font-extrabold italic">Poptávky</h1>
        <Suspense fallback={<p className="mt-8 text-graphite">Načítám poptávky…</p>}>
          <QuoteList />
        </Suspense>
      </main>
    </>
  );
}
