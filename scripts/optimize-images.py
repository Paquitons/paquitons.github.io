#!/usr/bin/env python3
"""
Responsive image derivatives for the site.

Reads the source photographs listed in SOURCES, writes WebP copies at a few
widths to images/opt/, and records every image's intrinsic size in
images/opt/manifest.json. The build script (scripts/build.mjs) reads that
manifest to write <picture> elements with correct srcset, width and height,
so the browser can reserve the box before the image arrives.

The original JPEG stays where it is and is used as the <img> fallback.

Run after adding or replacing a photograph:

    pip install pillow
    python3 scripts/optimize-images.py
"""

import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "images" / "opt"
WIDTHS = (480, 800, 1200)
QUALITY = 62

# key -> source path (relative to the repo root), or (path, crop box).
# The key is what page templates refer to, so a photo can be re-shot or
# re-cropped without touching markup.
#
# Site rules for photos: no faces, and nothing staged or edited. The
# branded-van image in images/ is a mock-up and must not be used.
SOURCES = {
    # Cropped to the hands, meter and panel; the original shows a face.
    "panel-test-hands": ("images/Untitled-4.jpg", (330, 0, 1050, 1000)),
    "service-area-map": "images/ServiceArea.jpg",
    # Panels and services
    "panelboards-pair": "images/services/panels/panel-wiring-detail.jpg",
    "service-disconnect": "images/services/panels/panel-breaker-install.jpg",
    "service-metal-building": "images/services/panels/service-upgrade-complete.jpg",
    "service-rack": "images/services/panels/Untitled2.jpg",
    "service-rack-meter": "images/services/panels/IronImage1.jpg",
    "service-stucco-wall": "images/services/panels/Untitled-1.jpg",
    # Backup power
    "generator-brick-home": "images/generator-install.jpg",
    "generator-side-yard": "images/services/backup/Untitled-2.jpg",
    "generator-setting": "images/services/backup/generator-outdoor-install.jpg",
    "generator-cummins": "images/services/backup/IronImage-4.jpg",
    "transfer-switch": "images/services/backup/IronImage-5.jpg",
    # Lighting
    "foyer-crystal-chandelier": "images/services/lighting/Untitled-2.jpg",
    "led-ceiling-fixture": "images/services/lighting/Untitled-3.jpg",
    "foyer-chandelier": "images/services/lighting/Untitled-4.jpg",
    "stairwell-chandelier": "images/services/lighting/Untitled-5.jpg",
    "dining-pendant": "images/services/lighting/Untitled-6.jpg",
    "linear-crystal-chandelier": "images/services/lighting/Untitled-7.jpg",
    "ring-chandelier": "images/services/lighting/Untitled-8.jpg",
}

# The header and footer logo needs its transparency, so it is
# converted on its own rather than resized like the photographs.
LOGO_SOURCE = "images/IronVoltElectricFinal2.png"
LOGO_OUT = OUT / "logo.webp"
BADGE_SOURCE = "images/IronVoltElectricBadgeSmaller.png"

# Social sharing card: 1200x630, cropped from the standby generator job.
OG_SOURCE = "images/generator-install.jpg"
OG_OUT = ROOT / "images" / "og-iron-volt-electric.jpg"


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {}

    for key, spec in SOURCES.items():
        rel, box = spec if isinstance(spec, tuple) else (spec, None)
        im = ImageOps.exif_transpose(Image.open(ROOT / rel)).convert("RGB")
        fallback = "/" + rel
        if box:
            # A cropped image needs its own JPEG fallback: pointing <img>
            # at the original would show what the crop removed.
            im = im.crop(box)
            out = OUT / f"{key}.jpg"
            im.save(out, "JPEG", quality=80, optimize=True, progressive=True)
            fallback = "/" + out.relative_to(ROOT).as_posix()
        w, h = im.size
        widths = [x for x in WIDTHS if x < w] + [min(w, WIDTHS[-1])]
        widths = sorted(set(widths))
        variants = []
        for tw in widths:
            th = round(h * tw / w)
            out = OUT / f"{key}-{tw}.webp"
            im.resize((tw, th), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=6)
            variants.append({"w": tw, "src": "/" + out.relative_to(ROOT).as_posix()})
        manifest[key] = {"fallback": fallback, "width": w, "height": h, "webp": variants}
        print(f"{key:28s} {w}x{h} -> {[v['w'] for v in variants]}")

    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

    # Lossless, so the gold in the lettering renders exactly as in the
    # source file wherever the logo appears.
    Image.open(ROOT / LOGO_SOURCE).save(LOGO_OUT, "WEBP", lossless=True, method=6)
    print("logo", LOGO_OUT.relative_to(ROOT))

    # The hexagon badge, cropped to its edges, transparent, with a PNG
    # fallback. Used as the About page's header image.
    badge = Image.open(ROOT / BADGE_SOURCE).convert("RGBA")
    badge = badge.crop(badge.split()[-1].getbbox())
    badge.save(OUT / "badge.png", "PNG", optimize=True)
    for w in (320, 550):
        b = badge.resize((w, round(badge.height * w / badge.width)), Image.LANCZOS)
        b.save(OUT / f"badge-{w}.webp", "WEBP", quality=90, method=6, alpha_quality=95)
    print("badge", badge.size)

    og = ImageOps.fit(Image.open(ROOT / OG_SOURCE).convert("RGB"), (1200, 630), Image.LANCZOS, centering=(0.5, 0.45))
    og.save(OG_OUT, "JPEG", quality=82, optimize=True, progressive=True)
    print("og image", OG_OUT.relative_to(ROOT))


if __name__ == "__main__":
    main()
