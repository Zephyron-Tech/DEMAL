import { CopyEmail } from "@/components/copy-email";
import { company } from "@/lib/company";

// German privacy notice (GDPR art. 13). A translation of privacy-cs.tsx; the Czech text is the
// binding version. Retention period and contact e-mail still await the owner's confirmation.
export const privacyUpdatedDe = "1.11.2026";

export function PrivacyDe() {
  return (
    <>
      <p>
        Hier erklären wir, welche personenbezogenen Daten wir verarbeiten, wenn Sie uns eine Anfrage
        schicken oder uns kontaktieren, warum wir das tun und welche Rechte Sie haben.
      </p>

      <h2>Wer die Daten verarbeitet</h2>
      <p>
        Verantwortlicher für die personenbezogenen Daten ist die {company.name}, IČ {company.ico}, mit
        Sitz in {company.street}, {company.city}. Fragen zum Datenschutz richten Sie bitte an die
        E-Mail-Adresse <CopyEmail email={company.dispatch.email} variant="inline" /> oder an
        die Anschrift des Sitzes.
      </p>

      <h2>Anfrageformular</h2>
      <p>
        Wenn Sie eine Anfrage ausfüllen, verarbeiten wir Ihren Namen, Ihre Firma, E-Mail-Adresse,
        Telefonnummer und die Angaben zu Transport oder Material, die Sie ins Formular eintragen.
      </p>
      <ul>
        <li>
          <strong>Zweck:</strong> Bearbeitung der Anfrage, Erstellung eines Angebots und Abstimmung der
          Einzelheiten mit Ihnen.
        </li>
        <li>
          <strong>Rechtsgrundlage:</strong> Vorbereitung eines Vertragsabschlusses auf Ihre Anfrage
          (Art. 6 Abs. 1 lit. b DSGVO). Schicken Sie die Anfrage im Namen einer Firma, ist es unser
          berechtigtes Interesse, einem Geschäftspartner zu antworten (Art. 6 Abs. 1 lit. f DSGVO).
        </li>
        <li>
          <strong>Speicherdauer:</strong> für die Dauer der Bearbeitung der Anfrage, höchstens 12 Monate.
          Entsteht aus der Anfrage ein Auftrag, bewahren wir die Daten für die Dauer auf, die Buchhaltungs-
          und Steuervorschriften verlangen.
        </li>
      </ul>
      <p>
        Das Ausfüllen des Formulars ist freiwillig. Ohne Namen und E-Mail-Adresse können wir Ihnen aber
        nicht antworten.
      </p>

      <h2>Telefon und E-Mail</h2>
      <p>
        Wenn Sie uns anrufen oder schreiben, verarbeiten wir die Angaben, die Sie uns mitteilen, wie
        bei einer Anfrage: damit wir antworten und gegebenenfalls einen Vertrag schließen können.
      </p>

      <h2>Wer Zugriff auf die Daten hat</h2>
      <p>
        Auf die Daten haben die Mitarbeiter der Disposition Zugriff, die Ihre Anfrage bearbeiten. Die
        Website und den Speicher für Anfragen betreiben wir auf einem eigenen Server.
        Wir verkaufen Daten nicht und geben sie nicht weiter, sofern es das Gesetz nicht verlangt.
      </p>

      <h2>Cookies und Besucherstatistik</h2>
      <p>
        Die Besuche der Website messen wir nicht und setzen keine Analysewerkzeuge ein. Ein Cookie setzt nur die Anmeldung in die interne Verwaltung, die ausschließlich die Mitarbeiter der Disposition nutzen.
      </p>

      <h2>Ihre Rechte</h2>
      <p>Sie haben das Recht:</p>
      <ul>
        <li>Auskunft darüber zu erhalten, welche Ihrer Daten wir verarbeiten, und eine Kopie davon,</li>
        <li>die Berichtigung unrichtiger Daten zu verlangen,</li>
        <li>die Löschung Ihrer Daten zu verlangen, wenn wir sie nicht mehr benötigen,</li>
        <li>die Einschränkung der Verarbeitung zu verlangen,</li>
        <li>die Daten in einem maschinenlesbaren Format zu erhalten (Datenübertragbarkeit),</li>
        <li>der Verarbeitung auf Grundlage des berechtigten Interesses zu widersprechen.</li>
      </ul>
      <p>
        Schreiben Sie einfach an <CopyEmail email={company.dispatch.email} variant="inline" />.
        Wir antworten spätestens innerhalb eines Monats. Sind Sie mit unserer Antwort nicht zufrieden,
        können Sie Beschwerde beim tschechischen Amt für den Schutz personenbezogener Daten (Úřad pro
        ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, <a href="https://uoou.gov.cz">uoou.gov.cz</a>)
        einreichen.
      </p>
      <p>Personenbezogene Daten verwenden wir nicht für automatisierte Entscheidungen oder Profiling.</p>
    </>
  );
}
