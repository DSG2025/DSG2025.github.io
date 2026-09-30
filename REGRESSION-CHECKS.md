# Custom Trip Regression Checks

This is not a general QA scorecard. It documents the specific integration failures found in the previous Custom Trip package and the exact fix used in this build.

| Prior issue | Fix in this build | Verification |
|---|---|---|
| Shared `main.js` and page JS could both submit `#customTripForm` | Form renamed to `#customExperienceForm`; page JS binds only that ID; submit handler also stops propagation | `verify-custom-trip.sh` fails if legacy ID appears in page / page JS |
| `post-office-group.webp` did not exist | Saigon card now uses `/assets/images/hidden-alley.webp`; founder block keeps the Central Post Office image | Script fails if old filename remains, if the card reuses the founder image, or if `hidden-alley.webp` is missing |
| Page bypassed shared Jekyll shell | Added front matter plus `site-header.html` and `site-footer.html` includes | Script requires both includes and rejects handwritten `<header>` / `<footer>` |
| `../` links differed from site convention | Page assets and internal links use root-relative `/...` paths | Script rejects any `../` in page |
| `BreadcrumbList` missing | Added BreadcrumbList to JSON-LD `@graph` | Script requires BreadcrumbList marker |
| Menu label drifted to `Custom Trip` singular | Navigation now comes from shared header include | No page-local navigation label remains to drift |
| Floating WhatsApp accessibility differed from standard include | Page-local floating button removed; standard include owns it | Script rejects `wa-float` in page |

## What still depends on the merged R7 + R8 + R9 tree

This patch does not duplicate shared site files. After overlay, the verification script also checks that the standard includes, `main.js`, and the existing OG Saigon image dependencies are actually present.


## Final image-dimension cleanup

The page now declares the real intrinsic dimensions for the four previously mismatched shared images:

- `mekong-meal.webp`: `1600x1484`
- `duy-og-saigon-guests-central-post-office.webp`: `1200x1181`
- `cu-chi-trapdoor.webp`: `1448x1086`
- `mekong-boat.webp`: `1200x1600`

The Saigon card uses `hidden-alley.webp` at `1600x1577`, avoiding duplicate imagery on the same page.

## Mobile builder gutter regression

The Custom Trip stylesheet must not override the shared `.wrap` width on `.builder-wrap`.
Expected rule:

```css
body.custom-trip-page .builder-wrap {
  max-width: 900px;
}
```

Do not reintroduce `width: 100%` or `width: min(900px, 100%)` here, because that removes the shared mobile page gutter.
