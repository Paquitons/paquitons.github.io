/* ============================================================
   COMPONENTS
   Blocks shared by more than one page. Page-specific markup
   lives with the page; if something is used once, it isn't here.
   ============================================================ */

import { html, esc, icon, picture } from './lib/html.mjs';
import { site } from './site.mjs';
import { areas } from './data/areas.mjs';

/* ------------------------------------------------------------
   PAGE HEADER
   variant: 'plain' | 'media' | 'emergency' | 'compact'
   ------------------------------------------------------------ */
export function pageHeader({ crumbs, title, lead, actions = true, image, portrait = false, facts, variant, children = '' }) {
  const hasMedia = Boolean(image);
  const classes = ['page-header', 'surface-dark'];
  if (hasMedia) classes.push('page-header--media');
  if (portrait) classes.push('page-header--portrait');
  if (variant) classes.push(`page-header--${variant}`);

  return html`<section class="${classes.join(' ')}" aria-labelledby="page-title">
  <div class="container">
    ${crumbs && breadcrumbs(crumbs)}
    <div class="page-header__grid">
      <div class="page-header__content">
        <h1 id="page-title">${title}</h1>
        ${lead && html`<p class="page-header__lead">${lead}</p>`}
        ${children}
        ${actions === true && html`<div class="button-row button-row--stack-sm">
          <a class="button button--primary button--lg" href="${site.phoneHref}">${icon('phone')}Call ${site.phone}</a>
          <a class="button button--outline-inverse button--lg" href="${site.requestHref}">Request service</a>
        </div>`}
        ${typeof actions === 'string' && actions}
      </div>
      ${hasMedia && html`<div class="page-header__media">${picture(image.key, { alt: image.alt, eager: true, priority: true, sizes: '(min-width: 60em) 45vw, 100vw' })}</div>`}
    </div>
    ${facts && html`<dl class="header-facts">
      ${facts.map(([label, value]) => html`<div><dt>${label}</dt><dd>${value}</dd></div>`)}
    </dl>`}
  </div>
</section>`;
}

export function breadcrumbs(crumbs) {
  return html`<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    ${crumbs.map((c, i) => i === crumbs.length - 1
      ? html`<li><span aria-current="page">${c.name}</span></li>`
      : html`<li><a href="${c.href}">${c.name}</a></li>`)}
  </ol>
</nav>`;
}

/* ------------------------------------------------------------
   CREDENTIALS STRIP
   ------------------------------------------------------------ */
export function credentials() {
  const items = [
    ['Texas license', site.license.short],
    ['Coverage', 'Licensed, bonded & insured'],
    ['Lead electrician', `${site.experience} in the field`],
    ['Estimates', 'Free and in writing'],
    ['Emergency line', 'Answered 24/7'],
  ];
  return html`<section class="credentials" aria-label="Credentials">
  <div class="container">
    <dl class="credentials__list">
      ${items.map(([label, value]) => html`<div class="credentials__item"><dt>${label}</dt><dd>${value}</dd></div>`)}
    </dl>
  </div>
</section>`;
}

/* ------------------------------------------------------------
   PROCESS
   ------------------------------------------------------------ */
export function processList(steps, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  return html`<ol class="process process--${Math.min(steps.length, 4)}">
  ${steps.map((s) => html`<li class="process__step"><${h}>${s.title}</${h}><p>${s.body}</p></li>`)}
</ol>`;
}

/* ------------------------------------------------------------
   FAQ
   ------------------------------------------------------------ */
export function faqList(items, name = 'faq') {
  return html`<div class="faq">
  ${items.map((f, i) => html`<details class="faq__item" name="${name}"${i === 0 ? ' open' : ''}>
    <summary class="faq__question">${f.q}<span class="faq__marker" aria-hidden="true"></span></summary>
    <div class="faq__answer"><p>${f.a}</p></div>
  </details>`)}
</div>`;
}

export function faqSection({ id = 'faq', heading = 'Questions we get asked', intro, items, alt = true }) {
  return html`<section class="section${alt ? ' section--alt' : ''}" id="${id}" aria-labelledby="${id}-title">
  <div class="container faq-layout">
    <header class="faq-layout__head">
      <h2 id="${id}-title">${heading}</h2>
      ${intro && html`<p class="note">${intro}</p>`}
    </header>
    ${faqList(items, id)}
  </div>
</section>`;
}

