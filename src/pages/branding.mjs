/* ============================================================
   BRAND GUIDELINES  /branding

   The source of truth is the Iron Volt brand folder (the
   ironvoltbranding repository: Logos/PNG and BusinessCard) plus
   what the owner has specified directly (the logo typefaces).
   Colours were sampled from those files; the business-card fonts,
   sizes and tracking were read from its Photoshop layers.

   Anything the brand files don't cover (clear space, minimum
   size, misuse) is marked as a recommended standard, never
   presented as an established rule. The images come from
   scripts/brand-assets.py.
   ============================================================ */

import { readFileSync } from 'node:fs';
import { html, icon, picture } from '../lib/html.mjs';
import { site } from '../site.mjs';
import { pageHeader } from '../components.mjs';
import { breadcrumbSchema } from '../schema.mjs';

const sizes = JSON.parse(readFileSync(new URL('../../images/brand/sizes.json', import.meta.url), 'utf8'));

/** A brand image with its real width and height. */
function brandImg(slug, alt, { className = '', lazy = true, style = '' } = {}) {
  const [w, h] = sizes[slug];
  return html`<img src="/images/brand/${slug}.webp" alt="${alt}" width="${w}" height="${h}"${className ? ` class="${className}"` : ''}${style ? ` style="${style}"` : ''}${lazy ? ' loading="lazy"' : ''} decoding="async">`;
}

/* Where a rule comes from. Every rule on the page carries one. */
const SOURCE = html`<span class="bg-tag bg-tag--source">Brand files</span>`;
const STANDARD = html`<span class="bg-tag bg-tag--standard">Recommended standard</span>`;
const WEBSITE = html`<span class="bg-tag bg-tag--site">Website</span>`;

const SECTIONS = [
  ['logo', 'Logo'],
  ['variations', 'Logo variations'],
  ['spacing', 'Clear space and size'],
  ['backgrounds', 'Backgrounds'],
  ['misuse', 'Logo misuse'],
  ['color', 'Color'],
  ['type', 'Typography'],
  ['tagline', 'Tagline'],
  ['ui', 'Website UI'],
  ['photography', 'Photography'],
  ['print', 'Business card'],
  ['open', 'Open items'],
  ['downloads', 'Downloads'],
];

function sectionHead(id, lead) {
  const n = SECTIONS.findIndex(([s]) => s === id) + 1;
  const title = SECTIONS[n - 1][1];
  return html`<header class="bg-head">
  <p class="bg-head__num">${String(n).padStart(2, '0')}</p>
  <h2 id="${id}-title">${title}</h2>
  ${lead && html`<p class="bg-head__lead">${lead}</p>`}
</header>`;
}

/* ------------------------------------------------------------
   Logo variations, as they exist in Logos/PNG
   bg: which background the artwork itself works on.
   ------------------------------------------------------------ */
