# Adding a new OG Saigon Story

You no longer create a new HTML page by hand.

## Fast workflow

1. Copy `_stories/TEMPLATE-NEW-STORY.md`.
2. Rename the copy, for example `_stories/saigon-coffee-morning.md`.
3. Change `published: false` to `published: true`.
4. Change the title, description, publication date, category, hero image and article text. The filename becomes the URL slug automatically; do not add a `permalink:` line for normal Stories.
5. Upload any new WebP images to `assets/images/`.
6. Commit to GitHub.

GitHub Pages/Jekyll will automatically:

- generate the URL under `/stories/.../`;
- use the existing OG Saigon Story layout;
- add the Story to `/stories/`;
- show the newest four `homepage: true` Stories on the homepage;
- add the Story to `sitemap.xml`;
- create canonical, Open Graph, Twitter and Article structured-data metadata.


## Writing format

For new Stories, use normal Markdown for ordinary headings, paragraphs, lists and links. The template is the recommended example.

The four Stories migrated from the older static site still contain some raw HTML for styled components such as summary boxes, photo grids, figures and tables. That HTML is valid inside Markdown and does not need to be copied into new articles unless you need the same styled component.

A simple new article can stay mostly Markdown:

```md
## A useful heading

Write a short paragraph here.

- A practical point
- Another practical point
```

Use raw HTML only when a component needs a specific class, for example a photo grid or the `article-summary` box.

## Dates and ordering

Use the real publication date. Do not invent different hours just to control card order. Example: `2026-10-01T00:00:00+07:00`. Stories are sorted newest-first. If several Stories share the same publication date, their order among themselves is not editorially significant.

## Homepage control

- `homepage: true` = eligible for the homepage latest-four block.
- `homepage: false` = appears in Stories but not on the homepage.

## Drafts

Keep `published: false` until you want the Story public.

## Images

Use optimized WebP files where possible. Always fill in `hero_alt`, `hero_width` and `hero_height`. Supporting images should also have natural alt text plus width/height.

## Important

Do not create a new folder inside `/stories/` for each article anymore. The `_stories/*.md` files are now the source of truth.

## URL and homepage rules

- The filename becomes the URL slug automatically. Example: `_stories/saigon-coffee-morning.md` becomes `/stories/saigon-coffee-morning/`. Do not add a `permalink:` line unless there is a specific redirect/migration reason.
- New Stories default to `homepage: false`. Set `homepage: true` only when you want the Story eligible for the four-card homepage block.
- Keep `published: false` while drafting. Set `published: true` only when the article is ready.
- Use an ISO timestamp such as `2026-10-01T09:00:00+07:00` for `date:`.
