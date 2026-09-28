# OG Saigon FINAL R9 — Mobile consistency correction

R9 is a narrow corrective patch on top of R8.

## Fixed

### Mobile menu
- Keeps the R8 shared mobile menu behavior across Home and all inner pages.
- Reverts the unintended global desktop `.header-cta` +4px offset.
- The +4px desktop spacing is now homepage-only, matching the pre-refactor design.
- Removes the unused `mobile-menu-cta` class from the shared header include.
- Mobile menu CTA still gets its shared full-width styling from `.site-header .mobile-menu .btn`.

### Story images
- Removes the older Chợ Lớn mobile aspect-ratio rules (`4:3`, `3:4`, `4:5`) that could override R8.
- All Story hero and inline figure images now use one `1:1` viewport on phones.
- Images are not distorted: `object-fit: cover` is used.
- Existing source image files and Jekyll content are unchanged.

## Crop review
A square-crop contact review was made for the currently published Chợ Lớn and District 4 photography. The present images remain readable with centered square crops, so R9 does not add per-image `object-position` exceptions. Future Stories can add a local `object-position` override only when a specific subject is genuinely cut off.

## Scope
Changed:
- `assets/css/style.css`
- `assets/css/home-v2.css`
- `assets/css/stories.css`
- `_includes/site-header.html`

No SEO, URL, sitemap, Story Markdown, JS, schema, or image-file changes.
