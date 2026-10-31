import type { Metadata } from "next";

// Internal reference for the design tokens; removed before launch.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colors = [
  { token: "trailer", hex: "#F5F6F4", note: "pozadí" },
  { token: "plate", hex: "#EBEDEB", note: "štítek, zapuštěné plochy" },
  { token: "rule", hex: "#C9CDD0", note: "linky" },
  { token: "steel", hex: "#6B7176", note: "metadata" },
  { token: "graphite", hex: "#3F4448", note: "šedá z loga" },
  { token: "asphalt", hex: "#1E2226", note: "text, tmavé sekce" },
  { token: "demal", hex: "#0B3EA8", note: "modrá z loga" },
  { token: "marking", hex: "#E8B400", note: "jen hlavní CTA" },
];

const scale = [
  { name: "5xl", className: "text-5xl" },
  { name: "4xl", className: "text-4xl" },
  { name: "3xl", className: "text-3xl" },
  { name: "2xl", className: "text-2xl" },
  { name: "xl", className: "text-xl" },
  { name: "lg", className: "text-lg" },
];

// Facts taken from the current demalspedition.cz; to be confirmed by the owner.
const plate = [
  { label: "Vlastní soupravy", value: "14" },
  { label: "Emisní norma tahačů", value: "EURO 6" },
  { label: "Walking floor", value: "od roku 2016" },
  { label: "Hlavní relace", value: "ČR ⇄ jižní Itálie" },
  { label: "Chlazené přepravy", value: "HACCP" },
  { label: "Sledování zásilek", value: "GPS online" },
];

export default function Styleguide() {
  return (
    <main className="mx-auto w-full max-w-(--container-page) px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-extrabold italic uppercase">
        Mezinárodní doprava a&nbsp;obchod se&nbsp;dřevem
      </h1>
      <p className="mt-6 max-w-(--container-prose) text-lg text-graphite">
        Kamionová doprava po celé EU, hlavně do jižní Itálie. Přepravy
        s&nbsp;kontrolovanou teplotou a&nbsp;sypké materiály v&nbsp;návěsech
        walking floor.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="#"
          className="inline-flex min-h-12 items-center bg-marking px-6 font-display font-bold font-wide text-asphalt transition-colors hover:bg-marking-deep"
        >
          Poptat přepravu
        </a>
        <a
          href="#"
          className="inline-flex min-h-12 items-center border-2 border-demal px-6 font-display font-semibold font-wide text-demal transition-colors hover:bg-demal hover:text-trailer"
        >
          Dřevní materiál
        </a>
      </div>

      <section aria-labelledby="plate-heading" className="mt-20">
        <h2 id="plate-heading" className="text-2xl font-bold">
          Technický štítek
        </h2>
        <dl className="mt-6 grid border-2 border-asphalt bg-plate sm:grid-cols-2 lg:grid-cols-3">
          {plate.map((item) => (
            <div
              key={item.label}
              className="-mb-px -mr-px border-r border-b border-rule px-5 py-4"
            >
              <dt className="text-sm text-graphite">{item.label}</dt>
              <dd className="mt-1 font-display text-2xl font-bold italic font-wide">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-steel">
          Údaje ze současného webu, majitel je musí potvrdit.
        </p>
      </section>

      <section aria-labelledby="type-heading" className="mt-20">
        <h2 id="type-heading" className="text-2xl font-bold">
          Typografie
        </h2>
        <div className="mt-6 divide-y divide-rule border-y border-rule">
          {scale.map((step) => (
            <div key={step.name} className="flex items-baseline gap-6 py-4">
              <span className="w-10 shrink-0 text-xs text-steel">{step.name}</span>
              <span className={`font-display font-bold font-wide ${step.className}`}>
                Přeprava s&nbsp;kontrolovanou teplotou
              </span>
            </div>
          ))}
          <div className="flex items-baseline gap-6 py-4">
            <span className="w-10 shrink-0 text-xs text-steel">base</span>
            <p className="max-w-(--container-prose)">
              Chladírenské návěsy mají vlastní GPS jednotku, takže teplotu
              převáženého zboží sledujeme v&nbsp;reálném čase. Příliš žluťoučký
              kůň úpěl ďábelské ódy.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="color-heading" className="mt-20">
        <h2 id="color-heading" className="text-2xl font-bold">
          Barvy
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4">
          {colors.map((c) => (
            <li key={c.token} className="bg-trailer">
              <div className="h-20" style={{ background: c.hex }} />
              <div className="px-3 py-2">
                <p className="font-semibold">{c.token}</p>
                <p className="text-sm text-graphite">
                  {c.hex}, {c.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
