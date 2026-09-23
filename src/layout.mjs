/* ============================================================
   PAGE SHELL
   Everything outside <main>: head, meta, structured data, the
   utility bar, header, footer and the mobile action bar. Every
   page on the site goes through layout(), so these exist once.
   ============================================================ */

import { html, esc, icon, preloadImage } from './lib/html.mjs';
import { site, regions } from './site.mjs';
import { residentialServices, commercialService, emergencyService, serviceBySlug } from './data/services.mjs';
import { areas } from './data/areas.mjs';
import { localBusinessSchema } from './schema.mjs';

/**
 * @param {object} page
 * @param {string} page.path        Site-relative URL, e.g. '/services/panel-upgrades'
 * @param {string} page.title       <title>
 * @param {string} page.description Meta description
 * @param {string} page.main        Rendered <main> content
 * @param {string} [page.section]   Top-level nav section to mark current
 * @param {object[]} [page.schema]  Extra JSON-LD objects
 * @param {string} [page.preload]   Image key to preload (the LCP image)
 * @param {string} [page.preloadSizes]
 * @param {string[]} [page.scripts] Extra script tags
 * @param {boolean} [page.noindex]
 * @param {string} [page.canonical] Override canonical path
 * @param {object} assets           { css, js } cache-busted URLs
 */
