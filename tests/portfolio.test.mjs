import test from 'node:test';
import './specimen.test.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire, Module } from 'node:module';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';

const root = new URL('../', import.meta.url);
const read = file => fs.readFileSync(new URL(file, root), 'utf8');
const hash = value => createHash('sha256').update(value).digest('hex');
const require = createRequire(import.meta.url);
const load = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
Module._extensions['.ts'] = load;
Module._extensions['.tsx'] = load;
Module._extensions['.css'] = () => {};
// Resolve the '@/…' alias used by shadcn components, as Vite does.
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) { return resolve.call(this, request.startsWith('@/') ? fileURLToPath(new URL(`../src/${request.slice(2)}`, import.meta.url)) : request, ...rest); };
const data = require('../src/data/content.ts');
const render = Component => renderToStaticMarkup(createElement(MemoryRouter, null, createElement(Component)));
const escaped = value => renderToStaticMarkup(createElement('span', null, value)).slice(6, -7);

test('copied content and all original identity assets match their source hashes', () => {
  const source = JSON.parse(read('tests/fixtures/source-manifest.json'));
  for (const [file, original] of Object.entries(source)) assert.equal(hash(fs.readFileSync(new URL(file, root))), original.sha256, file);
});

test('résumé shows the current role, RS360, profiles with handles and no LinkedIn Learning label', () => {
  const Resume = require('../src/resume/ResumeApp.tsx').default;
  const markup = render(Resume);
  const text = markup.replace(/<[^>]+>/g, ' ');
  for (const part of ['Dhruv Poddar', 'Product Designer &amp; Creative Developer', 'RadheShyam Laminates', 'RS360', 'NeuroTwin', 'SkillBridge', 'LogoFolio', 'Export PDF']) assert.ok(markup.includes(part), part);
  for (const handle of ['dhruvpoddar.is-a.dev', 'dhruvp0629@gmail.com', 'Shin7806', 'shinchangfx', '_shinchan_op']) assert.ok(text.includes(handle), handle);
  for (const href of ['https://www.linkedin.com/in/dhruvpoddar/', 'https://github.com/Shin7806', 'https://www.behance.net/shinchangfx', 'https://www.instagram.com/_shinchan_op/', 'href="/work/rs360"', 'href="/work/logofolio"']) assert.ok(markup.includes(href), href);
  assert.ok(!/LinkedIn Learning/.test(text), 'no LinkedIn Learning label');
  assert.ok(!/Open to Work/i.test(text));
  assert.ok(!/\+91|\d{5}\s?\d{5}|@rs360|@radheshyam/i.test(text), 'no phone numbers or business email');
  assert.ok(text.includes('Available for select work'), 'the website’s availability line');
  assert.ok(!markup.includes('<details'), 'no dropdowns on a résumé');
  assert.equal((text.match(/Bengaluru, India/g) ?? []).length, 1, 'location shown once');
});

test('résumé PDF is one A4 page with clickable links', async () => {
  const { renderResumePdf, pageCount } = await import('./resume-pdf.mjs');
  const pdf = await renderResumePdf();
  const raw = pdf.toString('latin1');
  assert.equal(pageCount(pdf), 1, 'fits one page');
  assert.match(raw, /\/MediaBox \[0 0 595\.\d+ 841\.\d+\]/, 'A4');
  for (const uri of ['https://dhruvpoddar.is-a.dev/work/rs360', 'https://dhruvpoddar.is-a.dev/work/neurotwin', 'mailto:dhruvp0629@gmail.com']) assert.ok(raw.includes(`/URI (${uri})`), uri);
  assert.ok(!raw.includes('/URI (https://rs360.in/)'), 'one link per project: its page on the site');
});

const projectsData = require('../src/data/projects.ts');