/* ------------------------------------------------------------
   EMERGENCY PANEL
   ------------------------------------------------------------ */
export const hazards = [
  'Sparks or arcing from an outlet, switch or panel',
  'A burning or hot-plastic smell',
  'An outlet, switch or panel that is hot to the touch',
  'Power out to part of the house while the neighbors have power',
  'A breaker that trips again every time it’s reset',
  'Storm or tree damage to the wiring on your house',
];

export function emergencyPanel({ headingId = 'emergency-title' } = {}) {
  return html`<div class="emergency-panel">
  <div class="emergency-panel__intro">
    <p class="kicker kicker--emergency">Answered 24/7</p>
    <h2 id="${headingId}">Electrical emergency?</h2>
    <p>Don’t wait on these. They turn into fire hazards quickly. If there’s smoke or fire, call 911 first.</p>
    <a class="button button--emergency button--lg" href="${site.phoneHref}">${icon('phone')}Call ${site.phone}</a>
    <a class="link-arrow" href="/services/emergency">What to do while you wait ${icon('arrow')}</a>
  </div>
  <div>
    <p class="emergency-panel__list-title">Call now if you have</p>
    <ul class="hazard-list">
      ${hazards.map((h) => html`<li>${h}</li>`)}
    </ul>
  </div>
</div>`;
}

/* ------------------------------------------------------------
   CTA BAND
   ------------------------------------------------------------ */
