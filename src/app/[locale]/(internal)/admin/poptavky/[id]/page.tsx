import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin-auth";
import { getQuote } from "@/lib/quotes-store";
import { removeQuote, toggleHandled } from "../../actions";
import { AdminBar } from "../../admin-bar";
import { formatTime, typeLabel } from "../format";

export const metadata: Metadata = {
  title: "Poptávka",
  robots: { index: false, follow: false },
};

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="min-w-0 bg-white px-4 py-3">
      <dt className="text-sm text-graphite">{label}</dt>
      <dd className="mt-0.5 font-semibold break-words whitespace-pre-line">{value}</dd>
    </div>
  );
}

async function QuoteDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const quote = await getQuote((await params).id);
  if (!quote) notFound();

  // Field names as the customer saw them on /poptavka.
  const t = await getTranslations({ locale: quote.locale, namespace: "Quote" });
  const d = quote.detail;
  const c = quote.contact;
  const kindLabel = {
    reefer: t("transport.kindReefer"),
    walking: t("transport.kindWalking"),
    other: t("transport.kindOther"),
  } as Record<string, string>;
  const value = (key: string) => (d[key] ? t(`wood.${d[key]}`) : "");

  const subject = `Poptávka ${typeLabel[quote.type].toLowerCase()} z ${formatTime(quote.receivedAt)}`;

  return (
    <>
      <p className="mt-2 text-graphite">
        {typeLabel[quote.type]}, přijato {formatTime(quote.receivedAt)}
        {quote.handledAt ? `, vyřízeno ${formatTime(quote.handledAt)}` : ""}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${c.email}?subject=${encodeURIComponent(subject)}`}
          className="inline-flex min-h-11 items-center bg-marking px-5 font-display font-bold font-wide text-asphalt press hover:bg-marking-deep"
        >
          Odpovědět e-mailem
        </a>
        {c.phone ? (
          <a
            href={`tel:${c.phone.replace(/\s/g, "")}`}
            className="inline-flex min-h-11 items-center border-2 border-asphalt px-5 font-display font-bold font-wide press hover:bg-asphalt hover:text-trailer"
          >
            Zavolat
          </a>
        ) : null}
        <form action={toggleHandled}>
          <input type="hidden" name="id" value={quote.id} />
          <input type="hidden" name="handled" value={quote.handledAt ? "0" : "1"} />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center border-2 border-asphalt px-5 font-display font-bold font-wide press hover:bg-asphalt hover:text-trailer"
          >
            {quote.handledAt ? "Vrátit mezi nevyřízené" : "Označit jako vyřízené"}
          </button>
        </form>
      </div>

      <section aria-labelledby="contact-title" className="mt-10">
        <h2 id="contact-title" className="text-xl font-bold italic">Kontakt</h2>
        <dl className="mt-3 grid gap-1 bg-plate p-1 sm:grid-cols-2">
          <Field label={t("contact.name")} value={c.name} />
          <Field label={t("contact.company")} value={c.company} />
          <Field label={t("contact.email")} value={c.email} />
          <Field label={t("contact.phone")} value={c.phone} />
        </dl>
      </section>

      <section aria-labelledby="detail-title" className="mt-10">
        <h2 id="detail-title" className="text-xl font-bold italic">{typeLabel[quote.type]}</h2>
        <dl className="mt-3 grid gap-1 bg-plate p-1 sm:grid-cols-2">
          {quote.type === "transport" ? (
            <>
              <Field label={t("transport.from")} value={d.from} />
              <Field label={t("transport.to")} value={d.to} />
              <Field label={t("transport.cargo")} value={d.cargo} />
              <Field label={t("transport.amount")} value={d.amount} />
              <Field label={t("transport.date")} value={d.date} />
              <Field label={t("transport.kind")} value={kindLabel[d.kind]} />
              <Field label={t("transport.temp")} value={d.temp} />
            </>
          ) : (
            <>
              <Field label={t("wood.direction")} value={value("direction")} />
              <Field label={t("wood.commodity")} value={value("commodity")} />
              <Field label={t("wood.amount")} value={d.amount} />
              <Field label={t("wood.place")} value={d.place} />
              <Field label={t("wood.when")} value={d.when} />
            </>
          )}
        </dl>
      </section>

      {c.note ? (
        <section aria-labelledby="note-title" className="mt-10">
          <h2 id="note-title" className="text-xl font-bold italic">{t("contact.note")}</h2>
          <p className="mt-3 max-w-(--container-prose) bg-plate px-5 py-4 whitespace-pre-line">{c.note}</p>
        </section>
      ) : null}

      <form action={removeQuote} className="mt-16 border-t border-rule pt-6">
        <input type="hidden" name="id" value={quote.id} />
        <p className="max-w-(--container-prose) text-sm text-graphite">
          Smazání je nevratné. Použijte ho pro vyřízené poptávky starší než 12&nbsp;měsíců
          (zásady ochrany osobních údajů) nebo pro spam.
        </p>
        <button
          type="submit"
          className="mt-3 font-semibold text-alert link-underline"
        >
          Smazat poptávku
        </button>
      </form>
    </>
  );
}

export default function QuotePage({ params }: PageProps<"/[locale]/admin/poptavky/[id]">) {
  return (
    <>
      <AdminBar />
      <main className="mx-auto w-full max-w-(--container-page) px-4 py-10 sm:px-8">
        <Link href="/admin/poptavky" className="font-semibold text-demal link-underline">
          Všechny poptávky
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold italic">Poptávka</h1>
        <Suspense fallback={<p className="mt-6 text-graphite">Načítám poptávku…</p>}>
          <QuoteDetail params={params} />
        </Suspense>
      </main>
    </>
  );
}
