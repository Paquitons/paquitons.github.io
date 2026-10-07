/* ============================================================
   CONTACT  /contact
   The one page for getting in touch: the request form, with the
   phone, email and hours beside it. /booking used to be a second
   page with the same form; it now redirects to #request here.

   The free estimate policy sits under the form, at #estimate-policy,
   so it is on the page where people ask for estimates and has an
   address to link to. Its wording is the company's policy: edit it
   here and nowhere else.
   ============================================================ */

import { html, icon } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { pageHeader, requestForm } from '../components.mjs';
import { breadcrumbSchema } from '../schema.mjs';

export function contactPage(assets) {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Contact' }];

  const main = html`
${pageHeader({
    crumbs,
    title: 'Contact us',
    lead: 'Call or text for the quickest answer, or send a request and we’ll call you back within 24 hours to arrange a visit.',
    actions: false,
    variant: 'compact',
  })}

<section class="section" aria-label="Contact and service request">
  <div class="container booking-layout">
    <div class="form-panel" id="request">
      <h2 class="form-panel__title" id="request-title">Request service</h2>
      ${requestForm({ id: 'contact', headingId: 'request-title' })}
    </div>

    <aside class="booking-layout__aside contact-aside" aria-label="Other ways to reach us">
      <div class="contact-aside__block">
        <h2 class="contact-aside__title">Call or text</h2>
        <a class="button button--primary button--block button--lg tnum" href="${site.phoneHref}">${icon('phone')}${site.phone}</a>
        <p class="contact-aside__note">For an emergency, call rather than use the form. The line is answered 24/7.</p>
        <dl class="detail-list detail-list--stacked">
          <div><dt>Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
          <div><dt>Office hours</dt><dd>${site.hours.days}, ${site.hours.time}</dd></div>
          <div><dt>Service area</dt><dd>Greater Houston · <a href="/service-area/">towns we cover</a></dd></div>
        </dl>
      </div>
      <div class="contact-aside__block">
        <h2 class="contact-aside__title">What happens next</h2>
        <ol class="next-steps">
          <li><span><strong>We call you back</strong> to confirm the address and agree a time.</span></li>
          <li><span><strong>A technician visits</strong> and looks at the job in person.</span></li>
          <li><span><strong>You get the price in writing</strong> before any work starts, with no obligation to go ahead.</span></li>
        </ol>
      </div>
    </aside>
  </div>
</section>

${estimatePolicy()}
`;

  return {
    path: '/contact',
    section: 'contact',
    title: 'Contact & Request Service | Iron Volt Electric',
    description: `Call or text ${site.phone}, email ${site.email}, or request service online. Licensed electrician serving Greater Houston. Written estimates before any work starts.`,
    schema: [breadcrumbSchema(crumbs)],
    scripts: [`<script src="${assets.form}" defer></script>`],
    main,
  };
}

/* ------------------------------------------------------------
   FREE ESTIMATE POLICY
   Two columns, so the line between a complimentary estimate and a
   paid professional evaluation is the first thing anybody sees,
   then the terms that apply to the second.
   ------------------------------------------------------------ */
const PAID_EVALUATION_PURPOSES = [
  'Real estate inspection corrections or repair negotiations',
  'Property sale or purchase transactions',
  'Failed city, county, utility or other required inspections',
  'Code compliance corrections or deficiency lists',
  'Insurance claims, reimbursements or settlements',
  'Repair credits, allowances or negotiations between buyers, sellers, landlords, tenants, contractors or other third parties',
  'Written documentation, itemized correction pricing, reports, photographs or evaluations intended for submission to another party',
];

function estimatePolicy() {
  return html`<section class="section section--alt" id="estimate-policy" aria-labelledby="estimate-policy-title">
  <div class="container">
    <header class="section-head section-head--split">
      <h2 id="estimate-policy-title">Free estimate policy</h2>
      <p class="section-head__aside">Complimentary estimates may be available for standard electrical work and installation requests. Pricing, inspections or paperwork that another party will rely on is a different kind of job, and it starts with a professional evaluation.</p>
    </header>

    <div class="policy">
      <div class="policy__col">
        <p class="policy__label">Complimentary estimate may be available</p>
        <h3 class="policy__title">Standard electrical work and installations</h3>
        <p>Installations, upgrades and other electrical work you want done at your home or business. A technician looks at the job in person and gives you a written price before any work starts, with no obligation to go ahead.</p>
        <a class="link-arrow" href="#request">Request service ${icon('arrow')}</a>
      </div>
      <div class="policy__col">
        <p class="policy__label policy__label--paid">Professional evaluation required</p>
        <h3 class="policy__title">Pricing or paperwork for another party</h3>
        <p>Complimentary estimates do not apply to estimates, evaluations, inspections or written pricing requested for:</p>
        <ul class="rule-list policy__list">
          ${PAID_EVALUATION_PURPOSES.map((item) => html`<li>${item}</li>`)}
        </ul>
      </div>
    </div>

    <ul class="policy__terms" role="list">
      <li>
        <h3>Fees</h3>
        <p>These requests require a professional evaluation and may be subject to an estimate, service call, inspection, troubleshooting or documentation fee, depending on the scope of work.</p>
      </li>
      <li>
        <h3>Approved first</h3>
        <p>Any applicable fee will be communicated and approved before the evaluation or service is performed.</p>
      </li>
      <li>
        <h3>Who decides</h3>
        <p>${site.legalName} reserves the right to determine whether a request qualifies for a complimentary estimate or requires a paid professional evaluation.</p>
      </li>
    </ul>
  </div>
</section>`;
}