const VARIANTS = [
  {
    slug: 'logo-primary', name: 'Primary logo', file: 'IronVoltElectricFinal2.png', bg: 'dark',
    note: 'IRONVOLT inside a silver outline frame, ELECTRIC underneath between two rules. The inside of the frame is transparent. Used on the website, in emails and on the business card.',
  },
  {
    slug: 'logo-filled', name: 'Primary, navy fill', file: 'IronVoltElectricFinalBG.png', bg: 'dark',
    note: 'The same lockup with the frame filled Iron Volt Navy. ELECTRIC stays silver.',
  },
  {
    slug: 'logo-light', name: 'Primary, for light backgrounds', file: 'IronVoltElectricFinalBlue.png', bg: 'light',
    note: 'Navy fill, and ELECTRIC and its rules set in navy. The only full lockup that reads on white.',
  },
  {
    slug: 'logo-open', name: 'Open', file: 'IronVoltElectricFinalNoBorder.png', bg: 'dark',
    note: 'No frame. IRONVOLT and ELECTRIC only, with silver rules.',
  },
  {
    slug: 'logo-open-gold', name: 'Open, gold rules', file: 'IronVoltElectricFinalNoBorderYellowLines.png', bg: 'dark',
    note: 'No frame, with the rules beside ELECTRIC in gold.',
  },
  {
    slug: 'wordmark', name: 'Wordmark', file: 'IronVoltSmallerBolt.png', bg: 'dark',
    note: 'The framed IRONVOLT without ELECTRIC, for wide, short spaces.',
  },
  {
    slug: 'wordmark-filled', name: 'Wordmark, navy fill', file: 'IronVoltSmallerBoltBlueBG.png', bg: 'both',
    note: 'The wordmark with a navy-filled frame. Reads on light and dark.',
  },
  {
    slug: 'badge', name: 'Badge', file: 'IronVoltElectricBadge.png', bg: 'both',
    note: 'The lockup on a textured navy hexagon with a white border. The IRONVOLT bar runs past the hexagon’s edges.',
  },
  {
    slug: 'badge-slim', name: 'Badge, contained', file: 'IronVoltElectricBadgeSmaller.png', bg: 'both',
    note: 'The same badge with the IRONVOLT bar kept inside the hexagon.',
  },
  {
    slug: 'badge-outline', name: 'Badge, outline', file: 'IronVoltElectricBadgeTransparent.png', bg: 'dark',
    note: 'White hexagon outline with a transparent inside.',
  },
  {
    slug: 'badge-square', name: 'Badge on navy tile', file: 'IronVoltElectricBadgeBlueBGSmaller.png', bg: 'both',
    note: 'The badge on a solid navy tile. The website uses it as the home-screen icon.',
  },
  {
    slug: 'bolt', name: 'Bolt', file: 'Volt.png', bg: 'dark',
    note: 'The lightning bolt from the V in VOLT, on its own, in the gold gradient.',
  },
];

const BG_LABEL = { dark: 'Dark backgrounds', light: 'Light backgrounds', both: 'Light or dark' };

function variantCard(v) {
  const tall = sizes[v.slug][1] > sizes[v.slug][0] * 0.6;
  return html`<figure class="bg-variant">
  <div class="bg-stage bg-stage--${v.bg}${tall ? ' bg-stage--tall' : ''}">
    ${brandImg(v.slug, `${v.name}: Iron Volt Electric logo`)}
  </div>
  <figcaption class="bg-variant__meta">
    <p class="bg-variant__name">${v.name}</p>
    <p class="bg-variant__note">${v.note}</p>
    <dl class="bg-specs bg-specs--inline">
      <div><dt>Works on</dt><dd>${BG_LABEL[v.bg]}</dd></div>
      <div><dt>File</dt><dd><code>${v.file}</code></dd></div>
    </dl>
    <a class="link-arrow" href="/images/brand/${v.slug}.png" download>Download PNG ${icon('arrow')}</a>
  </figcaption>
</figure>`;
}

/* ------------------------------------------------------------
   Colour
   ------------------------------------------------------------ */
