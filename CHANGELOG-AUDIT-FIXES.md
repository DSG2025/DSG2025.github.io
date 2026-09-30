# Custom Trip audit fixes

This build addresses the integration issues identified after applying the previous Custom Trip package to the R7 + R8 + R9 site tree.

1. Duplicate WhatsApp submit risk
   - Old page ID: `customTripForm`
   - New page ID: `customExperienceForm`
   - Page JS binds only the new ID.
   - Submit handler calls `stopImmediatePropagation()`.
   - Shared `main.js` is not modified.

2. Broken and duplicated Saigon card imagery
   - Removed `/assets/images/post-office-group.webp`.
   - `Rooted in Saigon` keeps `/assets/images/duy-og-saigon-guests-central-post-office.webp`.
   - Saigon destination card now uses `/assets/images/hidden-alley.webp`.
   - `hidden-alley.webp` is included in this patch, so the card does not rely on an unverified filename.

3. Correct intrinsic image dimensions
   - `mekong-meal.webp`: `1600x1484`.
   - `duy-og-saigon-guests-central-post-office.webp`: `1200x1181`.
   - `cu-chi-trapdoor.webp`: `1448x1086`.
   - `mekong-boat.webp`: `1200x1600`.
   - Saigon card `hidden-alley.webp`: `1600x1577`.

4. Shared Jekyll shell
   - Added front matter.
   - Uses `{% include site-header.html %}`.
   - Uses `{% include site-footer.html %}`.
   - Removed handwritten header and footer markup.

5. Internal paths
   - Removed parent-relative `../` paths from the page.
   - Page CSS / JS and internal links use root-relative paths.

6. Structured data
   - Added `BreadcrumbList` to the JSON-LD graph.
   - Organization schema uses the shared `https://ogsaigon.com/#organization` identity.

7. Navigation / accessibility consistency
   - Header and footer come from the shared includes, so the site-standard `Custom Trips` label is inherited.
   - The page-local floating WhatsApp button was removed, so the include-standard button and accessibility label are inherited.

8. Destination photography
   - Tay Ninh primary card: Cao Dai Holy See.
   - Vung Tau primary card: coastal view.
   - Supporting Tay Ninh / Vung Tau assets remain reserved and are not added as mini-galleries.

9. Mobile builder intro gutter
   - Removed the custom width declaration from `.builder-wrap`.
   - `.builder-wrap` now uses `max-width: 900px` only.
   - Shared `.wrap` controls horizontal gutters, including the 13px-per-side mobile gutter from `calc(100% - 26px)`.
   - Fixes the `Build your own experience / Tell us what you have in mind` block touching the left edge on mobile.
