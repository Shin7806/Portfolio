import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'

const projects = [
  {
    id: 'neurotwin',
    index: '01',
    title: 'NeuroTwin',
    category: 'Product Design',
    role: 'Product Designer',
    year: '2026',
    status: 'Featured',
    featured: true,
    description: 'An AI-powered digital twin platform that mirrors user cognition and behaviour. Designed the complete product from scratch — research, IA, flows, high-fidelity UI, and design system.',
    longDesc: 'NeuroTwin is a next-generation AI platform that creates a digital cognitive twin for each user — learning behaviour patterns, decision-making styles, and knowledge structures over time. As the sole Product Designer, I owned every phase: discovery workshops, competitive analysis, user journey mapping, information architecture, wireframes, prototyping, high-fidelity visual design, and a component-level design system in Figma.',
    tags: ['Figma', 'FigJam', 'Claude', 'Cursor', 'Design System', 'Prototyping', 'Research'],
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786793244/018fc5251900711.6a425bdf9accb.jpg',
    accent: '#c01f3a',
    links: [
      { label: 'Behance Case Study →', href: 'https://www.behance.net/gallery/251900711/NeuroTwin-Product-Design-Case-Study' },
    ],
    highlights: ['Full product design cycle', 'Design system built from scratch', 'AI-first UX patterns', '50+ screens designed'],
  },
  {
    id: 'skillbridge',
    index: '02',
    title: 'SkillBridge',
    category: 'Product Design · Full Stack',
    role: 'Designer & Developer',
    year: '2026',
    status: 'Live',
    description: 'Peer-to-peer learning platform enabling skill exchange between professionals. I owned both the design and the React/TypeScript frontend implementation.',
    longDesc: 'SkillBridge is a live web application that lets professionals teach and learn from each other directly. I designed the complete product experience — user flows, component architecture, visual design — then implemented the entire frontend using React and TypeScript, deployed on Vercel. This project proves I can close the loop between design intent and production code.',
    tags: ['React', 'TypeScript', 'Figma', 'GitHub', 'Vercel', 'Tailwind'],
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786792850/Screenshot_2026-08-15_165007.png',
    accent: '#8a1228',
    links: [
      { label: 'View Live Demo →', href: 'https://skill-bridge-shin7806s-projects.vercel.app/' },
      { label: 'GitHub →', href: 'https://github.com/Shin7806' },
    ],
    highlights: ['Designed + developed', 'Live in production', 'React + TypeScript', 'Responsive design'],
  },
  {
    id: 'logofolio',
    index: '03',
    title: 'Logofolio',
    category: 'Brand Identity · Graphic Design',
    role: 'Brand Designer',
    year: '2025',
    status: 'Case Study',
    description: 'A curated collection of brand identities, logo systems, and typographic explorations. Each mark distills a brand\'s essence into its simplest, most powerful form.',
    longDesc: 'The LogoFolio 2025 Collection is a showcase of brand identity work spanning multiple clients and personal projects. Every mark was designed with a rigorous process: brand audit, visual research, conceptual exploration, and refinement. The collection demonstrates systematic thinking, typographic sensitivity, and an understanding of how marks perform across contexts — from digital to print to merchandise.',
    tags: ['Illustrator', 'Photoshop', 'Figma', 'Typography', 'Brand Systems'],
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786793108/d66d21240883105.6948ebaf4b952.webp',
    accent: '#6b0e1e',
    links: [
      { label: 'Behance Case Study →', href: 'https://www.behance.net/gallery/240883105/LogoFolio-2025-Collection-I' },
    ],
    highlights: ['Multi-client work', 'Full brand systems', 'Print-ready deliverables', 'Typographic precision'],
  },
  {
    id: 'archive',
    index: '04',
    title: 'Creative Archive',
    category: 'Visual Design · Branding',
    role: 'Designer',
    year: '2019–Present',
    status: '70+ Works',
    description: 'Seven years of visual design — branding, typography, poster design, marketing creatives, and personal explorations. Every piece sharpened the eye.',
    longDesc: 'This is the body of work that built my visual vocabulary. Since 2019, I have consistently published design work across branding, editorial layout, poster design, motion graphics, social media templates, and personal experiments. The archive contains 70+ published pieces across client work and personal projects — a living record of growth, taste, and craft.',
    tags: ['Photoshop', 'Illustrator', 'Figma', 'Branding', 'Typography', 'Posters'],
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786793495/1783166675679.jpg',
    accent: '#7a1a2a',
    links: [
      { label: 'View Archive on Instagram →', href: 'https://www.instagram.com/_shinchan_op/' },
    ],
    highlights: ['70+ published pieces', '7 years of practice', 'Client + personal work', 'Branding to typography'],
  },
]

