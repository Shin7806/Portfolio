import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, FileDown } from 'lucide-react';
import { BrandIcon } from '../components/BrandIcon';
import ExportDialog, { Mark } from './ExportDialog';
import { certifications, contacts, education, experience, languages, lineIcons, person, projects, site, skills, type Contact } from './data';

function LineIcon({ paths, size = 14 }: { paths: string[]; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths.map(d => <path key={d} d={d} />)}</svg>;
}

function ContactIcon({ kind }: { kind: Contact['kind'] }) {
  return kind === 'web' ? <LineIcon paths={lineIcons.web} size={13} /> : <BrandIcon name={kind} size={13} />;
}

const external = (href: string) => href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
const brandName: Partial<Record<Contact['kind'], string>> = { linkedin: 'LinkedIn', github: 'GitHub', behance: 'Behance', instagram: 'Instagram' };

const Title = ({ id, children }: { id: string; children: string }) => <h2 id={id} className="cv-title">{children}</h2>;
const SideTitle = ({ id, children }: { id: string; children: string }) => <h2 id={id} className="cv-side-title">{children}</h2>;

/**
 * The résumé on screen: roomy, two columns, a sidebar panel. Export PDF builds the compact
 * one-page A4 version of the same layout from the same data (see ResumePdf.tsx).
 */
export default function ResumeApp() {
  const [exporting, setExporting] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  // Focus returns to the button once the modal has gone (an open modal makes the page inert).
  const close = useCallback(() => { setExporting(false); requestAnimationFrame(() => opener.current?.focus()); }, []);

  return <div className="resume-app">
    <header className="cv-toolbar no-print">
      <Link to="/" className="cv-back"><ArrowLeft aria-hidden="true" /><span>Back to Portfolio</span></Link>
      <button ref={opener} type="button" className="cv-export-btn" aria-haspopup="dialog" onClick={() => setExporting(true)}><FileDown aria-hidden="true" /><span>Export PDF</span></button>
    </header>

    <main id="resume" className="cv-sheet">
      <header className="cv-head">
        {/* Three rows, two edges: name and mark; title; contact line and availability on one baseline. */}
        <div className="cv-head-top">
          <h1>{person.name}</h1>
          <a className="cv-mark" href={site.href} aria-label={`${site.label}, portfolio`}><Mark size={22} /></a>
          <p className="cv-role">{person.title}</p>
          <p className="cv-meta">
            <a href={person.email.href}><LineIcon paths={lineIcons.mail} size={13} /><span>{person.email.label}</span></a>
            <span><LineIcon paths={lineIcons.pin} size={13} /><span>{person.location}</span></span>
          </p>
          <p className="cv-status">{person.availability}</p>
        </div>
        <ul className="cv-contacts" aria-label="Website and profiles">
          {contacts.map(contact => <li key={contact.kind}>
            <a className="cv-contact" href={contact.href} {...external(contact.href)} aria-label={brandName[contact.kind] ? `${brandName[contact.kind]}: ${contact.label}` : undefined}><ContactIcon kind={contact.kind} /><span>{contact.label}</span></a>
          </li>)}
        </ul>
      </header>

      <div className="cv-body">
        <div className="cv-main">
          <section aria-labelledby="cv-summary">
            <Title id="cv-summary">Summary</Title>
            <p className="cv-summary">{person.summary}</p>
          </section>

          <section aria-labelledby="cv-experience">
            <Title id="cv-experience">Experience</Title>
            <div className="cv-roles">
              {experience.map(role => <article key={role.title} className="cv-role-item">
                <div className="cv-row"><h3>{role.title}</h3><span className="cv-dates">{role.dates}</span></div>
                <p className="cv-org">{role.org}{role.place ? ` · ${role.place}` : ''}</p>
                <p className="cv-text">{role.summary}</p>
                {role.points.length > 0 && <ul className="cv-points">{role.points.map(point => <li key={point}>{point}</li>)}</ul>}
              </article>)}
            </div>
          </section>

          <section aria-labelledby="cv-work">
            <Title id="cv-work">Selected Projects</Title>
            <div className="cv-projects">
              {projects.map((project, i) => <article key={project.name} className="cv-project">
                <p className="cv-kicker">{i === 0 ? '✦ Featured · ' : ''}{project.kind} · {project.year}</p>
                {/* One link: the project's page on the site, which leads on to the live product or Behance. */}
                <div className="cv-project-head">
                  <h3>{project.name}</h3>
                  <Link className="cv-case" to={project.page} aria-label={`${project.name} case study`}>View case study<span aria-hidden="true">↗</span></Link>
                </div>
                <p className="cv-text">{project.line}</p>
              </article>)}
            </div>
          </section>

          <section aria-labelledby="cv-certs">
            <Title id="cv-certs">Certifications</Title>
            <ul className="cv-certs">{certifications.map(cert => <li key={cert.name}>
              <span>{cert.name}</span>
              <a href={cert.href} {...external(cert.href)} aria-label={`View certificate: ${cert.name}`}>View<span aria-hidden="true">↗</span></a>
            </li>)}</ul>
          </section>
        </div>

        <aside className="cv-side" aria-label="Skills, languages and education">
          {skills.map((group, i) => <section key={group.title} aria-labelledby={`cv-skill-${i}`}>
            <SideTitle id={`cv-skill-${i}`}>{group.title}</SideTitle>
            <ul className="cv-pills">{group.items.map(item => <li key={item}>{item}</li>)}</ul>
          </section>)}
          <section aria-labelledby="cv-languages">
            <SideTitle id="cv-languages">Languages</SideTitle>
            <dl className="cv-langs">{languages.map(item => <div key={item.name}><dt>{item.name}</dt><dd>{item.level}</dd></div>)}</dl>
          </section>
          <section aria-labelledby="cv-education">
            <SideTitle id="cv-education">Education</SideTitle>
            {education.map(item => <div key={item.title} className="cv-edu">
              <h3>{item.title}</h3>
              <p>{item.place}</p>
              <p>{item.dates}</p>
            </div>)}
          </section>
        </aside>
      </div>
    </main>

    {exporting && <ExportDialog onClose={close} />}
  </div>;
}
