/* ============================================================
   SERVICE PAGE
   Renders one entry from data/services.mjs. Blocks appear only
   when the entry provides them, so pages share an order but not
   a shape:

     header      photo, facts strip, or (emergency) the number
     intro       the problem, with "signs" alongside if present
     options     a two-way comparison
     feature     a single point worth its own block
     table       sizing or spec table
     scope       what the work covers (flat or grouped)
     capabilities  grouped scope for commercial
     gallery     real job photos
     process     how the job runs
     safety      what to know or do
     local       where we do this work, linked to town pages
     faq
     related
     cta
   ============================================================ */

import { html, icon, picture } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { serviceBySlug } from '../data/services.mjs';
import { areas } from '../data/areas.mjs';
import { pageHeader, processList, faqSection, ctaBand, emergencyPanel } from '../components.mjs';
import { serviceSchema, breadcrumbSchema, faqSchema } from '../schema.mjs';

export function servicePage(s) {
  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services/' },
    { name: s.name },
  ];

  // Blocks in page order. Each takes the surface class it should
  // sit on; surfaces alternate so two tinted bands never touch,
  // whichever blocks a given service happens to have.
  const blocks = [
    s.steps && ((bg) => waitSteps(s, bg)),
    s.intro && ((bg) => intro(s, bg)),
    s.options && ((bg) => options(s.options, bg)),
    s.feature && ((bg) => feature(s, bg)),
    s.table && ((bg) => table(s.table, bg)),
    s.scope && ((bg) => scope(s.scope, bg)),
    s.capabilities && ((bg) => capabilities(s.capabilities, bg)),
    s.gallery && !s.feature && ((bg) => gallery(s.gallery, bg)),
    s.process && ((bg) => process(s, bg)),
    s.safety && ((bg) => safety(s.safety, bg)),
    (bg) => local(s, bg),
    s.faq && ((bg) => faqSection({ id: 'questions', heading: 'Common questions', items: s.faq, alt: bg !== '' })),
    s.related && ((bg) => related(s, bg)),
  ].filter(Boolean);

  const main = html`
${header(s, crumbs)}
${blocks.map((render, i) => render(i % 2 ? ' section--alt' : ''))}
${s.emergency
    ? ctaBand({ heading: 'Electrical emergency? Call now.', body: 'Tell us what’s happening. We’ll tell you what to switch off and when we can be there.', emergency: true })
    : ctaBand(s.cta)}
`;

  return {
    path,
    section: 'services',
    title: s.meta.title,
    description: s.meta.description,
    preload: s.hero.image?.key,
    preloadSizes: '(min-width: 60em) 45vw, 100vw',
    schema: [serviceSchema(s, path), breadcrumbSchema(crumbs), ...(s.faq ? [faqSchema(s.faq)] : [])],
    main,
  };
}

/* ------------------------------------------------------------ */

function header(s, crumbs) {
  if (s.emergency) {
    return pageHeader({
      crumbs,
      title: s.title,
      lead: s.hero.lead,
      variant: 'emergency',
      actions: false,
      children: html`<a class="page-header__phone tnum" href="${site.phoneHref}">${icon('phone')}${site.phone}</a>`,
      facts: [
        ['Emergency line', 'Answered 24 hours, 7 days'],
        ['Office hours', site.hours.short],
        ['License', site.license.short],
      ],
    });
  }
  return pageHeader({
    crumbs,
    title: s.titleHtml ?? s.title,
    lead: s.hero.lead,
    image: s.hero.image,
    portrait: ['foyer-chandelier', 'panel-test-hands'].includes(s.hero.image?.key),
    facts: s.hero.facts ?? [
      ['License', site.license.short],
      ['Estimates', 'Free and in writing'],
      ['Emergency line', 'Answered 24/7'],
    ],
  });
}

