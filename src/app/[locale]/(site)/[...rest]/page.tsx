import { notFound } from "next/navigation";

// Catches unknown paths inside the locale so they get the site's own 404 with header and footer.
export default function CatchAll() {
  notFound();
}
