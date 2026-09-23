/* ============================================================
   ABOUT  /about
   ============================================================ */

import { html, icon, picture } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { pageHeader, ctaBand } from '../components.mjs';
import { breadcrumbSchema } from '../schema.mjs';

export function aboutPage() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'About' }];

  const main = html`
${pageHeader({
    crumbs,
    title: 'About Iron Volt Electric',
    lead: `A licensed electrical contractor serving Greater Houston, based in ${site.base}. A new company, built on ${site.experience} of field work.`,
    media: html`<picture>
      <source type="image/webp" srcset="/images/opt/badge-320.webp 320w, /images/opt/badge-550.webp 550w" sizes="(min-width: 60em) 20rem, 60vw">
      <img src="/images/opt/badge.png" alt="The Iron Volt Electric badge" width="550" height="480" fetchpriority="high">
    </picture>`,
    actions: false,
  })}

<section class="section" aria-labelledby="story-title">
  <div class="container split split--wide-end">
    <h2 id="story-title">Where the company came from</h2>
    <div class="prose">
      <p class="lead">Iron Volt Electric was founded on January 12, 2026, by a licensed electrician who had spent ${site.experience} working in Houston homes, businesses, parks and community properties.</p>
      <p>That career, across every kind of residential and commercial project, is what the company is built on. The LLC is new; the experience behind it isn’t, and we’d rather tell you both plainly than let one stand in for the other.</p>
      <p>“Iron” is durability. “Volt” is the electricity. Together they describe what we’re trying to deliver: work that lasts.</p>
      <p>We’re not a call center or a franchise. We’re a local electrical contractor who knows the local codes, how these houses were built, and what the Houston climate does to an electrical system over twenty years.</p>
    </div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="license-title">
  <div class="container split split--wide-end">
    <header>
      <h2 id="license-title">Licensed, bonded and insured</h2>
      <p class="section-intro">What we carry, and what it protects you against.</p>
      <p class="mt-6"><a class="button button--outline" href="${site.license.verifyUrl}" target="_blank" rel="noopener noreferrer">Verify our license with TDLR ${icon('external')}</a></p>
    </header>
    <ul class="rule-list">
      <li><span><strong>${site.license.full}.</strong> Issued and maintained by the ${site.license.issuer}. You can look it up at any time.</span></li>
      <li><span><strong>Insured.</strong> General liability and workers’ compensation on every job, with proof provided before work starts.</span></li>
      <li><span><strong>Bonded.</strong> A surety bond, for additional protection for customers.</span></li>
      <li><span><strong>Code compliant.</strong> Work performed to the current National Electrical Code and local requirements, with permits pulled and inspections booked.</span></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="values-title">
  <div class="container">
    <header class="section-head"><h2 id="values-title">What we hold to</h2></header>
    <ul class="focus-list focus-list--4" role="list">
      <li class="focus-list__item">
        <h3>Safety without shortcuts</h3>
        <p>Electrical work done badly is dangerous for your family, your property and for us. We use quality materials and take the time the job needs.</p>
      </li>
      <li class="focus-list__item">
        <h3>Straight pricing</h3>
        <p>You get a written estimate before work begins. If you don’t need the expensive option, we say so. No upselling and no vague numbers.</p>
      </li>
      <li class="focus-list__item">
        <h3>${site.experience} of Houston houses</h3>
        <p>Knob-and-tube, aluminum wiring, modern smart systems, storm damage. We’ve worked on all of it, here, for ${site.experience}.</p>
      </li>
      <li class="focus-list__item">
        <h3>Respect for your time</h3>
        <p>We turn up when we said we would, work efficiently, and leave the place clean.</p>
      </li>
    </ul>
  </div>
</section>

<section class="section section--alt" aria-labelledby="guarantee-title">
  <div class="container">
    <header class="section-head"><h2 id="guarantee-title">Our guarantee</h2></header>
    <div class="options">
      <div class="options__item">
        <h3>If it isn’t right, we come back</h3>
        <p>If something isn’t right after we’ve finished, contact us and we return to fix it at no additional charge.</p>
      </div>
      <div class="options__item">
        <h3>It passes inspection</h3>
        <p>We pull the permits, book the inspections and make sure the job passes. If it doesn’t, we correct it.</p>
      </div>
    </div>
  </div>
</section>

${ctaBand({
    heading: 'Get a written estimate',
    body: 'A technician comes out, looks at the work in person and gives you a clear written quote with no obligation.',
  })}
`;

  return {
    path: '/about',
    section: 'about',
    title: 'About | Licensed Electrical Contractor in Greater Houston | Iron Volt Electric',
    description: `Iron Volt Electric LLC: a licensed electrical contractor serving Greater Houston, based in Spring, TX, with ${site.experience} of field experience. TECL #41098.`,
    schema: [breadcrumbSchema(crumbs)],
    main,
  };
}
