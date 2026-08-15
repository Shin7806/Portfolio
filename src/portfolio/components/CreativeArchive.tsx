import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const categories = ['Showcase', 'All', 'Branding', 'Posters', 'Marketing', 'Visual']

const works = [
  {
    id: 1,
    cat: 'Branding',
    title: 'NeuroTwin — Product Design Showcase',
    desc: 'AI productivity twin concept presented through a focused UI design showcase.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796016/728861495_18101646575143805_7094160654402458323_n.webp',
    tall: false,
    postUrl: 'https://www.instagram.com/p/DaQMiybifGt/?img_index=1',
  },
  {
    id: 2,
    cat: 'Marketing',
    title: 'YouTube Banner — Valorant',
    desc: 'Bold gaming banner design built around minimal typography, contrast and a strong Valorant-inspired visual direction.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796015/604060063_18082223210143805_5318435855300436833_n.jpg',
    tall: false,
    postUrl: 'https://www.instagram.com/p/DSepAn9kZny/?img_index=1',
  },
  {
    id: 3,
    cat: 'Branding',
    title: 'Logo Presentation — S Monogram',
    desc: 'Monogram identity presentation exploring clean geometry, typography and a refined visual system.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786794608/523827333_18067309490143805_8089992390548315813_n.webp',
    tall: false,
    postUrl: 'https://www.instagram.com/p/DMmO8WTpRVC/?img_index=1',
  },
  {
    id: 4,
    cat: 'Branding',
    title: 'BookNest — Modern Website UI Design',
    desc: 'Modern web interface concept for book lovers, combining editorial styling with a focused library experience.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796055/491468402_18058441649143805_1258082121167946110_n.webp',
    tall: false,
    postUrl: 'https://www.instagram.com/p/DIvTF19JNGE/?img_index=1',
  },
  {
    id: 5,
    cat: 'Visual',
    title: 'Manga Edited Text Logo',
    desc: 'Manga-inspired graphic composition combining character artwork, custom lettering and dramatic visual treatment.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796075/655243470_18073585865194725_196758243503140070_n.webp',
    tall: false,
    postUrl: 'https://www.instagram.com/p/C7ntbmdPTCr/?img_index=1',
  },
  {
    id: 6,
    cat: 'Visual',
    title: 'Luffy Gear 5',
    desc: 'One Piece character edit built around Luffy Gear 5 with cinematic typography, colour and motion-inspired composition.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796078/658837262_18579545056015508_7534396528493853719_n.webp',
    tall: false,
    postUrl: 'https://www.instagram.com/p/CvlxD2KrIzU/?img_index=1',
  },
  {
    id: 7,
    cat: 'Visual',
    title: 'Ganyu — Genshin Impact Showcase',
    desc: 'Character showcase graphic for Ganyu, combining game-inspired UI elements, character art and a structured visual layout.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796109/669606401_18576740791033995_152573603981883345_n.webp',
    tall: false,
    postUrl: 'https://www.instagram.com/p/CsGNQLXt0kA/?img_index=1',
  },
  {
    id: 8,
    cat: 'Visual',
    title: 'Luffy & Zoro',
    desc: 'Anime character composition pairing Luffy and Zoro with a dark cinematic treatment and red-accented visual framing.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796111/656584898_18087289094241067_5786711970015558831_n.webp',
    tall: false,
    postUrl: 'https://www.instagram.com/p/ClLXXoGLJRE/?img_index=1',
  },
  {
    id: 9,
    cat: 'Marketing',
    title: 'YouTube Banner — Satoru Gojo',
    desc: 'Client YouTube banner concept for a Satoru Gojo-themed channel, presented as a bold carousel-style visual system.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796141/654206164_18090833969137268_3540283209299874185_n.webp',
    tall: false,
    postUrl: 'https://www.instagram.com/p/Ci4OedhrS72/?img_index=1',
  },
  {
    id: 10,
    cat: 'Posters',
    title: 'Happy Independence Day',
    desc: 'Independence Day social poster combining the Indian flag, celebratory typography and a patriotic visual composition.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796161/655512222_18168455149365154_2773878470054455824_n.webp',
    tall: true,
    postUrl: 'https://www.instagram.com/p/ChRYLNCrR_u/?img_index=1',
  },
  {
    id: 11,
    cat: 'Visual',
    title: 'Monkey D. Luffy',
    desc: 'One Piece character profile graphic combining illustrated artwork, informational elements and a bold editorial composition.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796176/653673304_18059008934417230_4814793008387224148_n.webp',
    tall: false,
    postUrl: 'https://www.instagram.com/p/ChMlB0chOC-/?img_index=1',
  },
  {
    id: 12,
    cat: 'Posters',
    title: 'Happy Friendship Day',
    desc: 'Friendship Day social creative using anime-inspired artwork, warm colour treatment and expressive celebratory typography.',
    image: 'https://res.cloudinary.com/sadd5xib/image/upload/v1786796178/658798664_18420683977126872_7871901995548639766_n.webp',
    tall: true,
    postUrl: 'https://www.instagram.com/p/CgoYIxuLGhE/?img_index=1',
  },
]

