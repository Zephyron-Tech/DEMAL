"use server";

import { put } from "@vercel/blob";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { routing } from "@/i18n/routing";
import { company } from "@/lib/company";

export type QuoteType = "transport" | "wood";

export type QuoteState = {
  status: "idle" | "error" | "saved";
  message: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
};

// Issue messages are translation keys under Quote.errors.
const required = (max: number) => z.string().trim().min(1, "required").max(max, "tooLong");
const optional = (max: number) => z.string().trim().max(max, "tooLong");

const contactSchema = z.object({
  name: required(200),
  company: optional(200),
  email: z.string().trim().min(1, "required").max(200, "tooLong").pipe(z.email("email")),
  phone: optional(50),
  note: optional(3000),
});

const transportSchema = z.object({
  from: required(200),
  to: required(200),
  date: optional(60),
  kind: z.enum(["reefer", "walking", "other"]),
  temp: optional(100),
  cargo: required(300),
  amount: optional(100),
});

const woodSchema = z.object({
  direction: z.enum(["buy", "sell"]),
  commodity: z.enum(["chips", "sawdust", "pellets", "byproducts", "other"]),
  amount: required(100),
  place: optional(200),
  when: optional(200),
});

const fieldNames = {
  transport: Object.keys(transportSchema.shape),
  wood: Object.keys(woodSchema.shape),
};

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const localeValue = String(formData.get("locale") ?? "");
  const locale = hasLocale(routing.locales, localeValue) ? localeValue : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Quote.errors" });

  const type: QuoteType = formData.get("type") === "wood" ? "wood" : "transport";
  const names = ["type", ...Object.keys(contactSchema.shape), ...fieldNames[type]];
  const values = Object.fromEntries(names.map((name) => [name, String(formData.get(name) ?? "")]));
  values.type = type;

  // Honeypot: bots fill every field, people never see this one.
  if (formData.get("website")) return { status: "saved", message: "" };

  const contact = contactSchema.safeParse(values);
  const detail = (type === "wood" ? woodSchema : transportSchema).safeParse(values);

  if (!contact.success || !detail.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of [...(contact.error?.issues ?? []), ...(detail.error?.issues ?? [])]) {
      const field = String(issue.path[0]);
      const key = ["required", "email", "tooLong"].includes(issue.message) ? issue.message : "required";
      fieldErrors[field] ??= t(key);
    }
    return { status: "error", message: t("form"), fieldErrors, values };
  }

  const receivedAt = new Date().toISOString();
  try {
    await put(
      `poptavky/${receivedAt.replace(/[:.]/g, "-")}-${type}.json`,
      JSON.stringify({ receivedAt, type, locale, contact: contact.data, detail: detail.data }, null, 2),
      { access: "private", contentType: "application/json", addRandomSuffix: true },
    );
  } catch (error) {
    console.error("poptavka: blob put failed", error);
    return {
      status: "error",
      message: t("server", { phone: company.dispatch.phone }),
      values,
    };
  }

  return { status: "saved", message: "" };
}
