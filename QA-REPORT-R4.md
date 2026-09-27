# OG Saigon FINAL R4 QA Report

Checked against the FINAL R3 Jekyll package after incorporating the latest external code audit.

## Fixes included

- Raw HTML Airbnb fallback corrected to **5 reviews**, matching `site-data.js`.
- Mobile navigation now locks background body scroll while the menu sheet is open.
- Mobile menu itself remains scrollable on short screens.
- Removed unnecessary `!important` declarations from WhatsApp/mobile-menu overrides. Remaining `!important` rules are limited to reduced-motion/accessibility or intentional homepage component overrides.
- Jekyll config hardened with `encoding: UTF-8`, `future: false`, and default `homepage: false` for Stories.
- Story filenames are now the single source of truth for `/stories/:name/` URLs; redundant per-story permalink values were removed.
- Story template date normalized to ISO 8601 with timezone.
- Story index and sitemap explicitly guard against `published: false` documents.

## Validation

- `_config.yml`: valid YAML
- Story front matter: valid YAML
- Published Stories: 4
- Liquid block balance: pass
- Required includes: present
- `.nojekyll`: absent
- Symlinks: none
- Colon filenames: none
- Equivalent Jekyll preview build: 15 HTML pages / 14 sitemap URLs
- Static preview audit: 0 errors / 0 warnings
- Chromium render checks at 1440x900 and 390x844: no horizontal overflow and no page errors
- Mobile menu interaction: body scroll locked, menu scrollable, WhatsApp hidden while menu is open, Escape closes menu

## Environment limitation

The local container does not have the Jekyll gem installed, so an official `jekyll build` was not executed locally. The collection/config structure was validated against current Jekyll/GitHub Pages behavior and an equivalent rendered preview was audited. GitHub Pages remains the authoritative build test after push.
