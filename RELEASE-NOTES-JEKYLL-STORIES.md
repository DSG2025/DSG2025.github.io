# OG Saigon FINAL R3 - Jekyll Stories

This release keeps the FINAL R2 public design and converts only the Stories publishing workflow to Jekyll + Markdown.

## What changed

- Added `_config.yml` with a custom `stories` collection.
- Converted the four existing Stories into `_stories/*.md` source files.
- Added `_layouts/story.html` so all Story pages share one reusable design/template.
- Added `_includes/site-header.html` and `_includes/site-footer.html` for the Story system.
- Made `/stories/` automatically list all published Stories newest-first.
- Made the homepage automatically show the latest four Stories marked `homepage: true`.
- Made `sitemap.xml` automatically include every published Story.
- Added `_stories/TEMPLATE-NEW-STORY.md` as a copy-ready unpublished example.
- Added `STORIES-GUIDE.md` with the simple publishing workflow.
- Removed the old hand-built `/stories/<slug>/index.html` source folders to avoid duplicate Story sources.

## What did not change

- Homepage design and CTA system.
- Experience pages.
- Custom Trip page.
- Transport page.
- Meet Duy / About pages.
- Existing Stories CSS and visual design.
- Existing Story URLs.

## Validation

A static preview of the Jekyll-generated output was built from the new source structure and audited:

- 15 rendered HTML pages
- 14 sitemap URLs
- 0 broken internal links
- 0 missing local images
- 0 missing canonical tags
- 0 JSON-LD parse errors
- 0 audit warnings
- 0 horizontal overflow at 1440px desktop and 390px mobile in render checks

Note: the working environment could not install the Jekyll Ruby gem because outbound package downloads are unavailable. The collection/config syntax was cross-checked against current GitHub Pages and Jekyll documentation, and an equivalent local preview build was used for structural and visual QA.
