/* ============================================================
   CONTACT  /contact
   The one page for getting in touch: the request form, with the
   phone, email and hours beside it. /booking used to be a second
   page with the same form; it now redirects to #request here.
   ============================================================ */

import { html, icon } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { pageHeader, processList, requestForm } from '../components.mjs';
import { breadcrumbSchema } from '../schema.mjs';

export function contactPage(assets) {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Contact' }];

  const main = html`
${pageHeader({
    crumbs,
    title: 'Contact us',
    lead: 'Call or text for the quickest answer, or send a request and we’ll call you back within 24 hours to arrange a visit. Estimates are free.',
    actions: false,
    variant: 'compact',
  })}

<section class="section" aria-label="Contact and service request">
  <div class="container booking-layout">
    <div class="form-panel" id="request">
      <h2 class="form-panel__title" id="request-title">Request service</h2>
      <p class="form-panel__intro">Tell us what you need and where. Fields marked <span aria-hidden="true">*</span><span class="visually-hidden">as required</span> are all we need to call you back.</p>
      ${requestForm({ id: 'contact', headingId: 'request-title' })}
    </div>

    <aside class="booking-layout__aside" aria-label="Other ways to reach us">
      <div class="aside-panel">
        <h2>Call or text</h2>
        <a class="button button--primary button--block button--lg tnum" href="${site.phoneHref}">${icon('phone')}${site.phone}</a>
        <p class="note mt-4">For an emergency, call rather than use the form. The line is answered 24/7. <a href="${site.smsHref}">Send a text</a> for anything else.</p>
        <dl class="detail-list detail-list--stacked">
          <div><dt>Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
          <div><dt>Office</dt><dd>${site.hours.days}, ${site.hours.time}</dd></div>
          <div><dt>Area</dt><dd>Spring and Greater Houston. <a href="/service-area/">Towns we cover</a></dd></div>
        </dl>
      </div>
      <div class="aside-panel">
        <h2>What happens next</h2>
        ${processList([
          { title: 'We call you back', body: 'We confirm we cover the work and your address, and agree a time.' },
          { title: 'A technician visits', body: 'They look at the job in person.' },
          { title: 'You get the price in writing', body: 'Free, with no obligation to go ahead.' },
        ])}
      </div>
    </aside>
  </div>
</section>
`;

  return {
    path: '/contact',
    section: 'contact',
    title: 'Contact & Request Service | Iron Volt Electric | Spring & Houston',
    description: `Call or text ${site.phone}, email ${site.email}, or request service online. Licensed electrician serving Spring and Greater Houston. Free written estimates.`,
    schema: [breadcrumbSchema(crumbs)],
    scripts: [`<script src="${assets.form}" defer></script>`],
    main,
  };
}