const BRAND_COLORS = [
  { name: 'Iron Volt Navy', hex: '#19214C', rgb: '25, 33, 76', ink: '#fff', where: 'Filled frames and badges, and the business card background.' },
  { name: 'Volt Gold', hex: '#EBC81A', rgb: '235, 200, 26', ink: '#19214C', where: 'VOLT and the bolt. The logo gold is a gradient from this to the highlight below.' },
  { name: 'Volt Gold highlight', hex: '#F4E099', rgb: '244, 224, 153', ink: '#19214C', where: 'The light end of the gold gradient on VOLT and the bolt.' },
  { name: 'Print Gold', hex: '#FFD200', rgb: '255, 210, 0', ink: '#19214C', where: 'The tagline and gold text on the business card.' },
  { name: 'Iron Silver', hex: '#CBCBCB', rgb: '203, 203, 203', ink: '#19214C', where: 'IRON, the frame and ELECTRIC. A gradient through #E5E5E5 to white.' },
  { name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255', ink: '#19214C', where: 'Text and rules on the business card.', border: true },
];

const WEB_COLORS = [
  { name: 'Night Navy', hex: '#060E1A', token: '--navy-950', ink: '#fff', where: 'Header, footer, dark sections, emails.' },
  { name: 'Website Gold', hex: '#E8A020', token: '--gold-500', ink: '#060E1A', where: 'Primary buttons, accents, focus rings.' },
  { name: 'Gold text', hex: '#8A5B0D', token: '--gold-700', ink: '#fff', where: 'Gold used as text on light backgrounds.' },
  { name: 'Ink', hex: '#121A26', token: '--ink-900', ink: '#fff', where: 'Body text and headings.' },
  { name: 'Cream', hex: '#FAF8F5', token: '--cream-50', ink: '#121A26', where: 'Page background.', border: true },
  { name: 'Stone', hex: '#F2EFE9', token: '--stone-100', ink: '#121A26', where: 'Alternate section background.', border: true },
  { name: 'Emergency Red', hex: '#C62828', token: '--red-600', ink: '#fff', where: 'Emergency calls to action only.' },
];

function swatch(c, { web = false } = {}) {
  return html`<li class="bg-swatch">
  <div class="bg-swatch__chip${c.border ? ' bg-swatch__chip--bordered' : ''}" style="background:${c.hex};color:${c.ink};">
    <span>${c.hex}</span>
  </div>
  <div class="bg-swatch__meta">
    <p class="bg-swatch__name">${c.name}</p>
    <dl class="bg-specs">
      <div><dt>HEX</dt><dd><code>${c.hex}</code> <button class="bg-copy" type="button" data-copy="${c.hex}" aria-label="Copy ${c.hex}">Copy</button></dd></div>
      ${web ? html`<div><dt>Token</dt><dd><code>${c.token}</code></dd></div>` : html`<div><dt>RGB</dt><dd><code>${c.rgb}</code></dd></div>`}
    </dl>
    <p class="bg-swatch__where">${c.where}</p>
  </div>
</li>`;
}

/* ------------------------------------------------------------
   Page
   ------------------------------------------------------------ */
export function brandingPage() {
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Brand guidelines' }];

  const main = html`
${pageHeader({
    crumbs,
    title: 'Brand guidelines',
    lead: 'How the Iron Volt Electric logo, colors, type and imagery are used, taken from the brand files. A reference for anyone making something with the Iron Volt name on it.',
    media: brandImg('logo-primary', 'Iron Volt Electric primary logo', { lazy: false }),
    actions: false,
  })}

<div class="bg-legend">
  <div class="container bg-legend__inner">
    <p class="bg-legend__title">How to read this guide</p>
    <ul class="bg-legend__list">
      <li>${SOURCE} Taken from the Iron Volt brand files, or specified by the owner.</li>
      <li>${WEBSITE} How the website applies the brand today.</li>
      <li>${STANDARD} A common design standard, filling a gap the brand files don’t cover. Not an established Iron Volt rule.</li>
    </ul>
  </div>
</div>

<div class="container bg-layout">
  <nav class="bg-toc" aria-label="Brand guidelines sections">
    <p class="bg-toc__title">Contents</p>
    <ol>
      ${SECTIONS.map(([id, title], i) => html`<li><a href="#${id}"><span>${String(i + 1).padStart(2, '0')}</span>${title}</a></li>`)}
    </ol>
  </nav>

  <div class="bg-content">

    <!-- 01 LOGO -->
    <section class="bg-section" id="logo" aria-labelledby="logo-title">
      ${sectionHead('logo', 'One lockup: the IRONVOLT wordmark over ELECTRIC. The V in VOLT is cut by a lightning bolt.')}
      <div class="bg-stage bg-stage--dark bg-stage--hero">
        ${brandImg('logo-primary', 'Iron Volt Electric primary logo')}
      </div>
      <div class="bg-cols">
        <div>
          <h3 class="bg-sub">Anatomy ${SOURCE}</h3>
          <ol class="bg-anatomy">
            <li><span><strong>IRON</strong> in a silver gradient.</span></li>
            <li><span><strong>VOLT</strong> in a gold gradient, the V cut by the lightning bolt.</span></li>
            <li><span><strong>Wordmark</strong> set in Navine Semi Condensed Italic.</span></li>
            <li><span><strong>Frame</strong>: a slanted silver outline around IRONVOLT.</span></li>
            <li><span><strong>ELECTRIC</strong> in League Gothic Regular, widely tracked, between two short rules.</span></li>
          </ol>
        </div>
        <div>
          <h3 class="bg-sub">The name ${SOURCE}</h3>
          <p>The company is <strong>Iron Volt Electric</strong>, two words in running text, <strong>Iron Volt Electric LLC</strong> where the legal name is needed. The logo sets IRONVOLT as one word; that is lettering, not how the name is written.</p>
          <p class="bg-note">“Iron” is durability. “Volt” is the electricity. (From the About page.)</p>
        </div>
      </div>
    </section>

    <!-- 02 VARIATIONS -->
    <section class="bg-section" id="variations" aria-labelledby="variations-title">
      ${sectionHead('variations', html`Every version in the brand folder. Use the primary logo unless the space or background calls for another. ${SOURCE}`)}
      <div class="bg-variants">
        ${VARIANTS.map(variantCard)}
      </div>
    </section>

    <!-- 03 SPACING -->
    <section class="bg-section" id="spacing" aria-labelledby="spacing-title">
      ${sectionHead('spacing', html`The brand files don’t set clear space or minimum sizes. These follow common practice. ${STANDARD}`)}
      <div class="bg-cols">
        <div>
          <h3 class="bg-sub">Clear space</h3>
          <div class="bg-stage bg-stage--dark bg-stage--clear">
            <div class="bg-clear">
              ${brandImg('logo-primary', 'Primary logo with its clear space marked')}
              <span class="bg-clear__x bg-clear__x--top">x</span>
              <span class="bg-clear__x bg-clear__x--left">x</span>
            </div>
          </div>
          <p>Keep a margin of <strong>x</strong> on every side, where x is the height of the ELECTRIC letters. Nothing else (text, edges, other logos) goes inside it.</p>
        </div>
        <div>
          <h3 class="bg-sub">Minimum size</h3>
          <div class="bg-stage bg-stage--dark bg-minsizes">
            <figure>${brandImg('logo-primary', 'Primary logo at 140 pixels wide', { style: 'width:140px' })}<figcaption>Full logo<br>140 px · 1.25 in</figcaption></figure>
            <figure>${brandImg('wordmark', 'Wordmark at 96 pixels wide', { style: 'width:96px' })}<figcaption>Wordmark<br>96 px · 0.9 in</figcaption></figure>
            <figure>${brandImg('badge-slim', 'Badge at 48 pixels wide', { style: 'width:48px' })}<figcaption>Badge<br>48 px · 0.5 in</figcaption></figure>
            <figure>${brandImg('bolt', 'Bolt at 24 pixels tall', { style: 'height:24px;width:auto' })}<figcaption>Bolt<br>24 px tall</figcaption></figure>
          </div>
          <p>Below these sizes ELECTRIC stops being legible. Where the logo has to be smaller, use the wordmark, then the badge.</p>
        </div>
      </div>
    </section>

    <!-- 04 BACKGROUNDS -->
    <section class="bg-section" id="backgrounds" aria-labelledby="backgrounds-title">
      ${sectionHead('backgrounds', html`The silver and white in the logo need a dark background. On light backgrounds, use the navy-filled version. ${SOURCE}`)}
      <div class="bg-dodont">
        <figure class="bg-do">
          <div class="bg-stage bg-stage--dark">${brandImg('logo-primary', 'Primary logo on night navy')}</div>
          <figcaption>${icon('check')}Primary logo on navy.</figcaption>
        </figure>
        <figure class="bg-do">
          <div class="bg-stage bg-stage--brandnavy">${brandImg('logo-primary', 'Primary logo on Iron Volt Navy')}</div>
          <figcaption>${icon('check')}Primary logo on Iron Volt Navy, as on the business card.</figcaption>
        </figure>
        <figure class="bg-do">
          <div class="bg-stage bg-stage--light">${brandImg('logo-light', 'Light-background logo on white')}</div>
          <figcaption>${icon('check')}The light-background version on white.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--light">${brandImg('logo-primary', 'Primary logo on white, where IRON and ELECTRIC disappear')}</div>
          <figcaption>${icon('cross')}Primary logo on white: IRON, the frame and ELECTRIC disappear.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--dark">${brandImg('logo-light', 'Light-background logo on navy, where ELECTRIC disappears')}</div>
          <figcaption>${icon('cross')}The light-background version on navy: ELECTRIC disappears.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--gold">${brandImg('logo-primary', 'Primary logo on gold')}</div>
          <figcaption>${icon('cross')}Any logo on gold or a bright color: VOLT and the bolt are lost.</figcaption>
        </figure>
      </div>
    </section>

    <!-- 05 MISUSE -->
    <section class="bg-section" id="misuse" aria-labelledby="misuse-title">
      ${sectionHead('misuse', html`Use the artwork as supplied. ${STANDARD}`)}
      <div class="bg-dodont bg-dodont--4">
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--dark">${brandImg('logo-primary', 'Logo stretched out of proportion', { className: 'bg-misuse--stretch' })}</div>
          <figcaption>${icon('cross')}Don’t stretch or squash it.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--dark">${brandImg('logo-primary', 'Logo in the wrong colors', { className: 'bg-misuse--recolor' })}</div>
          <figcaption>${icon('cross')}Don’t recolor it.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--dark">${brandImg('logo-primary', 'Logo rotated', { className: 'bg-misuse--rotate' })}</div>
          <figcaption>${icon('cross')}Don’t rotate it.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--dark">${brandImg('logo-primary', 'Logo with a glow effect', { className: 'bg-misuse--glow' })}</div>
          <figcaption>${icon('cross')}Don’t add shadows, glows or outlines.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--dark"><p class="bg-misuse--retype" aria-label="The name retyped in another font">IRONVOLT</p></div>
          <figcaption>${icon('cross')}Don’t retype the wordmark in another font.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--photo">${picture('panelboards-pair', { alt: '', sizes: '20rem' })}${brandImg('logo-primary', 'Logo over a busy photograph', { className: 'bg-misuse--overlay' })}</div>
          <figcaption>${icon('cross')}Don’t place it over busy photos.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--dark bg-stage--crowd">${brandImg('logo-primary', 'Logo crowded by text')}<p>CALL NOW · FREE ESTIMATES</p></div>
          <figcaption>${icon('cross')}Don’t crowd it inside its clear space.</figcaption>
        </figure>
        <figure class="bg-dont">
          <div class="bg-stage bg-stage--dark bg-stage--rebuild">${brandImg('wordmark', 'Wordmark with ELECTRIC retyped beside it')}<p>ELECTRIC</p></div>
          <figcaption>${icon('cross')}Don’t rebuild or rearrange its parts.</figcaption>
        </figure>
      </div>
    </section>

    <!-- 06 COLOR -->
    <section class="bg-section" id="color" aria-labelledby="color-title">
      ${sectionHead('color', 'Two sets: the colors in the logo and print artwork, and the colors the website is built with. Sampled from the brand files and the site stylesheet.')}
      <h3 class="bg-sub">Brand colors ${SOURCE}</h3>
      <ul class="bg-swatches">${BRAND_COLORS.map((c) => swatch(c))}</ul>
      <div class="bg-gradients">
        <div>
          <div class="bg-gradient" style="background:linear-gradient(90deg,#EBC81A,#F4E099);"></div>
          <p><strong>Gold gradient</strong> · #EBC81A to #F4E099, on VOLT and the bolt</p>
        </div>
        <div>
          <div class="bg-gradient" style="background:linear-gradient(90deg,#CBCBCB,#E5E5E5,#FFFFFF);"></div>
          <p><strong>Silver gradient</strong> · #CBCBCB through #E5E5E5 to #FFFFFF, on IRON, the frame and ELECTRIC</p>
        </div>
      </div>
      <h3 class="bg-sub">Website colors ${WEBSITE}</h3>
      <ul class="bg-swatches bg-swatches--web">${WEB_COLORS.map((c) => swatch(c, { web: true }))}</ul>
      <p class="bg-note">The website’s navy and gold are darker and warmer than the logo’s. See <a href="#open">Open items</a>.</p>
    </section>

    <!-- 07 TYPE -->
    <section class="bg-section" id="type" aria-labelledby="type-title">
      ${sectionHead('type', 'Four typefaces in the brand artwork, one on the website. The specimens are cropped from the business card, so each is shown as it was actually set.')}
      <div class="bg-type">
        <article class="bg-type__row">
          <div class="bg-type__sample bg-stage--brandnavy">${brandImg('type-wordmark', 'IRONVOLT, set in Navine Semi Condensed Italic')}</div>
          <div class="bg-type__meta">
            <p class="bg-type__name">Navine Semi Condensed Italic ${SOURCE}</p>
            <p>The IRONVOLT wordmark. Logo only; never set text in it.</p>
          </div>
        </article>
        <article class="bg-type__row">
          <div class="bg-type__sample bg-stage--brandnavy">${brandImg('type-electric', 'ELECTRIC, set in League Gothic Regular')}</div>
          <div class="bg-type__meta">
            <p class="bg-type__name">League Gothic Regular ${SOURCE}</p>
            <p>ELECTRIC in the logo. All caps, tracking +250, flanked by rules.</p>
          </div>
        </article>
        <article class="bg-type__row">
          <div class="bg-type__sample bg-stage--brandnavy">${brandImg('type-tagline', 'WIRED RIGHT. DONE RIGHT., set in DIN Condensed Bold')}</div>
          <div class="bg-type__meta">
            <p class="bg-type__name">DIN Condensed Bold ${SOURCE}</p>
            <p>The tagline on the business card. All caps, tracking +40, Print Gold.</p>
          </div>
        </article>
        <article class="bg-type__row">
          <div class="bg-type__sample bg-stage--brandnavy">${brandImg('type-futura', 'Phone number in Futura Medium and email address in Futura Medium Italic')}</div>
          <div class="bg-type__meta">
            <p class="bg-type__name">Futura Medium and Medium Italic ${SOURCE}</p>
            <p>All other text on the business card: names, titles, contact details, the service list. Tracking +10 to +75.</p>
          </div>
        </article>
        <article class="bg-type__row">
          <div class="bg-type__sample bg-type__sample--web">
            <p class="bg-type__display">Electrical work for homes and businesses</p>
            <p class="bg-type__body">Licensed electricians serving Greater Houston. Free written estimates.</p>
          </div>
          <div class="bg-type__meta">
            <p class="bg-type__name">Archivo ${WEBSITE}</p>
            <p>The website’s only typeface, self-hosted. Headings: weight 800, width 82%, all caps. Body: weight 400, 17px, line height 1.6. Labels and buttons: weight 700–750, caps, letter-spacing 0.05–0.1em.</p>
          </div>
        </article>
      </div>
      <p class="bg-note">League Gothic and Archivo are free under the SIL Open Font License. Check the licenses for Navine, DIN Condensed and Futura before using them outside the existing artwork.</p>
    </section>

    <!-- 08 TAGLINE -->
    <section class="bg-section" id="tagline" aria-labelledby="tagline-title">
      ${sectionHead('tagline', html`<strong>WIRED RIGHT. DONE RIGHT.</strong> Two short sentences, each with its full stop. ${SOURCE}`)}
      <div class="bg-taglines">
        <figure>
          <div class="bg-stage bg-stage--brandnavy">${brandImg('type-tagline', 'Tagline on the business card')}</div>
          <figcaption><strong>Print</strong> · DIN Condensed Bold, all caps, Print Gold on navy, between white rules under the logo.</figcaption>
        </figure>
        <figure>
          <div class="bg-stage bg-stage--dark"><p class="bg-tagline-email">WIRED RIGHT. <span>DONE RIGHT.</span></p></div>
          <figcaption><strong>Email</strong> · bold, upright, all caps; WIRED RIGHT. in white, DONE RIGHT. in gold.</figcaption>
        </figure>
        <figure>
          <div class="bg-stage bg-stage--dark"><p class="site-footer__tagline bg-tagline-web">Wired right. <em>Done right.</em></p></div>
          <figcaption><strong>Website</strong> · Archivo heavy italic, all caps, white then gold.</figcaption>
        </figure>
      </div>
      <p>Always all caps, always both halves, in that order. When it is two-tone, the second half is the gold one.</p>
    </section>

    <!-- 09 UI -->
    <section class="bg-section" id="ui" aria-labelledby="ui-title">
      ${sectionHead('ui', html`The website’s components, shown live. ${WEBSITE}`)}

      <h3 class="bg-sub">Buttons</h3>
      <div class="bg-ui-row">
        <a class="button button--primary" href="#ui">${icon('phone')}Call ${site.phone}</a>
        <a class="button button--outline" href="#ui">Request service</a>
        <a class="button button--emergency" href="#ui">${icon('phone')}Emergency</a>
      </div>
      <div class="bg-ui-row surface-dark bg-ui-row--dark">
        <a class="button button--primary" href="#ui">${icon('phone')}Call ${site.phone}</a>
        <a class="button button--outline-inverse" href="#ui">Request service</a>
      </div>
      <dl class="bg-specs bg-specs--grid">
        <div><dt>Shape</dt><dd>4px corners, at least 48px tall</dd></div>
        <div><dt>Label</dt><dd>Archivo 700, caps, 0.05em spacing</dd></div>
        <div><dt>Primary</dt><dd>Website Gold, navy label. One per view.</dd></div>
        <div><dt>Emergency</dt><dd>Red. Emergency calls only.</dd></div>
      </dl>

      <h3 class="bg-sub">Links</h3>
      <div class="bg-ui-row">
        <a class="link-arrow" href="#ui">All services ${icon('arrow')}</a>
        <p class="prose bg-ui-inline">Links in running text are <a href="#ui">underlined in gold text</a>.</p>
      </div>

      <h3 class="bg-sub">Icons</h3>
      <div class="bg-ui-row bg-icons">
        ${['phone', 'mail', 'arrow', 'external', 'chevron', 'check', 'alert'].map((n) => html`<span class="bg-icon">${icon(n)}<span>${n}</span></span>`)}
      </div>
      <p>Line icons on a 24px grid, 2px stroke, round ends, drawn in the text color. Used to mark a type of contact or a state, never as decoration beside every heading.</p>

      <h3 class="bg-sub">Lists, rules and borders</h3>
      <div class="bg-cols">
        <ul class="rule-list">
          <li>100A to 200A service upgrades</li>
          <li>Federal Pacific and Zinsco panel replacement</li>
          <li>Permit, inspection and utility coordination</li>
        </ul>
        <dl class="bg-specs bg-specs--stack">
          <div><dt>List style</dt><dd>3px navy rule on top, 1px hairlines between rows. No bullets, checkmarks or icons.</dd></div>
          <div><dt>Borders</dt><dd>1px #E5E0D7 on light, 14% white on dark. 4px radius at most.</dd></div>
          <div><dt>Surfaces</dt><dd>Separated by rules and background changes, not shadows or boxed cards.</dd></div>
        </dl>
      </div>
    </section>

    <!-- 10 PHOTOGRAPHY -->
    <section class="bg-section" id="photography" aria-labelledby="photography-title">
      ${sectionHead('photography', html`Photos show Iron Volt’s own work, as it is. ${SOURCE}`)}
      <div class="bg-photos">
        ${picture('panel-test-hands', { alt: 'Testing a panel with a clamp meter; hands and equipment only', sizes: '(min-width: 60em) 18rem, 50vw' })}
        ${picture('generator-brick-home', { alt: 'Standby generator beside a brick house', sizes: '(min-width: 60em) 18rem, 50vw' })}
        ${picture('service-rack-meter', { alt: 'Meter and service rack on a commercial job', sizes: '(min-width: 60em) 18rem, 50vw' })}
        ${picture('foyer-chandelier', { alt: 'Chandelier installed in a foyer', sizes: '(min-width: 60em) 18rem, 50vw' })}
      </div>
      <div class="bg-cols">
        <div>
          <h3 class="bg-sub">Use</h3>
          <ul class="rule-list">
            <li>Real Iron Volt jobs: panels, meters, generators, lighting, finished installs.</li>
            <li>The work in focus. Hands and tools are fine.</li>
            <li>Photos as taken. Crop to frame the work; don’t tint, blur or filter.</li>
          </ul>
        </div>
        <div>
          <h3 class="bg-sub">Don’t use</h3>
          <ul class="rule-list">
            <li>Faces. Crop people out.</li>
            <li>Mock-ups or edited images, such as a logo pasted onto a vehicle.</li>
            <li>Stock photos, or equipment that isn’t used here.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 11 PRINT -->
    <section class="bg-section" id="print" aria-labelledby="print-title">
      ${sectionHead('print', html`The business card is the brand’s one print piece, and the clearest example of it applied. ${SOURCE}`)}
      <div class="bg-cards">
        <figure>${brandImg('card-front', 'Business card, front: logo, tagline, name, contact details and license number on navy')}<figcaption>Front</figcaption></figure>
        <figure>${brandImg('card-back', 'Business card, back: list of residential and commercial services on navy')}<figcaption>Back</figcaption></figure>
      </div>
      <dl class="bg-specs bg-specs--grid">
        <div><dt>Background</dt><dd>Iron Volt Navy, subtly textured</dd></div>
        <div><dt>Logo</dt><dd>Primary, centered at the top</dd></div>
        <div><dt>Tagline</dt><dd>DIN Condensed Bold, Print Gold</dd></div>
        <div><dt>Text</dt><dd>Futura Medium, white; gold for the service line</dd></div>
        <div><dt>Rules</dt><dd>Thin white lines between groups</dd></div>
        <div><dt>License</dt><dd>TECL #41098 on both sides</dd></div>
      </dl>
    </section>

    <!-- 12 OPEN ITEMS -->
    <section class="bg-section" id="open" aria-labelledby="open-title">
      ${sectionHead('open', 'Places where the brand files and the website disagree, or where something is missing. Each needs a decision rather than a guess.')}
      <ol class="bg-open">
        <li><span><strong>Two golds, two navies.</strong> The logo uses Volt Gold #EBC81A and the card Print Gold #FFD200; the website uses a warmer #E8A020. The logo’s navy is #19214C; the website’s is a near-black #060E1A.</span></li>
        <li><span><strong>Tagline style.</strong> The card and emails set it upright; the website sets it in italic.</span></li>
        <li><span><strong>Phone number format.</strong> The card writes (832)-610-8081; the website and emails write (832) 610-8081.</span></li>
        <li><span><strong>No vector logo.</strong> The brand folder has PNGs only. Large signs, vehicle graphics and embroidery need an SVG, AI or EPS master.</span></li>
        <li><span><strong>No print color values.</strong> There are no CMYK or Pantone values for printers; the business card was set in RGB.</span></li>
      </ol>
    </section>

    <!-- 13 DOWNLOADS -->
    <section class="bg-section" id="downloads" aria-labelledby="downloads-title">
      ${sectionHead('downloads', 'Web-sized PNGs with transparent backgrounds. Full-resolution originals are in the Iron Volt brand folder.')}
      <table class="bg-downloads">
        <thead><tr><th scope="col">Version</th><th scope="col">Works on</th><th scope="col"><span class="visually-hidden">Download</span></th></tr></thead>
        <tbody>
          ${VARIANTS.map((v) => html`<tr>
            <th scope="row">${v.name}</th>
            <td>${BG_LABEL[v.bg]}</td>
            <td><a class="link-arrow" href="/images/brand/${v.slug}.png" download>PNG ${icon('arrow')}</a></td>
          </tr>`)}
        </tbody>
      </table>
    </section>

  </div>
</div>
`;

  return {
    path: '/branding',
    title: 'Brand Guidelines | Iron Volt Electric',
    description: 'Iron Volt Electric brand guidelines: logo versions and usage, colors, typography, the tagline, website UI and photography.',
    schema: [breadcrumbSchema(crumbs)],
    main,
  };
}