function ProjectModal({ p, onClose }: { p: typeof projects[0]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    ref.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title} project details`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-box" ref={ref} tabIndex={-1} style={{ outline: 'none' }}>
        {/* Hero image */}
        <div style={{ position: 'relative', height: '320px', overflow: 'hidden', borderRadius: '10px 10px 0 0', background: '#0f0b10' }}>
          <img
            src={p.image}
            alt={`${p.title} preview`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.6) brightness(0.55)' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 30%, rgba(15,11,16,0.96) 100%)',
          }} />
          <button
            onClick={onClose}
            aria-label="Close project details"
            style={{
              position: 'absolute', top: '20px', right: '20px',
              width: '36px', height: '36px',
              background: 'rgba(15,11,16,0.7)',
              border: '1px solid var(--glass-border)',
              borderRadius: '4px', color: 'var(--text-muted)',
              cursor: 'pointer', fontSize: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson-border)'; e.currentTarget.style.color = 'var(--crimson)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            ×
          </button>
          <div style={{ position: 'absolute', bottom: '28px', left: '36px', right: '36px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '8px' }}>
              {p.index} — {p.category}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 700, color: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {p.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '36px' }}>
          {/* Meta row */}
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid var(--glass-border)' }}>
            {[
              { label: 'Role', val: p.role },
              { label: 'Year', val: p.year },
              { label: 'Status', val: p.status },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--text-display)' }}>
                  {m.val}
                </div>
              </div>
            ))}
          </div>

          {/* Long desc */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '28px' }}>
            {p.longDesc}
          </p>

          {/* Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '28px' }}>
            {p.highlights.map(h => (
              <div key={h} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-body)',
                padding: '10px 14px',
                background: 'var(--crimson-soft)',
                border: '1px solid var(--crimson-border)',
                borderRadius: '4px',
              }}>
                <span style={{ color: 'var(--crimson)', fontSize: '10px' }}>◆</span>
                {h}
              </div>
            ))}
          </div>

          {/* Tools */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '32px' }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
                border: '1px solid var(--glass-border)',
                borderRadius: '4px', padding: '4px 10px',
                background: 'rgba(255,255,255,0.02)',
              }}>{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {p.links.map(l => (
              <a
                key={l.href}
                href={l.href}
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                  gap: '8px', background: 'var(--crimson)',
                  color: '#fdf0f3', borderRadius: '4px', padding: '12px 22px',
                  transition: 'background 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-bright)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)' }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [open,    setOpen]    = useState(false)
  const { ref, inView } = useInView(0.08)

  const isFeatured = p.featured

  return (
    <>
      {open && <ProjectModal p={p} onClose={() => setOpen(false)} />}
      <article
        ref={ref as React.RefObject<HTMLElement>}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          gridColumn: isFeatured ? 'span 2' : 'span 1',
          background: 'var(--card)',
          border: `1px solid ${hovered ? 'rgba(192,31,58,0.28)' : 'var(--glass-border)'}`,
          borderRadius: '8px', overflow: 'hidden',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(32px)',
          transition: `opacity 0.7s var(--ease-out) ${index * 0.1}s, transform 0.7s var(--ease-out) ${index * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
          boxShadow: hovered ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        }}
        className="work-grid"
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', height: isFeatured ? '460px' : '260px', background: '#0d0a0e' }}>
          <img
            src={p.image}
            alt={`${p.title} project preview`}
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: `saturate(${hovered ? 0.8 : 0.55}) brightness(${hovered ? 0.55 : 0.52})`,
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.65s var(--ease-out), filter 0.5s',
            }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(7,5,10,0) 25%, rgba(7,5,10,0.88) 100%)',
            transition: 'background 0.4s',
          }} />
          {/* Crimson base tint on hover */}
          {hovered && (
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${p.accent}16, transparent)`, pointerEvents: 'none' }} />
          )}
          {/* Index */}
          <div style={{ position: 'absolute', top: '18px', left: '18px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(240,232,236,0.3)' }}>
            {p.index}
          </div>
          {/* Status */}
          <div className="hide-on-mobile-only" style={{
            position: 'absolute', top: '18px', right: '18px',
            fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: p.featured ? 'var(--crimson)' : 'rgba(240,232,236,0.4)',
            border: `1px solid ${p.featured ? 'var(--crimson-border)' : 'rgba(240,232,236,0.1)'}`,
            background: p.featured ? 'var(--crimson-soft)' : 'transparent',
            borderRadius: '99px', padding: '4px 10px',
          }}>
            {p.status}
          </div>
          {/* Expand hint */}
          <div className="hide-on-mobile-only" style={{
            position: 'absolute', bottom: '18px', right: '18px',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'rgba(240,232,236,0.5)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'all 0.3s',
          }}>
            Click to expand ↗
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: isFeatured ? '36px' : '24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '10px' }}>
            {p.category}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: isFeatured ? 'clamp(26px, 3vw, 38px)' : '22px',
            fontWeight: 700, color: 'var(--text-display)',
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '14px',
          }}>
            {p.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: isFeatured ? '560px' : '100%', marginBottom: '20px' }}>
            {p.description}
          </p>
          {/* Tags */}
          <div className="hide-on-mobile-only" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {p.tags.slice(0, isFeatured ? 7 : 4).map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--text-subtle)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '3px', padding: '3px 9px',
                background: 'rgba(255,255,255,0.02)',
              }}>{t}</span>
            ))}
          </div>
          {/* Footer row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <span className="hide-on-mobile-only" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.08em' }}>
              {p.role} · {p.year}
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setOpen(true)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '4px', padding: '9px 18px',
                  cursor: 'pointer', transition: 'all 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson-border)'; e.currentTarget.style.color = 'var(--text-body)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                aria-label={`View ${p.title} details`}
              >
                Details
              </button>
              <a
                href={p.links[0].href}
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: '#fdf0f3',
                  background: 'var(--crimson)',
                  border: '1px solid var(--crimson)',
                  borderRadius: '4px', padding: '9px 18px',
                  textDecoration: 'none',
                  transition: 'background 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-bright)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)' }}
              >
                View →
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default function SelectedWork() {
  const { ref, inView } = useInView()

  return (
    <section id="work" aria-label="Selected Work" style={{ padding: '128px 0' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 var(--pad-x)' }}>
        {/* Header */}
        <header
          ref={ref as React.RefObject<HTMLElement>}
          style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: '72px', flexWrap: 'wrap', gap: '24px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s var(--ease-out)',
          }}
        >
          <div>
            <span className="section-label">Selected Work</span>
            <div style={{ height: '14px' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 5vw, 64px)',
              fontWeight: 700, color: 'var(--text-display)',
              letterSpacing: '-0.03em', lineHeight: 0.98,
            }}>
              Four Projects.<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(240,232,236,0.18)' }}>
                One Direction.
              </span>
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)',
            maxWidth: '300px', lineHeight: 1.8, textAlign: 'right',
          }}>
            Product design, brand identity, implementation, and creative practice — each project a distinct dimension of my work.
          </p>
        </header>

        {/* Grid — featured spans 2 cols, others pair up */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="work-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
