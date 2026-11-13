import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Post } from '../data/archive-posts';
import { Arrow, External } from './Primitives';
import { Button } from '@/components/ui/button';

/** Every slide of one post in a native modal dialog. Esc closes, ← → step through, a backdrop click closes. */
export default function SlideViewer({ post, opener, onClose, start = 0 }: { post: Post; opener: HTMLElement | null; onClose: () => void; start?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(start);
  const count = post.slides.length;
  const slide = post.slides[index];
  const step = (direction: number) => setIndex(value => (value + direction + count) % count);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previous = document.body.style.overflow;
    element.showModal(); document.body.style.overflow = 'hidden';
    const backdrop = (event: MouseEvent) => {
      if (event.target !== element) return;
      const r = element.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose();
    };
    const keys = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault(); setIndex(value => (value + (event.key === 'ArrowRight' ? 1 : -1) + count) % count);
    };
    element.addEventListener('click', backdrop); element.addEventListener('keydown', keys);
    return () => {
      element.removeEventListener('click', backdrop); element.removeEventListener('keydown', keys);
      if (element.open) element.close();
      document.body.style.overflow = previous;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [opener, onClose, count]);
  return <dialog ref={dialog} className="slide-viewer" aria-labelledby="slide-title" onCancel={event => { event.preventDefault(); onClose(); }}>
    <header className="slide-bar">
      <div><h2 id="slide-title">{post.title}</h2><p>{post.cat}{post.date ? ` · ${post.date}` : ''}</p></div>
      <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close"><X /></Button>
    </header>
    <div className="slide-stage">
      <picture key={slide.base}>
        <source type="image/avif" srcSet={`${slide.base}-600.avif 600w, ${slide.base}-1200.avif 1200w`} sizes="min(1100px, 92vw)" />
        <img src={`${slide.base}-1200.webp`} srcSet={`${slide.base}-600.webp 600w, ${slide.base}-1200.webp 1200w`} sizes="min(1100px, 92vw)" width={slide.width} height={slide.height} alt={slide.alt} />
      </picture>
    </div>
    <footer className="slide-foot">
      <Button variant="outline" size="sm" onClick={() => step(-1)} disabled={count < 2} aria-label="Previous slide"><ArrowLeft />Previous</Button>
      <p role="status" className="slide-count">{index + 1} / {count}</p>
      <Button variant="outline" size="sm" onClick={() => step(1)} disabled={count < 2} aria-label="Next slide">Next<ArrowRight /></Button>
    </footer>
    <div className="slide-dots" aria-hidden="true">{post.slides.map((s, i) => <i key={s.base} data-on={i === index || undefined} />)}</div>
    <p className="slide-source"><External href={post.postUrl} className="underlined">Original post on Instagram<Arrow /></External></p>
  </dialog>;
}
