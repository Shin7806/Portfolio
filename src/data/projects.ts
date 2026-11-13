import { projects as original } from './content';

export type Project = {
  id: string;
  title: string;
  role: string;
  year: string;
  summary: string;
  /** The project's own story page on this site. */
  details: string;
  /** Where the work lives: the live product or its Behance page. */
  href: string;
  hrefLabel: string;
  preview: { base: string; alt: string };
};

const find = (title: string) => {
  const project = original.find(item => item.title === title);
  if (!project) throw new Error(`Missing project ${title}`);
  return project;
};
const neuro = find('NeuroTwin');
const skill = find('SkillBridge');
const logo = find('LogoFolio');

/** RS360 first, then the three original projects in their original order. */
export const projects: Project[] = [
  {
    id: 'rs360',
    title: 'RS360',
    role: 'Product design and full-stack development',
    year: '2026',
    summary: 'A digital catalogue and commerce platform for RadheShyam Laminates, designed and built end to end.',
    details: '/work/rs360',
    href: 'https://rs360.in/',
    hrefLabel: 'Visit website',
    preview: { base: '/projects/rs360-thumb', alt: 'RS360 logo with the line “Materials for every space.”' },
  },
  {
    id: 'neurotwin',
    title: neuro.title,
    role: neuro.role,
    year: neuro.year,
    summary: neuro.description,
    details: '/work/neurotwin',
    href: neuro.href,
    hrefLabel: 'View on Behance',
    preview: { base: '/projects/neurotwin-thumb', alt: 'NeuroTwin logo with the line “Your AI productivity twin, built around you.”' },
  },
  {
    id: 'skillbridge',
    title: skill.title,
    role: skill.role,
    year: skill.year,
    summary: skill.description,
    details: '/work/skillbridge',
    href: skill.href,
    hrefLabel: 'Visit website',
    preview: { base: '/projects/skillbridge-thumb', alt: 'SkillBridge logo on a dark background.' },
  },
  {
    id: 'logofolio',
    title: logo.title,
    role: logo.role,
    year: logo.year,
    summary: logo.description,
    details: '/work/logofolio',
    href: logo.href,
    hrefLabel: 'View on Behance',
    preview: { base: '/projects/logofolio-thumb', alt: 'LogoFolio, Collection 1: “Anime · Illustration · Minimal”.' },
  },
];
