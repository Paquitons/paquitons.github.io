/* ============================================================
   CONTACT  /contact
   Every way to reach us, and the short request form, on one
   screen. The emergency route is set apart below it.
   ============================================================ */

import { html, icon } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { pageHeader, processList, emergencyPanel, requestForm } from '../components.mjs';
import { breadcrumbSchema } from '../schema.mjs';

export function contactPage(assets) {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Contact' }];

  const main = html`
${pageHeader({
    crumbs,
    title: 'Contact Iron Volt Electric',
    lead: 'Call, text, email or send a request. Estimates are free anywhere we work in Greater Houston.',
    actions: false,
    variant: 'compact',
  })}

<section class="section" aria-labelledby="methods-title">
  <div class="container split split--wide-end">
    <div>
      <h2 id="methods-title">Reach us</h2>
      <ul class="contact-methods mt-6">
        <li class="contact-method">
          ${icon('phone')}
          <h3>Call or text</h3>
          <p class="contact-method__value tnum"><a href="${site.phoneHref}">${site.phone}</a></p>
          <p>The fastest way to reach us, and the only one to use in an emergency. <a class="link-arrow" href="${site.smsHref}">Send a text ${icon('message')}</a></p>
        </li>
        <li class="contact-method">
          ${icon('mail')}
          <h3>Email</h3>
          <p class="contact-method__value contact-method__value--email"><a href="mailto:${site.email}">${site.email}</a></p>
          <p>For project details, drawings or inspection reports. We reply within one business day.</p>
        </li>
      </ul>

      <dl class="detail-list">
        <div><dt>Office hours</dt><dd>${site.hours.days}, ${site.hours.time}</dd></div>
        <div><dt>Emergency line</dt><dd>Answered 24 hours, 7 days a week</dd></div>
        <div><dt>License</dt><dd>${site.license.short} <span class="note">· licensed, bonded and insured</span></dd></div>
        <div><dt>Service area</dt><dd>Spring and Greater Houston <span class="note">· <a href="/service-area/">see the towns we cover</a></span></dd></div>
      </dl>
    </div>

    <div class="form-panel">
      <h2 class="form-panel__title" id="request-title">Send a request</h2>
      <p class="form-panel__intro">Tell us what you need and where. We’ll call you back within 24 hours to arrange a visit.</p>
      ${requestForm({ id: 'contact', headingId: 'request-title', compact: true })}
    </div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="emergency-title">
  <div class="container">
    ${emergencyPanel()}
  </div>
</section>

<section class="section" aria-labelledby="process-title">
  <div class="container">
    <header class="section-head"><h2 id="process-title">What happens after you get in touch</h2></header>
    ${processList([
      { title: 'We confirm', body: 'We check we cover the work and your address, and come back to you on timing.' },
      { title: 'A technician visits', body: 'They look at the job in person, including anything underneath it you may not have spotted.' },
      { title: 'You get the price in writing', body: 'A written estimate, on the spot, with no obligation to go ahead.' },
      { title: 'The work gets done', body: 'To code, on the agreed day, with permits where needed and our guarantee behind it.' },
    ])}
  </div>
</section>
`;

  return {
    path: '/contact',
    section: 'contact',
    title: `Contact Iron Volt Electric | Spring & Houston Electrician | ${site.phone}`,
    description: `Call or text ${site.phone}, email ${site.email}, or send a service request. Licensed electrician serving Spring and Greater Houston. Emergency line answered 24/7.`,
    schema: [breadcrumbSchema(crumbs)],
    scripts: [`<script src="${assets.form}" defer></script>`],
    main,
  };
}
