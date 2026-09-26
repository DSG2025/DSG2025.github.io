# OG Saigon Website V6 - Search + UX

Deployment target: GitHub Pages / ogsaigon.com
Prepared: 2026-09-26

## What changed

- Rebuilt the homepage around one primary CTA: **Check Availability**.
- Added responsive editorial hero photography using real OG Saigon rainy food-tour images.
- Added intent-based navigation for History & Cu Chi, Local Life & Food, Custom Days, and Transport.
- Changed direct-booking positioning to private-first throughout the website.
- Rebuilt founder storytelling around Duy and removed vehicle imagery from founder sections.
- Added verified traveller-review excerpts and updated visible platform data.
- Rebuilt the homepage gallery into the editorial story **Saigon doesn't stop when it rains.**
- Added FAQ content using native accessible `<details>` elements.
- Added a Stories section and four new crawlable URLs: the Stories index plus three planning guides.
- Added internal links from commercial pages to relevant guide content.
- Improved titles and meta descriptions for key search-intent pages.
- Added `max-image-preview:large` and related crawler directives to indexed pages.
- Added BreadcrumbList structured data to existing interior pages.
- Added Article structured data to the new Stories guides.
- Added Organization + WebSite entity markup to the homepage.
- Added explicit OAI-SearchBot access in robots.txt for ChatGPT Search discovery.
- Expanded sitemap.xml from 9 URLs to 13 URLs and added accurate lastmod dates for this release.
- Optimized new photography to WebP and stripped original image metadata from served derivatives.
- Added width/height attributes to local images on existing pages to reduce layout shift.

## Search Console snapshot before V6

From the supplied Search Console screenshots:
- Sitemap status: Successful
- URLs discovered in submitted sitemap: 9
- Indexed pages shown in Overview: 9
- Not-indexed pages shown in Overview: 3
- Search performance selected range: 3 months
- Clicks: 9
- Impressions: 30
- CTR: 30%
- Average position: 12.4

This is a very small data set. V6 is designed to improve crawlability, search-intent coverage, trust and conversion, but no code change can guarantee rankings or booking volume.

## After deployment

1. Open https://ogsaigon.com/ and check desktop + mobile.
2. In Search Console, resubmit `https://ogsaigon.com/sitemap.xml`.
3. Use URL Inspection and request indexing for:
   - `/`
   - `/experiences/cu-chi-tunnels/`
   - `/experiences/hidden-saigon/`
   - `/transport/`
   - `/stories/`
   - the three new story URLs
4. Check the Pages report to identify the 3 URLs currently shown as not indexed. The supplied screenshots show the count but not the URL/reason list.
5. Watch impressions and queries for at least 4-8 weeks before making large SEO conclusions.
