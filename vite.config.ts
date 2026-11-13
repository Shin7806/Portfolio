import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// TODO(confirm: domain). Build with SITE_URL=https://your-domain to emit absolute OG/canonical URLs and a sitemap.
const site = (process.env.SITE_URL ?? '').replace(/\/$/, '');
const routes = ['/', '/work/rs360', '/about', '/resume'];

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
      if (site) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${site}${route}</loc></url>`).join('\n')}\n</urlset>\n` });
    },
  };
}

const vendor = (id: string) => {
  const path = id.replaceAll('\\', '/');
  if (/node_modules\/(react|react-dom|scheduler)\//.test(path)) return 'react';
  if (/node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//.test(path)) return 'motion';
  if (/node_modules\/react-router/.test(path)) return 'router';
};

export default defineConfig({ build: { rollupOptions: { output: { manualChunks: vendor } } }, plugins: [react(), tailwindcss(), seo()], resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }, server: { port: 5174 }, preview: { port: 4174 } });
