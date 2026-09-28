# OG Saigon FINAL R6 - Jekyll Polish

R6 is a narrow patch on top of FINAL R5. It does not redesign the site.

## Fixed

- Restored the homepage header CTA hook classes (`header-cta` and `mobile-menu-cta`) in the shared header include so the existing homepage-specific CSS applies again.
- Added a `pull_request` trigger for PRs targeting `main` to the Jekyll build-check workflow.
- Reduced workflow permissions from deploy-level access to read-only access required for build validation: `contents: read` and `pages: read`.
- Disabled checkout credential persistence because this workflow only builds and never pushes.

## Verified

- `actions/checkout@v6` is an official released major version.
- The workflow still uses GitHub's official `actions/configure-pages@v5` and `actions/jekyll-build-pages@v1`.
- The workflow builds only; it does not upload or deploy a Pages artifact.
