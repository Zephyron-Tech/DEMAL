import "server-only";
import { isQuoteId } from "./quotes-store";
import { getDocument, listDocuments, putDocument } from "./store";

// Owner's answers from /podklady, one JSON document per submission in the "podklady" collection.
export type StoredAnswers = {
  id: string;
  savedAt: string;
  // Older submissions still carry the name typed into the removed "Kdo vyplňoval" field.
  name?: string;
  answers: Record<string, string>;
};

export async function getAnswers(id: string): Promise<StoredAnswers | null> {
  if (!isQuoteId(id)) return null;
  return getDocument<Omit<StoredAnswers, "id">>("podklady", id);
}

export async function listAnswers(): Promise<StoredAnswers[]> {
  const submissions = await listDocuments<Omit<StoredAnswers, "id">>("podklady");
  return submissions.sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function saveAnswers(id: string, data: Omit<StoredAnswers, "id">) {
  await putDocument("podklady", id, data);
}
