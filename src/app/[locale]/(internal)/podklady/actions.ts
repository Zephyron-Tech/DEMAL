"use server";

import { put } from "@vercel/blob";
import { questions } from "./questions";

export type SubmitState = {
  status: "idle" | "saved" | "error";
  message: string;
  savedAt?: string;
};

const MAX_ANSWER_LENGTH = 5000;

export async function submitAnswers(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  // Honeypot: real people never see or fill this field.
  if (formData.get("website")) {
    return { status: "saved", message: "Odpovědi jsou uložené." };
  }

  const answers: Record<string, string> = {};
  for (const q of questions) {
    const value = String(formData.get(q.id) ?? "").trim();
    if (value.length > MAX_ANSWER_LENGTH) {
      return {
        status: "error",
        message: `Odpověď „${q.title}“ je delší než ${MAX_ANSWER_LENGTH} znaků. Zkraťte ji, nebo ji pošlete e-mailem.`,
      };
    }
    if (value) answers[q.id] = value;
  }

  if (Object.keys(answers).length === 0) {
    return { status: "error", message: "Vyplňte alespoň jednu odpověď." };
  }

  const savedAt = new Date().toISOString();
  try {
    await put(
      `podklady/odpovedi-${savedAt.replace(/[:.]/g, "-")}.json`,
      JSON.stringify({ savedAt, answers }, null, 2),
      { access: "private", contentType: "application/json", addRandomSuffix: true },
    );
  } catch (error) {
    console.error("podklady: blob put failed", error);
    return {
      status: "error",
      message: "Odpovědi se nepodařilo odeslat. Zůstávají v prohlížeči, zkuste to za chvíli znovu.",
    };
  }

  return { status: "saved", message: "Odpovědi jsou odeslané. Děkujeme.", savedAt };
}
