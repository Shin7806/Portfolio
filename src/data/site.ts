import { events } from './content';
import { projects } from './projects';
import { behance, instagramPosts, type SocialPost } from './social';

// TODO(confirm): hero line wording and the rotating role titles.
export const heroLine = 'I design and build digital products end to end, from first research and design systems to polished interfaces and the code that ships them.';
export const roles = ['Product Designer', 'Graphic Designer', 'Creative Developer', 'AI-first Designer'];

export type TimelineEntry = {
  year: string;
  kind: 'project' | 'milestone' | 'education' | 'behance' | 'instagram';
  title: string;
  body?: string;
  date?: string;
  href?: string;
  external?: boolean;
  /** Instagram only: the year's posts, listed in a small dropdown. */
  posts?: SocialPost[];
};

const yearOf = (date: string) => date.slice(-4);
const journeyBody = (title: string) => events.find(event => event.title.startsWith(title))?.body;

const projectEntries: TimelineEntry[] = projects.map(project => ({
  year: project.year, kind: 'project', title: project.title, href: project.details,
  body: project.id === 'rs360' ? 'Designed and built with RadheShyam Laminates: a digital catalogue and commerce platform, from the database and pricing workflows to the launch content.' : journeyBody(project.title) ?? project.summary,
}));

/** Milestones from the original journey, the outdated "graduating" note replaced by what happened next. */
const milestones: TimelineEntry[] = [
  ...events.filter(event => event.type !== 'current' && event.type !== 'project').map(event => ({ year: event.year, kind: (event.type === 'edu' ? 'education' : 'milestone') as TimelineEntry['kind'], title: event.title, body: event.body })),
  { year: '2026', kind: 'education', title: 'BCA completed', body: 'Finished my Bachelor of Computer Applications at ASC Degree College in July 2026.' },
];

const behanceEntries: TimelineEntry[] = behance.map(post => ({ year: yearOf(post.date), kind: 'behance', title: post.name, date: post.date, href: post.href, external: true }));

/** One entry per year: "N Instagram posts", with the posts in a dropdown. */
const instagramEntries: TimelineEntry[] = [...new Set(instagramPosts.map(post => yearOf(post.date)))].map(year => {
  const posts = instagramPosts.filter(post => yearOf(post.date) === year);
  return { year, kind: 'instagram', title: `${posts.length} Instagram ${posts.length === 1 ? 'post' : 'posts'}`, posts };
});

const all = [...projectEntries, ...milestones, ...behanceEntries, ...instagramEntries];

/** Everything by year, newest first: projects, milestones, Behance, then Instagram. */
export const timeline = [...new Set(all.map(entry => entry.year))]
  .sort((a, b) => Number(b) - Number(a))
  .map(year => ({ year, entries: all.filter(entry => entry.year === year) }));
