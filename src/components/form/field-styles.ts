// The bottom rule darkens under the pointer and turns blue on focus, the outline sitting on the field.
export const fieldClass =
  "w-full border border-rule border-b-2 border-b-graphite bg-white px-3 py-2.5 transition-colors hover:border-b-asphalt focus-visible:border-b-demal focus-visible:outline-offset-0 aria-[invalid=true]:border-alert aria-[invalid=true]:border-b-alert";

// Popups share one frame: a hard asphalt border, white ground, and a fade-in on open.
export const popupClass =
  "absolute left-0 z-50 border-2 border-asphalt bg-white motion-safe:animate-field-in";
