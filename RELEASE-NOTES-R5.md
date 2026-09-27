# OG Saigon FINAL R5 — Maintainability + Jekyll build guard

- Shared `_includes/site-header.html` and `_includes/site-footer.html` now power all Jekyll-processed static pages as well as Stories.
- Homepage retains its richer footer via `footer_variant: home` in front matter.
- Every production Story now declares `published: true`; draft template remains `published: false`.
- Homepage, `/stories/`, and `sitemap.xml` explicitly filter for `published: true`.
- Story dates use real publication days without fabricated hour offsets for card ordering.
- `STORIES-GUIDE.md` now explains Markdown-first authoring and legacy HTML components clearly.
- Added `.github/workflows/jekyll-build-check.yml` using GitHub's official Pages Jekyll build action. On every push/PR to `main`, GitHub runs a real Jekyll build check before you rely on the Pages deployment.
