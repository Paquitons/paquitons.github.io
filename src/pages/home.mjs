/* ============================================================
   HOME
   Ordered by the questions someone asks before calling an
   electrician: who are you, where do you work, what do you do,
   how do I reach you, why should I trust you.
   ============================================================ */

import { html, icon, picture } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { serviceBySlug } from '../data/services.mjs';
import {
  credentials, faqSection, ctaBand, emergencyPanel,
  reviewsEmbed, profileLinks, townLinks, serviceIndex,
} from '../components.mjs';
import { faqSchema } from '../schema.mjs';

const faq = [
  { q: 'Are you licensed and insured to work in Texas?', a: `Yes. We hold ${site.license.full} and carry general liability insurance and workers’ compensation. You can verify the license at any time through the <a href="${site.license.verifyUrl}" target="_blank" rel="noopener noreferrer">Texas Department of Licensing and Regulation</a>. We provide proof of insurance before any work begins.` },
  { q: 'How do estimates work?', a: 'Estimates are free. A technician comes out, looks at the job in person and gives you a written quote before anything starts. There’s no obligation. We don’t quote over the phone, because an accurate number needs someone to see the job.' },
  { q: 'How quickly can you respond to an emergency?', a: `Our line at ${site.phone} is answered 24/7. Sparks, burning smells, complete power loss and breakers that trip repeatedly are prioritized and dispatched as fast as we can get there. Don’t wait on these; they turn into fire hazards quickly.` },
  { q: 'Do you pull permits?', a: 'Yes. Panel upgrades, new circuits, generator installs and major rewiring normally need permits and inspections, and we handle that as part of the job. Be wary of any electrician offering to skip the permit: unpermitted work can void your homeowner’s insurance and cause problems when you sell.' },
  { q: 'Do I need a panel upgrade?', a: 'Signs point that way if breakers trip often, lights dim when an appliance starts, you have a 100A panel in a modern house, you want to add an EV charger or large appliance, or the panel is 25 years old or more. We’ll assess it and give you an honest answer. Not every house needs one, and we’ll say so if yours doesn’t. <a href="/services/panel-upgrades">More on panel upgrades</a>.' },
  { q: 'Which areas do you serve?', a: 'All of Greater Houston: The Woodlands and Conroe to the north; Spring, Tomball, Cypress and Klein to the northwest; Humble, Kingwood and Atascocita to the northeast; Katy and Cinco Ranch to the west; plus Houston itself, Memorial, Bellaire, Sugar Land and the communities in between. See the <a href="/service-area/">full service area</a>, or call to check your address.' },
];

const indexServices = ['electrical-repairs', 'rewiring', 'ev-chargers', 'lighting', 'generators', 'installations', 'inspections']
  .map((slug) => serviceBySlug[slug]);