export type Work = typeof works[0]

function GridWorkCard({ w, index }: { w: Work; index: number }) {
  const [hovered, setHovered] = useState(false)
  const { ref, inView } = useInView(0.05)

  const active = hovered

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={w.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${w.title} on Instagram`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: '4px',
        background: '#0d0a0e', cursor: 'pointer',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s var(--ease-out) ${index * 0.04}s, transform 0.5s var(--ease-out) ${index * 0.04}s, box-shadow 0.3s`,
        boxShadow: active ? 'var(--shadow-hover)' : 'none',
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        breakInside: 'avoid',
        marginBottom: '10px',
      }}
    >
      <img
        src={w.image}
        alt={w.title}
        loading="lazy"
        style={{
          width: '100%', height: 'auto', display: 'block',
          filter: active ? 'saturate(1) brightness(1)' : 'saturate(0.9) brightness(0.85)',
          transform: active ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.55s var(--ease-out)',
        }}
      />

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: active
          ? 'linear-gradient(to top, rgba(7,5,10,0.88) 0%, rgba(7,5,10,0.55) 28%, rgba(7,5,10,0.08) 65%, transparent 100%)'
          : 'transparent',
        transition: 'background 0.4s',
        pointerEvents: 'none',
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
        pointerEvents: 'none',
      }}>{w.cat}</div>

      {/* Info on hover/focus */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px',
        transform: active ? 'translateY(0)' : 'translateY(10px)',
        opacity: active ? 1 : 0,
        transition: 'all 0.32s var(--ease-out)',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
          color: 'var(--text-display)', marginBottom: '3px',
        }}>{w.title}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)',
        }}>{w.desc}</div>
      </div>
    </a>
  )
}