test('the home page renders every project, work, tool and destination with sound landmarks', () => {
  const Portfolio = require('../src/Portfolio.tsx').default;
  const markup = render(Portfolio);
  const text = markup.replace(/<[^>]*>/g, '');
  const hrefs = [...markup.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
  const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal((markup.match(/<h1\b/g) ?? []).length, 1);
  assert.match(markup, /<h1[^>]*><span class="sr-only">Dhruv Poddar<\/span>/);
  assert.equal((markup.match(/<main\b/g) ?? []).length, 1);
  assert.equal((markup.match(/<footer\b/g) ?? []).length, 1);
  assert.ok(/<main\b[\s\S]*id="contact"[\s\S]*<\/main>/.test(markup), 'contact sits inside main');
  assert.equal(ids.length, new Set(ids).size);
  assert.equal((markup.match(/aria-haspopup="dialog"/g) ?? []).length, 12);
  assert.equal((markup.match(/class="ribbon-row ribbon-row-\d"/g) ?? []).length, 2);
  assert.equal((markup.match(/class="ribbon-group ribbon-copy" aria-hidden="true"/g) ?? []).length, 4);
  for (const id of ['start', 'work', 'archive', 'approach', 'lab', 'contact', 'main']) assert.ok(ids.includes(id), id);
  for (const href of hrefs.filter(value => value.startsWith('#'))) assert.ok(ids.includes(href.slice(1)), href);
  assert.deepEqual(projectsData.projects.map(project => project.title), ['RS360', 'NeuroTwin', 'SkillBridge', 'LogoFolio']);
  for (const project of data.projects) assert.ok(projectsData.projects.some(item => item.title === project.title && item.summary === project.description && item.href === project.href), project.title);
  for (const project of projectsData.projects) {
    assert.ok(text.includes(escaped(project.title)), project.title);
    assert.ok(hrefs.includes(escaped(project.href)), project.href);
    assert.ok(markup.includes(`alt="${escaped(project.preview.alt)}"`), `${project.title} preview alt`);
  }
  assert.equal((markup.match(/<img[^>]*src="\/projects\/[^"]+"[^>]*>/g) ?? []).filter(tag => /width="\d+"/.test(tag) && /height="\d+"/.test(tag) && /loading="lazy"/.test(tag)).length, 4);
  assert.ok(!markup.includes('<video'), 'no hover clips: cards only lift');
  for (const work of data.works) {
    assert.ok(text.includes(escaped(work.title)), work.title);
    assert.ok(hrefs.includes(escaped(work.postUrl)), work.postUrl);
  }
  for (const tool of ['Figma','Photoshop','Illustrator','HTML','CSS','JavaScript','React','TypeScript','Tailwind','VS Code','Git','Notion','ChatGPT','Claude','Gemini','Antigravity','Codex']) assert.ok(text.includes(tool), tool);
  for (const social of data.socials) assert.ok(hrefs.includes(escaped(social.href)), social.label);
  assert.ok(hrefs.includes('/resume') && hrefs.includes('/work'));
  for (const project of projectsData.projects) assert.ok(hrefs.includes(project.details), project.details);
  assert.ok(!hrefs.includes('/about'), 'about page removed');
  assert.ok(hrefs.includes('mailto:dhruvp0629@gmail.com'));
  assert.match(markup, /aria-label="Switch to dark mode"/);
  for (const href of ['/', '/work', '/archive', '/timeline', '/resume']) assert.ok(hrefs.includes(href), 'nav ' + href);
  assert.ok(!/Pause archive motion/.test(markup), 'pause button replaced by the archive link');
  assert.match(markup, /id="site-menu"[^>]*hidden/);
  assert.ok(!/\b0\d \/ /.test(text), 'no "01 / Label" numbering');
  assert.ok(!/Current focus|How I work|Right now\./.test(text), 'removed sections stay removed');
  const contact = markup.slice(markup.indexOf('id="contact"'));
  assert.ok(!contact.includes('Bengaluru'), 'no location in the contact block or footer');
  assert.ok(!/freelanc|employ|full-time job/i.test(text), 'no employment wording');
  assert.ok(!markup.includes('unsplash.com'));
});

test('every work story renders from data with real, described images and no contact details', () => {
  const WorkStory = require('../src/pages/WorkStory.tsx').default;
  const { stories } = require('../src/data/work.ts');
  const { Routes, Route } = require('react-router');
  assert.deepEqual(stories.map(story => story.slug), ['rs360', 'neurotwin', 'skillbridge', 'logofolio']);
  for (const story of stories) {
    const markup = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [`/work/${story.slug}`] }, createElement(Routes, null, createElement(Route, { path: '/work/:slug', element: createElement(WorkStory) }))));
    const text = markup.replace(/<[^>]*>/g, '');
    assert.equal((markup.match(/<h1\b/g) ?? []).length, 1, story.slug);
    assert.ok(text.includes(escaped(story.title)), story.slug);
    assert.ok(markup.includes(escaped(story.link.href)), `${story.slug} external link`);
    assert.ok(!/\+91|\d{5}\s?\d{5}|@rs360|@radheshyam/i.test(text), `${story.slug}: no phone numbers or business email`);
    assert.ok(!/\b0\d \/ /.test(text), `${story.slug}: no numbered labels`);
    assert.ok(!/freelanc|employ/i.test(text), `${story.slug}: no employment wording`);
    const images = (markup.match(/<img[^>]*>/g) ?? []).filter(tag => /src="\/(work|projects)\//.test(tag));
    assert.ok(images.length >= 3, `${story.slug} has images`);
    for (const tag of images) {
      assert.match(tag, /alt="[^"]{20,}"/);
      assert.match(tag, /width="\d+"/);
      assert.match(tag, /height="\d+"/);
      const src = tag.match(/src="([^"]+)"/)[1];
      assert.ok(fs.existsSync(new URL(`public${src}`, root)), src);
    }
  }
  const rs = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: ['/work/rs360'] }, createElement(Routes, null, createElement(Route, { path: '/work/:slug', element: createElement(WorkStory) })))).replace(/<[^>]*>/g, '');
  for (const fact of ['React 19', 'Supabase', 'Cashfree', '12–24 hours', 'GST', 'PDF', '25 years']) assert.ok(rs.includes(fact), fact);
});

