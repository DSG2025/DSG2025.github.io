// Logic-only regression checks; these do not emulate a browser layout engine.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const code = fs.readFileSync('assets/js/home.js', 'utf8');
function setup({ home = true, supported = true, bottom = 1000 } = {}) {
  const classes = new Set();
  let callback, observed;
  const intro = { getBoundingClientRect: () => ({ bottom }) };
  class Observer {
    constructor(fn, options) { callback = fn; assert.equal(options.threshold, 0); }
    observe(target) { observed = target; }
  }
  const document = {
    querySelector: (selector) => { assert.equal(selector, 'body.home-v2 #home-intro'); return home ? intro : null; },
    body: { classList: {
      remove: name => classes.delete(name),
      toggle: (name, on) => on ? classes.add(name) : classes.delete(name)
    } }
  };
  vm.runInNewContext(code, { document, window: supported ? { IntersectionObserver: Observer } : {}, IntersectionObserver: Observer });
  return { classes, callback, observed, intro };
}
const initial = setup();
assert.equal(initial.observed, initial.intro);
assert(initial.classes.has('home-intro-active'));
initial.callback([{ boundingClientRect: { bottom: 300 } }]);
assert(initial.classes.has('home-intro-active'));
initial.callback([{ boundingClientRect: { bottom: -1 } }]);
assert(!initial.classes.has('home-intro-active'));
initial.callback([{ boundingClientRect: { bottom: 300 } }]);
assert(initial.classes.has('home-intro-active'));
assert(!setup({bottom:-100}).classes.has('home-intro-active'));
assert(!setup({supported:false}).classes.has('home-intro-active'));
assert.equal(setup({home:false}).observed, undefined);

// Exercise the existing runtime review binder with changed data, not hardcoded counts.
const main = fs.readFileSync('assets/js/main.js', 'utf8').split('function applyContactData()')[0];
const containers = ['tripadvisor','tripadvisor','getyourguide','airbnb'].map(key => ({
  dataset: {reviewPlatform:key}, rating:{}, count:{},
  querySelectorAll(selector) { return selector === '[data-review-rating]' ? [this.rating] : [this.count]; },
  matches: () => true,
  setAttribute(name, value) {this[name]=value;}
}));
const reviews = Object.fromEntries(['tripadvisor','getyourguide','airbnb'].map((key, i) => [key, {name:key,rating:4.7,count:101+i,url:'https://example.org/'+key}]));
vm.runInNewContext(main + '\napplyReviewData();', {
  window: { OG_SAIGON_SITE_DATA: { reviews } },
  document: {querySelectorAll:()=>containers,querySelector:()=>null}
});
for(const container of containers) {
  assert.equal(container.rating.textContent,'4.7');
  assert.equal(container.count.textContent,reviews[container.dataset.reviewPlatform].count+' reviews');
  assert.equal(container.href,reviews[container.dataset.reviewPlatform].url);
}
console.log('PASS: homepage-only observer, initial/after/return scroll states, unsupported observer fallback, shared review runtime binding with changed data.');
