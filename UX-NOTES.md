# OG Saigon UX Notes

## Core UX priorities

1. Trust should appear before product exploration: homepage review proof sits directly below the hero and a compact Tripadvisor proof appears inside the hero.
2. Keep the main navigation stable: Experiences, Custom Trip, About, Transport, Chat with us.
3. Use OG Saigon as the brand voice; Duy remains Founder & Lead Host, not the only person customers expect to deal with.
4. Keep one primary action per context. On desktop the sticky header carries the WhatsApp CTA; the floating WhatsApp CTA is mobile-only.
5. Preserve keyboard focus styles, skip link, menu Escape behavior, and form status feedback.
6. Keep below-the-fold images lazy-loaded.

## Review data architecture

Review data is no longer managed by editing multiple HTML locations.

Runtime source of truth:

`/assets/js/site-data.js`

Current values initially carried over from V5 (checked 2026-09-09):

- Tripadvisor: 5.0 / 54 reviews
- GetYourGuide: 5.0 / 40 reviews
- Airbnb experience: 5.0 / 5 reviews

When a count or rating changes, edit only `site-data.js` and update `reviewsLastChecked`.

The HTML intentionally retains fallback values for resilience if JavaScript is unavailable. In a normal browser, `site-data.js` overrides those fallback values automatically.

See `SITE-DATA-GUIDE.md` for owner instructions.
