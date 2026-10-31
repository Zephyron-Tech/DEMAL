"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitAnswers, type SubmitState } from "./actions";
import { questions } from "./questions";

const DRAFT_KEY = "demal-podklady-draft";
const initialState: SubmitState = { status: "idle", message: "" };

function readDraft(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function countAnswered(form: HTMLFormElement) {
  return questions.filter((q) => {
    const field = form.elements.namedItem(q.id);
    return field instanceof HTMLTextAreaElement && field.value.trim() !== "";
  }).length;
}

export function AnswersForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [answered, setAnswered] = useState(0);
  const [state, formAction, pending] = useActionState(submitAnswers, initialState);

  // Restore the unsent draft straight into the uncontrolled fields.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const draft = readDraft();
    for (const [name, value] of Object.entries(draft)) {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLTextAreaElement || field instanceof HTMLInputElement) {
        field.value = value;
      }
    }
    const count = countAnswered(form);
    if (count) setAnswered(count);
  }, []);

  function handleInput(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    setAnswered(countAnswered(form));
    const draft: Record<string, string> = {};
    for (const name of ["name", ...questions.map((q) => q.id)]) {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLTextAreaElement || field instanceof HTMLInputElement) {
        if (field.value) draft[name] = field.value;
      }
    }
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Private mode or blocked storage: the form still works, only the draft is lost.
    }
  }

  return (
    <form ref={formRef} action={formAction} onInput={handleInput} className="mt-10">
      <div
        className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y-2 border-asphalt py-3 text-sm"
        aria-live="polite"
      >
        <span>
          <strong className="font-display text-xl font-bold font-wide tabular-nums">
            {answered}
          </strong>{" "}
          z {questions.length} zodpovězeno
        </span>
        <span className="text-steel">Rozepsané odpovědi zůstávají uložené v tomto prohlížeči.</span>
      </div>

      <ol className="mt-8">
        {questions.map((q, index) => (
          <li key={q.id} className="grid gap-3 border-t border-rule py-7 sm:grid-cols-[2.5rem_1fr]">
            <span
              aria-hidden="true"
              className="font-display text-lg font-bold text-demal font-wide tabular-nums"
            >
              {index + 1}
            </span>
            <div className="grid min-w-0 gap-2">
              <label htmlFor={`q-${q.id}`} className="font-display text-xl font-bold">
                {q.title}
              </label>
              <p id={`ask-${q.id}`} className="max-w-(--container-prose)">
                {q.ask}
              </p>
              {q.known ? (
                <p id={`known-${q.id}`} className="max-w-(--container-prose) text-sm text-graphite">
                  <span className="font-semibold text-asphalt">Co víme: </span>
                  {q.known}
                </p>
              ) : null}
              <textarea
                id={`q-${q.id}`}
                name={q.id}
                rows={4}
                maxLength={5000}
                aria-describedby={q.known ? `ask-${q.id} known-${q.id}` : `ask-${q.id}`}
                className="mt-2 w-full resize-y border border-rule border-b-2 border-b-graphite bg-white px-3 py-2"
              />
            </div>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 border-t-2 border-asphalt pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="grid gap-1">
          <label htmlFor="name" className="font-semibold">
            Kdo vyplňoval
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className="w-full max-w-sm border border-rule border-b-2 border-b-graphite bg-white px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center bg-marking px-6 font-display font-bold font-wide text-asphalt transition-colors hover:bg-marking-deep disabled:opacity-60"
        >
          {pending ? "Odesílám…" : "Odeslat odpovědi"}
        </button>
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p
        role="status"
        className={
          state.status === "error"
            ? "mt-4 font-semibold text-alert"
            : "mt-4 font-semibold text-demal"
        }
      >
        {state.message}
        {state.status === "saved"
          ? " Odpovědi můžete dál upravovat a odeslat znovu, použijeme poslední verzi."
          : null}
      </p>
    </form>
  );
}
