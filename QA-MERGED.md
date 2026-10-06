# Merged CTA and form preview

Scope: original uploaded Jekyll source + phase 1 + reviewed CTA/form patch.

- Preserved original Cu Chi and Transport H1 exactly.
- Header/home Check My Date links go to the form.
- Fixed desktop navigation hover selector.
- All three experience pages have contextual hero CTAs; Transport action precedes facts.
- Allowlisted service prefills preserve existing form values and skip reload/back navigation.
- Kept noopener; always-visible-after-submit real retry link, copy action and phone fallback.
- Fallback message and URL refresh as the form changes; floating WhatsApp hides on small screens while fallback is shown.
- Removed four obsolete stories/<slug>/index.html sources, retaining five published Markdown stories and shared layout. Preview build rejects duplicate story destinations.
- Added min-width:0 to story article to contain the comparison table's horizontal scroll.
- Excluded preview tooling and named internal notes from Jekyll output.

Verification:
- Original verify-custom-trip.sh PASS.
- scripts/check-cta-form.cjs PASS: four sources, restored values, reload/back, unknown/prototype keys, null/throwing window.open, noopener and fallback refresh.
- Rendered 16 pages: all local links/assets/anchors resolve, IDs unique, JSON-LD valid, one header/footer per page.
- Chromium responsive iframe: all 16 pages checked at outer width 360 (content width 345 due to scrollbar). Six relevant routes also checked at outer widths 390/430 (content widths 375/415). No page-level horizontal overflow after comparison-table fix.
- Mobile menu opening and Check My Date navigation verified. Hidden Saigon prefill verified. Form submit via Enter, Copy message and edit-after-submit verified. No WhatsApp message sent.
- Desktop 1363x936: first service CTA y=557 Cu Chi, 557 combo, 477 Hidden Saigon, 634 Transport.

Limits: responsive iframe testing is not physical iPhone/Android or in-app browser testing. Preview uses LiquidJS/Markdown-It; actual Jekyll/GitHub Pages build has not run in this environment. This is a private Sites preview, not an update to ogsaigon.com. Preview output is noindex; original production HTML metadata remains intact.

## Review follow-up, 2026-10-05

- Show Starting from only when prefill actually applies; retain Started from attribution in the WhatsApp message.
- Form edits update the draft and retry URL without rewriting the aria-live status or replacing Copy feedback. Initial submit status explains automatic draft updates.
- Detect the default duration using the first option value instead of hardcoded display text.
- Updated package identity and description, retaining the dependency versions and preview tooling (excluded from Jekyll output).
- Existing hero leads were shortened in phase 1 to bring service CTAs higher. This follow-up leaves those leads unchanged pending content review; original H1 remains unchanged.
- Added regression assertions for skipped-prefill note, retained attribution, renamed first duration option and stable status across input/change events.
- No new physical mobile or browser test in this follow-up. Ruby, gem, bundle and jekyll executables are unavailable, so actual Jekyll build remains unverified. Run the GitHub Pages build on the target branch before merging and check for duplicate-destination warnings.

## Homepage UX surgery, 2026-10-06

Scope: the user's 18-item master implementation list, on reviewed CTA/form baseline `9cca0cd841a176dad81fd6aa1006380f5f0cbe74`. This supersedes the earlier homepage description only. This preview is not a deployment to ogsaigon.com.

Changed source files and reasons:
- `index.html`: three-part hero DOM, compact 3-item trust, four whole-row intent links, two editorial experiences, combined founder/principles section, two reviews and compact bound proof, shorter custom panel, four FAQs, exactly two story cards, compact closing booking steps. Removed standalone approach, rain gallery and booking section. Kept the head metadata/JSON-LD byte-for-byte.
- `assets/css/home-v2.css`: targeted homepage layout and breakpoint changes. Removed only obsolete homepage rules for the removed rain gallery, approach, booking block and deleted elements. Retained shared navigation/footer styling and accounted for the late FINAL HOMEPAGE UX PASS rules. No rewrite of global CSS.
- `assets/js/home.js`: homepage-only observer with a mobile-only CSS visibility rule. Hides floating WhatsApp through Hero + Trust, reveals it below that area, hides it on return. Desktop visibility is unchanged. Unsupported observer falls back to the existing contact button.
- `_stories/saigon-doesnt-stop-when-it-rains.md`: new published first-hand photo story using the same five rain/food photographs (one hero plus four body photos). No invented guest names, venues, exact times or route details. Uses the existing story layout and collection.
- `_stories/cholon-saigon-chinatown.md`, `_stories/cu-chi-or-war-remnants-museum.md`, `_stories/first-day-in-saigon.md`: only `homepage: true` changed to `false`. District 4 and Cu Chi without crawling remain true, template remains unpublished.
- `build-preview.mjs`: use the timezone already configured in `_config.yml` so preview Article dates do not shift with the host timezone. This fixes preview-only date drift observed during verification; production story dates and schema source are unchanged.
- `scripts/check-homepage.py`: static output, links, images, JSON-LD, page counts, selected stories and protected-source regression checks.
- `scripts/check-homepage-behavior.cjs`: observer and runtime review-binding logic tests. No external communication is sent.
- `QA-MERGED.md`: this handoff record. `dist/` files are generated preview output, not production source.

