import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../src/data/specimen.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context);
const { getSpecimenTokens, serializeSpecimenTokens, initialSpecimenSettings: defaults } = context.exports;

test('specimen tokens reflect actual controls and remain safely bounded', () => {
  const settings = { ...defaults, density: 'compact', radius: 14, font: 'serif', typeSize: 32, outlined: true };
  const tokens = getSpecimenTokens(settings, 'dark');
  const copied = JSON.parse(serializeSpecimenTokens(settings, 'dark'));
  assert.equal(copied.theme, 'dark');
  assert.equal(copied.density, 'compact');
  assert.equal(copied.action, 'outline');
  for (const [key, value] of Object.entries(tokens)) assert.equal(copied[key], value, key);
  assert.equal(tokens.space, '12px');
  assert.equal(tokens.radius, '14px');
  assert.match(tokens.fontFamily, /Newsreader/);
  assert.equal(tokens.typeSize, '32px');
  assert.equal(getSpecimenTokens({ ...defaults, radius: 400 }, 'light').radius, '16px');
  assert.equal(getSpecimenTokens({ ...defaults, typeSize: -1 }, 'light').typeSize, '18px');
  assert.equal(defaults.radius, 8, 'deriving tokens must not mutate defaults');
});

test('every specimen canvas/accent combination has readable text and actions', () => {
  const luminance = hex => {
    const channels = hex.slice(1).match(/../g).map(channel => parseInt(channel, 16) / 255).map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
  for (const theme of ['light', 'dark']) for (const accent of ['crimson', 'ink', 'blue', 'green']) {
    const tokens = getSpecimenTokens({ ...defaults, accent }, theme);
    for (const surface of ['canvas', 'surface']) for (const text of ['text', 'muted', 'accent']) {
      assert.ok(contrast(tokens[text], tokens[surface]) >= 4.5, `${theme}/${accent}: ${text} on ${surface}`);
    }
    assert.ok(contrast(tokens.onAccent, tokens.accent) >= 4.5, `${theme}/${accent}: action label`);
  }
});

test('custom accents stay valid, serialize exactly, and select readable action labels', () => {
  for (const theme of ['light', 'dark']) for (const customColor of ['#FFFFFF', '#000000', '#FFFF00', '#8763D0']) {
    const tokens = getSpecimenTokens({ ...defaults, accent: 'custom', customColor }, theme);
    assert.equal(tokens.accent, customColor);
    assert.ok(['#000000', '#FFFFFF'].includes(tokens.onAccent));
    assert.equal(JSON.parse(serializeSpecimenTokens({ ...defaults, accent: 'custom', customColor }, theme)).accent, customColor);
  }
  assert.equal(getSpecimenTokens({ ...defaults, accent: 'custom', customColor: 'invalid' }, 'light').accent, '#8763D0');
  assert.equal(context.exports.singleLine('First\r\nSecond\tThird\u2028Fourth'), 'First Second Third Fourth');
  assert.equal(context.exports.singleLine('a'.repeat(300), 48).length, 48);
});