function ShowcaseCard({ w, isDuplicate = false, cardWidth }: { w: Work; isDuplicate?: boolean; cardWidth: string }) {
  const [active, setActive] = useState(false)

  return (
    <a
      href={w.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${w.title} on Instagram`}
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate ? "true" : undefined}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: '4px',
        background: '#0d0a0e', cursor: 'pointer',
        width: cardWidth,
        textDecoration: 'none', color: 'inherit', display: 'block',
        flexShrink: 0,
        transform: active ? 'scale(1.025)' : 'scale(1)',
        boxShadow: active ? 'var(--shadow-hover)' : 'none',
        border: `1px solid ${active ? 'var(--crimson-border)' : 'var(--glass-border)'}`,
        transition: 'all 0.3s var(--ease-out)',
        zIndex: active ? 10 : 1,
      }}
    >
      <img
        src={w.image}
        alt={w.title}
        loading={isDuplicate ? "lazy" : "eager"}
        style={{
          width: '100%', height: 'auto', display: 'block',
          filter: active ? 'saturate(1) brightness(1)' : 'saturate(0.9) brightness(0.85)',
          transition: 'all 0.3s var(--ease-out)',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        background: active
          ? 'linear-gradient(to top, rgba(7,5,10,0.88) 0%, rgba(7,5,10,0.55) 28%, rgba(7,5,10,0.08) 65%, transparent 100%)'
          : 'transparent',
        transition: 'background 0.3s',
        pointerEvents: 'none',
      }} />

      {/* Index & Category (Always visible but top left) */}
      <div style={{
        position: 'absolute', top: '16px', left: '16px',
        display: 'flex', gap: '8px', alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.1em'
        }}>{String(w.id).padStart(2, '0')}</span>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'rgba(240,232,236,0.55)',
          background: 'rgba(7,5,10,0.55)',
          borderRadius: '99px', padding: '3px 9px',
          backdropFilter: 'blur(8px)',
        }}>{w.cat}</div>
      </div>

      {/* Details (Revealed on active) */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 20px',
        transform: active ? 'translateY(0)' : 'translateY(10px)',
        opacity: active ? 1 : 0,
        transition: 'all 0.3s var(--ease-out)',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 700,
          color: 'var(--text-display)', marginBottom: '4px',
        }}>{w.title}</div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-body)',
          marginBottom: '12px', lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{w.desc}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--crimson)',
          letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          View on Instagram ↗
        </div>
      </div>
    </a>
  )
}

function RibbonLane({ worksSubset, direction, duration, scale, opacity, cardWidth, height, leftOffset }: { worksSubset: Work[]; direction: 'left' | 'right'; duration: string; scale: number; opacity: number; cardWidth: string; height: string; leftOffset: string }) {
  return (
    <div className="ribbon-lane" style={{ opacity, transform: `scale(${scale})`, height }}>
      <div
        className="ribbon-track"
        style={{
          animation: `ribbonMove${direction === 'left' ? 'Left' : 'Right'} ${duration} linear infinite`,
          gap: '32px',
          paddingRight: '32px',
          position: 'relative',
          left: leftOffset,
          height: '100%',
        }}
      >
        {worksSubset.map(w => <ShowcaseCard key={`orig-${w.id}`} w={w} cardWidth={cardWidth} />)}
        {worksSubset.map(w => <ShowcaseCard key={`dup-${w.id}`} w={w} isDuplicate={true} cardWidth={cardWidth} />)}
      </div>
    </div>
  )
}

function ShowcaseRibbons({ showcaseWorks }: { showcaseWorks: Work[] }) {
  // Desktop splits into 3 lanes
  const lane1 = [showcaseWorks[0], showcaseWorks[3], showcaseWorks[6], showcaseWorks[9]]
  const lane2 = [showcaseWorks[1], showcaseWorks[4], showcaseWorks[7], showcaseWorks[10]]
  const lane3 = [showcaseWorks[2], showcaseWorks[5], showcaseWorks[8], showcaseWorks[11]]

  // Mobile splits into 2 lanes
  const mobLane1 = [showcaseWorks[0], showcaseWorks[2], showcaseWorks[4], showcaseWorks[6], showcaseWorks[8], showcaseWorks[10]]
  const mobLane2 = [showcaseWorks[1], showcaseWorks[3], showcaseWorks[5], showcaseWorks[7], showcaseWorks[9], showcaseWorks[11]]

  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.7s var(--ease-out)',
        marginTop: '24px',
        overflow: 'hidden',
        padding: '60px 0',
      }}
    >
      <div className="hide-on-mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <RibbonLane worksSubset={lane1} direction="left" duration="40s" scale={1} opacity={1} cardWidth="360px" height="260px" leftOffset="0px" />
        <RibbonLane worksSubset={lane2} direction="right" duration="45s" scale={0.96} opacity={0.88} cardWidth="360px" height="260px" leftOffset="-110px" />
        <RibbonLane worksSubset={lane3} direction="left" duration="50s" scale={0.93} opacity={0.72} cardWidth="360px" height="260px" leftOffset="-50px" />
      </div>

      <div className="show-on-mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <RibbonLane worksSubset={mobLane1} direction="left" duration="45s" scale={1} opacity={1} cardWidth="78vw" height="280px" leftOffset="0px" />
        <RibbonLane worksSubset={mobLane2} direction="right" duration="50s" scale={0.96} opacity={0.88} cardWidth="78vw" height="280px" leftOffset="-60px" />
      </div>
    </div>
  )
}

export default function CreativeArchive() {
  const [active, setActive] = useState('Showcase')
  const { ref, inView } = useInView()

  const filtered = active === 'All' ? works : works.filter(w => w.cat === active)

  return (
    <section
      id="archive"
      aria-label="Creative Archive"
      style={{ padding: '128px 0', background: 'var(--bg-section-alt)' }}
    >
      <div style={{ maxWidth: active === 'Showcase' ? '100%' : '1320px', margin: '0 auto', padding: active === 'Showcase' ? '0' : '0 var(--pad-x)', overflowX: 'hidden' }}>
        
        {/* Header container to align with content padding even in Showcase mode */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 var(--pad-x)' }}>
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
                80+ Works.<br />
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
            className="horizontal-scroll-mobile"
            aria-label="Filter works by category"
            style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap', marginBottom: '32px' }}
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
        </div>

        {active === 'Showcase' ? (
          <ShowcaseRibbons showcaseWorks={works} />
        ) : (
          <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 var(--pad-x)' }}>
            <div
              className="gallery-grid"
              style={{
                columnGap: '16px',
                animation: 'fade-in 0.45s var(--ease-out)',
              }}
            >
              {filtered.map((w, i) => <GridWorkCard key={w.id} w={w} index={i} />)}
            </div>
          </div>
        )}

        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 var(--pad-x)' }}>
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
      </div>
    </section>
  )
}