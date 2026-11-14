// One source for the résumé: the web page and the PDF both render from this file.
// Keep lines short: the PDF is laid out to fit one A4 page.

import { profile } from '../data/profile';

export const site = { label: 'dhruvpoddar.is-a.dev', href: 'https://dhruvpoddar.is-a.dev' };

export const person = {
  name: 'Dhruv Poddar',
  /** Matches the roles on the website's hero. */
  title: 'Product Designer & Creative Developer',
  location: profile.location,
  email: { label: profile.email, href: `mailto:${profile.email}` },
  /** The same line the website's hero shows. */
  availability: profile.availability,
  summary: 'I design and build digital products end to end, from first research and design systems to polished interfaces and the code that ships them. I currently lead design and development of RS360 at RadheShyam Laminates, with brand and visual work going back to 2019.',
};

export type Contact = { kind: 'web' | 'linkedin' | 'github' | 'behance' | 'instagram'; label: string; href: string };
/** Shown with an icon and the handle, so the printed page still says where to find each profile. Email sits by the name. */
export const contacts: Contact[] = [
  { kind: 'web', label: site.label, href: site.href },
  { kind: 'linkedin', label: 'dhruvpoddar', href: 'https://www.linkedin.com/in/dhruvpoddar/' },
  { kind: 'github', label: 'Shin7806', href: 'https://github.com/Shin7806' },
  { kind: 'behance', label: 'shinchangfx', href: 'https://www.behance.net/shinchangfx' },
  { kind: 'instagram', label: '_shinchan_op', href: 'https://www.instagram.com/_shinchan_op/' },
];

export type Role = { title: string; org: string; place?: string; dates: string; summary: string; points: string[] };
export const experience: Role[] = [
  {
    title: 'Product Designer & Full-Stack Developer',
    org: 'RadheShyam Laminates',
    place: 'Bengaluru',
    dates: 'Aug 2026 – Present',
    summary: 'Lead design and development of RS360, the company’s catalogue and commerce platform, and the brand work around it.',
    points: [
      'Designed and built RS360 end to end: multi-brand catalogue, account pricing, PDF quotations, checkout and payments.',
      'Built internal tools for catalogue imports, pricing and order operations.',
      'Produce product imagery, promotional videos, social posts and Excel reports.',
    ],
  },
  {
    title: 'Freelance Designer',
    org: 'Independent',
    dates: '2019 – 2026',
    summary: 'Brand identities, posters, social content and UI concepts for clients and personal projects.',
    points: [],
  },
];

export type Project = { name: string; kind: string; year: string; line: string; page: string; link: { label: string; href: string } };
export const projects: Project[] = [
  { name: 'RS360', kind: 'Commerce platform', year: '2026', line: 'A live catalogue and commerce platform for a laminates and hardware supplier, designed and built end to end.', page: '/work/rs360', link: { label: 'rs360.in', href: 'https://rs360.in/' } },
  { name: 'NeuroTwin', kind: 'Product design case study', year: '2026', line: 'An AI productivity companion: strategy, UX, UI and a design system, from concept to high-fidelity prototype.', page: '/work/neurotwin', link: { label: 'Behance', href: 'https://www.behance.net/gallery/251900711/NeuroTwin-Product-Design-Case-Study' } },
  { name: 'SkillBridge', kind: 'Web app', year: '2026', line: 'A peer-to-peer skill exchange platform, designed and developed full stack.', page: '/work/skillbridge', link: { label: 'Live app', href: 'https://skill-bridge-shin7806s-projects.vercel.app/' } },
  { name: 'LogoFolio', kind: 'Identity collection', year: '2025', line: 'Identity systems exploring mark-making, type pairing and visual communication.', page: '/work/logofolio', link: { label: 'Behance', href: 'https://www.behance.net/gallery/240883105/LogoFolio-2025-Collection-I' } },
];