function intro(s, bg) {
  const signs = s.signs && html`<aside class="aside-panel" aria-labelledby="signs-title">
    <h2 id="signs-title">${s.signs.heading}</h2>
    <ul class="${s.emergency ? 'hazard-list' : 'tick-list'}">
      ${s.signs.items.map((item) => typeof item === 'string'
        ? html`<li>${item}</li>`
        : html`<li>${item.text}<span class="urgent-note">${item.urgent}</span></li>`)}
    </ul>
    ${s.emergency && html`<a class="button button--emergency button--block" href="${site.phoneHref}">${icon('phone')}Call ${site.phone}</a>`}
  </aside>`;

  return html`<section class="section${bg}" aria-labelledby="intro-title">
  <div class="container${signs ? ' split split--wide-start' : ''}">
    <div class="prose">
      <h2 id="intro-title">${s.intro.heading}</h2>
      ${s.intro.body.map((p, i) => html`<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`)}
    </div>
    ${signs}
  </div>
</section>`;
}

function options(o, bg) {
  return html`<section class="section${bg}" aria-labelledby="options-title">
  <div class="container">
    <header class="section-head"><h2 id="options-title">${o.heading}</h2></header>
    <div class="options">
      ${o.items.map((item) => html`<div class="options__item">
        <h3>${item.title}</h3>
        ${item.body && html`<p>${item.body}</p>`}
        ${item.list && html`<ul class="tick-list">${item.list.map((li) => html`<li>${li}</li>`)}</ul>`}
      </div>`)}
    </div>
    ${o.note && html`<p class="options__note">${o.note}</p>`}
  </div>
</section>`;
}

/* A single point, set beside the gallery when there is one. */
function feature(s, bg) {
  const f = s.feature;
  return html`<section class="section${bg}" aria-labelledby="feature-title">
  <div class="container">
    <header class="section-head section-head--split">
      <h2 id="feature-title">${f.heading}</h2>
      <p class="section-head__aside">${f.body}</p>
    </header>
    ${s.gallery && galleryList(s.gallery)}
  </div>
</section>`;
}

function table(t, bg) {
  return html`<section class="section${bg}" aria-labelledby="table-title">
  <div class="container split split--wide-end">
    <header><h2 id="table-title">${t.heading}</h2></header>
    <div>
      <table class="data-table">
        <thead><tr>${t.head.map((h) => html`<th scope="col">${h}</th>`)}</tr></thead>
        <tbody>${t.rows.map(([a, b]) => html`<tr><th scope="row">${a}</th><td>${b}</td></tr>`)}</tbody>
      </table>
      ${t.note && html`<p class="table-note">${t.note}</p>`}
    </div>
  </div>
</section>`;
}

function scope(sc, bg) {
  if (sc.groups) {
    return html`<section class="section${bg}" aria-labelledby="scope-title">
  <div class="container">
    <header class="section-head"><h2 id="scope-title">${sc.heading}</h2></header>
    <div class="scope-groups scope-groups--3">
      ${sc.groups.map((g) => html`<div class="scope-group"><h3>${g.title}</h3><ul class="tick-list">${g.items.map((i) => html`<li>${i}</li>`)}</ul></div>`)}
    </div>
  </div>
</section>`;
  }
  return html`<section class="section${bg}" aria-labelledby="scope-title">
  <div class="container split split--wide-end">
    <header><h2 id="scope-title">${sc.heading}</h2></header>
    <ul class="spec-list spec-list--columns">${sc.items.map((i) => html`<li>${i}</li>`)}</ul>
  </div>
</section>`;
}

function capabilities(c, bg) {
  return html`<section class="section${bg}" aria-labelledby="cap-title">
  <div class="container">
    <header class="section-head"><h2 id="cap-title">${c.heading}</h2></header>
    <div class="scope-groups scope-groups--3">
      ${c.groups.map((g) => html`<div class="scope-group"><h3>${g.title}</h3><ul class="tick-list">${g.items.map((i) => html`<li>${i}</li>`)}</ul></div>`)}
    </div>
  </div>
</section>`;
}

