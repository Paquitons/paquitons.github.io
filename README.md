# Iron Volt Electric

The website for Iron Volt Electric LLC, a licensed electrical contractor serving
Greater Houston. Static HTML, CSS and vanilla JavaScript, served from GitHub Pages
at [www.ironvoltelectric.com](https://www.ironvoltelectric.com).

## What this site is for

It is a lead-generation site for a trade business, not a brochure. In priority order
it has to:

1. Put the phone number and the booking link within reach on every screen.
2. Let someone scan what we do and check whether we cover their address.
3. Establish that we are licensed and insured, with the number to verify it.

Every design decision below serves one of those three. If a change does not, it
does not belong.

## Structure

```
index.html         Home: hero, services, how we work, reviews, coverage, FAQ
services.html      Residential and commercial services, with spec lists
servicearea.html   Coverage map and towns by region
about.html         Company background, credentials, guarantees
contact.html       Ways to reach us, details, emergency callout, process
booking.html       Booking request form with client-side validation
reviews.html       Google reviews embed
privacy.html       Privacy policy
404.html           Not-found page
review.html        Redirect to the Google review form
css/styles.css     The whole design system. There is no other stylesheet.
js/main.js         Nav, FAQ accordion, slideshows, chat-widget positioning
js/booking.js      Booking form validation and submission
```

There are no inline `style` attributes and no per-page `<style>` blocks anywhere
in the site. If something needs styling, it gets a class in `css/styles.css`.

## Design system

Everything is defined as a custom property at the top of `css/styles.css`. Use the
tokens; do not introduce new raw values.

### Colour

Four surfaces, three text steps per surface, one accent.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#060e1a` | Dark sections, header |
| `--ink-deep` | `#04090f` | Footer |
| `--page` | `#faf8f5` | The page itself, warm cream |
| `--surface` | `#ffffff` | Cards sitting on the page |
| `--surface-alt` | `#f4f2ef` | Alternating band |
| `--text` / `--text-muted` | `#121a26` / `#57636f` | Text on light (17.5:1, 6.1:1) |
| `--on-dark` / `--on-dark-muted` / `--on-dark-subtle` | `#ffffff` / `#b3bcc9` / `#8793a3` | Text on dark (19.4:1, 10.1:1, 6.2:1) |
| `--gold` | `#e8a020` | The brand amber |
| `--gold-ink` | `#8a5b0d` | Amber **text** on light surfaces |

These are the colours the site has always used. They are not up for redesign.
The page background is warm cream, not white: pure white makes the whole site
read cold.

Every text colour above clears WCAG AA (4.5:1) on the surfaces it is used on.

**`--gold` is a fill, not a text colour, on light backgrounds.** It only reaches
2.2:1 on white. For amber text on a light surface use `--gold-ink` (5.9:1). On
`--ink`, the amber is 8.7:1 and safe as text.

**Amber is for buttons, links, icons and active markers only.** Structural rules
are near-black on light surfaces and `--rule-dark` on dark ones. An earlier pass
put thick amber rules under every heading, on every card edge and on every list
row, and the site turned into a wall of gold. Red means emergency, green means a
completed booking. Colour is never used to make a section look livelier.

### Type

One family, Archivo, at every size. Hierarchy comes from weight and case, not
from a second typeface. `h1`/`h2` are UPPERCASE at 900 with tight tracking and
0.96 line-height; `h3` is the component title, uppercase 800 at body size. Ten
sizes, `--text-2xs` through `--text-4xl`, and four line-heights.

The display type is the brand: the logo is heavy italic caps on a trade badge,
and the headings have to carry the same weight. Do not set them in sentence
case.

### Spacing, radius, elevation

`--space-1` (4px) through `--space-9` (80px), on a 4px base. Three radii, all
small: `--radius-sm` (2px), `--radius` (4px), `--radius-lg` (8px). This is a
trade brand; soft corners read as consumer software. One shadow, used only to
lift a card on hover; everything else is separated with visible rules.

### Motion

`--dur` (160ms) and `--dur-slow` (240ms) on `--ease`. Hover movement stays within
2px. There is no scroll-triggered animation anywhere on the site. Everything is
disabled under `prefers-reduced-motion`.

## Components

One component per job. Before adding a variant, check whether an existing one
already covers it.

- **`.btn`** with `.btn-primary` (gold), `.btn-outline` (light surfaces) and
  `.btn-ghost` (dark surfaces). Sizes `.btn-sm` / `.btn-lg` / `.btn-full`.
  Minimum target 44px.
- **`.card`** for discrete units of content. A list of claims is a list, not a
  row of boxes; use `.feature-list`, `.check-list` or `.spec-list` instead.
- **`.facts`** for licence, experience and hours claims. It replaced four
  components that all did this.
- **`.steps`** for the one process description, shared by contact and booking.
- **`.faq`** accordion. State lives in `aria-expanded` on the button; CSS keys
  off that attribute, so markup and presentation cannot drift apart.
- **`.section-header`** centres a heading and its supporting line on the page's
  middle axis. There is no eyebrow badge and no decorative rule under it.
- **`.hero`** puts the company van full-bleed behind the content, blurred and
  held back to 20% so it sets the scene without competing with the headline.

Icons are inline SVG on a 24px grid with a 2px stroke, sized through `.icon`
(20px), `.icon-sm` (15px) and `.icon-lg` (26px). No icon library.

## Accessibility

- Skip link is the first tab stop on every page.
- One `:focus-visible` treatment site-wide.
- All body text clears WCAG AA against its surface.
- The booking form validates in JavaScript, with messages tied to fields through
  `aria-describedby` and `aria-invalid`, and a summary in an `aria-live` region.
  (The form carries `novalidate` so it can show its own messages; that means the
  JavaScript is the only validation there is. Do not remove it.)
- Slideshow dots are real buttons with `aria-current` and accessible names.
- Motion is disabled under `prefers-reduced-motion`.

## Images

Source images are sized to roughly 2x their displayed dimensions and encoded as
JPEG, except the logo and badge, which need transparency and stay PNG. The whole
`images/` directory is about 4MB.

`ironvoltvan.jpg` is the hero backdrop, referenced from CSS rather than markup.

Before committing a new image, resize it. A 42px-tall header logo does not need
to be a 17431px-wide PNG, which is what it used to be.

Every `<img>` carries `width`, `height` and `loading="lazy"` so the browser
reserves the right box and nothing shifts as the page loads.

## Third-party embeds

- **Rosie** chat widget. It fixes itself to the bottom-right, where it covers the
  sticky mobile call-to-action. The element that actually carries the fixed
  position lives inside the widget's open shadow root, so styling the
  `<rosie-widget>` host does nothing; `js/main.js` reaches into the shadow root
  and pins the real container. Do not replace that with a plain CSS rule.
- **Common Ninja** reviews embed on the home and reviews pages.
- **reCAPTCHA v3** on the booking form.

## Local development

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. There is no build step.

Note that the site uses extensionless links (`href="services"`), which GitHub
Pages resolves but `http.server` does not. Add `.html` when clicking through
locally, or use a server that does extensionless resolution.

## Editing content

Phone number, email, hours and the TECL licence number appear in the shared
header and footer on every page, and in page copy. Search across all HTML files
when changing any of them.
