import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { materialSlugs } from "./content/material-slugs";
import { routing } from "./i18n/routing";
import { ADMIN_COOKIE, isValidSessionToken } from "./lib/admin-session";

const intl = createMiddleware(routing);
const knownMaterials = new Set<string>(materialSlugs);

export default function proxy(request: NextRequest) {
  // Admin pages need a valid session; the login page itself stays open.
  const { pathname } = request.nextUrl;
  // Administration is Czech only: /de/admin and /en/admin go to the Czech path.
  const adminPath = pathname.match(/^\/(?:(cs|de|en)\/)?admin(\/.*)?$/);
  if (adminPath) {
    const [, prefix, rest = ""] = adminPath;
    if (prefix === "de" || prefix === "en") {
      return NextResponse.redirect(new URL(`/admin${rest}`, request.url));
    }
    if (!rest.startsWith("/prihlaseni") && !isValidSessionToken(request.cookies.get(ADMIN_COOKIE)?.value)) {
      return NextResponse.redirect(new URL("/admin/prihlaseni", request.url));
    }
  }

  // Internal pages exist in Czech only: their German and English paths go to the Czech one.
  const internal = pathname.match(/^\/(?:de|en)\/(podklady|styleguide)(\/.*)?$/);
  if (internal) {
    return NextResponse.redirect(new URL(`/${internal[1]}${internal[2] ?? ""}`, request.url));
  }

  // With cacheComponents a page cannot reject unknown params itself (no dynamicParams), and
  // notFound() there would answer 200. Unknown commodities are sent to a path with no route,
  // which Next.js answers with app/global-not-found.tsx and a 404 status; the URL stays.
  // The commodity folder keeps its Czech name internally; each locale's path is mapped to it.
  const material = pathname.match(/^\/(?:(cs|de|en)\/)?(?:drevni-material|holzmaterial|wood-materials)\/([^/]+)\/?$/);
  if (material && !knownMaterials.has(material[2])) {
    const locale = material[1] ?? "cs";
    return NextResponse.rewrite(new URL(`/${locale}/drevni-material/${material[2]}/-`, request.url));
  }
  return intl(request);
}

export const config = {
  // Skip API, Next internals, Vercel internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
