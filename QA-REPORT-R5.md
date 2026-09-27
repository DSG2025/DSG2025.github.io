# OG Saigon FINAL R5 QA Report

## Scope

R5 closes the remaining maintainability and Jekyll consistency items identified after R4.

## Fixed

1. Shared header/footer includes now apply to all Jekyll-processed static pages, homepage, Stories index and Story layout. The homepage retains its richer footer through `footer_variant: home`.
2. Homepage Story loop explicitly filters `published: true` before `homepage: true`. `/stories/` and `sitemap.xml` use the same explicit publication rule.
3. Added `.github/workflows/jekyll-build-check.yml` using GitHub's official `actions/jekyll-build-pages@v1`. A push to `main` now triggers a real GitHub-hosted Jekyll build check. This check does not deploy or change the current Pages publishing source.
4. `STORIES-GUIDE.md` now explains that new articles should use Markdown for ordinary prose, while raw HTML is valid only for styled components and remains in the four migrated legacy articles.
5. Removed fabricated hour offsets used only for ordering. Current Stories use their real publication day with a neutral midnight time.

## Local source audit

- `_config.yml` YAML parse: PASS
- All 10 static pages have front matter: PASS
- All 10 static pages use shared header include: PASS
- All 10 static pages use shared footer include: PASS
- Hardcoded header/footer removed from those pages: PASS
- Four production Stories explicitly `published: true`: PASS
- Draft template explicitly `published: false`: PASS
- Homepage explicit published filter: PASS
- Stories index explicit published filter: PASS
- Sitemap explicit published filter: PASS
- Story front matter parse: PASS
- Shared include references present: PASS
- Workflow file contains official checkout/configure/Jekyll build actions: PASS

## Equivalent rendered-preview QA

- HTML pages: 15
- Sitemap URLs: 14
- Broken internal links: 0
- Missing local images: 0
- Duplicate IDs: 0
- JSON-LD parse errors: 0
- Missing canonical on indexable pages: 0
- Audit errors: 0
- Audit warnings: 0

Responsive Chromium checks:
- Desktop 1440x900: no horizontal overflow on homepage, Meet Duy, Transport, Hidden Saigon, Stories index or Chợ Lớn Story.
- Mobile 390x844: no horizontal overflow on the same pages.
- Mobile menu: body scroll lock PASS; sheet scroll PASS; WhatsApp hidden while menu is open PASS; Escape close PASS.

## Real Jekyll build status

The current local container has Ruby but cannot download the Jekyll gem because external RubyGems DNS/network access is unavailable. Therefore a real local `jekyll build` still cannot be executed here. R5 addresses this by including a GitHub-hosted build-only workflow using GitHub's official Pages Jekyll action. The first push to `main` is the final real Jekyll validation: open **Actions → Jekyll build check** and confirm the run is green before treating the release as verified.
