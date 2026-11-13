import { useState } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, Layers, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SiteFrame from '../components/SiteFrame';
import { ContactShort } from '../components/Contact';
import SlideViewer from '../components/SlideViewer';
import { useMeta } from '../components/Primitives';
import { categories, posts, type Post } from '../data/archive-posts';
import '../styles/pages.css';

const sizes = '(min-width: 1000px) 380px, (min-width: 640px) 45vw, 92vw';

/** A grid card. Posts with several slides can be browsed in place with the hover arrows. */
function PostCard({ post, onOpen }: { post: Post; onOpen: (opener: HTMLElement, start: number) => void }) {
  const [index, setIndex] = useState(0);
  const cover = post.slides[0];
  const slide = post.slides[index];
  const count = post.slides.length;
  const step = (by: number) => setIndex(i => (i + by + count) % count);
  return <li id={post.post} className="post">
    <div className="post-frame">
      <button type="button" className="post-open" aria-haspopup="dialog" aria-label={`Open ${post.title}, slide ${index + 1} of ${count}`} onClick={event => onOpen(event.currentTarget, index)}>
        <span className="post-media" style={{ aspectRatio: `${cover.width} / ${cover.height}` }}>
          <picture key={slide.base}>
            <source type="image/avif" srcSet={`${slide.base}-600.avif 600w, ${slide.base}-1200.avif 1200w`} sizes={sizes} />
            <img src={`${slide.base}-600.webp`} srcSet={`${slide.base}-600.webp 600w, ${slide.base}-1200.webp 1200w`} sizes={sizes} width={slide.width} height={slide.height} alt={index ? `${post.title}, slide ${index + 1}` : post.title} loading={index ? 'eager' : 'lazy'} decoding="async" />
          </picture>
          {count > 1 && <span className="post-count"><Layers className="size-3.5" aria-hidden="true" />{index ? `${index + 1}/${count}` : count}</span>}
        </span>
      </button>
      {count > 1 && <>
        <button type="button" className="post-step post-step-prev" aria-label={`Previous slide of ${post.title}`} onClick={() => step(-1)}><ChevronLeft className="size-4" aria-hidden="true" /></button>
        <button type="button" className="post-step post-step-next" aria-label={`Next slide of ${post.title}`} onClick={() => step(1)}><ChevronRight className="size-4" aria-hidden="true" /></button>
      </>}
    </div>
    <div className="post-meta"><h2>{post.title}</h2><p>{post.cat}{post.date ? ` · ${post.date}` : ''}</p></div>
  </li>;
}

/** All visual work: each post with every slide, filterable by kind. */
export default function ArchivePage() {
  useMeta('Archive', 'Posters, identities, banners and interface shots by Dhruv Poddar: every post and every slide.');
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>(() => { try { return localStorage.getItem('archive-view') === 'list' ? 'list' : 'grid'; } catch { return 'grid'; } });
  const choose = (next: 'grid' | 'list') => { setView(next); try { localStorage.setItem('archive-view', next); } catch { /* the choice lasts for this visit */ } };
  const [open, setOpen] = useState<{ post: Post; opener: HTMLElement; start?: number } | null>(null);
  const shown = posts.filter(post => filter === 'All' || post.cat === filter);
  const slideCount = posts.reduce((sum, post) => sum + post.slides.length, 0);
  return <SiteFrame closing={<ContactShort />}>
    <section className="wrap page-head scene-grid" data-grid aria-labelledby="archive-heading">
      <h1 id="archive-heading">Archive</h1>
      <p className="hero-lead">Posters, identities, banners and interface shots: the graphic work that came before the products. {posts.length} posts, {slideCount} slides.</p>
    </section>
    <section id="archive" className="section-space" aria-label="Visual work" tabIndex={-1}>
      <div className="wrap">
        <div className="archive-tools">
        <div className="filters" role="group" aria-label="Filter by kind">{categories.map(category => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}<span>{category === 'All' ? posts.length : posts.filter(post => post.cat === category).length}</span></button>)}</div>
        <div className="view-toggle" role="group" aria-label="Layout">
          <Button variant="ghost" size="icon-sm" aria-label="Grid view" aria-pressed={view === 'grid'} data-tip="Grid" onClick={() => choose('grid')}><LayoutGrid /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="List view" aria-pressed={view === 'list'} data-tip="List" onClick={() => choose('list')}><List /></Button>
        </div>
        </div>
        {view === 'list' ? <ul className="post-list">{shown.map(post => {
          const cover = post.slides[0];
          return <li key={post.post} id={post.post}>
            <button type="button" className="post-row" aria-haspopup="dialog" aria-label={`Open ${post.title}, ${post.slides.length} slides`} onClick={event => setOpen({ post, opener: event.currentTarget })}>
              <span className="post-thumb"><img src={`${cover.base}-600.webp`} width={cover.width} height={cover.height} alt="" loading="lazy" decoding="async" /></span>
              <span className="post-row-title">{post.title}</span>
              <span className="post-row-meta">{post.cat}</span>
              <span className="post-row-meta">{post.date ?? post.year}</span>
              <span className="post-row-count"><Layers className="size-3.5" aria-hidden="true" />{post.slides.length}</span>
              <ChevronRight className="size-4 post-row-chevron" aria-hidden="true" />
            </button>
          </li>;
        })}</ul> : <ul className="post-grid">{shown.map(post => <PostCard key={post.post} post={post} onOpen={(opener, start) => setOpen({ post, opener, start })} />)}</ul>}
      </div>
    </section>
    {open && <SlideViewer post={open.post} opener={open.opener} start={open.start} onClose={() => setOpen(null)} />}
  </SiteFrame>;
}
