/* ============================================================
   SERVICE AREA HUB  /service-area/
   ============================================================ */

import { html, icon, picture } from '../lib/html.mjs';
import { site, regions } from '../site.mjs';
import { pageHeader, ctaBand, townLinks } from '../components.mjs';
import { breadcrumbSchema } from '../schema.mjs';

export function serviceAreaIndexPage() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Service area' }];

  const main = html`
${pageHeader({
    crumbs,
    title: 'Service area',
    lead: `Residential and commercial electrical work across Greater Houston, in ${site.counties}. We’re based in ${site.base}.`,
  })}

<section class="section" aria-labelledby="towns-title">
  <div class="container split split--center">
    <div class="area-map">
      ${picture('service-area-map', { alt: 'Map of Greater Houston with pins marking the towns Iron Volt Electric covers, from Conroe in the north to Sugar Land in the southwest and Baytown in the east', eager: true, sizes: '(min-width: 60em) 45vw, 100vw' })}
    </div>
    <div>
      <h2 id="towns-title">Where we work most</h2>
      <p class="section-intro">Each of these has its own page with what’s worth knowing locally: the housing, who issues permits, and what the weather does to electrical systems there.</p>
      <div class="mt-6">${townLinks()}</div>
    </div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="regions-title">
  <div class="container">
    <header class="section-head section-head--split">
      <h2 id="regions-title">Towns by region</h2>
      <p class="section-head__aside">We serve homes and businesses in all of these, and everywhere between them. Don’t see yours? Call <a class="link-arrow" href="${site.phoneHref}">${site.phone}</a> and ask.</p>
    </header>
    <div class="region-grid">
      ${regions.map((r) => html`<div class="region">
        <h3 class="region__title">${r.name}</h3>
        <ul class="region__list">
          ${r.towns.map((t) => t.slug
            ? html`<li><a href="/service-area/${t.slug}">${t.name}${icon('arrow')}</a></li>`
            : html`<li><span>${t.name}</span></li>`)}
        </ul>
      </div>`)}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="local-title">
  <div class="container">
    <header class="section-head"><h2 id="local-title">Why being local matters</h2></header>
    <ol class="focus-list" role="list">
      <li class="focus-list__item">
        <h3>We get there sooner</h3>
        <p>Being based in the metro means we reach most of it quickly, which is the whole point when a breaker is arcing.</p>
      </li>
      <li class="focus-list__item">
        <h3>We know who issues the permit</h3>
        <p>Houston, the smaller cities and the unincorporated county each handle permits and inspections their own way. Knowing which applies is how work passes the first time.</p>
      </li>
      <li class="focus-list__item">
        <h3>We know these houses</h3>
        <p>Houston housing has patterns: aluminum wiring in 1960s and 70s builds, undersized panels in the 80s, full builder panels in new construction, and storm damage everywhere.</p>
      </li>
    </ol>
  </div>
</section>

${ctaBand({
    heading: 'Check we cover your address',
    body: 'Call or send a request with your address. If we cover it, a technician comes out and gives you a written estimate at no charge.',
  })}
`;

  return {
    path: '/service-area/',
    section: 'area',
    title: 'Service Area | Greater Houston Electrician | Iron Volt Electric',
    description: 'Iron Volt Electric serves Greater Houston, including The Woodlands, Conroe, Cypress, Katy, Humble, Tomball and Spring. Licensed electrician, TECL #41098.',
    schema: [breadcrumbSchema(crumbs)],
    main,
  };
}
