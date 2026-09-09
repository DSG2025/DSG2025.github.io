# OG Saigon Website V5.1 — Trust-First UX + Central Site Data

Static GitHub Pages package for https://ogsaigon.com.

This version keeps the V5 trust-first UX and adds a central data layer for the values that change most often.

## Owner-friendly data file

Edit this file for routine operational updates:

`/assets/js/site-data.js`

It currently controls:

- Tripadvisor rating, review count and profile URL
- GetYourGuide rating, review count and profile URL
- Airbnb rating, review count and experience URL
- WhatsApp destination number
- Phone number

See `SITE-DATA-GUIDE.md` for the exact update workflow.

## Deploy

1. Back up the current repository.
2. Keep the `CNAME` file in the repository root.
3. Upload the full contents of this folder to the root of `DSG2025.github.io` on the `main` branch.
4. Commit the changes.
5. After GitHub Pages deploys, test both desktop and mobile on `https://ogsaigon.com`.

## Before public launch

- Confirm review data in `site-data.js` is current.
- Confirm all WhatsApp buttons open the correct OG Saigon number.
- Replace or add a real Toyota Innova photo on `/transport/` when available.
- Add social profile links after the handles are claimed.
- Confirm all experience wording and current inclusions/pricing before publishing prices.
- Use Google Search Console and submit `/sitemap.xml` after launch.
