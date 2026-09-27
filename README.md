# OG Saigon Website FINAL - Search, UX & Chợ Lớn

Production-ready static GitHub Pages package for **https://ogsaigon.com/**.
Prepared: **2026-09-27**.

This final build consolidates the original V5.1 codebase, V6 search/UX work, the food-photo balance update, mobile five-image story parity, the final responsive UX pass, restored Airbnb trust signals, and the selected Chợ Lớn photography from the 27 September field scout.

## What is final in this package

- Conversion-focused homepage for Western travellers, especially ages 30-60.
- Global primary CTA changed to **Check My Date**; product-specific CTAs remain more specific where appropriate.
- Private-first positioning for direct bookings.
- Shorter, more conversational founder copy.
- Clearer, more scannable airport-pickup copy.
- Compact mobile WhatsApp button that no longer competes with the main CTA.
- Mobile menu behaves as an overlay sheet instead of pushing the page down.
- Mobile typography tuned for readability; normal body content is not reduced below a comfortable reading size.
- Desktop editorial rain grid fixed; all five story beats remain visible on mobile with mixed aspect ratios.
- Tripadvisor, GetYourGuide and Airbnb restored as visible trust signals.
- Review data centralized in `/assets/js/site-data.js`.
- New first-hand Chợ Lớn story at `/stories/cholon-saigon-chinatown/` using the selected field-scout photographs, plus the approved Chợ Lớn shortlist integrated into the homepage and Hidden Saigon page.
- Sitemap expanded to 14 canonical URLs.
- OAI-SearchBot explicitly allowed in `robots.txt` for ChatGPT Search eligibility.
- Structured data, canonicals, internal links, image dimensions and metadata checked.
- Unused duplicate hero assets removed from production.

## Routine data updates

Edit `/assets/js/site-data.js` when verified review counts or contact details change.

As of 2026-09-27 the verified platform values used by this release are:

- Tripadvisor: 5.0, 63 reviews
- GetYourGuide: 5.0, 50 reviews
- Airbnb: 5.0, 5 reviews

Do not change review counts based on memory. Recheck the live platform before updating.

## Deployment

1. Back up the current GitHub repository or create a tag/branch.
2. Extract the release ZIP locally.
3. Upload **the contents inside the final folder** to the root of `DSG2025.github.io` on `main`.
4. Keep `CNAME` in the repository root.
5. Suggested commit message: `Deploy OG Saigon final UX + Search + Cholon release`.
6. Wait for GitHub Pages deployment.
7. Check homepage, Hidden Saigon, Meet Duy, Transport, Stories and the new Chợ Lớn article on desktop and mobile.
8. Resubmit `https://ogsaigon.com/sitemap.xml` in Google Search Console.
9. Request indexing for the key updated/new URLs listed in `RELEASE-NOTES-FINAL.md`.

## Important operating notes

- Direct website experiences are positioned as private-first. OTA products can use different formats depending on the live listing.
- Vehicle photographs on `/transport/` are examples. Vehicle type may vary with availability, group size and luggage.
- Do not publish prices, timings or inclusions unless they match current operating reality.
- Chợ Lớn operational details can change. The new article clearly dates field observations to September 2026 where relevant.
- Search visibility and bookings cannot be guaranteed by code changes; evaluate real Search Console and enquiry data over time.

See `RELEASE-NOTES-FINAL.md` for the full audit and post-deployment checklist.

## Stories publishing system (Jekyll)

Stories are now managed with a Jekyll collection instead of one hand-built HTML folder per article.

- Existing article sources: `_stories/*.md`
- Reusable article layout: `_layouts/story.html`
- Shared Stories header/footer: `_includes/`
- Stories index: `stories/index.html` (automatic)
- Homepage Stories block: `index.html` (automatic latest 4 where `homepage: true`)
- Sitemap: `sitemap.xml` (automatic Story URLs)
- Copy-ready example: `_stories/TEMPLATE-NEW-STORY.md`
- Full instructions: `STORIES-GUIDE.md`

### Add a new Story

1. Copy `_stories/TEMPLATE-NEW-STORY.md`.
2. Rename the copy to a short URL-friendly filename, such as `_stories/saigon-coffee-morning.md`.
3. Update the title, SEO description, date, images and article text.
4. Change `published: false` to `published: true` when the article is ready.
5. Set `homepage: true` only if you want it eligible for the homepage Story block.
6. Upload any new WebP images to `assets/images/`.
7. Commit to GitHub. The filename automatically becomes the `/stories/.../` URL, so normal new Stories do not need a `permalink:` field.

GitHub Pages will build the new Story automatically with the existing OG Saigon design.

## R5 maintenance notes

- Header and footer are shared through `_includes/site-header.html` and `_includes/site-footer.html` across the homepage, static pages, Stories index and Story layout. Edit the shared include instead of changing 10 pages separately.
- The homepage keeps its richer footer automatically via `footer_variant: home`.
- Every published Story should use `published: true`; drafts use `published: false`. The homepage, Stories index and sitemap only list explicitly published Stories.
- A real GitHub Pages Jekyll build check is included at `.github/workflows/jekyll-build-check.yml`. After a push to `main`, open the **Actions** tab and confirm **Jekyll build check** is green. This workflow checks the build only; it does not replace your existing Pages deployment source.
- If the build check fails, do not change DNS or the custom domain. Open the failed Actions run and inspect the Jekyll error first.
