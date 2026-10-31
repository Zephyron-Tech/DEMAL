# Sitemapa a obsah – návrh

Stav: struktura odsouhlasená 31. 10. 2026 (doprava jako jedna stránka, samostatná `/poptavka`, kariéra jen pokud firma nabírá); obsah čeká na odpovědi majitele. Zdroje: současný web demalspedition.cz (prošlý celý přes `wp-sitemap.xml`), ARES, návrh od majitele (`docs/reference/ai_preview.png`, jen hrubě).

## Co víme jistě

Ze současného webu (stránky Domů, O nás, Vozový park, Kontakt) a z ARES:

| Fakt | Zdroj | Pozn. |
| --- | --- | --- |
| DEMAL SPEDITION s.r.o., IČ 28158041, Všemyslice 54, 375 01 Všemyslice | ARES, web | vznik 19. 7. 2012 |
| Mezinárodní kamionová doprava a zasílatelství, všechny země EU, převážně jižní Itálie | web | |
| Přepravy s kontrolovanou teplotou, HACCP | web | |
| Walking floor (volně ložené zboží) od roku 2016 | web | |
| 14 vlastních souprav, tahače EURO 6 | web | web z roku 2018, ověřit |
| Tahače Scania a DAF; chladírenské návěsy Schmitz a Krone; walking floor Stas a Reich | web | ověřit |
| GPS a online sledování ve všech vozidlech; chladírenské návěsy mají vlastní GPS jednotku s průběhem teplot | web | |
| Pojištění dle CMR u ČPP, krytí 10 mil. (měna neuvedena), celé EU; pojištění odpovědnosti zasílatele | web | ověřit aktuálnost |
| 17 zaměstnanců | web | ověřit |
| Spedice: vytěžování vozidel smluvních partnerů hlavně ČR a Itálie, hlavně zboží pod teplotou | web | |
| Dispečeři: Libor Písačka, Bc. Erik Písačka, Pavlína Šmitmajerová, Šimon Lopaur (telefony a e-maily na webu) | web | ověřit aktuálnost a souhlas se zveřejněním |
| Obor činnosti v ARES zahrnuje i zprostředkování velkoobchodu (NACE 461) | ARES | sedí na obchod se dřevem |

Co je na starém webu **nepoužitelné**: všech 6 podstránek služeb (`/sluzby/*`) je anglický demo obsah šablony Transcargo, stejně jako „testimonials“, většina „staff“ (Christian Brown, Sultan Malik Oglu) a kategorie `contract-logistics`/`ocean-freight`. Dva články na blogu jsou převzaté zprávy, ne vlastní obsah.

Co **nevíme vůbec**: celý obchod se dřevem (co přesně, odkud, v jakém množství, komu, jak se objednává). Návrh od majitele ho uvádí jako hlavní věc, ale na současném webu není ani zmínka.

## Navrhovaná struktura

Hlavní navigace: **Doprava · Dřevní materiál · Vozový park · O nás · Kontakt** + tlačítko **Poptat přepravu**. Přepínač jazyka připravit, ale skrýt, dokud nebude DE/EN obsah.

| URL | Stránka | Účel | Obsah máme? |
| --- | --- | --- | --- |
| `/` | Domů | Během pár vteřin: co vozíme, odkud kam, jak poptat. Rozcestník na obě větve. | ano (doprava), ne (dřevo) |
| `/doprava` | Kamionová doprava | Jedna silná stránka: relace ČR ⇄ Itálie a EU, chlazené přepravy, walking floor, spedice, sledování, pojištění. Kotvy na jednotlivé části. | částečně |
| `/drevni-material` | Dřevní materiál | Co nabízíme (štěpka, piliny, pelety, vedlejší produkty – **jen co majitel potvrdí**), pro koho, jak se objednává, napojení na naši dopravu. | **ne** |
| `/vozovy-park` | Vozový park | Technický štítek celé flotily, typy návěsů a k čemu se hodí, fotky skutečných souprav. | částečně, chybí fotky |
| `/o-nas` | O nás | Rodinná firma ze Všemyslic od 2012, lidé, pojištění a HACCP, krátce historie. | částečně |
| `/kontakt` | Kontakt | Dispečink (lidé, telefony), sídlo, mapa, fakturační údaje. | ano, ověřit |
| `/poptavka` | Poptávka | Formulář se dvěma variantami: přeprava / dřevní materiál. Cíl všech CTA. | – |
| `/ochrana-osobnich-udaju` | Zásady ochrany osobních údajů | GDPR, včetně formuláře. | text nutno napsat |
| `/cookies` | Cookies | Zatím není potřeba: web nenastavuje žádné cookies (ověřeno 31. 10. 2026). Vznikne jen s analytikou. | – |

