import { useEffect, useRef, useState } from 'react';
import type { ArchiveWork } from '../data/content';
import { adjacentIndex } from '../data/archive';
import { Arrow, External, Media } from './Primitives';

/** Full-size artwork in a native modal dialog. Esc closes, ← → browse, a backdrop click closes. */
export default function ArchiveViewer({ items, initial, opener, onClose, onView }: { items: ArchiveWork[]; initial: number; opener: HTMLElement | null; onClose: () => void; onView: (id: number) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initial);
  const work = items[index];
  const change = (direction: number) => setIndex(value => adjacentIndex(value, direction, items.length));
  useEffect(() => { onView(work.id); }, [work.id, onView]);
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
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); setIndex(value => adjacentIndex(value, event.key === 'ArrowRight' ? 1 : -1, items.length)); }
    };
    element.addEventListener('click', backdrop); element.addEventListener('keydown', keys);
    return () => {
      element.removeEventListener('click', backdrop); element.removeEventListener('keydown', keys);
      if (element.open) element.close();
      document.body.style.overflow = previous;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [opener, onClose, items.length]);
  return <dialog ref={dialog} className="art-viewer" aria-labelledby="viewer-title" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="viewer-toolbar"><span className="label">Visual archive</span><span role="status" className="viewer-position">{index + 1} / {items.length}</span><button className="viewer-close" onClick={onClose}>Close<span aria-hidden="true">×</span></button></div>
    <div className="viewer-image"><Media key={work.id} id={work.id} src={work.image} title={work.title} priority sizes="min(1264px, 100vw)" /></div>
    <div className="viewer-caption"><div aria-live="polite" aria-atomic="true"><p className="label">{work.cat}</p><h2 id="viewer-title">{work.title}</h2></div><External className="underlined" href={work.postUrl}>Original post<Arrow /></External></div>
    <div className="viewer-pagination"><button disabled={items.length < 2} onClick={() => change(-1)}><span aria-hidden="true">←</span>Previous</button><p className="label">Use ← → to browse</p><button disabled={items.length < 2} onClick={() => change(1)}>Next<span aria-hidden="true">→</span></button></div>
  </dialog>;
}
