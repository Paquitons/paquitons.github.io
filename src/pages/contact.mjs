/* ============================================================
   CONTACT  /contact
   The one page for getting in touch: the request form, with the
   phone, email and hours beside it. /booking used to be a second
   page with the same form; it now redirects to #request here.
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
    lead: 'Call or text for the quickest answer, or send a request and we’ll call you back within 24 hours to arrange a visit. Estimates are free.',
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
          <li><span><strong>You get the price in writing</strong>, free, with no obligation to go ahead.</span></li>
        </ol>
      </div>
    </aside>
  </div>
</section>
`;

  return {
    path: '/contact',
    section: 'contact',
    title: 'Contact & Request Service | Iron Volt Electric',
    description: `Call or text ${site.phone}, email ${site.email}, or request service online. Licensed electrician serving Greater Houston. Free written estimates.`,
    schema: [breadcrumbSchema(crumbs)],
    scripts: [`<script src="${assets.form}" defer></script>`],
    main,
  };
}
