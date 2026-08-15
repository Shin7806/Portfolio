import { useInView } from '../hooks/useInView'

const events = [
  { year: '2019', title: 'First Pixel',              body: 'Opened Photoshop for the first time. Spent weeks obsessing over typography and photo manipulation. Never looked back.',                                                                       type: 'start'     },
  { year: '2020', title: 'Graphic Design Roots',     body: 'Developed a systematic approach — poster design, social media creatives, brand experiments. Built my visual vocabulary from the ground up.',                                                  type: 'milestone'  },
  { year: '2021', title: 'First Client Work',        body: 'Started freelancing. Designed brand identities, marketing materials, and social content for startups and local businesses.',                                                                    type: 'milestone'  },
  { year: '2022', title: 'UI/UX Discovery',          body: 'Discovered Figma and fell in love with product design. Transitioned from graphic design to digital product thinking — components, flows, user journeys.',                                      type: 'milestone'  },
  { year: '2023', title: 'BCA · ASC Degree College',    body: 'Enrolled in Bachelor of Computer Applications. Learned programming, data structures, and web development — bridging design and engineering.',                                                   type: 'edu'        },
  { year: '2024', title: 'Product Design Focus',     body: 'Deepened into full-cycle product design — research, systems, dev handoff. Began working with AI tools to accelerate practice.',                                                                 type: 'milestone'  },
  { year: '2026', title: 'NeuroTwin',                body: 'Designed NeuroTwin — an AI-powered cognitive twin platform. Full product design cycle from research to high-fidelity UI and design system.',                                                    type: 'project', link: 'https://www.behance.net/gallery/251900711/NeuroTwin-Product-Design-Case-Study' },
  { year: '2026', title: 'SkillBridge — Shipped',   body: 'Designed and developed SkillBridge — a peer-to-peer learning platform. First project where I owned both design and frontend implementation end-to-end.',                                       type: 'project', link: 'https://skill-bridge-shin7806s-projects.vercel.app/' },
  { year: '2026', title: 'Open to Opportunities',   body: 'Graduating BCA. Ready to join a team building products that matter — as a Product Designer who ships.',                                                                                         type: 'current'   },
]

const dotColor: Record<string, string> = {
  start:     'var(--crimson)',
  milestone: 'rgba(192,31,58,0.45)',
  edu:       'rgba(240,232,236,0.18)',
  project:   'var(--crimson)',
  current:   'var(--crimson)',
}

function EventCard({ e }: { e: typeof events[0] }) {
  const typeLabel: Record<string, string> = { start: 'Origin', milestone: 'Milestone', edu: 'Education', project: 'Project', current: 'Now' }

  return (
    <div style={{
      padding: '18px 22px',
      background: e.type === 'current' ? 'rgba(192,31,58,0.055)' : 'var(--card)',
      border: `1px solid ${e.type === 'current' ? 'var(--crimson-border)' : 'var(--glass-border)'}`,
      borderRadius: '6px', marginBottom: '12px',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: dotColor[e.type] || 'var(--crimson)',
        marginBottom: '5px',
      }}>
        {e.year} · {typeLabel[e.type] || ''}
      </div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
        color: 'var(--text-display)', marginBottom: '7px', lineHeight: 1.3,
      }}>{e.title}</div>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '13px',
        color: 'var(--text-muted)', lineHeight: 1.65,
      }}>{e.body}</p>
      {e.link && (
        <a
          href={e.link} target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'var(--crimson)', textDecoration: 'none',
            marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px',
            letterSpacing: '0.06em',
          }}
        >
          View project ↗
        </a>
      )}
    </div>
  )
}

function TimelineItem({ e, index }: { e: typeof events[0]; index: number }) {
  const { ref, inView } = useInView(0.1)
  const isRight = index % 2 === 1

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="timeline-mirror"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        gap: '0',
        alignItems: 'start',
        opacity: inView ? 1 : 0,
        transform: inView
          ? 'translateX(0)'
          : `translateX(${isRight ? '20px' : '-20px'})`,
        transition: `opacity 0.55s var(--ease-out) ${index * 0.055}s, transform 0.55s var(--ease-out) ${index * 0.055}s`,
      }}
    >
      {/* Left */}
      <div className="tl-left" style={{ paddingRight: '24px', paddingTop: '4px', textAlign: 'right' }}>
        {!isRight ? <EventCard e={e} /> : (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', color: 'var(--text-subtle)' }}>
            {e.year}
          </span>
        )}
      </div>

      {/* Center spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '10px', height: '10px', borderRadius: '50%', marginTop: '10px', flexShrink: 0,
          background: dotColor[e.type] || 'var(--crimson)',
          boxShadow: (e.type === 'current' || e.type === 'project') ? '0 0 10px var(--crimson-glow)' : 'none',
          animation: e.type === 'current' ? 'glow-pulse-sm 2.4s ease-in-out infinite' : 'none',
          zIndex: 1,
        }} />
        <div style={{
          width: '1px', flex: 1, minHeight: '56px', marginTop: '4px',
          background: 'linear-gradient(to bottom, rgba(192,31,58,0.18), rgba(192,31,58,0.04))',
        }} />
      </div>

      {/* Right */}
      <div style={{ paddingLeft: '24px', paddingTop: '4px' }}>
        {isRight ? <EventCard e={e} /> : (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', color: 'var(--text-subtle)' }}>
            {e.year}
          </span>
        )}
      </div>
    </div>
  )
}

export default function CareerTimeline() {
  const { ref, inView } = useInView()

  return (
    <section id="timeline" aria-label="Career Timeline" style={{ padding: '128px 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 var(--pad-x)' }}>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            textAlign: 'center', marginBottom: '80px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s var(--ease-out)',
          }}
        >
          <span className="section-label">Career Timeline</span>
          <div style={{ height: '14px' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4vw, 54px)',
            fontWeight: 700, color: 'var(--text-display)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
          }}>
            Seven Years.<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(192,31,58,0.65)' }}>One Direction.</em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-muted)',
            maxWidth: '440px', margin: '18px auto 0', lineHeight: 1.75,
          }}>
            From Photoshop experiments in 2019 to full-cycle product design today — a continuous evolution toward designing with intention.
          </p>
        </div>

        <div className="hide-on-mobile-only">
          {events.map((e, i) => (
            <TimelineItem key={`${e.year}-${e.title}`} e={e} index={i} />
          ))}
        </div>

        <div className="show-on-mobile-only" style={{ display: 'flex', flexDirection: 'column' }}>
          {events.map((e, index) => (
            <div key={`${e.year}-${e.title}`} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '16px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%', marginTop: '4px', flexShrink: 0,
                  background: dotColor[e.type] || 'var(--crimson)',
                  boxShadow: (e.type === 'current' || e.type === 'project') ? '0 0 10px var(--crimson-glow)' : 'none',
                  animation: e.type === 'current' ? 'glow-pulse-sm 2.4s ease-in-out infinite' : 'none',
                  zIndex: 1,
                }} />
                {index !== events.length - 1 && (
                  <div style={{
                    width: '1px', flex: 1, minHeight: '40px', marginTop: '4px', marginBottom: '4px',
                    background: 'linear-gradient(to bottom, rgba(192,31,58,0.18), rgba(192,31,58,0.04))',
                  }} />
                )}
              </div>
              <div style={{ paddingBottom: '32px' }}>
                <EventCard e={e} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
