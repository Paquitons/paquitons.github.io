#!/usr/bin/env python3
"""
Brand assets for /branding.

Reads the brand files (the ironvoltbranding repository: Logos/PNG and
BusinessCard) and writes web-sized copies to images/brand/:

  <slug>.webp        preview shown on the page (1000px wide, trimmed)
  <slug>.png         download (1600px wide, 1024px for badges and the
                     bolt; trimmed, transparent)
  card-front.webp    business card, front
  card-back.webp     business card, back
  sizes.json         pixel size of every .webp, for width/height attributes
  type-*.webp        type specimens cropped from the business card
                     artwork, so each font is shown as it was set,
                     not re-typed in a font we'd have to license.

Usage:
  python3 scripts/brand-assets.py /path/to/ironvoltbranding

Needs Pillow. Run it again whenever a logo file changes.
"""

import json
import sys
from pathlib import Path
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'images' / 'brand'

# slug -> source file in Logos/PNG
LOGOS = {
    'logo-primary': 'IronVoltElectricFinal2.png',
    'logo-filled': 'IronVoltElectricFinalBG.png',
    'logo-light': 'IronVoltElectricFinalBlue.png',
    'logo-open': 'IronVoltElectricFinalNoBorder.png',
    'logo-open-gold': 'IronVoltElectricFinalNoBorderYellowLines.png',
    'wordmark': 'IronVoltSmallerBolt.png',
    'wordmark-filled': 'IronVoltSmallerBoltBlueBG.png',
    'badge': 'IronVoltElectricBadge.png',
    'badge-slim': 'IronVoltElectricBadgeSmaller.png',
    'badge-outline': 'IronVoltElectricBadgeTransparent.png',
    'badge-square': 'IronVoltElectricBadgeBlueBGSmaller.png',
    'bolt': 'Volt.png',
}

# Crops of the business card front (1083 x 633), from the layer
# bounds in BusinessCard/psd/front.psd, padded a little.
CARD_CROPS = {
    'type-tagline': (352, 240, 732, 286),     # DIN Condensed Bold
    'type-electric': (380, 178, 706, 222),    # League Gothic Regular
    'type-wordmark': (262, 44, 822, 181),     # Navine Semi Condensed Italic
    'type-futura': (276, 404, 808, 488),      # Futura Medium / Medium Italic
}


def trimmed(img):
    box = img.getchannel('A').getbbox()
    return img.crop(box) if box else img


def fit_width(img, width):
    if img.width <= width:
        return img
    return img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)


def main(src):
    src = Path(src)
    OUT.mkdir(parents=True, exist_ok=True)
    sizes = {}

    for slug, name in LOGOS.items():
        img = trimmed(Image.open(src / 'Logos' / 'PNG' / name).convert('RGBA'))
        # Icons and badges are tall; cap their height instead.
        preview_w = 1000 if img.width >= img.height else round(1000 * img.width / img.height)
        preview = fit_width(img, preview_w)
        preview.save(OUT / f'{slug}.webp', quality=90, method=6)
        sizes[slug] = list(preview.size)
        fit_width(img, 1600 if img.width >= 2 * img.height else 1024).save(OUT / f'{slug}.png', optimize=True)
        print(slug, img.size)

    for side in ('front', 'back'):
        card = Image.open(src / 'BusinessCard' / f'{side}.png').convert('RGB')
        card.save(OUT / f'card-{side}.webp', quality=88, method=6)
        sizes[f'card-{side}'] = list(card.size)

    front = Image.open(src / 'BusinessCard' / 'front.png').convert('RGB')
    for slug, box in CARD_CROPS.items():
        crop = front.crop(box)
        crop.save(OUT / f'{slug}.webp', quality=90, method=6)
        sizes[slug] = list(crop.size)

    # Pixel sizes of every preview, read by src/pages/branding.mjs.
    (OUT / 'sizes.json').write_text(json.dumps(sizes, indent=2) + '\n')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
