import "server-only";
import { deleteDocument, getDocument, listDocuments, putDocument } from "./store";

// Quotes from /poptavka, one JSON document each in the "poptavky" collection (written by its Server Action).
// The admin reads, marks and deletes them here.
export type StoredQuote = {
  id: string;
  receivedAt: string;
  type: "transport" | "wood";
  locale: string;
  contact: { name: string; company: string; email: string; phone: string; note: string };
  detail: Record<string, string>;
  handledAt?: string | null;
};

// Ids reach the URL and the database; anything else (slashes, dots) is rejected before touching storage.
export const isQuoteId = (id: string) => /^[A-Za-z0-9_-]{8,200}$/.test(id);

export async function getQuote(id: string): Promise<StoredQuote | null> {
  if (!isQuoteId(id)) return null;
  return getDocument<Omit<StoredQuote, "id">>("poptavky", id);
}

export async function listQuotes(): Promise<StoredQuote[]> {
  const quotes = await listDocuments<Omit<StoredQuote, "id">>("poptavky");
  return quotes.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export async function saveQuote(id: string, quote: Omit<StoredQuote, "id">) {
  await putDocument("poptavky", id, quote);
}

export async function setHandled(id: string, handled: boolean) {
  const quote = await getQuote(id);
  if (!quote) return;
  const data: Partial<StoredQuote> = { ...quote };
  delete data.id;
  await putDocument("poptavky", id, { ...data, handledAt: handled ? new Date().toISOString() : null });
}

export async function deleteQuote(id: string) {
  if (!isQuoteId(id)) return;
  await deleteDocument("poptavky", id);
}