export function homePage() {
  const main = html`
<section class="hero surface-dark" aria-labelledby="hero-title">
  <div class="container hero__grid">
    <div class="hero__content">
      <h1 id="hero-title" class="hero__title">
        <span class="hero__tagline">Wired right. <em>Done right.</em></span>
        <span class="hero__subtitle">Residential and commercial electricians serving Greater Houston</span>
      </h1>
      <div class="hero__actions button-row button-row--stack-sm">
        <a class="button button--primary button--lg" href="${site.phoneHref}">${icon('phone')}Call ${site.phone}</a>
        <a class="button button--outline-inverse button--lg" href="${site.requestHref}">Request service</a>
      </div>
    </div>
    <div class="hero__media">
      ${picture('panel-test-hands', {
        alt: 'An electrician’s hands testing wiring inside an exterior panel with a clamp meter',
        eager: true,
        priority: true,
        sizes: '(min-width: 60em) 38vw, 100vw',
      })}
    </div>
  </div>
</section>

${credentials()}

<section class="section" aria-labelledby="services-title">
  <div class="container">
    <header class="section-head section-head--split">
      <h2 id="services-title">Electrical work for homes and businesses</h2>
      <a class="link-arrow section-head__link" href="/services/">All services ${icon('arrow')}</a>
    </header>

    <div class="service-overview">
      <article class="service-feature">
        <a class="service-feature__media" href="/services/panel-upgrades" tabindex="-1" aria-hidden="true">
          ${picture('panelboards-pair', { alt: '', sizes: '(min-width: 60em) 45vw, 100vw' })}
        </a>
        <div class="service-feature__body">
          <h3 class="service-feature__title"><a href="/services/panel-upgrades">Panel upgrades and replacement</a></h3>
          <p>Upgrading an undersized or aging panel is one of the most important electrical jobs a house gets. We start with a load calculation, and we’ll tell you if you don’t need one.</p>
          <ul class="rule-list">
            <li>100A to 200A service upgrades</li>
            <li>Federal Pacific and Zinsco panel replacement</li>
            <li>Permit, inspection and utility coordination handled</li>
          </ul>
          <a class="link-arrow" href="/services/panel-upgrades">Panel upgrades ${icon('arrow')}</a>
        </div>
      </article>

      ${serviceIndex(indexServices)}
    </div>
  </div>
</section>

<section class="section section--white" aria-labelledby="reviews-title">
  <div class="container">
    <header class="section-head section-head--split reviews__head">
      <h2 id="reviews-title">What customers say</h2>
      <div class="section-head__aside">
        <p>Left by customers on our Google Business Profile. We’re also on ${profileLinks({ inline: true })}.</p>
      </div>
    </header>
    ${reviewsEmbed()}
  </div>
</section>

<section class="section surface-dark" aria-labelledby="commercial-title">
  <div class="container feature-band">
    <div class="feature-band__media">
      ${picture('service-rack', { alt: 'A freestanding commercial service, meter and distribution panel on a steel rack, with its green inspection tag', sizes: '(min-width: 60em) 45vw, 100vw' })}
    </div>
    <div class="feature-band__body">
      <h2 id="commercial-title">Electrical contracting for businesses</h2>
      <p>Retail, offices, warehouses and restaurants across ${site.counties}. We plan shutdowns around your hours and keep them short.</p>
      <ul class="rule-list rule-list--columns">
        <li>Tenant build-outs</li>
        <li>200A to 400A and three-phase service</li>
        <li>LED, warehouse and site lighting</li>
        <li>Kitchen, HVAC and machinery hookups</li>
        <li>Inspection prep and code corrections</li>
        <li>Emergency commercial repairs</li>
      </ul>
      <a class="button button--outline-inverse" href="/services/commercial">Commercial services</a>
    </div>
  </div>
</section>

${emergencyPanel()}


<section class="section section--alt" aria-labelledby="company-title">
  <div class="container feature-band feature-band--reverse">
    <div class="feature-band__media">
      ${picture('generator-brick-home', { alt: 'A standby generator on a pad beside a brick house, below the meter and transfer switch', sizes: '(min-width: 60em) 45vw, 100vw' })}
    </div>
    <div class="feature-band__body">
      <h2 id="company-title">A local contractor, not a call center</h2>
      <p>${site.legalName} was founded in ${site.foundedLabel} by a licensed electrician with ${site.experience} of field experience in Houston homes, businesses, parks and community properties. We’re not a franchise, and we’re not a lead service passing your number along.</p>
      <a class="link-arrow" href="/about">About Iron Volt Electric ${icon('arrow')}</a>
    </div>
  </div>
</section>


<section class="section" aria-labelledby="area-title">
  <div class="container split split--center">
    <div class="area-map">
      ${picture('service-area-map', { alt: 'Map of Greater Houston with pins marking the towns Iron Volt Electric covers, from Conroe in the north to Sugar Land in the southwest and Baytown in the east', sizes: '(min-width: 60em) 45vw, 100vw' })}
    </div>
    <div>
      <h2 id="area-title">Serving Greater Houston</h2>
      <p class="section-intro">From Conroe in the north to Sugar Land in the southwest and Baytown in the east, for homes and businesses across the metro. We’re based in Spring, TX.</p>
      <div class="mt-6">${townLinks()}</div>
    </div>
  </div>
</section>

${faqSection({ id: 'faq', items: faq })}

${ctaBand({
    heading: 'Tell us what’s going on',
    body: 'Call and describe the problem, or send a request online. A technician comes out, looks at the job and leaves you with a written estimate at no charge.',
  })}
`;

  return {
    path: '/',
    section: 'home',
    title: 'Electrician in Greater Houston | Iron Volt Electric',
    ogTitle: 'Iron Volt Electric | Licensed Electrician, Greater Houston',
    description: `Licensed residential and commercial electrician serving Greater Houston. Repairs, panel upgrades, EV chargers, generators. 24/7 emergency line: ${site.phone}.`,
    preload: 'panel-test-hands',
    preloadSizes: '(min-width: 60em) 38vw, 100vw',
    schema: [faqSchema(faq)],
    main,
  };
}
