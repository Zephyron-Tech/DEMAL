import type { AbstractIntlMessages } from "next-intl";

// Namespaces that client components read with useTranslations. Only these go into the page's
// payload; everything else is rendered on the server. Add a namespace here when a client
// component starts using it.
const clientNamespaces = ["Shell", "Quote"];

export function clientMessages(messages: AbstractIntlMessages) {
  return Object.fromEntries(clientNamespaces.map((key) => [key, messages[key]]));
}
