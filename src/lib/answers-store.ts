import "server-only";
import { get, list } from "@vercel/blob";
import { isQuoteId } from "./quotes-store";

// Owner's answers from /podklady, one private JSON blob per submission under podklady/.
const PREFIX = "podklady/";

export type StoredAnswers = {
  id: string;
  savedAt: string;
  // Older submissions still carry the name typed into the removed "Kdo vyplňoval" field.
  name?: string;
  answers: Record<string, string>;
};

const pathnameOf = (id: string) => `${PREFIX}${id}.json`;
const idOf = (pathname: string) => pathname.slice(PREFIX.length).replace(/\.json$/, "");

export async function getAnswers(id: string): Promise<StoredAnswers | null> {
  if (!isQuoteId(id)) return null;
  const blob = await get(pathnameOf(id), { access: "private", useCache: false });
  if (!blob) return null;
  const data = JSON.parse(await new Response(blob.stream).text());
  return { ...data, id };
}

export async function listAnswers(): Promise<StoredAnswers[]> {
  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    pathnames.push(...page.blobs.map((b) => b.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const submissions = await Promise.all(pathnames.map((p) => getAnswers(idOf(p))));
  return submissions
    .filter((s): s is StoredAnswers => s !== null)
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}
