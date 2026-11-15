'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const { JSDOM } = require(process.env.JSDOM_PATH || path.resolve(root, '../../Week-9 Project 1/node_modules/jsdom'));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const script = fs.readFileSync(path.join(root, 'slides.js'), 'utf8');

function setup(t, hash = '') {
  const dom = new JSDOM(html, { url: `https://deck.example/${hash}`, runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window;
  w.scrollTo = () => {};
  w.document.documentElement.requestFullscreen = async () => {};
  w.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); this.querySelector('button')?.focus(); };
  w.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); this.dispatchEvent(new w.Event('close')); };
  w.eval(script);
  t.after(() => w.close());
  return { w, d: w.document, click: selector => w.document.querySelector(selector).click(), key: (key, options = {}) => w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...options })) };
}
const visible = d => [...d.querySelectorAll('.slide')].filter(s => !s.hidden);

test('16 semantic slides have unique IDs, heading labels and a readable no-script fallback', () => {
  const d = new JSDOM(html).window.document;
  const slides = [...d.querySelectorAll('.slide')];
  assert.equal(slides.length, 16);
  assert.equal(d.querySelectorAll('h1').length, 1);
  const ids = [...d.querySelectorAll('[id]')].map(el => el.id);
  assert.equal(new Set(ids).size, ids.length);
  slides.forEach((s, i) => {
    assert.equal(s.id, `slide-${i + 1}`);
    assert.ok(d.getElementById(s.getAttribute('aria-labelledby')));
    assert.equal(s.hidden, false);
  });
});

test('initial slide, boundary controls, button navigation and announcement stay synchronized', t => {
  const { d, click } = setup(t);
  assert.equal(visible(d)[0].id, 'slide-1');
  assert.equal(d.getElementById('previous').disabled, true);
  assert.equal(d.querySelector('.controls').hidden, false);
  click('#next');
  assert.equal(visible(d).length, 1);
  assert.equal(visible(d)[0].id, 'slide-2');
  assert.equal(d.getElementById('counter').textContent, '2 / 16');
  assert.match(d.getElementById('announcement').textContent, /Research focus/);
  click('#previous');
  assert.equal(visible(d)[0].id, 'slide-1');
});

test('direct links and external hash changes open the requested slide', t => {
  const { d, w } = setup(t, '#slide-8');
  assert.equal(visible(d)[0].id, 'slide-8');
  w.location.hash = '#slide-12';
  w.dispatchEvent(new w.HashChangeEvent('hashchange'));
  assert.equal(visible(d)[0].id, 'slide-12');
  w.location.hash = '#deck';
  w.dispatchEvent(new w.HashChangeEvent('hashchange'));
  assert.equal(visible(d)[0].id, 'slide-12');
});

test('out-of-range direct links clamp to a real slide', t => {
  const { d } = setup(t, '#slide-999');
  assert.equal(visible(d)[0].id, 'slide-16');
  assert.equal(d.getElementById('next').disabled, true);
});

test('keyboard navigation, end boundaries, modifiers and shortcuts work', t => {
  const { d, key } = setup(t);
  key('ArrowRight'); assert.equal(visible(d)[0].id, 'slide-2');
  key('PageDown'); assert.equal(visible(d)[0].id, 'slide-3');
  key(' ', { shiftKey: true }); assert.equal(visible(d)[0].id, 'slide-2');
  key('End'); assert.equal(visible(d)[0].id, 'slide-16');
  key('ArrowRight'); assert.equal(visible(d)[0].id, 'slide-16');
  key('Home'); assert.equal(visible(d)[0].id, 'slide-1');
  key('ArrowRight', { metaKey: true }); assert.equal(visible(d)[0].id, 'slide-1');
  key('?'); assert.equal(d.getElementById('help').open, true);
  key('ArrowRight'); assert.equal(visible(d)[0].id, 'slide-1');
});

test('slide list can navigate and restores focus to its opener', t => {
  const { d, click } = setup(t);
  click('#overview-open');
  assert.equal(d.getElementById('overview').open, true);
  assert.equal(d.querySelectorAll('#slide-list button').length, 16);
  click('#slide-list li:nth-child(7) button');
  assert.equal(visible(d)[0].id, 'slide-7');
  assert.equal(d.getElementById('overview').open, false);
  assert.equal(d.activeElement.id, 'overview-open');
  assert.equal(d.querySelector('#slide-list [aria-current=true]').textContent, 'Ingredient Hunter');
});

