import instagram from './instagram-posts.json';

export type SocialPost = { name: string; date: string; href: string };

/** Behance projects, with the publish date shown on each project page. */
export const behance: SocialPost[] = [
  { name: 'NeuroTwin — Product Design Case Study', date: 'June 29, 2026', href: 'https://www.behance.net/gallery/251900711/NeuroTwin-Product-Design-Case-Study' },
  { name: 'Productivity SaaS Design System', date: 'May 24, 2026', href: 'https://www.behance.net/gallery/249924821/Productivity-SaaS-Design-System' },
  { name: 'LogoFolio 2025 — Collection I', date: 'December 22, 2025', href: 'https://www.behance.net/gallery/240883105/LogoFolio-2025-Collection-I' },
  { name: 'BookNest — Minimal Library Website UI Concept', date: 'August 23, 2025', href: 'https://www.behance.net/gallery/233134443/BookNest-Minimal-Library-Website-UI-Concept' },
];

/** Instagram posts from @_shinchan_op, newest first, with the date Instagram shows for each. */
export const instagramPosts: SocialPost[] = (instagram as { shortcode: string; date: string | null; name: string | null }[])
  .filter(post => post.date)
  .map(post => ({ name: post.name ?? 'Instagram post', date: post.date!, href: `https://www.instagram.com/p/${post.shortcode}/` }));

export const instagramDate = (shortcode: string) => (instagram as { shortcode: string; date: string | null }[]).find(post => post.shortcode === shortcode)?.date ?? undefined;
