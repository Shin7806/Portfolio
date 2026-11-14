import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { stories } from './src/data/work';

// TODO(confirm: domain). Build with SITE_URL=https://your-domain to emit absolute OG/canonical URLs and a sitemap.
const site = (process.env.SITE_URL ?? '').replace(/\/$/, '');
/** Every page, with the title and description its useMeta call sets at runtime. */
const pages: { route: string; title: string; description: string }[] = [
  { route: '/', title: 'Dhruv Poddar — Product Designer', description: 'Dhruv Poddar is a product designer in Bengaluru who designs and builds interfaces end to end: RS360, NeuroTwin, SkillBridge and LogoFolio.' },
  { route: '/work', title: 'Work — Dhruv Poddar', description: 'Selected work by Dhruv Poddar: RS360, NeuroTwin, SkillBridge and LogoFolio, each with its own story.' },
  ...stories.map(story => ({ route: `/work/${story.slug}`, title: `${story.title} — Dhruv Poddar`, description: story.tagline })),
  { route: '/archive', title: 'Archive — Dhruv Poddar', description: 'Posters, identities, banners and interface shots by Dhruv Poddar: every post and every slide.' },
  { route: '/timeline', title: 'Timeline — Dhruv Poddar', description: 'From the first Photoshop experiments in 2019 to RS360 in 2026: projects, milestones, Behance projects and Instagram posts by year.' },
  { route: '/resume', title: 'Résumé — Dhruv Poddar', description: 'Résumé of Dhruv Poddar, product designer and developer.' },
];
const routes = pages.map(page => page.route);
const attr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Static hosts (GitHub Pages) answer 404 for client routes; give each route its own index.html with its own meta. */
function routePages(): Plugin {
  let outDir = 'dist';
  return {
    name: 'portfolio-route-pages',
    apply: 'build',
    configResolved(config) { outDir = path.resolve(config.root, config.build.outDir); },
    closeBundle() {
      const shell = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      for (const { route, title, description } of pages) {
        if (route === '/') continue;
        const url = `${site}${route}/`; // GitHub Pages serves folders with a trailing slash
        const html = shell
          .replace(/<title>[^<]*<\/title>/, `<title>${attr(title)}</title>`)
          .replace(/(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*(")/g, (_, a, b) => a + attr(description) + b)
          .replace(/(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*(")/g, (_, a, b) => a + attr(title) + b)
          .replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => a + url + b)
          .replace(/(<meta property="og:url" content=")[^"]*(")/, (_, a, b) => a + url + b);
        const dir = path.join(outDir, ...route.split('/').filter(Boolean));
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      }
    },
  };
}

function seo(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html, ctx) {
      // Preload the face used by the hero name (the LCP element).
      const hero = Object.keys(ctx.bundle ?? {}).find(file => /instrument-sans-latin-500-normal.*\.woff2$/.test(file));
      if (hero) html = html.replace('</title>', `</title>
    <link rel="preload" href="/${hero}" as="font" type="font/woff2" crossorigin />`);
      const absolute = site
        ? `<link rel="canonical" href="${site}/" />\n    <meta property="og:url" content="${site}/" />\n    <meta property="og:image" content="${site}/og-image.png" />\n    <meta name="twitter:image" content="${site}/og-image.png" />`
        : `<meta property="og:image" content="/og-image.png" />\n    <meta name="twitter:image" content="/og-image.png" />`;
      return html.replace('<!-- seo:absolute -->', absolute);
    },
    generateBundle() {
      const robots = `User-agent: *\nAllow: /\n${site ? `Sitemap: ${site}/sitemap.xml\n` : ''}`;
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      if (site) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${site}${route === "/" ? "/" : `${route}/`}</loc></url>`).join('\n')}\n</urlset>\n` });
    },
  };
}

const vendor = (id: string) => {
  const path = id.replaceAll('\\', '/');
  if (/node_modules\/(react|react-dom|scheduler)\//.test(path)) return 'react';
  if (/node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//.test(path)) return 'motion';
  if (/node_modules\/react-router/.test(path)) return 'router';
};

export default defineConfig({ build: { rollupOptions: { output: { manualChunks: vendor } } }, plugins: [react(), tailwindcss(), seo(), routePages()], resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }, server: { port: 5174 }, preview: { port: 4174 } });
