# DEMAL SPEDITION – design

Směr **„Ložný list“**. Web mluví jazykem, který firma používá každý den: přepravní doklady (CMR), polep návěsů, technický štítek soupravy. Žádná šablona „logistické firmy“. Tokeny jsou v [`src/app/globals.css`](src/app/globals.css).

## Pro koho a k čemu

- **Kdo:** nákupčí a dispečeři firem, které potřebují odvézt zboží (hlavně ČR ⇄ Itálie, chlazené zboží, sypké materiály), a odběratelé dřevní hmoty (teplárny, pily, výrobci pelet).
- **Hlavní úkol webu:** během pár vteřin ukázat, co firma vozí a odkud kam, a dovést k poptávce (telefon, e-mail, formulář).
- **Dvě větve:** Doprava a Dřevní materiál. Rovnocenné v navigaci, doprava je historicky hlavní.

## Barvy

| Token | Hex | Použití |
| --- | --- | --- |
| `trailer` | `#F5F6F4` | pozadí stránky, studená bílá návěsu (ne krémová) |
| `plate` | `#EBEDEB` | zapuštěné plochy, technický štítek |
| `rule` | `#C9CDD0` | linky, mřížka štítku |
| `steel` | `#6B7176` | jen metadata, 4,56 : 1 |
| `graphite` | `#3F4448` | šedá z loga, sekundární text |
| `asphalt` | `#1E2226` | hlavní text, tmavé sekce |
| `demal` | `#0B3EA8` | modrá z loga: odkazy, značkové plochy |
| `marking` | `#E8B400` | žlutá vodorovného značení, **jen hlavní CTA**, vždy s textem `asphalt` |

Pravidla: žlutá max. jednou na obrazovku. Modrá je značka, ne dekorace. Žádné gradienty.

## Písmo

- **Archivo** (variabilní, osa šířky 62–125, kurzíva) pro nadpisy. Nadpisy na šířce 125 %, výrazné nadpisy kurzívou. Odkazuje na široké skloněné písmo v logu. Velká písmena jen tam, kde to dává smysl (krátký hlavní nadpis), ne u štítků.
- **Public Sans** pro text. Neutrální, dobře čitelná, plná podpora češtiny (`latin-ext`).
- Archivo je self-hostované v `src/fonts/` jen v šířce 125 % a se znaky, které web používá (latinka, čeština, němčina; 71 KB). Nový znak v nadpisu je potřeba přidat do podmnožiny, postup je v `src/app/fonts.ts`.
- Stupnice velká tercie (1,25) na 16 px, text 17 px, nadpisy plynulé (`clamp`). Měrka textu ≤ 68 znaků.

## Rozvržení

- Zarovnání vlevo, mřížka 12 sloupců, max. šířka 80 rem.
- Ostré rohy. Zaoblení je výjimka (pilulka jen pro přepínač jazyka apod.).
- **Technický štítek** (spec plate) je hlavní vlastní prvek: mřížka polí s popiskem a hodnotou jako na výrobním štítku vozidla. Jen ověřená fakta.
- Fotky přes celou šířku, reálné. Raději méně a dobře oříznuté.

## Co nedělat

- Vymyšlená čísla (zákazníci, tuny) – jen to, co firma potvrdí.
- Mřížka stejných karet s ikonou, nadpisem a odstavcem.
- Velký nadpis s jedním barevně zvýrazněným slovem; malé VERZÁLKOVÉ štítky nad každým nadpisem.
- Animace „fade-up“ u každé sekce. Pohyb jen jednou (načtení hero) nebo jako reakce na akci.
- Šipka `→` za každým odkazem.

## Pohyb

Jediný orchestrovaný moment při načtení hero. Respektovat `prefers-reduced-motion` (řešeno globálně).

## Přístupnost

WCAG 2.2 AA: kontrast ≥ 4,5 : 1 (ověřeno výpočtem v tabulce), viditelný fokus (3 px modrá), skip-link, sémantické nadpisy, cílové plochy ≥ 44 px. Test: `pnpm test:e2e` (axe).

## Česká typografie

Nezlomitelné mezery po jednopísmenných předložkách a spojkách (v, k, s, z, a, i, o, u), mezi číslem a jednotkou, v telefonu. Uvozovky „takto“. Pomlčka – s mezerami.
