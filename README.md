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
| `--ink` | `#10161f` | Dark sections, header |
| `--ink-strong` | `#0a0f16` | Footer |
| `--surface` | `#ffffff` | Default page background |
| `--surface-alt` | `#f5f4f1` | Alternating band |
| `--text` / `--text-muted` | `#171c24` / `#55606e` | Text on light (17.1:1, 6.4:1) |
| `--on-dark` / `--on-dark-muted` / `--on-dark-subtle` | `#ffffff` / `#b8c0cb` / `#8c96a4` | Text on dark (21:1, 9.9:1, 6.1:1) |
| `--accent` | `#e8a020` | The logo gold |
| `--accent-strong` | `#8a5b0d` | Gold **text** on light surfaces |

Every text colour above clears WCAG AA (4.5:1) on the surfaces it is used on.

**`--accent` is a fill, not a text colour, on light backgrounds.** It only reaches
2.2:1 on white. For gold-coloured text on a light surface use `--accent-strong`
(5.9:1). On `--ink`, `--accent` is 8.2:1 and safe as text.

Colour carries meaning: gold means "this is the action", red means emergency,
green means a completed booking. It is not used to make sections look livelier.

### Type

Archivo for headings, IBM Plex Sans for text. Nine sizes, `--text-xs` through
`--text-4xl`; three line-heights, `--leading-tight|snug|normal`; four weights,
400 to 700. Headings are sentence case.

### Spacing, radius, elevation

`--space-1` (4px) through `--space-9` (96px), on a 4px base. Three radii:
`--radius-sm` (4px) for controls, `--radius` (8px) for cards and buttons,
`--radius-lg` (16px) for media panels. One shadow, used only to lift a card on
hover; everything else is separated with hairlines.

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
- **`.section-header`** is left-aligned. There is no eyebrow badge and no rule
  under the heading.

Icons are inline SVG on a 24px grid with a 1.5px stroke, sized through `.icon`,
`.icon-sm` (15px) and `.icon-lg` (24px). No icon library.

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
