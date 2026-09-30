# OG Saigon Custom Trip - Final Fixed Patch

This patch is designed to overlay the current R7 + R8 + R9 site tree. It keeps the agreed six-section UX and fixes the integration regressions found in the previous package.

## Page structure

1. Hero: `Build your own experience` + `Your interests first. The itinerary second.`
2. Rooted in Saigon: short founder / five-generation District 4 story
3. Choose your direction: Saigon, Cu Chi, Tay Ninh, Vung Tau, Mekong
4. How we shape it: three short steps
5. We do our homework: compact preparation / care signal
6. Trip builder: short form that prepares one WhatsApp message

## Files to deploy

Replace / add:

- `custom-trip/index.html`
- `assets/css/custom-trip.css`
- `assets/js/custom-trip.js`
- `assets/images/custom-trip/tay-ninh-cao-dai-holy-see.webp`
- `assets/images/custom-trip/tay-ninh-ba-den-mountain.webp`
- `assets/images/custom-trip/vung-tau-coast.webp`
- `assets/images/custom-trip/vung-tau-christ-statue-guests.webp`
- `assets/images/custom-trip/vung-tau-sea-stairs.webp`
- `assets/images/custom-trip/vung-tau-white-columns-guests.webp`

Do not replace shared R7 + R8 + R9 files. This page intentionally reuses:

- `_includes/site-header.html`
- `_includes/site-footer.html`
- `/assets/css/style.css`
- `/assets/js/site-data.js`
- `/assets/js/main.js`
- existing OG Saigon image assets listed in `ASSET-MAP-CUSTOM-TRIP.md`

## Integration fixes in this build

- Added Jekyll front matter so Liquid includes are processed.
- Uses `{% include site-header.html %}` and `{% include site-footer.html %}` instead of handwritten header / footer markup.
- Removed all `../` internal paths from the page. CSS, JS and internal links are root-relative.
- Added `BreadcrumbList` JSON-LD alongside Service and Organization schema.
- Removed the nonexistent `/assets/images/post-office-group.webp` reference. The Saigon card now uses `/assets/images/duy-og-saigon-guests-central-post-office.webp`, which is already used by the site.
- Renamed the builder form from `#customTripForm` to `#customExperienceForm`. The page-specific JS uses only the new ID, so the legacy `#customTripForm` listener in shared `main.js` cannot bind to this form.
- The page-specific submit handler also calls `stopImmediatePropagation()` before opening WhatsApp.
- Header / footer labels and the floating WhatsApp accessibility markup now come from the standard site includes, so `Custom Trips` and the include-standard `aria-label` stay consistent automatically.

## Important deployment note

Do not add a second handwritten WhatsApp floating button to this page. The standard site footer include owns the shared footer / floating WhatsApp UI.

## Regression verification

Run from the repository root after overlaying this patch:

```bash
bash verify-custom-trip.sh .
```

The script specifically checks the regressions from the prior audit, including duplicate-form isolation, missing image references, Jekyll includes, root-relative links and BreadcrumbList schema.

## Suggested commit

`Fix Custom Trip integration and finalize destination assets`

## Final pre-PR image cleanup

- Corrected the declared intrinsic dimensions for `mekong-meal.webp`, `duy-og-saigon-guests-central-post-office.webp`, `cu-chi-trapdoor.webp`, and `mekong-boat.webp`.
- Replaced the duplicate Central Post Office image on the Saigon destination card with `hidden-alley.webp`.
- `hidden-alley.webp` is bundled in this patch at `1600x1577` so the destination card has a verified asset.
