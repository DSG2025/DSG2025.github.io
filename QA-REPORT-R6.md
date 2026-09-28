# QA Report - FINAL R6

R6 is a narrow maintenance patch over FINAL R5.

## Verified locally

- `_config.yml` parses as YAML.
- `.github/workflows/jekyll-build-check.yml` parses as YAML.
- All HTML/Markdown front matter blocks parse as YAML.
- `assets/js/main.js` passes `node --check`.
- `assets/js/site-data.js` passes `node --check`.
- Homepage story loop, `/stories/`, and `sitemap.xml` all explicitly filter `published: true`.
- Shared header include now exposes the existing homepage hooks `header-cta` and `mobile-menu-cta`.
- No hand-authored `<header>` or `<footer>` remains outside `_includes/`.

## Workflow changes

- Runs on push to `main`.
- Runs on pull requests targeting `main`.
- Can be run manually.
- Build-only workflow, no deploy step.
- Permissions: `contents: read`, `pages: read`.
- Checkout credentials are not persisted.

## Runtime note

The current container has Ruby but does not have the Jekyll/Bundler executables installed, so the definitive Jekyll build remains the GitHub Actions run after the workflow is uploaded to `.github/workflows/` in the repository root.
