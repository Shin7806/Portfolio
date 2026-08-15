import { useInView } from '../hooks/useInView'

const pillars = [
  {
    num: '01',
    title: 'Product Thinking',
    body: "Design isn't decoration. Every pixel earns its place by solving something real. I start with the problem, not the canvas.",
    icon: '◈',
  },
  {
    num: '02',
    title: 'Systems Over Screens',
    body: 'A great design is a great system. Components, tokens, and logic — built to scale without breaking, with handoff that feels like collaboration.',
    icon: '⬡',
  },
  {
    num: '03',
    title: 'Minimal by Default',
    body: "Minimalism is discipline — removing everything until only what matters remains. I default to restraint, not decoration.",
    icon: '○',
  },
  {
    num: '04',
    title: 'Implementation Awareness',
    body: 'I write React. I understand CSS. I know what\'s expensive to animate. Designers who understand the stack ship faster and create less friction.',
    icon: '⟨⟩',
  },
  {
    num: '05',
    title: 'Accessibility First',
    body: 'Contrast, keyboard navigation, semantic structure — these are the floor every interface must be built on. Not constraints. Requirements.',
    icon: '◎',
  },
  {
    num: '06',
    title: 'AI-Augmented Workflow',
    body: 'I treat Claude, Cursor, and Lovable as collaborators. The human judgment shapes every decision. AI compresses the distance from idea to artifact.',
    icon: '⌁',
  },
]

function PillarCard({ p, index }: { p: typeof pillars[0]; index: number }) {
  const { ref, inView } = useInView(0.1)

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: '32px',
        border: '1px solid var(--glass-border)',
        borderRadius: '6px', background: 'var(--card)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s var(--ease-out) ${index * 0.07}s, transform 0.6s var(--ease-out) ${index * 0.07}s, border-color 0.25s, background 0.25s`,
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--crimson-border)'
        e.currentTarget.style.background = 'var(--bg-elevated)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--glass-border)'
        e.currentTarget.style.background = 'var(--card)'
      }}
    >
      {/* Ghost number */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-16px', right: '16px',
        fontFamily: 'var(--font-display)', fontSize: '88px', fontWeight: 900,
        color: 'rgba(192,31,58,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>{p.num}</div>

      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '24px',
        color: 'rgba(192,31,58,0.28)', marginBottom: '18px', lineHeight: 1,
      }} aria-hidden="true">{p.icon}</div>

      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '9px',
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: 'var(--crimson)', marginBottom: '10px',
      }}>{p.num}</div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700,
        color: 'var(--text-display)', letterSpacing: '-0.01em',
        lineHeight: 1.2, marginBottom: '12px',
      }}>{p.title}</h3>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '13px',
        lineHeight: 1.75, color: 'var(--text-muted)',
      }}>{p.body}</p>
    </article>
  )
}

export default function DesignPhilosophy() {
  const { ref, inView } = useInView()

  return (
    <section
      id="philosophy"
      aria-label="Design Philosophy"
      style={{ padding: '128px 0', background: 'var(--bg-section-alt)' }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="two-col"
          style={{
            marginBottom: '72px', display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'end',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s var(--ease-out)',
          }}
        >
          <div>
            <span className="section-label">Design Philosophy</span>
            <div style={{ height: '14px' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 700, color: 'var(--text-display)',
              letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              How I Think<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(192,31,58,0.65)' }}>Before</em> I Design
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '15px',
            lineHeight: 1.8, color: 'var(--text-muted)',
          }}>
            These are the convictions I've built through seven years of designing for people — the invisible scaffolding behind every decision I make.
          </p>
        </div>

        {/* Pillars */}
        <div
          className="three-col"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
        >
          {pillars.map((p, i) => <PillarCard key={p.num} p={p} index={i} />)}
        </div>

        {/* Quote */}
        <div style={{
          marginTop: '80px',
          display: 'flex', justifyContent: 'center',
        }}>
          <blockquote style={{
            borderLeft: '2px solid var(--crimson)', paddingLeft: '28px', maxWidth: '640px',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.2vw, 26px)',
              fontStyle: 'italic', fontWeight: 400,
              color: 'var(--text-body)', lineHeight: 1.55, letterSpacing: '-0.01em',
            }}>
              "Good design is not about making things beautiful. It's about making things that work — and then making those things beautiful too."
            </p>
            <footer style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '0.12em', color: 'var(--text-muted)', marginTop: '16px',
            }}>
              — Dhruv Poddar
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