PASS in this turn:
- `npm run build`: six published stories, no duplicate story output. 17 HTML pages total.
- `bash verify-custom-trip.sh .`: all existing checks pass.
- `node scripts/check-cta-form.cjs`: existing prefill, preserved visitor input, fallback/copy status regression checks pass.
- `python3 scripts/check-homepage.py`: 689 local link/asset/anchor references resolve; 75 image references have files and alt/dimensions; 17 JSON-LD blocks parse; no duplicate IDs; one header/footer per page.
- Homepage structural checks: one hero photo, exactly 2 hero links, 3 trust items, 4 intent rows, 2 signature experiences, 1 founder photo, 3 principles, 2 reviews, 4 FAQs, 2 selected stories, 3 compact booking steps. Rain Story is absent from homepage and present on Stories index, with exactly 5 photo references in its main content.
- `node scripts/check-homepage-behavior.cjs`: correct intro/after/return observer states and unavailable-observer fallback; shared review binding updates using changed sample data.
- Both shared and homepage CSS parse with Lightning CSS, no warnings. Static PostCSS cascade assertions at 390/1440 confirm intended grid-area order, image ratios, story columns and mobile-only WhatsApp rule after late overrides. These are source-level assertions, NOT browser-computed style checks.
- Frozen files match baseline exactly: shared header/footer/layout, style.css, stories.css, custom-trip.css, main.js, site-data.js, custom-trip.js, Custom Trip page, experience listing, all four service pages, sitemap and robots. Existing generated Story pages are unchanged after timezone correction. No photo asset was deleted or modified.

NOT VERIFIED in this turn:
- Browser rendering/computed results at 1440px and 390px, actual first-viewport visibility, photo crops, overflow and touch interaction. The currently available Sites skill requires control-browser for managed browser QA; that capability is unavailable in this session. No browser server was started and no alternative browser path was substituted.
- Physical iPhone/Android and Instagram/Facebook in-app browsers.
- Real Jekyll/GitHub Pages build: Ruby/Jekyll are unavailable here. LiquidJS/Markdown-It preview build is not a substitute.
- Actual current review counts on external platforms were not re-researched; the existing site-data.js values remain authoritative runtime inputs.

Before production: visually check desktop 1440 and mobile 390 (hero image begins before paragraph/CTAs on mobile, no WhatsApp overlap, usable intent rows, no horizontal overflow); test form and mobile/in-app fallback; run the actual Jekyll branch build and check for duplicate destination warnings. Do not merge the generated noindex preview dist into the live GitHub Pages output. If overlaying source on an older repo, explicitly delete the four legacy static Story files listed in HUONG-DAN.txt.

## Review proof alignment follow-up, 2026-10-06

- index.html: each proof line now reads Platform · review count · rating, with rating after reviews and within the same inline text flow. Runtime bindings are unchanged.
- home-v2.css: dedicated summary class avoids the shared review-platform-name margin-bottom/uppercase/letter-spacing, which offset the old flex items. Rating inherits the text size and baseline. Only the homepage proof rows change.
- Preview build, existing homepage structure checks and runtime review-binding checks PASS. Browser computed layout remains unverified because the required control-browser tool is unavailable.

## Footer location follow-up, 2026-10-06

User explicitly authorized shared footer text changes after the homepage scope freeze. Both footer variants now use “Saigon, Vietnam”, replacing “Ho Chi Minh City, Vietnam” and “Sai Gon, Vietnam”. Only _includes/site-footer.html product source changes; no SEO/schema/H1 changes. The protected-source QA comparison allows exactly these two replacements and still checks the rest of the footer. Preview build and all 17 rendered footer location checks PASS.

## Builder anchor and no-JS fallback, 2026-10-06

- The homepage Build My Own Day intent link now targets /custom-trip/#trip-builder.
- Removed the hardcoded home-intro-active body class. home.js opts into hiding only after observer setup succeeds. This preserves the floating contact link when JavaScript is disabled OR home.js fails to load; a noscript-only override would cover only the first case.
- Updated static and logic regression checks: body starts without the hiding class, intent destination includes the builder anchor, JS still hides during intro and reveals below it, no-observer fallback remains visible.
- Preview build and homepage/form scripts PASS; browser/device visual verification and actual Jekyll build remain unverified.

## Final Google Maps patch, 2026-10-06

Scope: one homepage text link below existing platform proof, plus Google Maps in both shared footer variants. Exact URL: https://maps.app.goo.gl/WbifDsGKfHmSeFuR7. All use target="_blank" rel="noopener". No Google rating/count, CSS/JS changes, new section, or changes to existing review data.

Files changed: index.html, _includes/site-footer.html, scripts/check-homepage.py (exact URL / footer / safe attributes assertions and narrow protected-footer allowance), QA-MERGED.md (this record).

PASS: preview build; 17 pages; 689 local links/assets/anchors; 75 image references; 17 valid JSON-LD blocks; unique IDs; one header/footer per page; exact Maps href in homepage review area and every rendered footer; six canonical Stories without duplicate static sources; homepage behavior checks; Custom Trip JS and shell regression checks; git diff --check. Existing platform bindings and protected source unchanged except authorized footer links.

NOT VERIFIED: external Maps destination/redirect (web retrieval could not access short URL); actual clicking in a browser; desktop/mobile visual regression (required managed browser capability unavailable); actual Jekyll build (Ruby/Jekyll unavailable); physical devices/in-app browsers. Preview build is not a substitute for Jekyll. Complete source handoff remains subject to these checks before production merge.