test('research boards enlarge with matching description, source and focus restoration', t => {
  const { d, click } = setup(t, '#slide-8');
  click('#slide-8 [data-image]');
  assert.equal(d.getElementById('image-view').open, true);
  assert.match(d.getElementById('enlarged-image').src, /decision-pathing\.png$/);
  assert.equal(d.getElementById('enlarged-image').alt, d.querySelector('#slide-8 img').alt);
  assert.equal(d.getElementById('image-original').getAttribute('href'), 'assets/images/decision-pathing.png');
  click('#image-view [data-close]');
  assert.equal(d.activeElement, d.querySelector('#slide-8 [data-image]'));
});

test('fullscreen denial is handled, and print calls the browser print action', async t => {
  const { w, d, click } = setup(t);
  d.documentElement.requestFullscreen = async () => { throw new Error('denied'); };
  click('#fullscreen');
  await new Promise(resolve => setImmediate(resolve));
  assert.match(d.getElementById('announcement').textContent, /Fullscreen is unavailable/);
  let printed = false;
  w.print = () => { printed = true; };
  click('#print'); assert.equal(printed, true);
});

test('participant quotes, original disclosure and separate redesign disclosure are preserved', () => {
  const d = new JSDOM(html).window.document;
  assert.equal(d.querySelector('#slide-6 blockquote').textContent, '“Farmers markets remind me of home. They feel very familiar.”');
  assert.match(d.querySelector('#slide-5 blockquote').textContent, /It helps keep the ingredients fresh/);
  assert.match(d.querySelector('#slide-7 blockquote').textContent, /finding ingredients or vendors can be unpredictable/);
  assert.deepEqual([...d.querySelectorAll('#slide-15 td')].map(x => x.textContent), ['A little', '0%', '0%', '0%']);
  assert.match(d.getElementById('slide-15').textContent, /Codex assisted with visual design, copyediting/);
  assert.match(d.getElementById('slide-8').textContent, /we assumed/);
});

test('all local references exist, images have descriptions and no external runtime dependencies exist', () => {
  const d = new JSDOM(html).window.document;
  [...d.querySelectorAll('[src],link[href]')].forEach(el => {
    const ref = el.getAttribute('src') || el.getAttribute('href');
    assert.ok(!/^https?:/.test(ref), ref);
    assert.ok(fs.existsSync(path.join(root, ref)), ref);
  });
  d.querySelectorAll('img').forEach(img => assert.ok(img.alt || img.id === 'enlarged-image'));
  for (const [, font] of css.matchAll(/url\('([^']+)'\)/g)) assert.ok(fs.existsSync(path.join(root, font)));
  assert.match(d.querySelector('#slide-16 a').href, /1a1ZaTAmsIHviSO84zamYeGGwfUQeb9bG/);
});

test('print includes hidden slides, responsive rules are screen-only and typography stays proportional', () => {
  assert.match(css, /@media print[\s\S]*\.slide\[hidden\][\s\S]*display:flex!important/);
  assert.match(css, /@page\{size:13\.333in 7\.5in;margin:0\}/);
  assert.match(css, /@media screen and \(max-width:1100px\)/);
  assert.doesNotMatch(css + html, /monospace|JetBrains|<code|<pre\b/i);
  assert.match(css, /font-family:Archivo,Arial,sans-serif/);
  assert.match(css, /prefers-reduced-motion/);
});

test('normal text and accent colors meet WCAG AA contrast against the canvas', () => {
  const luminance = hex => {
    const channels = hex.match(/\w\w/g).map(x => parseInt(x, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  const bg = luminance('FAF9F5');
  for (const color of ['1B1B1B', '66645E', 'C4008D', '470063']) {
    const contrast = (bg + .05) / (luminance(color) + .05);
    assert.ok(contrast >= 4.5, `${color}: ${contrast}`);
  }
});

test('source PDF remains identical to the recorded original', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'source-manifest.json')));
  const source = fs.readFileSync(path.join(root, '..', manifest.source));
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'), manifest.sha256);
  assert.equal(manifest.figmaFrame, '33:78');
  assert.equal(manifest.monospacedTypography, false);
});
