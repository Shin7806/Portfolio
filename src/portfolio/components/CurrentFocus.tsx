import { useInView } from '../hooks/useInView'

const focusItems = [
  {
    label: 'Currently Building',
    icon: '⬡',
    items: [
      { text: 'Personal portfolio website (this one)', active: true },
      { text: 'NeuroTwin v2 — expanded interaction model', active: false },
      { text: 'Figma component library for personal projects', active: false },
    ],
  },
  {
    label: 'Currently Learning',
    icon: '◎',
    items: [
      { text: 'Advanced Framer Motion — spring physics & layout animations', active: true },
      { text: 'Design systems at scale — Linear, Vercel patterns', active: false },
      { text: 'TypeScript generics & advanced patterns', active: false },
    ],
  },
  {
    label: 'Current Goals',
    icon: '→',
    items: [
      { text: 'Land a full-time Product Designer role at a product company', active: true },
      { text: 'Ship 3 more open-source design explorations', active: false },
      { text: 'Publish a design process article on Medium', active: false },
    ],
  },
  {
    label: 'Reading Now',
    icon: '◈',
    items: [
      { text: 'The Shape of Design — Frank Chimero', active: true },
      { text: 'Refactoring UI — Adam Wathan & Steve Schoger', active: false },
      { text: 'A Philosophy of Software Design — John Ousterhout', active: false },
    ],
  },
]

function FocusCard({ f, index }: { f: typeof focusItems[0]; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        padding: '32px',
        border: '1px solid var(--glass-border)',
        borderRadius: '6px',
        background: 'var(--card)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: 'rgba(196,30,58,0.4)',
          lineHeight: 1,
        }} aria-hidden="true">
          {f.icon}
        </span>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--crimson)',
          fontWeight: 500,
        }}>
          {f.label}
        </div>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {f.items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: item.active ? 'var(--crimson)' : 'var(--text-subtle)',
              marginTop: '6px',
              flexShrink: 0,
              boxShadow: item.active ? '0 0 8px var(--crimson-glow)' : 'none',
              animation: item.active ? 'glow-pulse 2.5s ease-in-out infinite' : 'none',
            }} aria-hidden="true" />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: item.active ? 'var(--text-body)' : 'var(--text-muted)',
              lineHeight: 1.5,
            }}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CurrentFocus() {
  const { ref, inView } = useInView()

  return (
    <section
      id="focus"
      aria-label="Current Focus"
      style={{ padding: '120px 0', background: 'var(--bg-deep)' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'end',
            marginBottom: '64px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span className="section-label">Current Focus</span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: '#22c55e',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '99px',
                padding: '3px 10px',
                background: 'rgba(34,197,94,0.06)',
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', animation: 'glow-pulse 2s ease-in-out infinite' }} />
                Live
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700,
              color: 'var(--text-display)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}>
              What I'm Up To<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(196,30,58,0.7)' }}>Right Now</em>
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: 1.8,
            color: 'var(--text-muted)',
          }}>
            This section is intentionally alive. It reflects where I am right now — what I'm building, learning, and thinking about. Updated as life moves forward.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}>
          {focusItems.map((f, i) => (
            <FocusCard key={f.label} f={f} index={i} />
          ))}
        </div>

        {/* Availability status */}
        <div style={{
          marginTop: '48px',
          padding: '32px 40px',
          border: '1px solid rgba(34,197,94,0.15)',
          borderRadius: '6px',
          background: 'rgba(34,197,94,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 12px rgba(34,197,94,0.5)',
              animation: 'glow-pulse 2s ease-in-out infinite',
              flexShrink: 0,
            }} aria-hidden="true" />
            <div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-display)',
                marginBottom: '2px',
              }}>
                Available for full-time roles
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
              }}>
                Product Designer · UI/UX · Bengaluru, India · Remote-friendly
              </div>
            </div>
          </div>
          <a
            href="mailto:dhruvp0629@gmail.com"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#22c55e',
              textDecoration: 'none',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: '4px',
              padding: '10px 24px',
              transition: 'all 0.25s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(34,197,94,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Let's Talk →
          </a>
        </div>
      </div>
    </section>
  )
}
