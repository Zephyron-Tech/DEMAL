import "server-only";
import { del, get, list, put } from "@vercel/blob";

// Quotes from /poptavka, one private JSON blob each under poptavky/ (written by its Server Action).
// The admin reads, marks and deletes them here.
const PREFIX = "poptavky/";

export type StoredQuote = {
  id: string;
  receivedAt: string;
  type: "transport" | "wood";
  locale: string;
  contact: { name: string; company: string; email: string; phone: string; note: string };
  detail: Record<string, string>;
  handledAt?: string | null;
};

const pathnameOf = (id: string) => `${PREFIX}${id}.json`;
const idOf = (pathname: string) => pathname.slice(PREFIX.length).replace(/\.json$/, "");

// Ids come from blob pathnames; anything else (slashes, dots) is rejected before touching storage.
export const isQuoteId = (id: string) => /^[A-Za-z0-9_-]{8,200}$/.test(id);

export async function getQuote(id: string): Promise<StoredQuote | null> {
  if (!isQuoteId(id)) return null;
  const blob = await get(pathnameOf(id), { access: "private", useCache: false });
  if (!blob) return null;
  const data = JSON.parse(await new Response(blob.stream).text());
  return { ...data, id };
}

export async function listQuotes(): Promise<StoredQuote[]> {
  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    pathnames.push(...page.blobs.map((b) => b.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const quotes = await Promise.all(pathnames.map((p) => getQuote(idOf(p))));
  return quotes
    .filter((q): q is StoredQuote => q !== null)
    .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export async function setHandled(id: string, handled: boolean) {
  const quote = await getQuote(id);
  if (!quote) return;
  const { id: _id, ...data } = quote;
  await put(
    pathnameOf(id),
    JSON.stringify({ ...data, handledAt: handled ? new Date().toISOString() : null }, null, 2),
    { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true },
  );
}

export async function deleteQuote(id: string) {
  if (!isQuoteId(id)) return;
  await del(pathnameOf(id));
}
