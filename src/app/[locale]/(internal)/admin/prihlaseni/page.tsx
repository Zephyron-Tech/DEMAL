import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Přihlášení do administrace",
  robots: { index: false, follow: false },
};

export default function AdminLogin() {
  return (
    <main className="mx-auto w-full max-w-sm px-4 py-20">
      <p className="font-display font-bold font-wide text-demal">DEMAL SPEDITION</p>
      <h1 className="mt-2 text-3xl font-extrabold italic">Administrace</h1>
      <p className="mt-3 text-graphite">Přehled poptávek z&nbsp;webu pro dispečink.</p>
      <LoginForm />
    </main>
  );
}
