import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import SiteFrame from '../components/SiteFrame';
import { ContactShort } from '../components/Contact';
import { Arrow, External, useMeta } from '../components/Primitives';
import { Button } from '@/components/ui/button';
import { timeline, type TimelineEntry } from '../data/site';
import '../styles/pages.css';

const kindLabel = { project: 'Project', milestone: 'Milestone', education: 'Education', behance: 'Behance', instagram: 'Instagram' } as const;

function Title({ entry }: { entry: TimelineEntry }) {
  if (!entry.href) return <>{entry.title}</>;
  return entry.external ? <External href={entry.href}>{entry.title}</External> : <Link to={entry.href}>{entry.title}</Link>;
}

/** Every year, newest first: projects, milestones, Behance projects and Instagram posts. */
export default function TimelinePage() {
  useMeta('Timeline', 'From the first Photoshop experiments in 2019 to RS360 in 2026: projects, milestones, Behance projects and Instagram posts by year.');
  return <SiteFrame closing={<ContactShort />}>
    <section className="wrap page-head scene-grid" data-grid aria-labelledby="timeline-heading">
      <h1 id="timeline-heading">Timeline</h1>
      <p className="hero-lead">From the first Photoshop experiments in 2019 to products in use today: projects, milestones, and what I published along the way.</p>
    </section>
    <section className="section-space" aria-label="Years">
      <div className="wrap">
        <ol className="years">{timeline.map(({ year, entries }) => <li key={year} className="year">
          <h2 className="year-label"><span>{year}</span></h2>
          <ol className="entries">{entries.map(entry => <li key={`${entry.kind}-${entry.title}`} className={`entry entry-${entry.kind}`}>
            <span className="entry-dot" aria-hidden="true" />
            <div>
              <p className="entry-kind">{kindLabel[entry.kind]}{entry.date ? ` · ${entry.date}` : ''}</p>
              {entry.posts
                ? <details className="entry-posts">
                    <summary><span>{entry.title}</span><ChevronDown className="size-4" aria-hidden="true" /></summary>
                    <ul>{entry.posts.map(post => <li key={post.href}><External href={post.href}>{post.name}</External><time>{post.date}</time></li>)}</ul>
                  </details>
                : <h3><Title entry={entry} /></h3>}
              {entry.body && <p className="entry-body">{entry.body}</p>}
            </div>
          </li>)}</ol>
        </li>)}</ol>
        <div className="timeline-end"><p>The full detail, on one page.</p><Button nativeButton={false} render={<Link to="/resume" />}>Open the résumé<Arrow /></Button></div>
      </div>
    </section>
  </SiteFrame>;
}
