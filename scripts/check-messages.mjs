// Every locale must carry exactly the keys of the source locale (cs), so a missing or stray key
// fails the build instead of showing up as a raw key on the site.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../messages/", import.meta.url).pathname;
const source = "cs";

const leaves = (object, prefix = "") =>
  Object.entries(object).flatMap(([key, value]) =>
    value && typeof value === "object"
      ? leaves(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );

const read = (locale) => new Set(leaves(JSON.parse(readFileSync(join(dir, `${locale}.json`), "utf8"))));
const reference = read(source);
let failed = false;

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const locale = file.replace(/\.json$/, "");
  if (locale === source) continue;
  const keys = read(locale);
  const missing = [...reference].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !reference.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`${locale}: missing ${JSON.stringify(missing)}, extra ${JSON.stringify(extra)}`);
  }
}

if (failed) process.exit(1);
console.log(`messages: ${reference.size} keys match in every locale`);
