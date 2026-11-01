"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_DAYS,
  createSessionToken,
  passwordMatches,
} from "@/lib/admin-session";
import { deleteQuote, setHandled } from "@/lib/quotes-store";

export type LoginState = { error: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return { error: "Přihlášení není nastavené. Chybí ADMIN_PASSWORD nebo ADMIN_SESSION_SECRET." };
  }
  if (!passwordMatches(password)) {
    // A short pause makes guessing the password slow without a rate-limit store.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "Nesprávné heslo." };
  }

  (await cookies()).set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_DAYS * 24 * 60 * 60,
  });
  redirect("/admin/poptavky");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/prihlaseni");
}

export async function toggleHandled(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await setHandled(id, formData.get("handled") === "1");
  redirect(`/admin/poptavky/${id}`);
}

export async function removeQuote(formData: FormData) {
  await requireAdmin();
  await deleteQuote(String(formData.get("id") ?? ""));
  redirect("/admin/poptavky");
}
