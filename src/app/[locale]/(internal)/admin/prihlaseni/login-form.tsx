"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";

const initialState: LoginState = { error: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-8 grid gap-4">
      <div className="grid gap-1.5">
        <label htmlFor="password" className="font-semibold">
          Heslo
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "password-error" : undefined}
          className="w-full border border-rule border-b-2 border-b-graphite bg-white px-3 py-2.5"
        />
        {state.error ? (
          <p id="password-error" role="alert" className="text-sm font-semibold text-alert">
            {state.error}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center bg-asphalt px-6 font-display font-bold font-wide text-trailer press hover:bg-graphite disabled:opacity-60"
      >
        {pending ? "Přihlašuji…" : "Přihlásit"}
      </button>
    </form>
  );
}