export function layout(page, assets) {
  const canonical = site.url + (page.canonical ?? page.path);
  const schema = [localBusinessSchema(), ...(page.schema ?? [])];

  return html`<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#060e1a">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(page.ogTitle ?? page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/images/og-iron-volt-electric.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/images/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/images/IronVoltElectricBadgeBlueBGSmaller.jpg">
<link rel="preload" href="/fonts/archivo-var.woff2" as="font" type="font/woff2" crossorigin>
${page.preload ? preloadImage(page.preload, page.preloadSizes) : ''}
<link rel="stylesheet" href="${assets.css}">
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${utilityBar()}
${header(page)}
<main id="main">
${page.main}
</main>
${footer()}
${mobileActions()}
<script src="${assets.js}" defer></script>
${(page.scripts ?? []).join('\n')}
<script src="https://widget.heyrosie.com/widget.js" async data-rosie-business-id="${site.embeds.rosieBusinessId}"></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------
   UTILITY BAR
   ------------------------------------------------------------ */
function utilityBar() {
  // Facts only. The phone number lives in the header, one line below;
  // repeating it here put the same number on screen twice.
  return html`<aside class="utility-bar" aria-label="Hours and license">
  <div class="container utility-bar__inner">
    <a class="utility-bar__emergency" href="${site.phoneHref}">Emergency service, 24 hours a day</a>
    <ul class="utility-bar__facts">
      <li>Office ${site.hours.short}</li>
      <li>${site.license.short}</li>
      <li>Spring &amp; Greater Houston</li>
    </ul>
  </div>
</aside>`;
}

/* ------------------------------------------------------------
   HEADER
   The services menu is a disclosure (a button that shows and
   hides a list of links), not an ARIA menu: these are links,
   and screen reader users should navigate them as links.
   ------------------------------------------------------------ */
function header(page) {
  const current = (section) => (page.section === section ? ' aria-current="page"' : '');
  const serviceLink = (s) => html`<li><a class="mega__link" href="/services/${s.slug}">${s.name}</a></li>`;

  return html`<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="/" aria-label="${site.name}, home">
      <picture><source type="image/webp" srcset="/images/opt/logo.webp"><img src="/images/IronVoltElectricFinal2.png" alt="${site.name}" width="440" height="143"></picture>
    </a>

    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul class="site-nav__list">
        <li class="site-nav__item site-nav__item--has-menu">
          <a class="site-nav__link" href="/services/"${current('services')}>Services</a>
          <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="services-menu">
            ${icon('chevron')}<span class="visually-hidden">Show all services</span>
          </button>
          <div class="mega" id="services-menu">
            <div>
              <p class="mega__label">Home</p>
              <ul class="mega__list">
                ${residentialServices.filter((s) => s.group === 'residential').map(serviceLink)}
              </ul>
            </div>
            <div>
              <p class="mega__label">Business</p>
              <ul class="mega__list">
                ${serviceLink(commercialService)}
                ${serviceLink(serviceBySlug.inspections)}
              </ul>
            </div>
            <div class="mega__foot">
              <a class="mega__link" href="/services/${emergencyService.slug}">24/7 emergency service</a>
              <a class="mega__link mega__link--all" href="/services/">All services</a>
            </div>
          </div>
        </li>
        <li class="site-nav__item"><a class="site-nav__link" href="/service-area/"${current('area')}>Service area</a></li>
        <li class="site-nav__item"><a class="site-nav__link" href="/about"${current('about')}>About</a></li>
        <li class="site-nav__item"><a class="site-nav__link" href="/reviews"${current('reviews')}>Reviews</a></li>
        <li class="site-nav__item"><a class="site-nav__link" href="/contact"${current('contact')}>Contact</a></li>
      </ul>
      <div class="site-nav__actions">
        <a class="button button--primary button--lg" href="${site.phoneHref}">${icon('phone')}Call ${site.phone}</a>
        <a class="button button--outline-inverse button--lg" href="/booking">Request service</a>
      </div>
    </nav>

    <a class="header-call" href="${site.phoneHref}" aria-label="Call ${site.phone}">
      ${icon('phone')}
      <span class="header-call__text">
        <span class="header-call__label">Call or text</span>
        <span class="header-call__number tnum">${site.phone}</span>
      </span>
      <span class="header-call__short">Call</span>
    </a>
    <a class="button button--primary header-cta" href="/booking"${page.section === 'booking' ? ' aria-current="page"' : ''}>Request service</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      ${icon('menu')}<span class="nav-toggle__label">Menu</span>
    </button>
  </div>
</header>`;
}

/* ------------------------------------------------------------
   FOOTER
   ------------------------------------------------------------ */
const socialIcons = {
  Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z"/></svg>',
  Facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4h-3v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.3l-.5 3.5h-2.8V24C19.6 23 24 18.1 24 12.1z"/></svg>',
  Yelp: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.2 12.6 15.2 14c-1 .3-1.7-.8-1.2-1.6l2.9-4.3a1.1 1.1 0 0 1 1.6-.2 9.2 9.2 0 0 1 3.1 4.6c.1.6-.8 1.1-1.4.1zm-8.4 3.9-1.3 4.8a1.1 1.1 0 0 1-1.4.7 9.2 9.2 0 0 1-4.3-3 1.1 1.1 0 0 1 .3-1.6l4.3-2.9c.8-.6 1.9.2 1.4 1.9zM12 13.4a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8zM7.5 3.7a9.2 9.2 0 0 1 5.1-.7 1.1 1.1 0 0 1 .9 1.3l-1.4 4.9c-.2 1-1.5 1.2-2 .3L7.9 5.1a1.1 1.1 0 0 1 .6-1.4zM4.1 9.2a9.2 9.2 0 0 1 2.7-4.4 1.1 1.1 0 0 1 1.6.2l2.9 4.3c.6.8-.2 1.9-1.2 1.6L5.2 9.5c-.6-.2-.9-1-.1-1.3z"/></svg>',
  Nextdoor: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.6 8.2L16.1 17H7.9L6.4 8.2A8 8 0 0 1 12 6c2.2 0 4.2.9 5.6 2.2zm-9.5 1 1 5.8h5.8l1-5.8A7.4 7.4 0 0 0 12 8.4a7.4 7.4 0 0 0-3.9.9z"/></svg>',
  Threads: '<svg viewBox="0 0 192 192" aria-hidden="true" focusable="false"><path d="M141.5 89a66.7 66.7 0 0 0-2.5-1.2c-1.5-27.3-16.4-43.2-41.5-43.4h-.3c-15 0-27.4 6.4-35.1 18l13.8 9.5c5.7-8.7 14.7-10.5 21.3-10.5h.2c8.3 0 14.5 2.5 18.5 7.1 2.9 3.4 4.9 8.1 5.9 14-7.3-1.2-15.2-1.6-23.7-1.1-23.8 1.4-39.1 15.3-38.1 34.6.5 9.8 5.4 18.2 13.7 23.7 7 4.7 16.1 6.9 25.6 6.4 12.5-.7 22.2-5.4 29-14.1 5.2-6.6 8.5-15.2 9.9-25.9 5.9 3.6 10.3 8.3 12.8 14 4.1 9.6 4.4 25.5-8.5 38.4-11.3 11.3-24.9 16.2-45.5 16.4-22.8-.2-40.1-7.5-51.3-21.7C35.2 140 29.8 120.7 29.6 96c.2-24.7 5.6-44 16.1-57.3C57 24.4 74.2 17.1 97 16.9c23 .2 40.5 7.5 52.2 21.8 5.7 7 10 15.9 12.9 26.2l16.1-4.3c-3.4-12.7-8.9-23.6-16.2-32.7C147 10.2 125.2.2 97.1 0h-.1C68.9.2 47.3 10.2 32.8 29.8 19.9 47.2 13.2 71.8 13 95.9v.2c.2 24.1 6.9 48.7 19.8 66.1 14.5 19.6 36.1 29.6 64.2 29.8h.1c25.2-.2 43.1-6.8 57.7-21.4 19.3-19.3 18.6-43.4 12.3-58.2-4.6-10.7-13.6-19.4-25.6-24.4zm-44 41.4c-10.4.6-21.3-4.1-21.8-14.3-.4-7.5 5.4-15.9 22.6-16.9l5.5-.1c6.3 0 12.1.6 17.4 1.8-2 24.7-13.6 28.9-23.7 29.5z"/></svg>',
};

function footer() {
  const year = new Date().getFullYear();
  const socials = site.social.filter((s) => socialIcons[s.name]);
  const link = (href, label) => html`<li><a href="${href}">${label}</a></li>`;

  return html`<footer class="site-footer">
  <div class="container">
    <div class="site-footer__lead">
      <div class="site-footer__brand">
        <a href="/" aria-label="${site.name}, home">
          <picture><source type="image/webp" srcset="/images/opt/logo.webp"><img src="/images/IronVoltElectricFinal2.png" alt="${site.name}" width="440" height="143" loading="lazy"></picture>
        </a>
        <p class="site-footer__tagline">${site.tagline}</p>
      </div>
      <p class="site-footer__about">Licensed electrical contractor for homes and businesses in Spring and across Greater Houston.</p>
    </div>

    <nav class="site-footer__nav" aria-label="Footer">
      <div class="footer-col">
        <h2 class="footer-col__title">Residential</h2>
        <ul>${residentialServices.filter((s) => s.group === 'residential').map((s) => link(`/services/${s.slug}`, s.name))}</ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Commercial</h2>
        <ul>
          ${link('/services/commercial', 'Commercial electrical')}
          ${link('/services/inspections', 'Inspections &amp; code corrections')}
          ${link('/services/emergency', '24/7 emergency service')}
          ${link('/services/', 'All services')}
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Service area</h2>
        <ul>
          ${areas.map((a) => link(`/service-area/${a.slug}`, a.name))}
          ${link('/service-area/', 'All areas')}
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Company</h2>
        <ul>
          ${link('/about', 'About')}
          ${link('/reviews', 'Reviews')}
          ${link('/contact', 'Contact')}
          ${link('/booking', 'Request service')}
          ${link('/privacy', 'Privacy policy')}
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">Contact</h2>
        <dl class="footer-facts">
          <div><dt>Phone and text</dt><dd><a class="tnum" href="${site.phoneHref}">${site.phone}</a></dd></div>
          <div class="footer-facts__wide"><dt>Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
          <div><dt>Office</dt><dd>${site.hours.short}</dd></div>
          <div><dt>Emergency line</dt><dd>24 hours, 7 days</dd></div>
          <div><dt>License</dt><dd>${site.license.short} · <a href="${site.license.verifyUrl}" target="_blank" rel="noopener noreferrer">Verify<span class="visually-hidden"> with TDLR (opens in a new tab)</span></a></dd></div>
        </dl>
      </div>
    </nav>

    <div class="site-footer__bottom">
      <p>&copy; ${year} ${site.legalName}. ${site.license.full}.</p>
      <ul class="social-links">
        ${socials.map((s) => html`<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${site.name} on ${s.name}">${socialIcons[s.name]}</a></li>`)}
      </ul>
    </div>
  </div>
</footer>`;
}

function mobileActions() {
  return html`<div class="mobile-actions" data-mobile-actions>
  <a class="button button--primary" href="${site.phoneHref}">${icon('phone')}Call now</a>
  <a class="button button--outline-inverse" href="/booking">Request service</a>
</div>`;
}

export { regions };
