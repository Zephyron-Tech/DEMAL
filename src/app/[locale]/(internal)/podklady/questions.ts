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
    ask: "Komodity teda jenom štěpka, piliny, pelety, pelety, vedlejší produkty? Klidně detaily - odkud, v jakých objemech a komu? Co napsat na ty podstránky?",
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
    ask: "Kdo je dnes v dispečinku a koho máme na webu uvést (jméno, role, telefon, e-mail, případně fotka)? Kolik má firma zaměstnanců?",
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
    ask: "Na jaký e-mail mají chodit poptávky z webu?",
    known: "Web dnes jako hlavní kontakt uvádí erik.pisacka@demal.cz a +420 606 602 570.",
  },
  {
    id: "jednatel",
    title: "Jednatel pro Impressum",
    ask: "Jak se jmenuje jednatel (Geschäftsführer), který firmu navenek zastupuje? Potřebujeme ho do Impressum v češtině, němčině a angličtině, v němčině je to povinný údaj. Stačí jméno a příjmení.",
    known: "Impressum na webu zatím chybí; na stránce je dočasný zástupný text.",
  },
  {
    id: "drevo-dvakrat",
    title: "Dřevo na úvodní stránce dvakrát",
    ask: "Na úvodní stránce se dřevo objevuje ve dvou sekcích: v části „Kamionová doprava a dřevní materiál“ (dvě velké karty pod hero) a v části „Co přepravujeme a obchodujeme“ (dlaždice se štěpkou, pilinami, pelety a vedlejšími produkty). Má zůstat v obou, nebo jen v jedné? A pokud v jedné, které?",
  },
  {
    id: "nabor",
    title: "Hledáte řidiče?",
    ask: "Nabíráte řidiče nebo dispečery? Pokud ano, jaké podmínky můžeme zveřejnit (typ práce, relace, mzda, výhody)? Link na inzerát co máš napsanej",
    known: "Současný web stránku Kariéra nemá.",
  },
  {
    id: "fotky",
    title: "Fotky",
    ask: "Vlastní fotky souprav, areálu atd. Ideálně link na úschovnu.",
    known: "Na nový web nechceme použít fotky vygenerované AI ani fotky z fotobank.",
  },
  {
    id: "logo",
    title: "Logo",
    ask: "Existuje původní logo ve vektoru (soubor SVG, AI, PDF nebo EPS)? Zase link na úschovnu.",
    known: "Máme jen obrázek loga (PNG s bílým pozadím).",
  },
  {
    id: "jazyky",
    title: "Jazyky webu",
    ask: "Web bude nejdřív česky, potom německy a anglicky. To stačí asi, ne?",
  },
  {
    id: "analytika",
    title: "Měření návštěvnosti",
    ask: "Chcete vidět, kolik lidí web navštěvuje a odkud přicházejí? Vyplň prostě \"ANO\", je to jen pro mě, abych na to nezapomněl.",
  },
  {
    id: "reference",
    title: "Zákazníci a partneři",
    ask: "Můžem na webu jmenovat některé zákazníky nebo partnery? Nějaký co se vrací atd.",
  },
];
