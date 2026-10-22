/* OG Saigon V2 release smoke gate.
 * Node built-ins only. Run AFTER npm run build.
 * Checks Vite preview output, not a production Jekyll build or browser layout.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
const routes = [
  '/', '/about/', '/meet-duy/', '/custom-trip/', '/transport/', '/experiences/',
  '/experiences/cu-chi-tunnels/', '/experiences/cu-chi-war-museum/',
  '/experiences/hidden-saigon/', '/stories/', '/404.html',
  '/stories/cholon-saigon-chinatown/',
  '/stories/cu-chi-or-war-remnants-museum/',
  '/stories/cu-chi-without-crawling/',
  '/stories/district-4-saigon-alleys/',
  '/stories/first-day-in-saigon/',
  '/stories/saigon-doesnt-stop-when-it-rains/'
];
const load = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const outputPath = route => path.join(out, route === '/404.html' ? '404.html' : route.slice(1), route === '/404.html' ? '' : 'index.html');
const count = (s, re) => (s.match(re) || []).length;
const plain = s => s.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
assert(fs.existsSync(out), 'Missing dist/. Run npm run build first.');
const documents = new Map(routes.map(route => [route, fs.readFileSync(outputPath(route), 'utf8')]));
let imageCount = 0, schemaCount = 0, internalCount = 0;
for (const [route, html] of documents) {
  assert.equal(count(html, /<header\b/gi), 1, route + ': missing/duplicate header');
  assert.equal(count(html, /<footer\b/gi), 1, route + ': missing/duplicate footer');
  assert.equal(count(html, /<h1\b/gi), 1, route + ': missing/duplicate H1');
  assert(/<title>[\s\S]*?<\/title>/i.test(html), route + ': missing title');
  if (route !== '/404.html') assert(/rel=["']canonical["']/i.test(html), route + ': missing canonical');
  // build-preview intentionally protects local preview from indexing.
  assert(/<meta\s+name=["']robots["']\s+content=["']noindex,\s*nofollow["']>/i.test(html),
    route + ': preview noindex missing');
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    imageCount++;
    assert(/\balt=["'][^"']+["']/i.test(tag), route + ': img missing useful alt');
    assert(/\bwidth=["'][0-9]+["']/i.test(tag), route + ': img missing width');
    assert(/\bheight=["'][0-9]+["']/i.test(tag), route + ': img missing height');
  }
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    JSON.parse(match[1]);
    schemaCount++;
  }
  const ids = [...html.matchAll(/<[a-z][^>]*\bid=["']([^"']+)["']/gi)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, route + ': duplicate HTML ID');
  for (const tag of html.match(/<(?:a|img|link|script)\b[^>]*>/gi) || []) {
    const attr = tag.match(/\b(?:src|href)=["']([^"']+)["']/i);
    if (!attr || !attr[1].startsWith('/')) continue;
    const clean = decodeURIComponent(attr[1].split(/[?#]/)[0]);
    const p = clean.endsWith('/') ? path.join(out, clean.slice(1), 'index.html') : path.join(out, clean.slice(1));
    assert(fs.existsSync(p), route + ': broken internal file/route ' + attr[1]);
    internalCount++;
  }
}
const home = documents.get('/');
const hero = home.match(/<section\b[^>]*id=["']home-hero["'][^>]*>[\s\S]*?<\/section>/i);
assert(hero, 'Homepage hero missing');
assert.equal(count(hero[0], /<img\b/gi), 3, 'Hero must have two photos and one sticker');
for (const asset of ['og-saigon-district-4-utility-pole-wires.webp',
  'og-saigon-district-4-hem-sinh-hoat-hero.webp', 'og-quan-tu-district-4-sticker.svg']) {
  assert(hero[0].includes(asset), 'Hero missing approved asset: ' + asset);
}
const h1 = hero[0].match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
assert.equal(plain(h1[1]), 'See Saigon through fifth-generation Saigonese eyes');
assert(hero[0].includes('Born in Quận Tư. Five generations deep.'), 'Approved kicker changed');
assert(hero[0].includes('href="/custom-trip/#trip-builder"'), 'Hero booking target changed');
assert(home.includes('100+ Guest Reviews'), 'Trust count changed');
assert(home.includes('Personal experiences, thoughtfully tailored to you.'), 'Trust supporting line changed');
for(const p of ['GetYourGuide','Airbnb','Tripadvisor','Google Maps'])
  assert(home.includes('alt="' + p + '"'), 'Review logo missing: ' + p);
assert(home.includes('Choose what interests you most. We’ll help with the rest.'),
  'Approved homepage chooser line changed');
assert(documents.get('/experiences/').includes(
  'History, food, local life or a custom day. Each experience is designed around conversation, context and a pace that feels personal.'
), 'Approved experiences opening changed');
const header = home.match(/<header\b[\s\S]*?<\/header>/i)[0];
assert(header.includes('brand-og-mark') && header.includes('brand-saigon'), 'OG logo lockup changed');
assert(!header.includes('Experiences &amp; Transport') && !header.includes('Build My Own Day'),
  'Removed header subtitle or booking CTA has returned');
const custom = documents.get('/custom-trip/');
assert(custom.includes('id="customExperienceForm"'), 'Custom Trip form ID changed');
assert(custom.includes('id="tripIdea"'), 'Custom Trip textarea ID changed');
assert(custom.includes('for="tripIdea"'), 'Custom Trip label lost');
assert(custom.includes('Tell us what you’re hungry for.'), 'Approved form label changed');
const css = load('assets/css/home-v2.css');
assert(css.includes('@media (min-width:651px) and (max-width:920px)'),
  'Tablet image-above-content breakpoint missing');
assert(css.includes('grid-template-rows:repeat(2,clamp(145px,42vw,174px))'),
  'Mobile horizontal photos breakpoint missing');
const shared = load('assets/css/style.css');
assert(!shared.includes('body.menu-open {\n    overflow: hidden;'),
  'Mobile background scroll lock has returned');
console.log('PASS: ' + routes.length + ' preview pages, ' + internalCount +
  ' internal assets/routes, ' + imageCount + ' image attributes, ' +
  schemaCount + ' JSON-LD blocks; preserved Hero, Trust, header, footer, copy and form contract.');
console.log('NOT VERIFIED: real browser layout, production Jekyll, performance and live deployment.');
