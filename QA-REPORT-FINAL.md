# OG Saigon FINAL QA Report

Prepared: 2026-09-27
Target: https://ogsaigon.com/

## Search Console baseline before this release

From the screenshots supplied during this build:
- Sitemap status: successful
- 9 sitemap pages discovered in the previous release
- 9 pages indexed, 3 pages not indexed
- 9 clicks, 30 impressions
- CTR: 30%
- Average position: 12.4

Use this only as a pre-release baseline. The new sitemap contains 14 canonical URLs.

## Consolidated source

The final release consolidates:
- the current GitHub production source
- V6 Search + UX work
- V6.1 food-photo balance
- V6.2 five-image mobile story parity
- final desktop/mobile UX corrections
- fresh review-platform verification
- the approved Chợ Lớn image shortlist from the 27 Sep 2026 photo-selection workflow

## Approved Chợ Lớn shortlist incorporated

Original selected files:
- IMG_9549
- IMG_9563
- IMG_9567
- IMG_9568
- IMG_9570
- IMG_9573
- IMG_9574
- IMG_9590
- IMG_9593
- IMG_9607
- IMG_9615
- IMG_9617

Production derivatives are optimized WebP files in `/assets/images/`.

Placement:
- Homepage Chợ Lớn story card: Bình Tây Market + food/vendor + temple incense + old residential lane
- Hidden Saigon: old lane → market street → food/vendor → temple architecture
- Chợ Lớn story: full first-hand photo narrative

## Fresh external trust verification

Verified on 2026-09-27 before packaging:
- Tripadvisor: 5.0, 63 reviews
- GetYourGuide: 5.0, 50 reviews
- Airbnb Experience: 5.0, 5 ratings/reviews

The values are centralized in `/assets/js/site-data.js` with `reviewsLastChecked: "2026-09-27"`.

## Static and automated checks

Final local audit results:
- 15 HTML files checked
- 14 sitemap canonical URLs
- 0 broken internal links
- 0 missing local images
- 0 missing image alt attributes
- 0 missing image width/height attributes
- 0 local HTML-vs-file image dimension mismatches
- 0 duplicate IDs
- 0 JSON-LD parse errors
- 0 CSS parser errors
- JavaScript syntax passes `node --check`
- 0 heading-level jumps after semantic cleanup
- 0 unlabeled form controls detected
- 0 `target="_blank"` links missing `rel="noopener"`
- 0 placeholder `href="#"` links in public HTML
- 0 public-HTML `small-group` / `small group` wording
- 0 public-HTML legacy `Check Availability` CTA wording
- all 14 sitemap routes returned HTTP 200 through a local static-server check

## Responsive render checks

Synthetic Chromium render checks were run at:
- Desktop: 1440 × 900
- Mobile: 390 × 844

Confirmed:
- no horizontal overflow on tested pages
- desktop homepage CTA remains visible in the first viewport
- mobile H1 ~45px, body 17px
- mobile inner-page H1 ~41px, body 17px
- compact WhatsApp control
- mobile navigation sheet does not push page content
- desktop `One night in Saigon` grid has no broken empty area
- all five `One night in Saigon` images remain on mobile
- Chợ Lớn homepage mosaic renders as a compact 2×2 grid
- Hidden Saigon Chợ Lớn teaser renders 4 images compactly, 4-across desktop and 2×2 mobile

## Search / AI discovery checks

- Canonicals and Open Graph URL alignment checked
- sitemap contains 14 canonical URLs
- `robots.txt` contains the sitemap URL
- `OAI-SearchBot` is explicitly allowed
- Organization `sameAs` includes Tripadvisor, GetYourGuide and Airbnb
- new Chợ Lớn article includes Article + Breadcrumb structured data
- important images have descriptive alt text and explicit dimensions

## Final manual post-deploy checks

After GitHub Pages finishes deploying:
1. Open homepage on desktop and phone.
2. Open Hidden Saigon, Meet Duy, Transport, Stories and Chợ Lớn.
3. Test `Check My Date`, WhatsApp and mobile Menu/Close.
4. Confirm Tripadvisor, GetYourGuide and Airbnb links open correctly.
5. Open `https://ogsaigon.com/sitemap.xml`.
6. Resubmit the sitemap in Google Search Console.
7. Request indexing for the priority URLs in `RELEASE-NOTES-FINAL.md`.

A search ranking or booking increase cannot be guaranteed by code. Evaluate the release against Search Console, direct enquiries and deposits over time.


## Final mobile hero correction
- Removed the old mobile-only rain-shelter hero source.
- Mobile and desktop now use the same people-and-food hero image for stronger visual consistency.
- Hero media now uses an explicit container aspect ratio so HTML image dimensions cannot make the image excessively tall.
- Desktop hero ratio: 1600:934. Mobile hero ratio: 4:3.
- Re-rendered at 1440x900 and 390x844: no horizontal overflow; mobile hero renders at 358x268.5 CSS px.
- Final static audit after this correction: 15 HTML pages, 14 sitemap URLs, 0 errors, 0 warnings.
