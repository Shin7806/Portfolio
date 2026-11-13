import SiteFrame from '../components/SiteFrame';
import { ContactShort } from '../components/Contact';
import { ProjectCard } from '../components/Work';
import { useMeta } from '../components/Primitives';
import { projects } from '../data/projects';
import '../styles/home.css';
import '../styles/pages.css';

export default function WorkIndex() {
  useMeta('Work', 'Selected work by Dhruv Poddar: RS360, NeuroTwin, SkillBridge and LogoFolio, each with its own story.');
  return <SiteFrame closing={<ContactShort />}>
    <section id="work" className="wrap page-head scene-grid" data-grid aria-labelledby="work-heading" tabIndex={-1}>
      <h1 id="work-heading">Work</h1>
      <p className="hero-lead">Products I’ve designed and built, a case study, and the identity work that came first. Each one has its own story.</p>
    </section>
    <section className="section-space" aria-label="Projects">
      <div className="wrap"><ul className="project-grid project-grid-full">{projects.map(project => <ProjectCard key={project.id} project={project} variant="full" />)}</ul></div>
    </section>
  </SiteFrame>;
}