function galleryList(g) {
  const portrait = g.images.some((img) => ['foyer-crystal-chandelier', 'stairwell-chandelier', 'dining-pendant'].includes(img.key));
  return html`<ul class="gallery${g.images.length % 3 === 0 ? ' gallery--3' : ''}${portrait ? ' gallery--portrait' : ''}">
  ${g.images.map((img) => html`<li>${picture(img.key, { alt: img.alt, sizes: '(min-width: 60em) 25vw, 50vw' })}</li>`)}
</ul>`;
}

/* A gallery gets its own section unless a feature block already
   carries it. */
function gallery(g, bg) {
  return html`<section class="section${bg}" aria-labelledby="gallery-title">
  <div class="container">
    <header class="section-head"><h2 id="gallery-title">${g.heading}</h2></header>
    ${galleryList(g)}
  </div>
</section>`;
}

function waitSteps(s, bg) {
  return html`<section class="section section--tight${bg}" aria-labelledby="wait-title">
  <div class="container">
    <div class="callout callout--emergency">
      ${icon('alert')}
      <div>
        <h2 id="wait-title">${s.steps.heading}</h2>
        <ol class="safety-steps">${s.steps.items.map((i) => html`<li>${i}</li>`)}</ol>
      </div>
    </div>
  </div>
</section>`;
}

function process(s, bg) {
  return html`<section class="section${bg}" aria-labelledby="process-title">
  <div class="container">
    <header class="section-head"><h2 id="process-title">${s.emergency ? 'What happens when you call' : 'How the job runs'}</h2></header>
    ${processList(s.process)}
  </div>
</section>`;
}

function safety(sf, bg) {
  return html`<section class="section section--tight${bg}" aria-labelledby="safety-title">
  <div class="container container--narrow">
    <div class="callout">
      ${icon('info')}
      <div>
        <h2 id="safety-title">${sf.heading}</h2>
        ${sf.body && sf.body.map((p) => html`<p>${p}</p>`)}
        ${sf.items && html`<ul>${sf.items.map((i) => html`<li>${i}</li>`)}</ul>`}
      </div>
    </div>
  </div>
</section>`;
}

/* Service-area context: which towns, linked. Pulls the town
   pages that single this service out as a local concern first. */
function local(s, bg) {
  const relevant = areas.filter((a) => a.focus.some((f) => f.service === s.slug));
  const others = areas.filter((a) => !relevant.includes(a));
  const ordered = [...relevant, ...others];
  return html`<section class="section${bg}" aria-labelledby="local-title">
  <div class="container split split--center">
    <div>
      <h2 id="local-title">Where we do this work</h2>
      <p class="mt-4 muted">Based in Spring and working across Greater Houston, in ${site.counties}. ${s.group === 'commercial'
        ? 'Commercial work covers the same area.'
        : 'Whether a permit comes from a city or the county depends on your address; we check before we quote.'}</p>
      <p class="mt-4"><a class="link-arrow" href="/service-area/">Full service area ${icon('arrow')}</a></p>
    </div>
    <ul class="town-links">
      ${ordered.map((a) => html`<li><a href="/service-area/${a.slug}">${a.name}${icon('arrow')}</a></li>`)}
      <li><a href="/service-area/">All areas${icon('arrow')}</a></li>
    </ul>
  </div>
</section>`;
}

function related(s, bg) {
  return html`<section class="section section--tight${bg}" aria-label="Related services">
  <div class="container related">
    <p class="related__title">Related services</p>
    <ul class="related__list">
      ${s.related.map((slug) => html`<li><a class="link-arrow" href="/services/${slug}">${serviceBySlug[slug].name}${icon('arrow')}</a></li>`)}
    </ul>
  </div>
</section>`;
}

export { emergencyPanel };
