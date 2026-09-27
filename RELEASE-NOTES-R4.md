# OG Saigon FINAL R4 - Jekyll Stories hardening

- Fixed raw HTML Airbnb fallback count from 3 to 5 reviews.
- Added mobile body scroll lock while navigation sheet is open.
- Made the mobile menu sheet independently scrollable for short viewports.
- Removed unnecessary `!important` overrides from the final WhatsApp/mobile menu rules.
- Added `encoding: UTF-8` and `future: false` to Jekyll config.
- Changed the default Story homepage flag to `false`; current featured stories still explicitly opt in.
- Removed per-story permalink duplication and made filenames the single source of truth for `/stories/:name/`.
- Normalized the Story template date type and removed its placeholder permalink.
- Explicitly excludes `published: false` documents from Story listings and sitemap loops.
