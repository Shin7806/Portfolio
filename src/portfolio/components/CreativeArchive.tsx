import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const categories = ['All', 'Branding', 'Typography', 'Posters', 'Marketing', 'Visual']

const works = [
  { id: 1,  cat: 'Branding',    title: 'Brand Identity System',     desc: 'Mark + identity system for a tech startup',         image: 'https://images.unsplash.com/photo-1634084462412-b54873c0a56d?w=700&h=700&fit=crop&auto=format', tall: false },
  { id: 2,  cat: 'Typography',  title: 'Editorial Typeface Study',   desc: 'Typographic hierarchy exploration',                  image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=900&fit=crop&auto=format', tall: true  },
  { id: 3,  cat: 'Posters',     title: 'Cinematic Event Poster',     desc: 'Event visual — bold editorial direction',            image: 'https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?w=700&h=900&fit=crop&auto=format', tall: true  },
  { id: 4,  cat: 'Marketing',   title: 'Campaign Visual System',     desc: 'Multi-platform marketing creative suite',            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&h=500&fit=crop&auto=format', tall: false },
  { id: 5,  cat: 'Visual',      title: 'Abstract Composition',       desc: 'Personal visual experiment — colour & form',         image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=700&h=700&fit=crop&auto=format', tall: false },
  { id: 6,  cat: 'Branding',    title: 'Logofolio Entry',            desc: 'Mark from the 2025 logo collection',                 image: 'https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=700&h=500&fit=crop&auto=format', tall: false },
  { id: 7,  cat: 'Typography',  title: 'Kinetic Type Study',         desc: 'Motion typography — letterform in motion',           image: 'https://images.unsplash.com/photo-1543248939-ff40856f65d4?w=700&h=700&fit=crop&auto=format', tall: false },
  { id: 8,  cat: 'Posters',     title: 'Dark Minimalist Series',     desc: 'Personal poster series — darkness + restraint',      image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=700&h=900&fit=crop&auto=format', tall: true  },
  { id: 9,  cat: 'Marketing',   title: 'Social Media Kit',           desc: 'Brand social template system',                      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=700&fit=crop&auto=format', tall: false },
  { id: 10, cat: 'Visual',      title: 'Gradient Experiments',       desc: 'Colour study — warm palettes in motion',             image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=700&h=500&fit=crop&auto=format', tall: false },
  { id: 11, cat: 'Branding',    title: 'Wordmark Design',            desc: 'Custom lettering for a lifestyle brand',             image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&h=700&fit=crop&auto=format', tall: false },
  { id: 12, cat: 'Posters',     title: 'Typography Poster',          desc: 'Editorial poster — system meets expression',         image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=700&h=900&fit=crop&auto=format', tall: true  },
]

function WorkCard({ w, index }: { w: typeof works[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useInView(0.05)

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: '4px',
        background: '#0d0a0e', cursor: 'pointer',
        height: w.tall ? '360px' : '220px',
        gridRow: w.tall ? 'span 2' : 'span 1',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s var(--ease-out) ${index * 0.04}s, transform 0.5s var(--ease-out) ${index * 0.04}s, box-shadow 0.3s`,
        boxShadow: hovered ? 'var(--shadow-hover)' : 'none',
      }}
    >
      <img
        src={w.image}
        alt={w.title}
        loading="lazy"
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: hovered ? 'saturate(0.8) brightness(0.48)' : 'saturate(0.45) brightness(0.52)',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'all 0.55s var(--ease-out)',
        }}
      />
      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(7,5,10,0.9) 0%, rgba(7,5,10,0) 60%)'
          : 'linear-gradient(to top, rgba(7,5,10,0.7) 0%, rgba(7,5,10,0) 60%)',
        transition: 'background 0.4s',
      }} />
      {/* Category */}
      <div style={{
        position: 'absolute', top: '12px', left: '12px',
        fontFamily: 'var(--font-mono)', fontSize: '9px',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'rgba(240,232,236,0.55)',
        background: 'rgba(7,5,10,0.55)',
        borderRadius: '99px', padding: '3px 9px',
        backdropFilter: 'blur(8px)',
      }}>{w.cat}</div>
      {/* Info on hover */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px',
        transform: hovered ? 'translateY(0)' : 'translateY(10px)',
        opacity: hovered ? 1 : 0,
        transition: 'all 0.32s var(--ease-out)',
      }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
          color: 'var(--text-display)', marginBottom: '3px',
        }}>{w.title}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)',
        }}>{w.desc}</div>
      </div>
    </article>
  )
}

export default function CreativeArchive() {
  const [active, setActive] = useState('All')
  const { ref, inView } = useInView()

  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <section
      id="archive"
      aria-label="Creative Archive"
      style={{ padding: '128px 0', background: 'var(--bg-section-alt)' }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', marginBottom: '40px',
            gap: '24px', flexWrap: 'wrap',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s var(--ease-out)',
          }}
        >
          <div>
            <span className="section-label">Creative Archive</span>
            <div style={{ height: '14px' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700, color: 'var(--text-display)',
              letterSpacing: '-0.03em', lineHeight: 1.0,
            }}>
              70+ Works.<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(192,31,58,0.65)' }}>Seven Years.</em>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/_shinchan_op/"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--crimson)', textDecoration: 'none',
              border: '1px solid var(--crimson-border)',
              borderRadius: '4px', padding: '12px 22px',
              transition: 'all 0.22s',
              display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.color = '#fdf0f3' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--crimson)' }}
          >
            View Full Archive ↗
          </a>
        </div>

        {/* Filter */}
        <div
          role="tablist"
          aria-label="Filter works by category"
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}
        >
          {categories.map(cat => (
            <button
              key={cat} role="tab" aria-selected={active === cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                background: active === cat ? 'var(--crimson)' : 'transparent',
                color: active === cat ? '#fdf0f3' : 'var(--text-muted)',
                border: `1px solid ${active === cat ? 'var(--crimson)' : 'var(--glass-border)'}`,
                borderRadius: '4px', padding: '7px 14px',
                cursor: 'pointer', transition: 'all 0.22s',
              }}
              onMouseEnter={e => { if (active !== cat) { e.currentTarget.style.borderColor = 'var(--crimson-border)'; e.currentTarget.style.color = 'var(--text-body)' }}}
              onMouseLeave={e => { if (active !== cat) { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-muted)' }}}
            >{cat}</button>
          ))}
        </div>

        {/* Masonry-style grid (auto rows) */}
        <div
          className="gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '110px',
            gap: '10px',
          }}
        >
          {filtered.map((w, i) => <WorkCard key={w.id} w={w} index={i} />)}
        </div>

        {/* CTA banner */}
        <div style={{
          marginTop: '56px', padding: '40px 44px',
          border: '1px solid var(--crimson-border)',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, rgba(192,31,58,0.055), transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '24px',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700,
              color: 'var(--text-display)', marginBottom: '6px',
            }}>
              Explore the full archive on Instagram
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)' }}>
              20+ high quality works · Branding · Typography · Posters · Marketing · Visual experiments
            </p>
          </div>
          <a
            href="https://www.instagram.com/_shinchan_op/"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--crimson)', color: '#fdf0f3',
              borderRadius: '4px', padding: '13px 26px',
              transition: 'background 0.22s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-bright)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)' }}
          >
            @_shinchan_op ↗
          </a>
        </div>
      </div>
    </section>
  )
}
