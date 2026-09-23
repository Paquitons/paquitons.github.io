/* ============================================================
   HTML HELPERS
   A tagged template that flattens arrays and drops false/null,
   so page code can write `${cond && html`...`}` and
   `${items.map(...)}` without join('') noise.

   Content in this site is authored by us, so interpolations are
   not escaped by default. Use esc() for anything that ends up in
   an attribute or comes from data that might contain quotes.
   ============================================================ */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function html(strings, ...values) {
  let out = '';
  strings.forEach((str, i) => {
    out += str;
    if (i < values.length) out += flatten(values[i]);
  });
  return out;
}

function flatten(value) {
  if (value === false || value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.map(flatten).join('');
  return String(value);
}

export function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ------------------------------------------------------------
   RESPONSIVE IMAGES
   Reads images/opt/manifest.json (written by
   scripts/optimize-images.py) and writes a <picture> with WebP
   sources, the original JPEG as fallback, and the intrinsic
   width/height so the layout never shifts.
   ------------------------------------------------------------ */
const manifestPath = fileURLToPath(new URL('../../images/opt/manifest.json', import.meta.url));
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

export function picture(key, {
  alt,
  sizes = '100vw',
  className = '',
  eager = false,
  priority = false,
} = {}) {
  const img = manifest[key];
  if (!img) throw new Error(`Unknown image key "${key}". Add it to scripts/optimize-images.py.`);
  if (alt === undefined) throw new Error(`Image "${key}" needs alt text (use "" if decorative).`);

  const srcset = img.webp.map((v) => `${v.src} ${v.w}w`).join(', ');
  return html`<picture${className ? ` class="${className}"` : ''}>
    <source type="image/webp" srcset="${srcset}" sizes="${sizes}">
    <img src="${img.fallback}" alt="${esc(alt)}" width="${img.width}" height="${img.height}"
         ${eager ? '' : 'loading="lazy" '}decoding="async"${priority ? ' fetchpriority="high"' : ''}>
  </picture>`;
}

/** Preload hint for the page's LCP image. */
export function preloadImage(key, sizes = '100vw') {
  const img = manifest[key];
  const srcset = img.webp.map((v) => `${v.src} ${v.w}w`).join(', ');
  return `<link rel="preload" as="image" type="image/webp" imagesrcset="${srcset}" imagesizes="${sizes}" fetchpriority="high">`;
}

/* ------------------------------------------------------------
   ICONS
   Inline SVG on a 24px grid, 2px stroke, drawn with currentColor.
   The set is deliberately small: icons mark a type of contact
   or a state, they are not decoration for every heading.
   ------------------------------------------------------------ */
const paths = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path class="icon-open" d="M3 6h18M3 12h18M3 18h18"/><path class="icon-close" d="M6 6l12 12M18 6 6 18"/>',
};

export function icon(name, className = '') {
  const d = paths[name];
  if (!d) throw new Error(`Unknown icon "${name}"`);
  return `<svg class="icon${className ? ' ' + className : ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
}
