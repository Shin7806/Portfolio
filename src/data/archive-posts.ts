import { works } from './content';
import slides from './archive-slides.json';
import { instagramDate } from './social';

export type Slide = { base: string; width: number; height: number; alt: string };
export type Post = { id: number; post: string; title: string; cat: string; postUrl: string; date?: string; year: string; slides: Slide[] };

const known = slides as Record<string, { file: string; alt: string; width: number; height: number }[]>;
const shortcode = (url: string) => url.split('/p/')[1].split('/')[0];

/** Every archive post with all of its Instagram slides (Dhruv's own posts), newest first. */
export const posts: Post[] = works.map(work => {
  const post = shortcode(work.postUrl);
  const list = known[post] ?? [];
  const date = list.map(slide => slide.alt.match(/on (\w+ \d+, \d{4})\.$/)?.[1]).find(Boolean) ?? instagramDate(post);
  return {
    id: work.id, post, title: work.title, cat: work.cat, postUrl: work.postUrl,
    date: date?.replace(/ 0(\d),/, ' $1,'),
    year: date ? date.slice(-4) : '2026',
    slides: list.map((slide, index) => ({
      base: `/archive/${post}/${String(index + 1).padStart(2, '0')}`,
      width: slide.width, height: slide.height,
      alt: list.length > 1 ? `${work.title}, slide ${index + 1} of ${list.length}` : work.title,
    })),
  };
}).sort((a, b) => (b.date ? Date.parse(b.date) : Date.parse('2026-06-01')) - (a.date ? Date.parse(a.date) : Date.parse('2026-06-01')));

export const categories = ['All', ...new Set(posts.map(post => post.cat))];