test('the contact block offers email, Discord and logo-only links', () => {
  const Portfolio = require('../src/Portfolio.tsx').default;
  const markup = render(Portfolio);
  const contact = markup.slice(markup.indexOf('id="contact"'));
  assert.ok(contact.includes('mailto:dhruvp0629@gmail.com'));
  assert.ok(contact.includes('https://discord.com/users/677179769774800947') && contact.includes('shinchan0269'));
  for (const social of data.socials) assert.match(contact, new RegExp(`aria-label="${social.label} \\(opens in a new tab\\)"`));
});

test('the work page shows every project as a full card with its description and both links', () => {
  const WorkIndex = require('../src/pages/WorkIndex.tsx').default;
  const markup = render(WorkIndex);
  const text = markup.replace(/<[^>]*>/g, '');
  assert.equal((markup.match(/class="card card-full"/g) ?? []).length, projectsData.projects.length);
  for (const project of projectsData.projects) { assert.ok(text.includes(escaped(project.summary)), project.title); assert.ok(markup.includes(project.details) && markup.includes(escaped(project.href)), project.title); }
});

test('every project thumbnail exists', () => {
  for (const project of projectsData.projects) for (const file of ['600.avif', '1200.avif', '600.webp', '1200.webp']) assert.ok(fs.existsSync(new URL(`public${project.preview.base}-${file}`, root)), `${project.id} ${file}`);
});

test('the archive page shows every post with all of its slides', () => {
  const ArchivePage = require('../src/pages/ArchivePage.tsx').default;
  const { posts } = require('../src/data/archive-posts.ts');
  const markup = render(ArchivePage);
  assert.equal(posts.length, data.works.length);
  for (const post of posts) {
    assert.ok(post.slides.length >= 1, post.title);
    assert.ok(markup.includes(`id="${post.post}"`), post.title);
    assert.ok(markup.includes(escaped(post.title)), post.title);
    for (const slide of post.slides) for (const ext of ['600.avif', '1200.webp']) assert.ok(fs.existsSync(new URL(`public${slide.base}-${ext}`, root)), `${slide.base}-${ext}`);
  }
  assert.equal((markup.match(/aria-haspopup="dialog"/g) ?? []).length, posts.length);
});

