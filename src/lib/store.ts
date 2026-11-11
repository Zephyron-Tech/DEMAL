import "server-only";
import { randomBytes } from "node:crypto";
import postgres from "postgres";

// Small JSON documents (quotes from /poptavka, answers from /podklady) in one Postgres table.
// Gust gives the project's database as DATABASE_URL. The table is created on first use.
export type Collection = "poptavky" | "podklady";

let client: ReturnType<typeof postgres> | undefined;
let ready: Promise<unknown> | undefined;

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  client ??= postgres(url, { max: 5, idle_timeout: 20, onnotice: () => {} });
  ready ??= client`
    create table if not exists documents (
      collection text not null,
      id text not null,
      body jsonb not null,
      created_at timestamptz not null default now(),
      primary key (collection, id)
    )
  `.catch((error) => {
    ready = undefined; // try again on the next call
    throw error;
  });
  return client;
}

async function db() {
  const c = sql();
  await ready;
  return c;
}

// ISO timestamp, a label and a random suffix: sortable, unique, and safe as an id in a URL.
export const newId = (at: Date, label: string) =>
  `${at.toISOString().replace(/[:.]/g, "-")}-${label}-${randomBytes(4).toString("hex")}`;

export async function getDocument<T extends object>(collection: Collection, id: string): Promise<(T & { id: string }) | null> {
  const c = await db();
  const [row] = await c<{ body: T }[]>`select body from documents where collection = ${collection} and id = ${id}`;
  return row ? { ...row.body, id } : null;
}

export async function listDocuments<T extends object>(collection: Collection): Promise<(T & { id: string })[]> {
  const c = await db();
  const rows = await c<{ id: string; body: T }[]>`
    select id, body from documents where collection = ${collection} order by created_at desc
  `;
  return rows.map((row) => ({ ...row.body, id: row.id }));
}

export async function putDocument(collection: Collection, id: string, body: object) {
  const c = await db();
  await c`
    insert into documents (collection, id, body) values (${collection}, ${id}, ${c.json(body as never)})
    on conflict (collection, id) do update set body = excluded.body
  `;
}

export async function deleteDocument(collection: Collection, id: string) {
  const c = await db();
  await c`delete from documents where collection = ${collection} and id = ${id}`;
}
