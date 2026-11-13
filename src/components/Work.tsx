import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { Arrow, SectionTitle } from './Primitives';
import { Button } from '@/components/ui/button';

/** The project's thumbnail (3:2). */
export function Preview({ project, sizes = '(min-width: 1001px) 260px, (min-width: 561px) 36vw, 100vw' }: { project: Project; sizes?: string }) {
  const { base, alt } = project.preview;
  return <picture>
    <source type="image/avif" srcSet={`${base}-600.avif 600w, ${base}-1200.avif 1200w`} sizes={sizes} />
    <img src={`${base}-600.webp`} srcSet={`${base}-600.webp 600w, ${base}-1200.webp 1200w`} sizes={sizes} width={1521} height={1034} alt={alt} loading="lazy" decoding="async" />
  </picture>;
}

/**
 * Project card. "compact" (home): image left, title and role, then the two links along the image's
 * bottom edge. "full" (/work): a vertical card with the description. Both only lift on hover.
 */
export function ProjectCard({ project, variant = 'compact' }: { project: Project; variant?: 'compact' | 'full' }) {
  const full = variant === 'full';
  return <li className={full ? 'card card-full' : 'card'} data-reveal="card">
    <Link to={project.details} className="card-media" tabIndex={-1} aria-hidden="true"><Preview project={project} sizes={full ? '(min-width: 1001px) 380px, (min-width: 641px) 46vw, 100vw' : undefined} /></Link>
    <div className="card-body">
      <div className="card-head"><h3><Link to={project.details}>{project.title}</Link></h3><span className="card-year">{project.year}</span></div>
      <p className="card-role">{project.role}</p>
      {full && <p className="card-summary">{project.summary}</p>}
      <div className="card-actions">
        <Button variant="outline" size="sm" nativeButton={false} render={<Link to={project.details} aria-label={`${full ? 'More details' : 'View details'} about ${project.title}`} />}>{full ? 'More details' : 'View details'}<ArrowRight className="group-hover/button:translate-x-0.5" /></Button>
        <a href={project.href} className="card-link" target="_blank" rel="noopener noreferrer">{project.hrefLabel}<Arrow /><span className="sr-only"> for {project.title} (opens in a new tab)</span></a>
      </div>
    </div>
  </li>;
}

export default function Work() {
  return <section id="work" className="section-space" aria-labelledby="work-heading" tabIndex={-1}>
    <div className="wrap">
      <SectionTitle id="work-heading" title="Selected work" note="Products, case studies and visual work: a selection of what I’ve designed and built.">
        <Button variant="outline" size="sm" nativeButton={false} render={<Link to="/work" />} className="section-link">All work<Arrow /></Button>
      </SectionTitle>
      <ul className="project-grid">{projects.map(project => <ProjectCard key={project.id} project={project} />)}</ul>
    </div>
  </section>;
}
