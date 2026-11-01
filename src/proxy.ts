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
  const adminPath = pathname.match(/^\/(?:cs\/)?admin(\/.*)?$/);
  if (adminPath && !(adminPath[1] ?? "").startsWith("/prihlaseni")) {
    if (!isValidSessionToken(request.cookies.get(ADMIN_COOKIE)?.value)) {
      return NextResponse.redirect(new URL("/admin/prihlaseni", request.url));
    }
  }

  // With cacheComponents a page cannot reject unknown params itself (no dynamicParams), and
  // notFound() there would answer 200. Unknown commodities are sent to a path with no route,
  // which Next.js answers with app/global-not-found.tsx and a 404 status; the URL stays.
  const material = pathname.match(/^\/(?:cs\/)?drevni-material\/([^/]+)\/?$/);
  if (material && !knownMaterials.has(material[1])) {
    return NextResponse.rewrite(new URL(`/cs/drevni-material/${material[1]}/-`, request.url));
  }
  return intl(request);
}

export const config = {
  // Skip API, Next internals, Vercel internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
