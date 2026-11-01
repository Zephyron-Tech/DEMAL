import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ADMIN_COOKIE, isValidSessionToken } from "./admin-session";

// Second line of defence behind src/proxy.ts: every admin page and action checks the session itself.
export async function requireAdmin() {
  // Request-time only: the expiry check reads the clock.
  await connection();
  const store = await cookies();
  if (!isValidSessionToken(store.get(ADMIN_COOKIE)?.value)) redirect("/admin/prihlaseni");
}
