import { useCallback, useState, type CSSProperties } from 'react';
import { type ArchiveWork } from '../data/content';
import { dimensions } from '../data/profile';
import { selectCategory, ribbonRows } from '../data/archive';
import { useRibbonPlayback } from '../ribbonMotion';
import { Arrow, Media, SectionTitle } from './Primitives';
import ArchiveViewer from './ArchiveViewer';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import '../styles/archive.css';

export default function Archive() {
  const [manual, setManual] = useState(false);
  const [opened, setOpened] = useState<number | null>(null);
  const [lastViewed, setLastViewed] = useState<number | null>(null);
  const [opener, setOpener] = useState<HTMLElement | null>(null);
  const rows = ribbonRows(selectCategory('All'));
  const items = rows.flat();
  const root = useRibbonPlayback(!manual && opened === null);
  const close = useCallback(() => setOpened(null), []);
  const open = (work: ArchiveWork, from: HTMLElement | null) => { setOpener(from); setOpened(items.findIndex(item => item.id === work.id)); };
  const card = (work: ArchiveWork, copy = false) => {
    const [width, height] = dimensions[work.id];
    const ratio = width / height;
    const sizes = `(max-width: 560px) ${Math.round(148 * ratio)}px, ${Math.round(208 * ratio)}px`;
    const media = <Media src={work.image} id={work.id} title={work.title} sizes={sizes} />;
    return <figure key={work.id} className="archive-piece" data-last-viewed={work.id === lastViewed || undefined} style={{ '--art-ratio': ratio } as CSSProperties}>
      {copy
        // Decorative repeats for the seamless loop: hidden from assistive tech, pointer-only.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        ? <div className="piece-image" onClick={event => open(work, event.currentTarget.closest<HTMLElement>('.ribbon-viewport'))}>{media}</div>
        : <button className="piece-image" aria-haspopup="dialog" aria-label={`Open ${work.title}`} onClick={event => open(work, event.currentTarget)}>{media}</button>}
      <figcaption className="piece-overlay"><div className="piece-tags"><span className="piece-number">{String(work.id).padStart(2, '0')}</span><span className="piece-category">{work.cat}</span></div><div className="piece-caption"><h3>{work.title}</h3><a tabIndex={copy ? -1 : undefined} className="piece-source" onPointerDown={copy ? event => event.preventDefault() : undefined} href={work.postUrl} target="_blank" rel="noopener noreferrer" aria-label={`${work.title} on Instagram, opens in a new tab`}><Arrow /></a></div></figcaption>
    </figure>;
  };
  return <section ref={root} id="archive" className="archive-section section-space" data-ribbon-manual={manual || undefined} aria-labelledby="archive-heading" tabIndex={-1}>
    <div className="wrap">
      <SectionTitle id="archive-heading" title="Visual archive" note="Posters, identities and artwork from the graphic work that came first."><Button variant="outline" size="sm" nativeButton={false} render={<Link to="/archive" />} className="section-link">Full archive<Arrow /></Button></SectionTitle>
    </div>
    <div className="ribbon-stack">{rows.map((row, index) => <div className={`ribbon-row ribbon-row-${index + 1}`} key={index} style={{ '--ribbon-duration': `${92 + index * 11}s` } as CSSProperties}>
      {/* A scrollable region must be focusable so keyboard users can scroll it. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className="ribbon-viewport" onScroll={event => { if (!manual && event.currentTarget.scrollLeft > 1) setManual(true); }} role="region" aria-label={`Archive row ${index + 1}`} tabIndex={0}>
        <div className="ribbon-track">{[0, 1, 2].map(copy => <div className={`ribbon-group${copy ? ' ribbon-copy' : ''}`} aria-hidden={copy ? true : undefined} key={copy}>{row.map(work => card(work, copy > 0))}</div>)}</div>
      </div>
    </div>)}</div>
    {opened !== null && <ArchiveViewer items={items} initial={opened} opener={opener} onClose={close} onView={setLastViewed} />}
  </section>;
}
