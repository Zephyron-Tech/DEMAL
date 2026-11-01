"use client";

import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";
import { DateField } from "@/components/form/date-field";
import { Listbox } from "@/components/form/listbox";
import { fieldClass as inputClass } from "@/components/form/field-styles";
import { submitQuote, type QuoteState, type QuoteType } from "./actions";

const initialState: QuoteState = { status: "idle", message: "" };

type FieldProps = {
  name: string;
  label: string;
  hint?: string;
  optionalLabel?: string;
  error?: string;
  children: (props: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
  }) => React.ReactNode;
  className?: string;
};

function Field({ name, label, hint, optionalLabel, error, children, className = "" }: FieldProps) {
  const id = `f-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ");
  return (
    <div className={`grid content-start gap-1.5 ${className}`}>
      <label id={`${id}-label`} htmlFor={id} className="font-semibold">
        {label}
        {optionalLabel ? <span className="font-normal text-steel"> ({optionalLabel})</span> : null}
      </label>
      {hint ? (
        <span id={`${id}-hint`} className="text-sm text-graphite">
          {hint}
        </span>
      ) : null}
      {children({
        id,
        name,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy || undefined,
      })}
      {error ? (
        <span id={`${id}-error`} className="text-sm font-semibold text-alert motion-safe:animate-field-in">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function Choice({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="press flex min-h-12 cursor-pointer items-center gap-3 border-2 border-asphalt bg-white px-4 not-has-checked:hover:bg-plate has-checked:bg-asphalt has-checked:text-trailer has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-demal">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span aria-hidden="true" className="size-3 rounded-pill border-2 border-current p-0.5">
        <span
          className={`block size-full rounded-pill bg-current transition-transform duration-(--duration-ui) ease-out ${checked ? "scale-100" : "scale-0"}`}
        />
      </span>
      <span className="font-display font-bold font-wide">{label}</span>
    </label>
  );
}

// Reads ?typ=drevo (links from the wood pages); render inside <Suspense>.
export function QuoteFormFromUrl() {
  const searchParams = useSearchParams();
  return <QuoteForm initialType={searchParams.get("typ") === "drevo" ? "wood" : "transport"} />;
}

export function QuoteForm({ initialType }: { initialType: QuoteType }) {
  const t = useTranslations("Quote");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  // `type` is the chosen variant, `shown` the one on the page. The page swaps them after a short
  // fade-out, so the old fields leave before the new ones rise in.
  const [type, setType] = useState<QuoteType>(initialType);
  const [shown, setShown] = useState<QuoteType>(initialType);
  const [leaving, setLeaving] = useState(false);
  const [kind, setKind] = useState(state.values?.kind ?? "reefer");
  const [sentAgain, setSentAgain] = useState(0);
  // Fields that appear in answer to a choice slide in; on the first render they are simply there.
  const [answered, setAnswered] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the first invalid field so keyboard and screen-reader users land on the problem.
  useEffect(() => {
    if (state.status !== "error") return;
    const invalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]");
    invalid?.focus();
  }, [state]);

  // The submit button is gone once the enquiry is saved, and the confirmation is gone after
  // "send another": in both cases focus would fall back to the page, so it moves to what replaced it.
  useEffect(() => {
    if (state.status === "saved" && sentAgain === 0) successRef.current?.focus();
    if (sentAgain > 0) formRef.current?.querySelector<HTMLElement>("input[type=radio]:checked")?.focus();
  }, [state, sentAgain]);

  const appear = answered ? "motion-safe:animate-field-in" : "";

  function switchType(next: QuoteType) {
    if (next === type) return;
    setType(next);
    setAnswered(true);
    setLeaving(true);
    window.setTimeout(() => {
      setShown(next);
      setLeaving(false);
    }, 160);
  }

  const dateLabels = {
    choose: t("date.choose"),
    prev: t("date.prev"),
    next: t("date.next"),
    clear: t("date.clear"),
    today: t("date.today"),
  };
  const fade = leaving ? "pointer-events-none opacity-0" : "opacity-100";

  const v = (name: string) => state.values?.[name] ?? "";
  const err = (name: string) => state.fieldErrors?.[name];
  const opt = t("contact.optional");

  if (state.status === "saved" && sentAgain === 0) {
    return (
      <div role="status" className="border-2 border-asphalt bg-white p-6 motion-safe:animate-field-in sm:p-8">
        <h2 ref={successRef} tabIndex={-1} className="text-2xl font-bold italic outline-none">
          {t("success.title")}
        </h2>
        <p className="mt-3 max-w-(--container-prose)">
          {t("success.text", { phone: company.dispatch.phone })}
        </p>
        <button
          type="button"
          onClick={() => setSentAgain((n) => n + 1)}
          className="press mt-6 inline-flex min-h-12 items-center border-2 border-asphalt px-6 font-display font-bold font-wide hover:bg-asphalt hover:text-trailer"
        >
          {t("success.again")}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={(formData) => {
        setSentAgain(0);
        formAction(formData);
      }}
      noValidate
      className="grid gap-10"
    >
      <input type="hidden" name="locale" value={locale} />

      <fieldset>
        <legend className="mb-3 font-semibold">{t("typeLegend")}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <Choice
            name="type"
            value="transport"
            label={t("typeTransport")}
            checked={type === "transport"}
            onChange={() => switchType("transport")}
          />
          <Choice
            name="type"
            value="wood"
            label={t("typeWood")}
            checked={type === "wood"}
            onChange={() => switchType("wood")}
          />
        </div>
      </fieldset>

      {shown === "transport" ? (
        <fieldset
          key="transport"
          className={`grid gap-6 border-t-2 border-asphalt pt-6 transition-opacity duration-160 ease-in sm:grid-cols-2 ${fade} ${appear}`}
        >
          <legend className="sr-only">{t("transport.legend")}</legend>
          <Field name="from" label={t("transport.from")} hint={t("transport.fromHint")} error={err("from")}>
            {(p) => <input {...p} defaultValue={v("from")} autoComplete="off" required className={inputClass} />}
          </Field>
          <Field name="to" label={t("transport.to")} hint={t("transport.fromHint")} error={err("to")}>
            {(p) => <input {...p} defaultValue={v("to")} autoComplete="off" required className={inputClass} />}
          </Field>
          <Field name="cargo" label={t("transport.cargo")} error={err("cargo")}>
            {(p) => <input {...p} defaultValue={v("cargo")} autoComplete="off" required className={inputClass} />}
          </Field>
          <Field
            name="amount"
            label={t("transport.amount")}
            hint={t("transport.amountHint")}
            optionalLabel={opt}
            error={err("amount")}
          >
            {(p) => <input {...p} defaultValue={v("amount")} autoComplete="off" className={inputClass} />}
          </Field>
          <Field name="date" label={t("transport.date")} optionalLabel={opt} error={err("date")}>
            {(p) => <DateField {...p} locale={locale} labels={dateLabels} defaultValue={v("date")} />}
          </Field>
          <Field name="kind" label={t("transport.kind")} error={err("kind")}>
            {(p) => (
              <Listbox
                {...p}
                defaultValue={kind}
                options={[
                  { value: "reefer", label: t("transport.kindReefer") },
                  { value: "walking", label: t("transport.kindWalking") },
                  { value: "other", label: t("transport.kindOther") },
                ]}
                onChange={(next) => {
                  setKind(next);
                  setAnswered(true);
                }}
              />
            )}
          </Field>
          {kind === "reefer" ? (
            <Field
              name="temp"
              label={t("transport.temp")}
              hint={t("transport.tempHint")}
              optionalLabel={opt}
              error={err("temp")}
              className={appear}
            >
              {(p) => <input {...p} defaultValue={v("temp")} autoComplete="off" className={inputClass} />}
            </Field>
          ) : null}
        </fieldset>
      ) : (
        <fieldset
          key="wood"
          className={`grid gap-6 border-t-2 border-asphalt pt-6 transition-opacity duration-160 ease-in sm:grid-cols-2 ${fade} ${appear}`}
        >
          <legend className="sr-only">{t("wood.legend")}</legend>
          <Field name="direction" label={t("wood.direction")} error={err("direction")}>
            {(p) => (
              <Listbox
                {...p}
                defaultValue={v("direction") || "buy"}
                options={[
                  { value: "buy", label: t("wood.buy") },
                  { value: "sell", label: t("wood.sell") },
                ]}
              />
            )}
          </Field>
          <Field name="commodity" label={t("wood.commodity")} error={err("commodity")}>
            {(p) => (
              <Listbox
                {...p}
                defaultValue={v("commodity") || "chips"}
                options={[
                  { value: "chips", label: t("wood.chips") },
                  { value: "sawdust", label: t("wood.sawdust") },
                  { value: "pellets", label: t("wood.pellets") },
                  { value: "byproducts", label: t("wood.byproducts") },
                  { value: "other", label: t("wood.other") },
                ]}
              />
            )}
          </Field>
          <Field name="amount" label={t("wood.amount")} hint={t("wood.amountHint")} error={err("amount")}>
            {(p) => <input {...p} defaultValue={v("amount")} autoComplete="off" required className={inputClass} />}
          </Field>
          <Field name="place" label={t("wood.place")} optionalLabel={opt} error={err("place")}>
            {(p) => <input {...p} defaultValue={v("place")} autoComplete="off" className={inputClass} />}
          </Field>
          <Field name="when" label={t("wood.when")} optionalLabel={opt} error={err("when")} className="sm:col-span-2">
            {(p) => <input {...p} defaultValue={v("when")} autoComplete="off" className={inputClass} />}
          </Field>
        </fieldset>
      )}

      <fieldset className="grid gap-6 border-t-2 border-asphalt pt-6 sm:grid-cols-2">
        <legend className="float-left mb-2 w-full pt-0 font-display text-xl font-bold italic font-wide sm:col-span-2">
          {t("contact.legend")}
        </legend>
        <Field name="name" label={t("contact.name")} error={err("name")}>
          {(p) => <input {...p} defaultValue={v("name")} autoComplete="name" required className={inputClass} />}
        </Field>
        <Field name="company" label={t("contact.company")} optionalLabel={opt} error={err("company")}>
          {(p) => <input {...p} defaultValue={v("company")} autoComplete="organization" className={inputClass} />}
        </Field>
        <Field name="email" label={t("contact.email")} error={err("email")}>
          {(p) => (
            <input
              {...p}
              type="email"
              defaultValue={v("email")}
              autoComplete="email"
              spellCheck={false}
              required
              className={inputClass}
            />
          )}
        </Field>
        <Field name="phone" label={t("contact.phone")} optionalLabel={opt} error={err("phone")}>
          {(p) => <input {...p} type="tel" defaultValue={v("phone")} autoComplete="tel" className={inputClass} />}
        </Field>
        <Field name="note" label={t("contact.note")} optionalLabel={opt} error={err("note")} className="sm:col-span-2">
          {(p) => <textarea {...p} rows={4} defaultValue={v("note")} className={`${inputClass} resize-y`} />}
        </Field>
      </fieldset>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 border-t-2 border-asphalt pt-6">
        {state.status === "error" ? (
          <p role="alert" className="font-semibold text-alert motion-safe:animate-field-in">
            {state.message}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-12 items-center bg-marking px-6 font-display font-bold font-wide text-asphalt press hover:bg-marking-deep disabled:cursor-progress disabled:opacity-60"
          >
            {pending ? t("submitting") : t("submit")}
          </button>
          <p className="text-sm text-graphite">
            {t("privacy")}{" "}
            <Link href="/ochrana-osobnich-udaju" className="link-underline">
              {t("privacyLink")}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
