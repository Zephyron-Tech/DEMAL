// Formatting shared by the quote list and detail. Times are shown in the office's time zone.
const dateTime = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatTime = (iso: string) => dateTime.format(new Date(iso));

export const typeLabel = { transport: "Přeprava", wood: "Dřevní materiál" } as const;
