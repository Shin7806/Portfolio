import { brandPaths } from '../data/brand-icons';

// A plain "in" mark in a rounded square: LinkedIn's logo isn't distributed by Simple Icons.
const linkedin = 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM6 7.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0zM6.25 10h2.5v8h-2.5zM10.75 10h2.4v1.1c.5-.8 1.5-1.35 2.75-1.35c2.1 0 3.1 1.3 3.1 3.6V18h-2.5v-4.2c0-1.1-.45-1.8-1.45-1.8s-1.8.75-1.8 1.95V18h-2.5z';

export type Brand = keyof typeof brandPaths | 'linkedin';

export function BrandIcon({ name, size = 18 }: { name: Brand; size?: number }) {
  const d = name === 'linkedin' ? linkedin : brandPaths[name];
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true" focusable="false"><path d={d} /></svg>;
}
