import Link from "next/link";
import { logout } from "./actions";

// Plain top bar for the internal pages: no site navigation, just where you are and a way out.
export function AdminBar() {
  return (
    <header className="bg-asphalt text-trailer focus-on-dark">
      <div className="mx-auto flex max-w-(--container-page) flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link href="/admin/poptavky" className="font-display font-bold font-wide link-reveal">
          DEMAL administrace
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/admin/poptavky" className="link-reveal">
            Poptávky
          </Link>
          <Link href="/admin/podklady" className="link-reveal">
            Podklady
          </Link>
          <Link href="/" className="link-reveal">
            Web
          </Link>
          <form action={logout}>
            <button type="submit" className="link-reveal">
              Odhlásit
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
