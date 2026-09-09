# OG Saigon — Updating Review Data

The website now uses one central file for changing OTA review data and contact details:

`/assets/js/site-data.js`

## When review counts increase

Open `site-data.js` and edit only these values:

```js
tripadvisor: {
  rating: 5.0,
  count: 54,
},

getyourguide: {
  rating: 5.0,
  count: 40,
},

airbnb: {
  rating: 5.0,
  count: 5,
},
```

Example: if Tripadvisor becomes 61 reviews, change only:

```js
count: 61,
```

Then update:

```js
reviewsLastChecked: "YYYY-MM-DD",
```

The homepage hero and review cards will update automatically when the page loads.

## OTA profile URLs

If an OTA profile URL changes, update the corresponding `url` in the same file. Footer links and homepage review links are wired to the central data.

## WhatsApp / phone

If the business phone number changes, edit only the `contact` block in `site-data.js`:

```js
contact: {
  whatsappNumber: "84938033395",
  phoneHref: "+84938033395",
  phoneDisplay: "+84 938 033 395",
},
```

Existing page-specific WhatsApp messages are preserved automatically; only the destination number changes.

## Why HTML still shows old fallback values

The HTML intentionally keeps fallback review values and URLs so the website remains usable if JavaScript fails or is disabled. In normal use, `site-data.js` overrides those values at runtime.

Do not manually update every HTML page unless you specifically want to refresh the fallback source values too.
