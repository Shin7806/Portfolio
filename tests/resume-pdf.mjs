// Renders the résumé PDF in Node (the same document the Export PDF button builds in the browser).
// Used by the tests, and by hand: node tests/resume-pdf.mjs out.pdf
import fs from 'node:fs';
import { createRequire, Module } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { createElement } from 'react';

const require = createRequire(import.meta.url);
const load = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
Module._extensions['.ts'] ??= load;
Module._extensions['.tsx'] ??= load;

const font = (pkg, file) => fileURLToPath(new URL(`../node_modules/@fontsource/${pkg}/files/${file}`, import.meta.url));
export const fonts = {
  sans400: font('inter', 'inter-latin-400-normal.woff'),
  sans500: font('inter', 'inter-latin-500-normal.woff'),
  sans600: font('inter', 'inter-latin-600-normal.woff'),
  serif500: font('newsreader', 'newsreader-latin-500-normal.woff'),
};

export async function renderResumePdf() {
  const { renderToBuffer } = await import('@react-pdf/renderer');
  const { ResumeDocument, registerResumeFonts } = require('../src/resume/ResumePdf.tsx');
  registerResumeFonts(fonts);
  return renderToBuffer(createElement(ResumeDocument));
}

export const pageCount = pdf => (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;

if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  const pdf = await renderResumePdf();
  const out = process.argv[2] ?? '.capture-cache/resume.pdf';
  fs.writeFileSync(out, pdf);
  console.log(out, `${Math.round(pdf.length / 1024)} kB`, `${pageCount(pdf)} page(s)`);
}
