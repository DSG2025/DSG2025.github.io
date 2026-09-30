# Custom Trip V2 - Pre-PR final cleanup

Final cleanup completed before PR:

- Corrected `width` / `height` declarations:
  - `mekong-meal.webp`: `1600x1484`
  - `duy-og-saigon-guests-central-post-office.webp`: `1200x1181`
  - `cu-chi-trapdoor.webp`: `1448x1086`
  - `mekong-boat.webp`: `1200x1600`
- Replaced the duplicate Saigon destination-card image with `hidden-alley.webp` (`1600x1577`).
- Bundled `hidden-alley.webp` directly in the patch.
- Founder block still uses the Central Post Office image, so the two Saigon visuals now serve different storytelling roles.
- Shared `main.js` remains untouched. The page continues to use `#customExperienceForm`.

Target integration workflow:

1. Apply to the verified R7 + R8 + R9 tree.
2. Run `bash verify-custom-trip.sh .` from repository root.
3. Push to a feature branch and open a PR.
4. Require the Jekyll / Pages build check to pass.
5. On preview, test desktop and mobile, then submit the form once and confirm exactly one WhatsApp tab opens with the correct fields.
