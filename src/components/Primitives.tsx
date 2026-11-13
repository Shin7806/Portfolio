import { useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import { dimensions } from '../data/profile';

export function Arrow() {
  return <span className="direction" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 18 18 6M8 6h10v10" /></svg></span>;
}

/** Plain anchor for component `render` props; its text arrives from the component's children. */
export function A({ children, ...props }: ComponentProps<'a'>) { return <a {...props}>{children}</a>; }

export function External({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}

/** Cloudinary delivers a right-sized, auto-format variant from the original upload. */
export function cloudinary(src: string, width: number) {
  return src.includes('/image/upload/') ? src.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width},c_limit/`) : src;
}

export function Media({ id, src, title, priority = false, sizes }: { id: number; src: string; title: string; priority?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  const [width, height] = dimensions[id];
  const widths = [400, 800, 1200, 1600].filter(w => w < width).concat(width);
  if (failed) return <span role="img" aria-label={`${title}: image unavailable`} className="media-error" style={{ aspectRatio: `${width}/${height}` }}><span>Image unavailable</span><span>{title}</span></span>;
  return <img width={width} height={height} src={cloudinary(src, Math.min(800, width))} srcSet={widths.map(w => `${cloudinary(src, w)} ${w}w`).join(', ')} sizes={sizes ?? '100vw'} alt={title} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" onError={() => setFailed(true)} />;
}

export function SectionTitle({ id, title, note, children }: { id: string; title: string; note?: string; children?: ReactNode }) {
  return <div className="section-title"><div><h2 id={id} data-reveal="type">{title}</h2></div>{note && <p className="section-aside">{note}</p>}{children}</div>;
}

const siteName = 'Dhruv Poddar';
export function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title === siteName ? `${siteName} — Product Designer` : `${title} — ${siteName}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
