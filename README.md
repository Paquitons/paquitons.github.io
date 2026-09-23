# Iron Volt Electric

The website for Iron Volt Electric LLC, a licensed electrical contractor (TECL #41098)
based in Spring, Texas and serving Greater Houston. Served from GitHub Pages at
[www.ironvoltelectric.com](https://www.ironvoltelectric.com).

## What the site is for

Someone who needs an electrician lands here and decides, in under a minute, whether
to call. Every page is built to answer their questions in the order they ask them:

1. **Who are you?** A licensed electrical contractor, residential and commercial.
2. **Where do you work?** Spring and Greater Houston, with the towns named.
3. **What do you do?** Services, each with its own page.
4. **How do I reach you?** Phone number visible on every screen; request form two clicks away.
5. **Why should I trust you?** License number with a link to verify it, insurance, written
   estimates, real job photos, Google reviews.

If a change doesn't help with one of those, it doesn't belong. The same goes for repetition: each fact appears once per screen. Section labels that repeat their heading, fact strips that repeat the header, a footer that repeats the band above it, all came out for that reason.

## How it's built

Plain HTML, CSS and JavaScript. The HTML is **generated** from `src/` by a small Node
script with no dependencies, and the output is committed, so GitHub Pages serves static
files with no build step on its side.

```sh
npm run build     # or: node scripts/build.mjs
npm run serve     # build, then serve on http://localhost:8000
```

`npm run serve` resolves URLs the way GitHub Pages does (`/about` serves `about.html`,
`/services/` serves `services/index.html`, a missing path serves `404.html`), so every
link works locally as it will in production.

**Edit `src/`, not the generated `.html` files.** Each generated file says so in its
`<head>`. The build also checks every internal link and `#anchor` and fails if one is
broken.

```
src/
  site.mjs              Business facts: phone, email, license, hours, towns. One place.
  data/services.mjs     Content for each service page
  data/areas.mjs        Content for each town page
  layout.mjs            <head>, utility bar, header, footer, mobile action bar
  components.mjs        Blocks used on more than one page (page header, FAQ, CTA, form…)
  schema.mjs            JSON-LD structured data, built from site.mjs
  templates/service.mjs One service page
  templates/area.mjs    One town page
  pages/*.mjs           Home, services hub, service-area hub, about, contact,
                        reviews, privacy, 404
  lib/html.mjs          Template helper, responsive <picture>, icon set
scripts/
  build.mjs             Renders the site, writes sitemap.xml and robots.txt, checks links
  optimize-images.py    Makes WebP derivatives of photos (needs Pillow)
css/styles.css          The design system. The only stylesheet.
js/main.js              Navigation, mobile action bar, lazy reviews embed, chat-widget fix
js/form.js              Request form validation and submission
fonts/                  Archivo, self-hosted and subset
```

### Pages

| URL | Source |
|---|---|
| `/` | `src/pages/home.mjs` |
| `/services/` and `/services/<service>` | `pages/services-index.mjs`, `templates/service.mjs` + `data/services.mjs` |
| `/service-area/` and `/service-area/<town>` | `pages/service-area-index.mjs`, `templates/area.mjs` + `data/areas.mjs` |
| `/about`, `/contact`, `/reviews`, `/privacy`, `/404` | `src/pages/` |
| `/booking` | Redirect to the request form on `/contact#request`, kept for old links |
| `/servicearea` | Redirect to `/service-area/`, kept for old links |
| `/review` | Redirect to the Google review form (hand-written, not generated) |

The old single-page anchors (`/services#panels`, `#ev`, `#repairs`…) still land on the
matching row of the services hub.

### Common edits

- **Phone, email, hours, license:** `src/site.mjs`, then build.
- **A service's copy:** its entry in `src/data/services.mjs`. A page renders only the
  blocks its entry provides (signs, options, table, gallery, safety, FAQ…), so services
  don't all look the same. Section backgrounds alternate automatically.
- **A new town page:** add an entry to `src/data/areas.mjs` and a `slug` to that town in
  `regions` in `src/site.mjs`. A town page has to say something true about that town
  that isn't true of the next one; if the copy would still read correctly with the name
  swapped, don't publish it.
- **A new photo:** add it under `images/`, give it a key in `scripts/optimize-images.py`,
  run `npm run images`, then use `picture('key', { alt: '…' })`. The build refuses an
  image without alt text.

## Content rules

The business is new (founded January 2026); the lead electrician's 25 years of field
experience is not. Always say both, and never let "25 years" read as the age of the
company.

Nothing is published that the business hasn't supplied or that isn't general, verifiable
electrical practice: no invented review counts, ratings, awards, statistics, customer
names or prices. The only prices on the site are the recessed-lighting figures the
business provided. Structured data carries no ratings.

Copy is American English, direct, and specific. "Written estimate before work starts" is
a claim; "unmatched quality" is not.

## Design system

Everything is a custom property at the top of `css/styles.css`, organized in cascade
layers (`reset, tokens, base, layout, components, utilities`). Components use semantic
tokens (`--color-text-muted`, `--color-accent`), never raw palette values.

**Color.** Navy `#060e1a` and amber `#e8a020` are the brand. The page is warm cream
`#faf8f5`, not white. Amber marks action (buttons, links, active states); red marks
emergency; nothing else gets a color of its own. Amber is a fill on light surfaces; for
amber *text* on light use `--color-accent-text` (`#8a5b0d`, 5.9:1). Dark sections are
`.surface-dark`, which also re-point the text and border tokens, so
components don't need dark variants.

**Type.** Archivo only, self-hosted as one variable file (weights 400–900, widths
75–100%) plus a tiny italic cut for the tagline. `h1`/`h2` are condensed heavy capitals,
which is the brand; body copy is regular width. Ten sizes, fluid from phone to desktop.

**Space and shape.** 4px spacing scale, fluid section spacing, one column gap (`--split-gap`) for every two-column layout so heading rows and the content under them share the same edges, radii of 2, 4 and 6px.
Content is separated with rules, not shadows; shadows are only for things that float
(menu, form panel, mobile bar).

**Breakpoints.** 30em, 45em, 60em and 75em (480, 720, 960, 1200px). Nothing else.

**Motion.** Hover changes color or adds an underline; nothing moves, fades or disappears. A 1px button press. No status dots, no scroll
animations, carousels or tickers. Everything is disabled under
`prefers-reduced-motion`, and nothing depends on it.

### Components

Named for what they do. There is deliberately no generic "card".

| Component | Use |
|---|---|
| `.utility-bar` | Emergency availability, hours, license. Static; no phone number, since the header carries it. |
| `.site-header`, `.site-nav`, `.mega` | Header; the phone number is in it at every width, and nowhere else in the page chrome. The services menu is names only, sized to its content (about a third of the screen); it opens from its button, or on hover after a 90ms beat so it doesn't flash when the pointer crosses the nav. Below 1200px the nav is a drawer. |
| `.site-footer` | One grid: the logo centered with the tagline under it, five link columns on one top line, one line of small print. It never repeats the closing CTA band above it. |
| `.hero` | Home only. Split: brand, what and where, two actions, a real job photo. |
| `.credentials` | License, insurance, estimates, emergency line. Four, so it sits as 4 across or 2×2. |
| `.page-header` | Inner pages. Variants: `--media`, `--portrait`, `--compact`, `--emergency`. |
| `.service-feature` + `.service-index` | Home services: one featured with a photo, the rest as an index. |
| `.service-directory` | Services hub: name, summary, scope, link. |
| `.feature-band` | Photo beside text. |
| `.emergency` | An open section like the others: heading, one red call button, and the warning signs in two columns under a red rule. Not a boxed alert. |
| `.process` | Numbered steps (`<ol>`). |
| `.options` | Two-way comparison. |
| `.callout` | Safety information; `--emergency` variant. |
| `.data-table`, `.spec-list`, `.tick-list`, `.hazard-list` | Tables and lists. |
| `.gallery` | Real job photos, plain grid. |
| `.focus-list` | Three or four short points with a heavy rule. |
| `.town-links`, `.region-grid` | Service area. |
| `.faq` | Native `<details name>`: an exclusive accordion without JavaScript. |
| `.cta-band` | Page close: reason on the left, the same Call / Request service button pair as the hero on the right. |
| `.form-panel`, `.field`, `.form-more` | The request form. Optional fields live in a disclosure. |
| `.mobile-actions` | Call / Request bar on phones. |
| `.button` | `--primary`, `--outline`, `--outline-inverse`, `--emergency`; `--lg`, `--block`. Minimum 48px tall. |

## Behaviour

- **Mobile action bar** appears only after the page header's own buttons scroll away,
  hides while the footer is on screen and while someone is typing in a form, and pads the
  page so it never covers content.
- **Request form** (on `/contact`; every "Request service" button links to
  `site.requestHref`) posts the same field names to the same endpoint as before. It asks
  for one Name, which `js/form.js` splits into `firstName`/`lastName` (a single word
  sends `lastName=(not given)`), and states consent under the button instead of a
  checkbox, sending `terms=on` as the old ticked box did. It carries `novalidate`; `js/form.js` is the only validation, with
  messages tied to fields through `aria-describedby` and `aria-invalid`, and a summary
  in a `role="alert"` region. reCAPTCHA v3 loads on first interaction with the form,
  not on page load; its badge is hidden because the required notice is printed under
  the submit button.
- **Reviews** use the existing Common Ninja widget (Google reviews). Its script loads when
  the section nears the viewport. If the widget hasn't drawn anything after ten seconds,
  the reserved space collapses to a link to the Google profile.
- **Rosie chat widget** fixes itself bottom-right over the mobile action bar. The element
  that carries the fixed position is inside the widget's shadow root, so `js/main.js`
  reaches in and moves it up on phones. A plain CSS rule on `<rosie-widget>` does nothing.

## Accessibility

Skip link; one `<h1>` per page and no skipped heading levels; landmarks for everything;
one visible `:focus-visible` style; disclosure buttons with `aria-expanded`; Escape
closes menus and returns focus; touch targets at least 44px; every text color clears
WCAG AA on its background; meaningful alt text on every photo (the build enforces it);
reduced motion respected.

## SEO

Unique title and description per page, canonical URLs, clean extensionless URLs,
`sitemap.xml` and `robots.txt` generated on build, and JSON-LD for the business
(`Electrician`, with license credential, hours, service area and profiles), each service
(`Service`), breadcrumbs and FAQs. No ratings in structured data.

## Images

Photos are job photos supplied by the business. `scripts/optimize-images.py` writes
WebP copies at 480, 800 and 1200px to `images/opt/` plus a manifest the build reads, so
every image is a `<picture>` with `srcset`, `sizes`, `width` and `height`. Only the
first-screen image loads eagerly. `images/og-iron-volt-electric.jpg` is the social share
card, cropped from the standby generator job.

Two rules for photos:

- **No faces.** The hero photo (`panel-test-hands`) is a crop of `images/Untitled-4.jpg`
  that keeps the hands, meter and panel. Crops are defined in the image script, which
  writes a cropped JPEG fallback too, so the uncropped original is never served.
- **Nothing staged or edited.** `images/ironvoltvan.jpg` is a mock-up, not a photo of
  a real van, and must not be used anywhere, including social cards.

`images/electric-panel-replacement.jpg` is a stock photo of European equipment and is
deliberately not used. The `residential.jpg` and `commercial.jpg` collages are no longer
used either.

## Third-party services

- Common Ninja reviews embed (`/`, `/reviews`)
- Rosie chat widget (every page)
- reCAPTCHA v3 (`/contact`, on interaction)
- Booking endpoint: `https://ironvolt.omnemarchy.online/booking`