export function ctaBand({ heading, body, emergency = false, email = false } = {}) {
  return html`<section class="cta-band surface-dark${emergency ? ' cta-band--emergency' : ''}" aria-labelledby="cta-title">
  <div class="container cta-band__inner">
    <div class="cta-band__body">
      <h2 id="cta-title">${heading}</h2>
      ${body && html`<p>${body}</p>`}
    </div>
    <div class="cta-band__actions">
      <a class="cta-band__phone tnum" href="${site.phoneHref}">${icon('phone')}${site.phone}</a>
      ${email && html`<a class="button button--outline-inverse" href="mailto:${site.email}">${icon('mail')}Email us</a>`}
      ${!email && !emergency && html`<a class="button button--primary" href="${site.requestHref}">Request service</a>`}
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------
   REVIEWS
   The Common Ninja widget shows the business's Google reviews.
   Its script is attached by main.js when the section comes near
   the viewport, so it costs nothing on first paint.
   ------------------------------------------------------------ */
export function reviewsEmbed() {
  return html`<div class="reviews__embed" data-lazy-embed="https://cdn.commoninja.com/sdk/latest/commonninja.js">
  <div class="commonninja_component ${site.embeds.commonNinjaReviews}"></div>
  <p class="reviews__more"><a class="link-arrow" href="https://g.page/r/CXlaNGHGERuGEBM" target="_blank" rel="noopener noreferrer">Read all our reviews on Google ${icon('external')}<span class="visually-hidden"> (opens in a new tab)</span></a></p>
</div>`;
}

export function profileLinks({ inline = false } = {}) {
  if (inline) {
    const l = (name) => html`<a href="${site.social.find((s) => s.name === name).href}" target="_blank" rel="noopener noreferrer">${name}<span class="visually-hidden"> (opens in a new tab)</span></a>`;
    return html`${l('Yelp')}, ${l('Nextdoor')} and ${l('Facebook')}`;
  }
  const links = [
    { label: 'Leave a Google review', href: site.reviewUrl },
    { label: 'Yelp', href: site.social.find((s) => s.name === 'Yelp').href },
    { label: 'Nextdoor', href: site.social.find((s) => s.name === 'Nextdoor').href },
    { label: 'Facebook', href: site.social.find((s) => s.name === 'Facebook').href },
  ];
  return html`<ul class="profile-links">
  ${links.map((l) => html`<li><a href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}${icon('external')}<span class="visually-hidden"> (opens in a new tab)</span></a></li>`)}
</ul>`;
}

/* ------------------------------------------------------------
   TOWN LINKS
   ------------------------------------------------------------ */
export function townLinks(currentSlug) {
  return html`<ul class="town-links">
  ${areas.map((a) => html`<li><a href="/service-area/${a.slug}"${a.slug === currentSlug ? ' aria-current="page"' : ''}>${a.name}${icon('arrow')}</a></li>`)}
  <li><a href="/service-area/">All areas${icon('arrow')}</a></li>
</ul>`;
}

/* ------------------------------------------------------------
   SERVICE INDEX
   ------------------------------------------------------------ */
export function serviceIndex(services, { columns = false } = {}) {
  return html`<ul class="service-index${columns ? ' service-index--columns' : ''}">
  ${services.map((s) => html`<li class="service-index__item">
    <a class="service-index__link" href="/services/${s.slug}">
      <span class="service-index__name">${s.name}</span>
      <span class="service-index__desc">${s.summary}</span>
      ${icon('arrow')}
    </a>
  </li>`)}
</ul>`;
}

/* ------------------------------------------------------------
   REQUEST FORM
   The service request form on /contact. Only what we
   need to call someone back is shown; scheduling preferences
   are optional and tucked into a disclosure. Field names match
   what the booking endpoint has always received.
   ------------------------------------------------------------ */
export function requestForm({ id = 'request', headingId, compact = false } = {}) {
  const f = (name) => `${id}-${name}`;
  const err = (name) => html`<p class="field__error" id="${f(name)}-error"></p>`;

  return html`<div class="request" data-request>
  <div class="form-success" data-form-success hidden tabindex="-1">
    ${icon('check')}
    <h2>Request received</h2>
    <p>We’ll review it and contact you within 24 hours to confirm a time for the technician visit. If it’s urgent, call <a href="${site.phoneHref}" class="tnum">${site.phone}</a> rather than waiting on us.</p>
    <a class="button button--outline" href="/">Back to home</a>
  </div>

  <form class="form-grid" data-request-form method="POST" action="${site.embeds.bookingEndpoint}" novalidate${headingId ? ` aria-labelledby="${headingId}"` : ''}>
    <input type="hidden" name="subject" value="New booking request, Iron Volt Electric">
    <!-- The booking server has always received a first and last name
         and a ticked consent box. The form asks for one name and
         states consent in words; form.js fills these in on submit. -->
    <input type="hidden" name="firstName">
    <input type="hidden" name="lastName">
    <input type="hidden" name="terms" value="on">
    <div class="hp-field" aria-hidden="true">
      <label for="${f('website')}">Website</label>
      <input type="text" id="${f('website')}" name="website" tabindex="-1" autocomplete="off">
    </div>

    <div class="form-alert" data-form-alert role="alert">
      ${icon('alert')}<span data-form-alert-text></span>
    </div>

    <div class="form-grid form-grid--2">
      <div class="field field--full">
        <label class="field__label" for="${f('name')}">Name <span class="req" aria-hidden="true">*</span></label>
        <input class="field__control" type="text" id="${f('name')}" name="name" required autocomplete="name" aria-describedby="${f('name')}-error">
        ${err('name')}
      </div>
      <div class="field">
        <label class="field__label" for="${f('phone')}">Phone <span class="req" aria-hidden="true">*</span></label>
        <input class="field__control" type="tel" id="${f('phone')}" name="phone" required autocomplete="tel" inputmode="tel" aria-describedby="${f('phone')}-error">
        ${err('phone')}
      </div>
      <div class="field">
        <label class="field__label" for="${f('email')}">Email <span class="opt">(optional)</span></label>
        <input class="field__control" type="email" id="${f('email')}" name="email" autocomplete="email" aria-describedby="${f('email')}-error">
        ${err('email')}
      </div>
      <div class="field field--full">
        <label class="field__label" for="${f('address')}">Address where the work is needed <span class="req" aria-hidden="true">*</span></label>
        <input class="field__control" type="text" id="${f('address')}" name="address" required autocomplete="street-address" aria-describedby="${f('address')}-error">
        ${err('address')}
      </div>
      <div class="field">
        <label class="field__label" for="${f('serviceType')}">What do you need? <span class="req" aria-hidden="true">*</span></label>
        <select class="field__control" id="${f('serviceType')}" name="serviceType" required aria-describedby="${f('serviceType')}-error">
          <option value="">Choose a service</option>
          <optgroup label="Home">
            <option value="res-repairs">Electrical repair</option>
            <option value="res-panel">Panel or breaker upgrade</option>
            <option value="res-wiring">Wiring repair or rewiring</option>
            <option value="res-ev">EV charger</option>
            <option value="res-lighting">Lighting</option>
            <option value="res-generator">Generator</option>
            <option value="res-surge">Surge protection</option>
            <option value="res-outlets">Outlets and switches</option>
            <option value="res-fan">Ceiling fan</option>
            <option value="res-circuit">Dedicated circuit</option>
          </optgroup>
          <optgroup label="Business">
            <option value="com-repairs">Commercial repair</option>
            <option value="com-lighting">Commercial lighting</option>
            <option value="com-panel">Commercial panel or service upgrade</option>
            <option value="com-buildout">Tenant build-out</option>
            <option value="com-equipment">Equipment hookup</option>
            <option value="com-code">Inspection or code corrections</option>
          </optgroup>
          <option value="other">Something else, or not sure</option>
        </select>
        ${err('serviceType')}
      </div>
      <div class="field">
        <label class="field__label" for="${f('urgency')}">How soon? <span class="opt">(optional)</span></label>
        <select class="field__control" id="${f('urgency')}" name="urgency">
          <option value="">Choose one</option>
          <option value="emergency">Today, it’s urgent (please call too)</option>
          <option value="urgent">Within a day or two</option>
          <option value="normal">Within the week</option>
          <option value="flexible">Whenever suits</option>
        </select>
      </div>
      <div class="field field--full">
        <label class="field__label" for="${f('description')}">What’s going on? <span class="req" aria-hidden="true">*</span></label>
        <textarea class="field__control" id="${f('description')}" name="description" rows="${compact ? 3 : 4}" required aria-describedby="${f('description')}-hint ${f('description')}-error"></textarea>
        <p class="field__hint" id="${f('description')}-hint">A sentence or two is plenty: what’s happening, and where in the property.</p>
        ${err('description')}
      </div>
    </div>

    <details class="form-more">
      <summary>Add a preferred date and details <span>(optional)</span>${icon('chevron')}</summary>
      <div class="form-more__body form-grid form-grid--2">
        <div class="field">
          <label class="field__label" for="${f('preferredDate')}">Preferred date</label>
          <input class="field__control" type="date" id="${f('preferredDate')}" name="preferredDate">
        </div>
        <div class="field">
          <label class="field__label" for="${f('preferredTime')}">Preferred time</label>
          <select class="field__control" id="${f('preferredTime')}" name="preferredTime">
            <option value="">Any time</option>
            <option value="8am-10am">8am to 10am</option>
            <option value="10am-12pm">10am to 12pm</option>
            <option value="12pm-2pm">12pm to 2pm</option>
            <option value="2pm-4pm">2pm to 4pm</option>
            <option value="4pm-6pm">4pm to 6pm</option>
          </select>
        </div>
        <div class="field">
          <label class="field__label" for="${f('altDate')}">Second choice of date</label>
          <input class="field__control" type="date" id="${f('altDate')}" name="altDate">
        </div>
        <div class="field">
          <label class="field__label" for="${f('propertyType')}">Property type</label>
          <select class="field__control" id="${f('propertyType')}" name="propertyType">
            <option value="">Choose one</option>
            <option value="residential-house">House</option>
            <option value="residential-apartment">Apartment or condo</option>
            <option value="commercial-office">Office</option>
            <option value="commercial-retail">Retail</option>
            <option value="commercial-warehouse">Warehouse or industrial</option>
            <option value="commercial-restaurant">Restaurant or food service</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div class="field field--full">
          <label class="field__label" for="${f('notes')}">Anything else we should know?</label>
          <textarea class="field__control" id="${f('notes')}" name="notes" rows="2" placeholder="Gate code, where to park, dogs in the yard"></textarea>
        </div>
      </div>
    </details>

    <div class="form-actions">
      <button type="submit" class="button button--primary button--lg button--block">
        <span class="spinner" aria-hidden="true" hidden></span>
        <span data-button-label>Send request</span>
      </button>
      <p class="form-note">By sending this you agree we can contact you about it. We reply within 24 hours; for an emergency, call instead. Protected by reCAPTCHA: Google’s <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">terms</a> apply.</p>
    </div>
  </form>
</div>`;
}

/** Script tags a page with a request form needs. */
export const formScripts = (assets) => [`<script src="${assets.form}" defer></script>`];

export { esc };