export const certifications = [
  { name: 'Designing Microinteractions Using Figma', href: 'https://www.linkedin.com/learning/certificates/5bcbefd00ea0cd3c3ddebb5955372ab01f9f7cc08cf90304b92db6f1d6badb9c' },
  { name: 'Figma for UX Design', href: 'https://www.linkedin.com/learning/certificates/a70d35b0a22b57f8266003c7ac02163769adcc9d6fc4131b28a029402095f177' },
  { name: 'AI Tools for UX Design', href: 'https://www.linkedin.com/learning/certificates/77191783387d27c26b84108c94d42a0f5a1bea15aadb96d9b317f757aab64c75' },
  { name: 'UX Foundations: Prototyping', href: 'https://www.linkedin.com/learning/certificates/bb9e0dc8c889de7d7e070b6d0311f4a40c5af494d43d255d6f1042d8421ecb52' },
  { name: 'Figma Design to CSS Implementation', href: 'https://www.linkedin.com/learning/certificates/b5d71ac107ba0347656b499e77be4e3d11fc94ee4af051c0700ab0d2dbd7dc59' },
  { name: 'Essential Skills in Adobe Photoshop 2025', href: 'https://www.linkedin.com/learning/certificates/6d74bbb21b1d06c976db4a676d68970ce4b9454145ffd408b331dd69a92d1da8' },
];

/** Two columns of three, longest names first, so no name has to wrap. */
export const certificationsByLength = [...certifications].sort((a, b) => b.name.length - a.name.length);

export const skills = [
  { title: 'Product & UX', items: ['Product strategy', 'UX research', 'Information architecture', 'Interaction design', 'Prototyping', 'Design systems', 'Responsive design'] },
  { title: 'Visual & brand', items: ['Brand identity', 'Typography', 'Graphic design', 'Product imagery', 'Social & launch content'] },
  { title: 'Engineering', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Supabase', 'PostgreSQL', 'Git', 'Vercel'] },
  { title: 'Tools', items: ['Figma', 'Photoshop', 'Illustrator', 'VS Code'] },
  { title: 'AI workflow', items: ['AI coding agents', 'AI-assisted research', 'AI prototyping', 'AI-assisted UX writing'] },
];

export const education = [
  { title: 'Bachelor of Computer Applications', place: 'ASC Degree College', dates: '2023 – 2026' },
  { title: 'Pre-University Course', place: 'Carmel PU College', dates: '2021 – 2023' },
];

export const languages = [
  { name: 'Hindi', level: 'Native' },
  { name: 'English', level: 'Professional' },
  { name: 'Kannada', level: 'Working proficiency' },
];

/** Line icons (Lucide, ISC) for contacts that aren't brands; brand marks come from brand-icons. */
export const lineIcons = {
  web: ['M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10a15.3 15.3 0 0 1-4 10a15.3 15.3 0 0 1-4-10a15.3 15.3 0 0 1 4-10z'],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 7l-10 7L2 7'],
  pin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z', 'M12 7a3 3 0 1 0 0 6a3 3 0 1 0 0-6z'],
  arrow: ['M7 17L17 7', 'M7 7h10v10'],
};

/** The site's mark (public/logo.svg), 180 × 180. */
export const logoPaths = [
  'M92.3719 69.6531L115.701 111.89L93.2872 117.895L92.3719 69.6531Z',
  'M32.7445 162.254L107.838 98.4091L125.582 129.143L32.7445 162.254Z',
  'M90.1993 108.66L66.8708 66.4229L89.2841 60.4172L90.1993 108.66Z',
  'M150.551 17.7445L75.458 81.5894L57.7135 50.855L150.551 17.7445Z',
  'M68.4309 128.298L57.3724 138.138C57.3724 138.138 38.6292 128.298 32.3502 100.089C29.6134 87.7939 31.9722 75.8165 35.9114 65.1328C40.7255 52.0765 54.1253 41.169 56.1541 39.7357C73.3979 27.5526 91.8599 28.6772 91.8599 28.6772C91.8599 28.6772 72.4607 28.9583 58.497 41.9849C54.3456 45.8577 48.983 50.9963 44.627 61.5716C38.2833 76.9726 40.122 88.843 43.0338 97.8398C50.3437 120.425 68.4309 128.298 68.4309 128.298Z',
  'M115.294 51.0753L126.352 41.2351C126.352 41.2351 145.095 51.0753 151.374 79.2839C154.111 91.5791 151.752 103.556 147.813 114.24C142.999 127.296 129.599 138.204 127.571 139.637C110.327 151.82 91.8647 150.696 91.8647 150.696C91.8647 150.696 111.264 150.415 125.228 137.388C129.379 133.515 134.742 128.377 139.098 117.801C145.441 102.4 143.603 90.5299 140.691 81.5331C133.381 58.9475 115.294 51.0753 115.294 51.0753Z',
];

export const pdfFileName = 'Dhruv-Poddar-Resume.pdf';
