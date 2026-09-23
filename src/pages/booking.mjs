/* ============================================================
   REQUEST SERVICE  /booking
   The URL stays /booking: it has been linked from every page,
   and possibly from outside the site, since launch.
   ============================================================ */

import { html, icon } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { pageHeader, processList, requestForm } from '../components.mjs';
import { breadcrumbSchema } from '../schema.mjs';

export function bookingPage(assets) {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Request service' }];

  const main = html`
${pageHeader({
    crumbs,
    title: 'Request service',
    lead: 'Send us the details and a technician will come out, look at the job and write you an estimate. It costs nothing and commits you to nothing.',
    actions: false,
    variant: 'compact',
  })}

<section class="section" aria-label="Service request">
  <div class="container booking-layout">
    <div class="form-panel">
      <h2 class="form-panel__title" id="request-title">Your request</h2>
      <p class="form-panel__intro">Fields marked <span aria-hidden="true">*</span><span class="visually-hidden">as required</span> are needed so we can call you back. Everything else is optional.</p>
      ${requestForm({ id: 'booking', headingId: 'request-title' })}
    </div>

    <aside class="booking-layout__aside" aria-label="Other ways to book">
      <div class="aside-panel">
        <h2>Rather just call?</h2>
        <a class="button button--primary button--block button--lg" href="${site.phoneHref}">${icon('phone')}${site.phone}</a>
        <p class="note mt-4">${site.hours.days}, ${site.hours.time}. Emergencies answered 24/7; please call rather than use the form.</p>
      </div>
      <div class="aside-panel">
        <h2>What happens next</h2>
        ${processList([
          { title: 'We confirm', body: 'We check we cover the work and come back to you on timing.' },
          { title: 'A technician visits', body: 'They inspect the job in person at the time you agreed.' },
          { title: 'You get the price in writing', body: 'On the spot, with no obligation to go ahead.' },
          { title: 'The work gets done', body: 'To code, with permits where needed, backed by our guarantee.' },
        ])}
      </div>
    </aside>
  </div>
</section>
`;

  return {
    path: '/booking',
    section: 'booking',
    title: 'Request Service | Iron Volt Electric | Spring & Greater Houston',
    description: 'Request electrical service from Iron Volt Electric. Free written estimates from a licensed electrician serving Spring and Greater Houston. We reply within 24 hours.',
    schema: [breadcrumbSchema(crumbs)],
    scripts: [`<script src="${assets.form}" defer></script>`],
    main,
  };
}
