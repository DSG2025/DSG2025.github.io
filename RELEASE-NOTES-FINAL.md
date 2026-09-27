# OG Saigon Final Release Notes

Prepared: 2026-09-27  
Target: GitHub Pages / ogsaigon.com

## Consolidated changes

### Homepage UX
- Desktop hero reduced enough to keep the primary CTA in the first viewport on common laptop sizes.
- Mobile hero typography kept large and readable without becoming a full-screen poster.
- Eyebrow shortened to `Private local experiences in Saigon`.
- Global CTA changed from `Check Availability` to `Check My Date`.
- Trust strip keeps four simple signals; review proof now points to all three platforms.
- Full testimonial section includes Tripadvisor, GetYourGuide and Airbnb platform proof.
- Desktop `One night in Saigon` gallery rebuilt as an intentional 2-column editorial grid.
- Mobile keeps all five story images with mixed aspect ratios to control scroll length.
- Stories section expanded to include the new Chợ Lớn field guide.

### Mobile UX
- Mobile menu now opens as a sheet below the sticky header instead of pushing page content down.
- Menu/Close text uses the OG dark-green UI color instead of browser-default blue.
- Floating WhatsApp control is compact and is hidden while the mobile navigation menu is open.
- Body and content typography tuned for comfortable reading for a 30-60 traveller audience.
- No horizontal overflow was found in static layout checks.

### Founder / trust
- `Conversation first.` copy shortened and made more conversational.
- Founder photography remains centered on Duy and real guests.
- Sidebar secondary action now says `See traveller reviews` rather than sending users only to one platform.
- Airbnb restored alongside Tripadvisor and GetYourGuide in site footers and homepage trust UI.

### Airport pickup
- Intro rewritten for faster scanning while keeping the important search terms and operational information.
- Page retains specific `Get an Airport Pickup Quote` / transfer-detail CTAs rather than replacing them with the generic site CTA.
- Vehicle wording remains non-guaranteed: vehicle type can vary by group size, luggage and availability.

### Chợ Lớn content
- Added `/stories/cholon-saigon-chinatown/`.
- Uses 12 selected photographs from the 27 September 2026 Chợ Lớn scouting set, optimized to WebP.
- Covers Bình Tây Market, Chinese-Vietnamese temple spaces, street food, old lanes, Lương Nhữ Học seasonality and OG Saigon's hybrid car + walking approach.
- Time-sensitive observations are explicitly framed as September 2026 field notes rather than permanent guarantees.
- Added internal links from Stories, homepage and Hidden Saigon.
- Homepage Chợ Lớn story card uses the approved 4-image shortlist: Bình Tây Market, vendor/food, temple incense and old residential lane.
- Hidden Saigon uses the approved compact 4-image sequence: old lane → market street → food/vendor → temple architecture.

### Search / AI discovery
- Sitemap contains 14 canonical URLs.
- `robots.txt` explicitly allows `OAI-SearchBot` and points to the sitemap.
- Indexed pages use `max-image-preview:large`.
- Canonicals, title tags, meta descriptions, Open Graph data and JSON-LD were checked.
- Organization `sameAs` data is aligned to Tripadvisor, GetYourGuide and Airbnb.
- New Chợ Lớn article includes Article and Breadcrumb structured data.

## Verified external trust data on 2026-09-27

- Tripadvisor: 5.0, 63 reviews
- GetYourGuide supplier profile: 5.0, 50 reviews
- Airbnb Experience: 5.0, 5 reviews

These values are stored in `/assets/js/site-data.js`. Recheck live sources before future edits.

## Automated/static QA completed

- 15 HTML files checked.
- 14 canonical sitemap URLs checked.
- 0 broken internal links detected.
- 0 missing local images detected.
- 0 missing `alt` attributes detected.
- 0 missing image width/height attributes detected.
- 0 duplicate IDs detected.
- 0 JSON-LD parse errors detected.
- 0 CSS parser errors detected.
- JavaScript syntax passed `node --check`.
- Desktop/mobile static Chromium render checks showed no horizontal overflow at 1440×900 and 390×844.
- Color tokens were darkened slightly so the main rust CTA and muted text meet normal-text contrast more reliably on the cream/paper backgrounds.

## Search Console after deployment

Resubmit:

`https://ogsaigon.com/sitemap.xml`

Then use URL Inspection / Request Indexing for:

1. `https://ogsaigon.com/`
2. `https://ogsaigon.com/experiences/cu-chi-tunnels/`
3. `https://ogsaigon.com/experiences/hidden-saigon/`
4. `https://ogsaigon.com/transport/`
5. `https://ogsaigon.com/stories/`
6. `https://ogsaigon.com/stories/cu-chi-without-crawling/`
7. `https://ogsaigon.com/stories/cu-chi-or-war-remnants-museum/`
8. `https://ogsaigon.com/stories/first-day-in-saigon/`
9. `https://ogsaigon.com/stories/cholon-saigon-chinatown/`

Do not repeatedly request the same URL. Give Google time to recrawl and accumulate performance data before making another large SEO rewrite.

## Rollback

Before replacing production, create a Git tag or branch from the current live commit. If a deployment issue appears, revert to that commit rather than trying to patch production manually.


## Mobile hero correction
- Mobile homepage now uses the same people-and-food hero story as desktop instead of the rain-shelter portrait.
- Mobile hero media is cropped to 4:3 to reduce scroll length and keep food, guests and conversation visible.