**Podstránky jednotlivých služeb** (`/doprava/chlazene-prepravy`, `/doprava/walking-floor` …) ani **komodit** (`/drevni-material/stepka` …) zatím nedělat. Bez vlastního obsahu by to byly tenké stránky. Přidáme je, až bude co na ně napsat (a kvůli SEO dávají smysl hlavně pro dřevo).

**Kariéra / Hledáme řidiče** (`/kariera`): u dopravní firmy obvykle nejnavštěvovanější stránka. Zařadit, pokud firma nabírá; odkaz v patičce, ne v hlavní navigaci.

## Přesměrování ze starého webu (301)

Next.js odstraní koncové lomítko sám (`/o-nas/` → `/o-nas`), zbytek do `next.config.ts` → `redirects`:

| Staré URL | Nové |
| --- | --- |
| `/o-nas/`, `/vozovy-park/`, `/kontakt/` | stejné bez lomítka |
| `/sluzby/:slug*` | `/doprava` |
| `/gdpr/`, `/smazani-osobnich-dat-gdpr/`, `/ochrana-osobnich-udaju/` | `/ochrana-osobnich-udaju` |
| `/zasady-pouzivani-cokies/` | `/ochrana-osobnich-udaju` (sekce o cookies) |
| `/blog/`, `/unie-chce-zezelenit-kamiony/`, `/vznikla-prvni-elektrodalnice/`, `/kategorie/:slug*`, `/testimonials/:slug*`, `/staff/:slug*`, `/zkusebni-stranka/` | `/` |
| `/wp-content/:path*`, `/wp-admin`, `/wp-login.php`, `/xmlrpc.php` | 410 / 404 (nepřesměrovávat) |

## Otázky pro majitele

1. **Dřevo:** Které komodity firma skutečně prodává/nakupuje (štěpka, piliny, pelety, kůra, kulatina…)? Odkud, v jakých objemech, komu (teplárny, pily, výrobci pelet)? Prodává se i bez dopravy?
2. **Flotila dnes:** Počet souprav, značky tahačů a návěsů, kolik chladících a kolik walking floor, norma EURO.
3. **Relace:** Je jižní Itálie pořád hlavní směr? Jaké další země pravidelně?
4. **Lidé:** Aktuální dispečink, kdo zveřejnit, souhlas se zveřejněním jmen, telefonů a fotek. Počet zaměstnanců.
5. **Pojištění a certifikáty:** Aktuální pojistitel a limit (v jaké měně), HACCP platí? Jiné certifikáty (ISO, ADR)?
6. **Kontakt pro poptávky:** Kam mají chodit poptávky z formuláře (jeden e-mail, nebo podle typu: doprava / dřevo)? Obecný e-mail typu info@?
7. **Nábor:** Hledáte řidiče? Podmínky, které lze zveřejnit?
8. **Fotky:** Fotky vlastních souprav, nakládky, dřevního materiálu, sídla. Amatérské stačí, ideálně v dobrém světle a bez lidí v záběru (nebo se souhlasem).
9. **Logo:** Existuje původní vektorové logo (SVG, AI, PDF, EPS)?
10. **Jazyky:** Pro DE a EN – kdo dodá nebo schválí překlady? Jsou zákazníci hlavně z Itálie (nemá být i italština)?
11. **Analytika:** Chcete měřit návštěvnost? (Rozhoduje o cookie liště.)
12. **Reference:** Můžeme jmenovat některé zákazníky nebo partnery?
