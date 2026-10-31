// Temporary questionnaire for the owner; the page is removed once the answers are in.
export type Question = {
  id: string;
  title: string;
  ask: string;
  known?: string;
};

export const questions: Question[] = [
  {
    id: "drevo",
    title: "Obchod se dřevem",
    ask: "Které komodity skutečně nakupujete a prodáváte (štěpka, piliny, pelety, kůra, kulatina, jiné)? Odkud, v jakých objemech a komu? Prodáváte i bez vlastní dopravy?",
    known:
      "Současný web o obchodu se dřevem nemá nic. Z návrhu webu víme jen, že má být jednou ze dvou hlavních činností.",
  },
  {
    id: "flotila",
    title: "Vozový park dnes",
    ask: "Kolik máte souprav? Značky tahačů a návěsů, kolik je chladících a kolik walking floor, jaká emisní norma?",
    known:
      "14 souprav, tahače Scania a DAF s normou EURO 6, chladírenské návěsy Schmitz a Krone, walking floor Stas a Reich.",
  },
  {
    id: "relace",
    title: "Kam jezdíte",
    ask: "Je jižní Itálie pořád hlavní směr? Do kterých dalších zemí jezdíte pravidelně?",
    known: "Všechny země EU, převážně jižní Itálie; spedice hlavně ČR a Itálie.",
  },
  {
    id: "lide",
    title: "Lidé a kontakty",
    ask: "Kdo je dnes v dispečinku a koho máme na webu uvést (jméno, role, telefon, e-mail, případně fotka)? Mají všichni souhlas se zveřejněním? Kolik má firma zaměstnanců?",
    known:
      "Dispečeři Libor Písačka, Bc. Erik Písačka, Pavlína Šmitmajerová, Šimon Lopaur; 17 zaměstnanců.",
  },
  {
    id: "pojisteni",
    title: "Pojištění a certifikáty",
    ask: "U koho a s jakým limitem (a v jaké měně) jste pojištěni? Platí HACCP? Máte další certifikáty (ISO, ADR, jiné)?",
    known:
      "Pojištění dle CMR u ČPP, krytí 10 mil. (bez měny), celé EU; pojištění odpovědnosti zasílatele; HACCP.",
  },
  {
    id: "poptavky",
    title: "Kam posílat poptávky",
    ask: "Na jaký e-mail mají chodit poptávky z webu? Jeden společný, nebo zvlášť pro dopravu a pro dřevo? Chcete na webu obecnou adresu typu info@?",
    known: "Web dnes jako hlavní kontakt uvádí erik.pisacka@demal.cz a +420 606 602 570.",
  },
  {
    id: "nabor",
    title: "Hledáte řidiče?",
    ask: "Nabíráte řidiče nebo dispečery? Pokud ano, jaké podmínky můžeme zveřejnit (typ práce, relace, mzda, výhody)?",
    known: "Současný web stránku Kariéra nemá.",
  },
  {
    id: "fotky",
    title: "Fotky",
    ask: "Máte fotky vlastních souprav, nakládky, dřevního materiálu nebo areálu? Amatérské stačí, ideálně za denního světla. Kam nám je pošlete?",
    known: "Na nový web nechceme použít fotky vygenerované AI ani fotky z fotobank.",
  },
  {
    id: "logo",
    title: "Logo",
    ask: "Existuje původní logo ve vektoru (soubor SVG, AI, PDF nebo EPS)? Kdo ho navrhoval?",
    known: "Máme jen obrázek loga (PNG s bílým pozadím).",
  },
  {
    id: "jazyky",
    title: "Jazyky webu",
    ask: "Web bude nejdřív česky, potom německy a anglicky. Kdo dodá nebo zkontroluje překlady? Nemá být i italská verze, když jezdíte hlavně do Itálie?",
  },
  {
    id: "analytika",
    title: "Měření návštěvnosti",
    ask: "Chcete vidět, kolik lidí web navštěvuje a odkud přicházejí? Podle toho se rozhodne, jestli bude potřeba cookie lišta.",
  },
  {
    id: "reference",
    title: "Zákazníci a partneři",
    ask: "Můžeme na webu jmenovat některé zákazníky nebo partnery? Máte jejich souhlas?",
  },
];
