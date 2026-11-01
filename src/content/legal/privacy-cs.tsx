import { company } from "@/lib/company";

// Czech privacy notice (GDPR art. 13). Drafted from how the site actually processes data;
// retention period and contact e-mail await the owner's confirmation (docs/sitemap.md).
export const privacyUpdated = "31. 10. 2026";

export function PrivacyCs() {
  return (
    <>
      <p>
        Tady vysvětlujeme, jaké osobní údaje zpracováváme, když nám pošlete poptávku nebo nás
        kontaktujete, proč to děláme a jaká máte práva.
      </p>

      <h2>Kdo údaje zpracovává</h2>
      <p>
        Správcem osobních údajů je {company.name}, IČ {company.ico}, se sídlem {company.street},{" "}
        {company.city}. S&nbsp;dotazy k&nbsp;osobním údajům se obracejte na e-mail{" "}
        <a href={`mailto:${company.dispatch.email}`}>{company.dispatch.email}</a> nebo na adresu
        sídla.
      </p>

      <h2>Poptávkový formulář</h2>
      <p>
        Když vyplníte poptávku, zpracováváme jméno, název firmy, e-mail, telefon a&nbsp;údaje
        o&nbsp;přepravě nebo materiálu, které do formuláře napíšete.
      </p>
      <ul>
        <li>
          <strong>Účel:</strong> vyřídit poptávku, připravit cenovou nabídku a&nbsp;domluvit se
          s&nbsp;vámi na podrobnostech.
        </li>
        <li>
          <strong>Právní základ:</strong> jednání o&nbsp;uzavření smlouvy na vaši žádost (čl. 6
          odst. 1 písm. b) GDPR). Pokud poptávku posíláte za firmu, jde o&nbsp;náš oprávněný zájem
          odpovědět obchodnímu partnerovi (čl. 6 odst. 1 písm. f) GDPR).
        </li>
        <li>
          <strong>Doba uložení:</strong> po dobu vyřizování poptávky, nejdéle 12 měsíců. Pokud
          z&nbsp;poptávky vznikne zakázka, údaje uchováváme po dobu, kterou vyžadují účetní
          a&nbsp;daňové předpisy.
        </li>
      </ul>
      <p>
        Vyplnění formuláře je dobrovolné. Bez jména a&nbsp;e-mailu vám ale nemůžeme odpovědět.
      </p>

      <h2>Telefon a e-mail</h2>
      <p>
        Pokud nám zavoláte nebo napíšete, zpracováváme údaje, které nám sdělíte, stejně jako
        u&nbsp;poptávky: abychom mohli odpovědět a&nbsp;případně uzavřít smlouvu.
      </p>

      <h2>Kdo k údajům má přístup</h2>
      <p>
        K&nbsp;údajům mají přístup zaměstnanci dispečinku, kteří poptávku vyřizují. Web
        a&nbsp;úložiště poptávek provozuje Vercel Inc. na serverech v&nbsp;Evropské unii (Frankfurt
        nad Mohanem). Vercel je americká společnost; případný přenos údajů do USA je zajištěn
        rámcem EU–USA pro ochranu osobních údajů a&nbsp;standardními smluvními doložkami. Údaje
        neprodáváme a&nbsp;nepředáváme nikomu dalšímu, pokud to nevyžaduje zákon.
      </p>

      <h2>Cookies a měření návštěvnosti</h2>
      <p>
        Web pro návštěvníky nepoužívá cookies ani nástroje pro měření návštěvnosti nebo reklamu. Jedinou cookie nastavuje přihlášení do interní administrace, kterou používají jen zaměstnanci dispečinku. Pokud se to
        změní, upravíme tyto zásady a&nbsp;o&nbsp;souhlas vás požádáme předem.
      </p>

      <h2>Vaše práva</h2>
      <p>Máte právo:</p>
      <ul>
        <li>získat informaci, jaké vaše údaje zpracováváme, a&nbsp;jejich kopii,</li>
        <li>požádat o&nbsp;opravu nepřesných údajů,</li>
        <li>požádat o&nbsp;výmaz údajů, pokud už je nepotřebujeme,</li>
        <li>požádat o&nbsp;omezení zpracování,</li>
        <li>získat údaje ve strojově čitelné podobě (přenositelnost),</li>
        <li>vznést námitku proti zpracování na základě oprávněného zájmu.</li>
      </ul>
      <p>
        Stačí napsat na <a href={`mailto:${company.dispatch.email}`}>{company.dispatch.email}</a>.
        Odpovíme nejpozději do jednoho měsíce. Pokud nebudete spokojeni, můžete podat stížnost
        u&nbsp;Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170&nbsp;00 Praha 7,{" "}
        <a href="https://uoou.gov.cz">uoou.gov.cz</a>.
      </p>
      <p>Osobní údaje nepoužíváme k&nbsp;automatizovanému rozhodování ani profilování.</p>
    </>
  );
}