test('the timeline covers every year, project and milestone', () => {
  const TimelinePage = require('../src/pages/TimelinePage.tsx').default;
  const { timeline } = require('../src/data/site.ts');
  const text = render(TimelinePage).replace(/<[^>]*>/g, '');
  const years = timeline.map(group => group.year);
  assert.deepEqual(years, [...years].sort((a, b) => b - a));
  for (const year of ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026']) assert.ok(years.includes(year), year);
  for (const project of projectsData.projects) assert.ok(text.includes(escaped(project.title)), project.title);
  for (const event of data.events.filter(event => event.type === 'milestone' || event.type === 'start' || event.type === 'edu')) assert.ok(text.includes(escaped(event.body)), event.title);
  assert.ok(text.includes('BCA completed') && text.includes('July 2026'));
  assert.ok(!/Graduating BCA/.test(text), 'outdated entry replaced');
  const { behance, instagramPosts } = require('../src/data/social.ts');
  for (const post of behance) assert.ok(text.includes(escaped(post.name)) && text.includes(post.date), post.name);
  const markup = render(TimelinePage);
  const instagramYears = new Set(instagramPosts.map(post => post.date.slice(-4)));
  assert.equal((markup.match(/<details class="entry-posts"/g) ?? []).length, instagramYears.size);
  for (const post of instagramPosts) assert.ok(markup.includes(post.href), post.name);
  assert.ok(instagramPosts.length >= 80, `all Instagram posts listed (${instagramPosts.length})`);
  assert.ok(instagramPosts.every(post => /^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(post.date)), 'every post dated');
});

test('archive filter membership and circular viewer navigation preserve the entire collection', () => {
  const { exhibition, selectCategory, adjacentIndex, ribbonRows } = require('../src/data/archive.ts');
  assert.equal(exhibition.length, 12);
  assert.equal(new Set(exhibition.map(item => item.id)).size, 12);
  assert.deepEqual(exhibition.map(item => item.id).sort((a,b) => a-b), data.works.map(item => item.id));
  assert.equal(selectCategory('All').length, 12);
  for (const category of data.categories.slice(1)) assert.deepEqual(selectCategory(category).map(item => item.id).sort((a,b) => a-b), data.works.filter(item => item.cat === category).map(item => item.id));
  assert.equal(adjacentIndex(0, -1, 12), 11);
  assert.equal(adjacentIndex(11, 1, 12), 0);
  assert.equal(adjacentIndex(0, 1, 1), 0);
  assert.equal(adjacentIndex(0, -1, 0), 0);
  const rows = ribbonRows();
  assert.deepEqual(rows.map(row => row.length), [6,6]);
  assert.equal(new Set(rows.flat().map(work => work.id)).size, 12);
  assert.deepEqual(rows.flat().map(work => work.id).sort((a,b) => a-b), data.works.map(work => work.id));
});

test('ribbon playback stops offscreen, in hidden tabs, for reduced motion and on cleanup', () => {
  const code = ts.transpileModule(read('src/ribbonMotion.ts'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  class Target extends EventTarget { fire(type) { this.dispatchEvent(new Event(type)); } }
  const reduced = Object.assign(new Target(), { matches: false });
  const document = Object.assign(new Target(), { hidden: false });
  const attributes = new Map();
  const element = { setAttribute: (key,value) => attributes.set(key,value), removeAttribute: key => attributes.delete(key) };
  let callback; let disconnected = false;
  class Observer { constructor(fn) { callback = fn; } observe() {} disconnect() { disconnected = true; } }
  const context = { exports: {}, require: () => ({}), matchMedia: () => reduced, document, window: { IntersectionObserver: Observer }, IntersectionObserver: Observer };
  vm.runInNewContext(code, context);
  const cleanup = context.exports.attachRibbonPlayback(element, true);
  assert.equal(attributes.get('data-ribbon-running'), 'false');
  callback([{ isIntersecting: true }]);
  assert.equal(attributes.get('data-ribbon-running'), 'true');
  document.hidden = true; document.fire('visibilitychange');
  assert.equal(attributes.get('data-ribbon-running'), 'false');
  document.hidden = false; document.fire('visibilitychange');
  assert.equal(attributes.get('data-ribbon-running'), 'true');
  reduced.matches = true; reduced.fire('change');
  assert.equal(attributes.get('data-ribbon-running'), 'false');
  reduced.matches = false; callback([{ isIntersecting: false }]);
  assert.equal(attributes.get('data-ribbon-running'), 'false');
  cleanup(); assert.equal(attributes.has('data-ribbon-running'), false); assert.equal(disconnected, true);
  context.exports.attachRibbonPlayback(element, false);
  callback([{ isIntersecting: true }]);
  assert.equal(attributes.get('data-ribbon-running'), 'false');
});

test('theme boot handles system preference, invalid or blocked storage, and direct resume routes', () => {
  const code = read('public/theme.js');
  function boot(saved, dark = false, path = '/', denied = false) {
    const root = { dataset: {}, style: {} }; const meta = { content: '' };
    vm.runInNewContext(code, { localStorage: { getItem: () => { if (denied) throw Error('Denied'); return saved; } }, matchMedia: () => ({ matches: dark }), location: { pathname: path }, document: { documentElement: root, querySelector: () => meta } });
    return { root, meta };
  }
  assert.equal(boot(null, true).root.dataset.theme, 'dark');
  assert.equal(boot('light', true).root.dataset.theme, 'light');
  assert.equal(boot('invalid', true).root.dataset.theme, 'dark');
  assert.equal(boot(null, true, '/', true).root.dataset.theme, 'dark');
  assert.equal(boot('dark', false, '/resume/').root.style.colorScheme, 'light');
  assert.equal(boot('dark').meta.content, '#141417');
});

test('viewer markup names the actual artwork and provides keyboard-accessible actions', () => {
  const Viewer = require('../src/components/ArchiveViewer.tsx').default;
  const markup = renderToStaticMarkup(createElement(Viewer, { items: data.works, initial: 0, opener: null, onClose: () => {}, onView: () => {} }));
  assert.match(markup, /<dialog[^>]*aria-labelledby="viewer-title"/);
  assert.ok(markup.includes(escaped(data.works[0].title)));
  assert.ok(markup.includes(escaped(data.works[0].postUrl)));
  assert.match(markup, /class="viewer-close"/);
  assert.ok(markup.includes('Previous') && markup.includes('Next'));
});

test('semantic text and control colors meet their contrast targets on every designed surface', () => {
  const css = read('src/styles/base.css');
  const scopes = [css.match(/:root\s*\{([^}]+)\}/)[1], css.match(/:root\[data-theme='dark'\]\s*\{([^}]+)\}/)[1]];
  const luminance = hex => {
    const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  for (const [i, scope] of scopes.entries()) {
    const tokens = Object.fromEntries([...scope.matchAll(/--([\w-]+):\s*(#[A-Fa-f0-9]{6})/g)].map(match => [match[1], match[2]]));
    const contrast = (fg, bg) => { const a = luminance(tokens[fg]), b = luminance(tokens[bg]); return (Math.max(a,b)+.05)/(Math.min(a,b)+.05); };
    for (const surface of ['paper','field','plate']) {
      for (const role of ['ink','body','muted','accent']) assert.ok(contrast(role,surface) >= 4.5, `${i ? 'Dark' : 'Light'} ${role}/${surface}: ${contrast(role,surface).toFixed(2)}`);
      assert.ok(contrast('control',surface) >= 3, `Control boundary / ${surface}`);
    }
    for (const role of ['contact-ink','contact-muted']) assert.ok(contrast(role,'contact') >= 4.5, `${role}/contact`);
  }
});


