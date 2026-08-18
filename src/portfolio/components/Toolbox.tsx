import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const categories = [
  {
    id: 'design',
    label: 'Design',
    icon: '◈',
    tools: [
      { name: 'Figma',         desc: 'Primary design + prototyping tool',     level: 5 },
      { name: 'Illustrator',   desc: 'Vector & brand identity work',           level: 5 },
      { name: 'Photoshop',     desc: 'Photo editing & compositing',            level: 5 },
      { name: 'Framer',        desc: 'High-fidelity interactive prototypes',   level: 3 },
      { name: 'FigJam',        desc: 'Research, mapping, collaboration',       level: 5 },
      { name: 'Principle',     desc: 'Micro-interaction animation',            level: 3 },
    ],
  },
  {
    id: 'develop',
    label: 'Development',
    icon: '⟨⟩',
    tools: [
      { name: 'React',         desc: 'Frontend component architecture',        level: 4 },
      { name: 'TypeScript',    desc: 'Type-safe JavaScript',                   level: 4 },
      { name: 'Tailwind CSS',  desc: 'Utility-first styling system',           level: 4 },
      { name: 'Vite',          desc: 'Fast build tooling',                     level: 4 },
      { name: 'GitHub',        desc: 'Version control & collaboration',        level: 4 },
      { name: 'VS Code',       desc: 'Primary code editor',                    level: 5 },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Workflow',
    icon: '⌁',
    tools: [
      { name: 'Claude',        desc: 'Primary AI reasoning + code partner',    level: 5 },
      { name: 'Cursor',        desc: 'AI-native code editor',                  level: 5 },
      { name: 'ChatGPT',       desc: 'Ideation + content iteration',           level: 4 },
      { name: 'Lovable',       desc: 'AI-accelerated product prototyping',     level: 4 },
      { name: 'Midjourney',    desc: 'Visual concept exploration',             level: 3 },
      { name: 'Notion AI',     desc: 'Research synthesis + documentation',     level: 4 },
    ],
  },
  {
    id: 'product',
    label: 'Product & Research',
    icon: '○',
    tools: [
      { name: 'Maze',          desc: 'Usability testing & validation',         level: 3 },
      { name: 'Hotjar',        desc: 'Session recording & heatmaps',           level: 3 },
      { name: 'Mixpanel',      desc: 'Product analytics',                      level: 2 },
      { name: 'Notion',        desc: 'Documentation & research synthesis',     level: 5 },
      { name: 'Miro',          desc: 'Remote collaboration & mapping',         level: 4 },
      { name: 'Linear',        desc: 'Project & issue tracking',               level: 3 },
    ],
  },
]

function ToolRow({ tool, delay }: { tool: { name: string; desc: string; level: number }; delay: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        transition: 'all 0.22s',
        opacity: 1,
        animationDelay: `${delay}ms`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: hovered ? 'var(--crimson)' : 'var(--text-subtle)',
          transition: 'background 0.22s',
          boxShadow: hovered ? '0 0 8px var(--crimson-glow)' : 'none',
          flexShrink: 0,
        }} aria-hidden="true" />
        <div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500,
            color: hovered ? 'var(--text-display)' : 'var(--text-body)',
            transition: 'color 0.22s',
          }}>
            {tool.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'var(--text-muted)', letterSpacing: '0.04em',
            marginTop: '2px',
            opacity: hovered ? 1 : 0.7,
            transition: 'opacity 0.22s',
          }}>
            {tool.desc}
          </div>
        </div>
      </div>
      {/* Proficiency dots */}
      <div style={{ display: 'flex', gap: '4px' }} aria-label={`Proficiency: ${tool.level} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: i < tool.level ? 'var(--crimson)' : 'rgba(255,255,255,0.08)',
            transition: 'background 0.22s',
          }} />
        ))}
      </div>
    </div>
  )
}

export default function Toolbox() {
  const [activeTab, setActiveTab] = useState('design')
  const { ref, inView } = useInView()

  const active = categories.find(c => c.id === activeTab)!

  return (
    <section id="toolbox" aria-label="Toolbox" style={{ padding: '128px 0' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 var(--pad-x)' }}>
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px',
            alignItems: 'end', marginBottom: '72px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s var(--ease-out)',
          }}
          className="two-col"
        >
          <div>
            <span className="section-label">Toolbox</span>
            <div style={{ height: '14px' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700, color: 'var(--text-display)',
              letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Tools Are Evidence,<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(192,31,58,0.65)' }}>Not Claims</em>
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.8,
            color: 'var(--text-muted)',
          }}>
            I don't list tools to impress — I list them because every tool here has produced something real. These are the instruments behind every project in this portfolio.
          </p>
        </div>

        {/* Tab + content layout (Desktop & Tablet) */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '48px', alignItems: 'start' }} className="two-col hide-on-mobile-only">
          {/* Category tabs */}
          <nav aria-label="Tool categories">
            <ul className="horizontal-selector-tablet" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {categories.map(c => (
                <li key={c.id}>
                  <button
                    role="tab"
                    aria-selected={activeTab === c.id}
                    onClick={() => setActiveTab(c.id)}
                    className="btn-tactile"
                    style={{
                      width: '100%', textAlign: 'left',
                      border: 'none', cursor: 'pointer',
                      padding: '12px 16px', borderRadius: '4px',
                      display: 'flex', alignItems: 'center', gap: '12px',
                      background: activeTab === c.id ? 'var(--crimson-soft)' : 'transparent',
                      borderLeft: `2px solid ${activeTab === c.id ? 'var(--crimson)' : 'transparent'}`,
                      transition: 'all 0.22s',
                    }}
                    onMouseEnter={e => {
                      if (activeTab !== c.id) e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                    }}
                    onMouseLeave={e => {
                      if (activeTab !== c.id) e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '16px',
                      color: activeTab === c.id ? 'var(--crimson)' : 'var(--text-subtle)',
                      lineHeight: 1, transition: 'color 0.22s',
                    }} aria-hidden="true">{c.icon}</span>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '14px',
                      fontWeight: activeTab === c.id ? 500 : 400,
                      color: activeTab === c.id ? 'var(--text-display)' : 'var(--text-muted)',
                      transition: 'color 0.22s',
                      whiteSpace: 'nowrap',
                    }}>
                      {c.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tool list */}
          <div
            key={activeTab}
            style={{
              padding: '32px 36px',
              background: 'var(--card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              animation: 'fade-in 0.28s var(--ease-out)',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: '24px',
            }}>
              {active.label} — {active.tools.length} tools
            </div>
            <div>
              {active.tools.map((t, i) => (
                <ToolRow key={t.name} tool={t} delay={i * 40} />
              ))}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              marginTop: '20px', paddingTop: '16px',
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '0.12em', color: 'var(--text-subtle)',
            }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[1,2,3,4,5].map(n => (
                  <div key={n} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--crimson)' }} />
                ))}
              </div>
              = Expert
              <div style={{ width: '1px', height: '12px', background: 'var(--glass-border)' }} />
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[1,2].map(n => (
                  <div key={n} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--crimson)' }} />
                ))}
                {[3,4,5].map(n => (
                  <div key={n} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                ))}
              </div>
              = Learning
            </div>
          </div>
        </div>

        {/* Mobile Accordion (< 768px) */}
        <div className="show-on-mobile-only" style={{ display: 'flex', flexDirection: 'column' }}>
          {categories.map((c) => {
            const isOpen = activeTab === c.id
            return (
              <div
                key={c.id}
                style={{
                  borderBottom: '1px solid',
                  borderColor: isOpen ? 'var(--crimson-border)' : 'var(--glass-border)',
                  background: isOpen ? 'var(--bg-elevated)' : 'transparent',
                  transition: 'all 0.3s var(--ease-out)',
                }}
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => setActiveTab(c.id)}
                  className="btn-tactile"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-display)',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      color: isOpen ? 'var(--crimson)' : 'var(--text-subtle)',
                      lineHeight: 1,
                      marginTop: '2px',
                      transition: 'color 0.3s',
                    }} aria-hidden="true">
                      {c.icon}
                    </span>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: isOpen ? 'var(--crimson)' : 'var(--text-subtle)',
                        fontWeight: 500,
                        transition: 'color 0.3s',
                        marginBottom: isOpen ? '0' : '4px',
                      }}>
                        {c.label}
                      </div>
                      {!isOpen && (
                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--text-muted)',
                          lineHeight: 1.4,
                        }}>
                          {c.tools.length} tools · {c.tools.slice(0, 3).map(t => t.name).join(', ')}...
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {isOpen && (
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--crimson)',
                        letterSpacing: '0.15em',
                      }}>
                        {String(c.tools.length).padStart(2, '0')}
                      </span>
                    )}
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '16px',
                      color: isOpen ? 'var(--crimson)' : 'var(--text-subtle)',
                      transition: 'all 0.3s',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                    }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.3s var(--ease-out)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '0 16px 24px' }}>
                      {c.tools.map((t, i) => (
                        <ToolRow key={t.name} tool={t} delay={i * 40} />
                      ))}
                      {isOpen && (
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: '12px',
                          marginTop: '20px', paddingTop: '16px',
                          fontFamily: 'var(--font-mono)', fontSize: '10px',
                          letterSpacing: '0.12em', color: 'var(--text-subtle)',
                        }}>
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            {[1,2,3,4,5].map(n => (
                              <div key={n} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--crimson)' }} />
                            ))}
                          </div>
                          = Expert
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
