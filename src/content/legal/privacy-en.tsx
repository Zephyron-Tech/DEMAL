import { company } from "@/lib/company";

// English privacy notice (GDPR art. 13). A translation of privacy-cs.tsx; the Czech text is the
// binding version. Retention period and contact e-mail still await the owner's confirmation.
export const privacyUpdatedEn = "31 October 2026";

export function PrivacyEn() {
  return (
    <>
      <p>
        Here we explain which personal data we process when you send us an enquiry or contact us, why we
        do it, and what rights you have.
      </p>

      <h2>Who processes the data</h2>
      <p>
        The controller of personal data is {company.name}, company ID {company.ico}, with its registered
        seat at {company.street}, {company.city}, Czech Republic. For questions about data protection,
        write to <a href={`mailto:${company.dispatch.email}`}>{company.dispatch.email}</a> or to the
        registered seat address.
      </p>

      <h2>Quote form</h2>
      <p>
        When you fill in a quote request, we process your name, company, e-mail address, phone number and
        the transport or material details you enter in the form.
      </p>
      <ul>
        <li>
          <strong>Purpose:</strong> handling the request, preparing a quote and agreeing the details with
          you.
        </li>
        <li>
          <strong>Legal basis:</strong> steps taken at your request before entering into a contract (GDPR
          art. 6(1)(b)). If you send the request on behalf of a company, our legitimate interest is to reply
          to a business partner (GDPR art. 6(1)(f)).
        </li>
        <li>
          <strong>Retention:</strong> for as long as the request is being handled, at most 12 months. If the
          request leads to an order, we keep the data for as long as accounting and tax rules require.
        </li>
      </ul>
      <p>
        Filling in the form is voluntary. Without a name and e-mail address, however, we cannot reply to you.
      </p>

      <h2>Phone and e-mail</h2>
      <p>
        If you call or write to us, we process the details you give us, in the same way as for a request: so
        that we can reply and, where needed, conclude a contract.
      </p>

      <h2>Who has access to the data</h2>
      <p>
        The dispatch staff who handle your request have access to the data. The website and the storage for
        requests are operated by Vercel Inc. on servers in the European Union (Frankfurt am Main). Vercel is a
        US company; any transfer of data to the USA is covered by the EU–US Data Privacy Framework and
        standard contractual clauses. We do not sell the data and do not pass it on unless the law requires it.
      </p>

      <h2>Cookies and visitor statistics</h2>
      <p>
        The website sets no cookies for visitors and uses no visitor statistics or advertising tools. The only
        cookie is set by the login to the internal administration, which only dispatch staff use. If this
        changes, we will update this notice and ask for your consent beforehand.
      </p>

      <h2>Your rights</h2>
      <p>You have the right:</p>
      <ul>
        <li>to obtain information on which of your data we process, and a copy of it,</li>
        <li>to ask for inaccurate data to be corrected,</li>
        <li>to ask for your data to be erased when we no longer need it,</li>
        <li>to ask for the processing to be restricted,</li>
        <li>to receive the data in a machine-readable format (data portability),</li>
        <li>to object to processing based on our legitimate interest.</li>
      </ul>
      <p>
        Simply write to <a href={`mailto:${company.dispatch.email}`}>{company.dispatch.email}</a>. We reply
        within one month at the latest. If you are not satisfied with our reply, you can complain to the Czech
        Office for Personal Data Protection (Úřad pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7,
        <a href="https://uoou.gov.cz"> uoou.gov.cz</a>).
      </p>
      <p>We do not use personal data for automated decisions or profiling.</p>
    </>
  );
}
