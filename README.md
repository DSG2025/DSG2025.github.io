# OG Saigon Website V6 - Search + UX

Static GitHub Pages package for https://ogsaigon.com.

V6 keeps the existing lightweight static-site architecture while upgrading the homepage UX, search-intent coverage, real photography, internal linking and crawlable planning content.

## Main changes

- New conversion-focused homepage for Western travellers who value private, personal experiences.
- Private-first wording for direct bookings across the site.
- Real OG Saigon rainy food-tour photography optimized to WebP.
- Founder-first trust section featuring Duy.
- Updated search titles and descriptions on key commercial pages.
- New `/stories/` content hub with three practical search-focused guides.
- Expanded sitemap and improved structured data.
- Explicit OAI-SearchBot access for ChatGPT Search discovery.
- Central review/contact data remains in `/assets/js/site-data.js`.

See `RELEASE-NOTES-V6.md` for deployment and Search Console follow-up.

## Owner-friendly data file

Edit `/assets/js/site-data.js` for routine operational updates such as review counts, OTA profile URLs, WhatsApp number and phone number.

See `SITE-DATA-GUIDE.md` for the update workflow.

## Deploy

1. Back up the current repository or create a Git branch/tag before replacing production.
2. Keep the `CNAME` file in the repository root.
3. Upload the full contents of this folder to the root of `DSG2025.github.io` on the `main` branch.
4. Commit the changes.
5. Wait for GitHub Pages to deploy.
6. Test homepage, experience pages, custom trip, transport and the new Stories pages on both desktop and mobile.
7. Resubmit `https://ogsaigon.com/sitemap.xml` in Google Search Console.

## Important operating notes

- Direct website positioning is private-first. OTA products may have different formats depending on the listing.
- Transport vehicle type may vary by availability, group size and luggage. The vehicle photos on `/transport/` are examples, not a fixed vehicle guarantee.
- Do not publish prices or inclusions unless they match current operating reality.
- Review counts change over time. Update `site-data.js` when verified.
