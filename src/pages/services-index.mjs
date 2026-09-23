/* ============================================================
   SERVICES HUB  /services/
   A directory, not a brochure: each service with a one-line
   summary, what it covers, and a link to its own page. The old
   single-page anchors (#repairs, #panels, #ev...) are kept on the
   rows so existing links still land somewhere sensible.
   ============================================================ */

import { html, icon } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { services, serviceBySlug } from '../data/services.mjs';
import { pageHeader, ctaBand, emergencyPanel } from '../components.mjs';
import { breadcrumbSchema } from '../schema.mjs';

function scopePreview(s) {
  const items = s.scope?.items ?? s.scope?.groups?.flatMap((g) => g.items) ?? s.capabilities?.groups.map((g) => g.title) ?? [];
  return items.slice(0, 4).join(' · ');
}

function row(s) {
  const [first, ...rest] = s.anchors;
  return html`<li class="service-directory__row" id="${first}">
  <div>
    ${rest.map((a) => html`<span id="${a}"></span>`)}
    <h3><a href="/services/${s.slug}">${s.title}</a></h3>
    <p class="service-directory__summary">${s.summary}</p>
  </div>
  <p class="service-directory__scope">${scopePreview(s)}</p>
  <a class="link-arrow" href="/services/${s.slug}" aria-label="${s.name}: details">Details ${icon('arrow')}</a>
</li>`;
}

export function servicesIndexPage() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Services' }];
  const residential = services.filter((s) => s.group === 'residential');
  const business = [serviceBySlug.commercial, serviceBySlug.inspections];

  const main = html`
${pageHeader({
    crumbs,
    title: 'Electrical services',
    lead: 'Repairs, upgrades and installations for homes and businesses across Greater Houston. Every job is done to the National Electrical Code, permitted where it needs to be, and priced in writing first.',
  })}

<section class="section" aria-labelledby="residential-title" id="residential">
  <div class="container">
    <header class="section-head section-head--split">
      <h2 id="residential-title">For your home</h2>
      <p class="section-head__aside">From a single dead outlet to a full rewire. If you’re not sure which of these you need, describe the problem when you call and we’ll work it out.</p>
    </header>
    <ul class="service-directory">
      ${residential.map(row)}
    </ul>
  </div>
</section>

<section class="section section--alt" aria-labelledby="commercial-title" id="business">
  <div class="container">
    <header class="section-head section-head--split">
      <h2 id="commercial-title">For your business</h2>
      <p class="section-head__aside">Retail, offices, warehouses and restaurants across ${site.counties}.</p>
    </header>
    <ul class="service-directory">
      ${business.map(row)}
    </ul>
  </div>
</section>

${emergencyPanel({ id: 'emergency' })}

${ctaBand({
    heading: 'Get a written estimate',
    body: 'A technician comes out, looks at the job and tells you what it costs, in writing, before any work starts.',
  })}
`;

  return {
    path: '/services/',
    section: 'services',
    title: 'Electrical Services in Greater Houston | Iron Volt Electric',
    description: 'Electrical repairs, panel upgrades, rewiring, EV chargers, lighting, generators, inspections and commercial electrical work across Greater Houston. Licensed, written estimates.',
    schema: [breadcrumbSchema(crumbs)],
    main,
  };
}
