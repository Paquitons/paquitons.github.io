/* ============================================================
   LOCATION PAGE
   Renders one entry from data/areas.mjs. The substance is the
   `intro` and `focus` copy, which is specific to the town; the
   rest (services, contact) is shared because it genuinely is
   the same in every town.
   ============================================================ */

import { html, icon, picture } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { services, serviceBySlug } from '../data/services.mjs';
import { areaBySlug } from '../data/areas.mjs';
import { pageHeader, faqSection, ctaBand, serviceIndex } from '../components.mjs';
import { breadcrumbSchema, faqSchema } from '../schema.mjs';

export function areaPage(a) {
  const path = `/service-area/${a.slug}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Service area', href: '/service-area/' },
    { name: a.name },
  ];

  const faq = [
    ...a.faq,
    { q: `Are you licensed to work in ${a.name}?`, a: `Yes. ${site.license.full} is issued by the ${site.license.issuer} and covers electrical contracting anywhere in Texas. We carry general liability and workers’ compensation, and provide proof of insurance before any work begins.` },
    { q: 'How do estimates work?', a: 'Estimates are free. A technician comes out, looks at the job in person and gives you a written price before anything starts. There’s no obligation. We don’t quote over the phone, because an accurate number needs someone to see the job.' },
  ];

  const main = html`
${pageHeader({
    crumbs,
    title: `Electrician in ${a.name}, TX`,
    lead: a.lead,
  })}

<section class="section" aria-labelledby="local-title">
  <div class="container split split--wide-start">
    <div class="prose">
      <h2 id="local-title">Electrical work in ${a.name}</h2>
      ${a.intro.map((p, i) => html`<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`)}
    </div>
    <aside class="aside-panel" aria-labelledby="nearby-title">
      <h2 id="nearby-title">Also nearby</h2>
      <ul class="tick-list">
        ${a.nearby.map((name) => {
          const page = Object.values(areaBySlug).find((x) => x.name === name);
          return page ? html`<li><a href="/service-area/${page.slug}">${name}</a></li>` : html`<li>${name}</li>`;
        })}
      </ul>
      <p class="note mt-4">Not sure we reach your address? Call <a href="${site.phoneHref}" class="tnum">${site.phone}</a>.</p>
    </aside>
  </div>
</section>

<section class="section section--alt" aria-labelledby="focus-title">
  <div class="container">
    <header class="section-head">
      <h2 id="focus-title">Worth knowing in ${a.name}</h2>
    </header>
    <ol class="focus-list" role="list">
      ${a.focus.map((f) => html`<li class="focus-list__item">
        <h3>${f.title}</h3>
        <p>${f.body}</p>
        <a class="link-arrow" href="/services/${f.service}">${serviceBySlug[f.service].name} ${icon('arrow')}</a>
      </li>`)}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="services-title">
  <div class="container">
    <header class="section-head section-head--split">
      <h2 id="services-title">Services in ${a.name}</h2>
      <p class="section-head__aside">The same license, the same written estimate and the same standard of work, whichever service you need.</p>
    </header>
    ${serviceIndex(services, { columns: true })}
  </div>
</section>

${faqSection({ id: 'questions', heading: `${a.name} questions`, items: faq })}


${ctaBand({
    heading: `Need an electrician in ${a.name}?`,
    body: 'Call or send a request. We’ll confirm we cover your address, and a technician will come out and put the price in writing.',
  })}
`;

  return {
    path,
    section: 'area',
    title: a.meta.title,
    description: a.meta.description,
    schema: [breadcrumbSchema(crumbs), faqSchema(faq)],
    main,
  };
}

