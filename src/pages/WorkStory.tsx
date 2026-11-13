import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import SiteFrame from '../components/SiteFrame';
import { ContactShort } from '../components/Contact';
import { A, Arrow, External, useMeta } from '../components/Primitives';
import { Button } from '@/components/ui/button';
import { stories, storyBySlug, type Shot } from '../data/work';
import '../styles/pages.css';

function Figure({ shot, priority = false, sizes }: { shot: Shot; priority?: boolean; sizes: string }) {
  const [small, large] = shot.widths;
  return <figure className={shot.phone ? 'figure figure-phone' : 'figure'}>
    <picture>
      <source type="image/avif" srcSet={`${shot.base}-${small}.avif ${small}w, ${shot.base}-${large}.avif ${large}w`} sizes={sizes} />
      <img src={`${shot.base}-${large}.webp`} srcSet={`${shot.base}-${small}.webp ${small}w, ${shot.base}-${large}.webp ${large}w`} sizes={sizes} width={shot.width} height={shot.height} alt={shot.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
    </picture>
  </figure>;
}

/** A muted product clip: plays only while on screen, has a pause control, and stays on its poster under reduced motion. */
function MotionClip({ base, caption }: { base: string; caption: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced] = useState(() => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const node = video.current;
    if (!node || reduced || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !paused) node.play().catch(() => {}); else node.pause(); }, { threshold: .4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [paused, reduced]);
  return <figure className="motion-figure">
    <video ref={video} muted loop playsInline preload="metadata" poster={`${base}-poster.webp`} width={1280} height={800} aria-label={caption}>
      <source src={`${base}.webm`} type="video/webm" /><source src={`${base}.mp4`} type="video/mp4" />
    </video>
    {!reduced && <Button variant="outline" size="icon-sm" className="motion-toggle-btn absolute right-3 bottom-3 z-10 rounded-full bg-[rgb(10_10_12/55%)] text-white border-white/20 backdrop-blur-sm" aria-label={paused ? 'Play clip' : 'Pause clip'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play className="size-3.5" fill="currentColor" /> : <Pause className="size-3.5" fill="currentColor" />}</Button>}
  </figure>;
}

function NotFound() {
  useMeta('Project not found', 'This project page does not exist.');
  return <SiteFrame closing={<ContactShort />}><section className="wrap page-head"><h1>This project isn’t here.</h1><p className="hero-lead"><Link to="/work" className="underlined">See all work<Arrow /></Link></p></section></SiteFrame>;
}

/** One template for every project: header, facts, cover, story sections, outcome, next project. */
export default function WorkStory() {
  const { slug } = useParams();
  const story = storyBySlug(slug);
  useMeta(story ? story.title : 'Project not found', story ? story.tagline : 'This project page does not exist.');
  if (!story) return <NotFound />;
  const next = stories[(stories.indexOf(story) + 1) % stories.length];
  return <SiteFrame closing={<ContactShort />}>
    <article aria-labelledby="story-heading">
      <header className="wrap page-head story-head scene-grid" data-grid>
        <Link to="/work" className="back-link"><ArrowLeft className="size-4" />All work</Link>
        <h1 id="story-heading">{story.title}</h1>
        <p className="hero-lead">{story.tagline}</p>
        <div className="story-actions">
          <Button nativeButton={false} render={<A href={story.link.href} target="_blank" rel="noopener noreferrer" />}>{story.link.label}<Arrow /><span className="sr-only"> (opens in a new tab)</span></Button>
        </div>
        <dl className="story-meta">{story.meta.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
      </header>

      <div className="wrap story-cover"><Figure shot={story.cover} priority sizes="(min-width: 1300px) 1200px, 92vw" /></div>

      <section className="section-space" aria-labelledby="overview-heading">
        <div className="wrap story-row">
          <h2 id="overview-heading" className="story-label">Overview</h2>
          <p className="story-intro">{story.intro}</p>
        </div>
      </section>

      {story.motion && <section className="section-space" aria-labelledby="motion-heading">
        <div className="wrap story-row">
          <p className="story-label">In motion</p>
          <div><h2 id="motion-heading" className="story-title" data-reveal="type">The live product, moving.</h2><p className="prose">{story.motion.caption}</p></div>
        </div>
        <div className="wrap story-shots"><MotionClip base={story.motion.base} caption={story.motion.caption} /></div>
      </section>}

      {story.sections.map((section, index) => {
        const id = `section-${index}`;
        const phones = section.shots?.every(shot => shot.phone);
        const pair = (section.shots?.length ?? 0) > 1 && !phones;
        return <section key={section.label} className="section-space" aria-labelledby={id}>
          <div className="wrap story-row">
            <p className="story-label">{section.label}</p>
            <div>
              <h2 id={id} className="story-title" data-reveal="type">{section.title}</h2>
              {section.body.map(paragraph => <p key={paragraph.slice(0, 24)} className="prose">{paragraph}</p>)}
              {section.list && <ul className="scope-list">{section.list.map(item => <li key={item}>{item}</li>)}</ul>}
            </div>
          </div>
          {section.shots && <div className={`wrap story-shots${pair ? ' is-pair' : ''}${phones ? ' is-phones' : ''}`}>
            {section.shots.map(shot => <Figure key={shot.base} shot={shot} sizes={phones ? '(min-width: 800px) 320px, 45vw' : pair ? '(min-width: 1000px) 590px, 92vw' : '(min-width: 1300px) 1200px, 92vw'} />)}
          </div>}
        </section>;
      })}

      {story.outcome && <section className="section-space" aria-labelledby="outcome-heading">
        <div className="wrap story-row">
          <p className="story-label">Outcome</p>
          <div>
            <h2 id="outcome-heading" className="story-title">{story.outcome.title}</h2>
            {story.outcome.body.map(paragraph => <p key={paragraph.slice(0, 24)} className="prose">{paragraph}</p>)}
            <p><External href={story.link.href} className="underlined">{story.link.label}<Arrow /></External></p>
          </div>
        </div>
      </section>}

      <nav className="section-space" aria-label="More work">
        <div className="wrap story-next">
          <Link to={`/work/${next.slug}`} className="next-project"><span className="next-label">Next project</span><strong>{next.title}</strong><span className="next-tagline">{next.tagline}</span><ArrowRight className="next-arrow" /></Link>
          <Link to="/work" className="underlined">All work<Arrow /></Link>
        </div>
      </nav>
    </article>
  </SiteFrame>;
}
