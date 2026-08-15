import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const steps = [
  {
    num: '01',
    phase: 'Research',
    title: 'Understand the Problem',
    description: 'Stakeholder interviews, user research, competitive analysis, heuristic evaluation. I refuse to design without knowing who I\'m designing for — and why the current solution fails them.',
    tools: ['FigJam', 'Notion', 'User Interviews', 'Analytics'],
    output: 'Research synthesis, problem framing',
  },
  {
    num: '02',
    phase: 'Think',
    title: 'Define & Frame',
    description: 'Convert research into clear problem statements, user journeys, and design principles. This is where I fight scope creep and make deliberate choices about what the product will and won\'t do.',
    tools: ['FigJam', 'Miro', 'Claude', 'Notion'],
    output: 'Problem statement, user journeys, design criteria',
  },
  {
    num: '03',
    phase: 'Wireframe',
    title: 'Structure the Experience',
    description: 'Low-fidelity layouts that prioritize information hierarchy and user flow. No colors, no shadows — just logic. I wireframe fast and dirty to validate architecture before investing in visual craft.',
    tools: ['Figma', 'Balsamiq', 'Pen & Paper'],
    output: 'Information architecture, user flow, low-fi wireframes',
  },
  {
    num: '04',
    phase: 'Prototype',
    title: 'Make It Interactive',
    description: 'Clickable prototypes for user testing. Real interactions, real transitions, real data — not a static deck. I prototype to kill my assumptions before they become shipped code.',
    tools: ['Figma', 'Framer', 'Principle'],
    output: 'Interactive prototype, usability test plan',
  },
  {
    num: '05',
    phase: 'Visual Design',
    title: 'Craft the Aesthetic',
    description: 'High-fidelity visual design built on a systematic foundation. Typography, color, spacing, elevation — every decision made with purpose and documented in the design system.',
    tools: ['Figma', 'Photoshop', 'Illustrator'],
    output: 'High-fidelity mockups, visual design language',
  },
  {
    num: '06',
    phase: 'Design System',
    title: 'Systemize the Decisions',
    description: 'Components, tokens, patterns — the infrastructure that makes the design scalable and the handoff clean. A design system is a living document, not a deliverable.',
    tools: ['Figma', 'Tokens Studio', 'Storybook'],
    output: 'Component library, design tokens, documentation',
  },
  {
    num: '07',
    phase: 'Iterate',
    title: 'Test & Refine',
    description: 'Usability testing, stakeholder feedback, accessibility audit. I embrace critique as a forcing function — every round of feedback makes the product sharper.',
    tools: ['Maze', 'UserTesting', 'Figma'],
    output: 'Usability report, revised designs',
  },
  {
    num: '08',
    phase: 'Collaborate',
    title: 'Partner with Engineering',
    description: 'Annotated specs, dev-ready components, responsive behavior documented. I stay in the room during implementation — because the gap between design and code is where quality dies.',
    tools: ['Figma Dev Mode', 'GitHub', 'Cursor', 'Zeplin'],
    output: 'Dev handoff, implementation support',
  },
  {
    num: '09',
    phase: 'Launch',
    title: 'Ship & Measure',
    description: 'Launch isn\'t the finish line — it\'s the beginning of the feedback loop. I track metrics, gather real user data, and feed learnings back into the product roadmap.',
    tools: ['Analytics', 'Hotjar', 'Mixpanel', 'Notion'],
    output: 'Live product, measurement framework, learnings',
  },
]

export default function DesignProcess() {
  const { ref, inView } = useInView()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section
      id="process"
      aria-label="Design Process"
      style={{ padding: '120px 0' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--pad-x)' }}>
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            marginBottom: '80px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <span className="section-label">Design Process</span>
          <div style={{ height: '12px' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 700,
            color: 'var(--text-display)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}>
            From Research<br />
            to Reality
          </h2>
        </div>

        {/* Interactive process (Desktop & Tablet) */}
        <div className="proc-grid hide-on-mobile-only" style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* Step nav */}
          <nav className="proc-nav" aria-label="Process steps" style={{ position: 'sticky', top: '96px' }}>
            <ol className="horizontal-selector-tablet" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {steps.map((s, i) => (
                <li key={s.num}>
                  <button
                    onClick={() => setActiveStep(i)}
                    aria-current={activeStep === i ? 'step' : undefined}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '12px 16px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: activeStep === i ? 'var(--crimson-soft)' : 'transparent',
                      borderLeft: `2px solid ${activeStep === i ? 'var(--crimson)' : 'transparent'}`,
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => {
                      if (activeStep !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                    }}
                    onMouseLeave={e => {
                      if (activeStep !== i) e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      color: activeStep === i ? 'var(--crimson)' : 'var(--text-subtle)',
                      minWidth: '24px',
                    }}>
                      {s.num}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: activeStep === i ? 500 : 400,
                      color: activeStep === i ? 'var(--text-display)' : 'var(--text-muted)',
                      transition: 'color 0.25s',
                      whiteSpace: 'nowrap',
                    }}>
                      {s.phase}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          {/* Step detail */}
          <div style={{
            padding: '48px',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            background: 'var(--card)',
            minHeight: '360px',
          }}
            key={activeStep}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--crimson)',
              marginBottom: '8px',
            }}>
              {steps[activeStep].num} — {steps[activeStep].phase}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--text-display)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}>
              {steps[activeStep].title}
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              marginBottom: '36px',
              maxWidth: '560px',
            }}>
              {steps[activeStep].description}
            </p>

            <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-subtle)',
                  marginBottom: '12px',
                }}>
                  Tools Used
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {steps[activeStep].tools.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      border: '1px solid rgba(196,30,58,0.15)',
                      borderRadius: '4px',
                      padding: '4px 10px',
                      background: 'var(--crimson-soft)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-subtle)',
                  marginBottom: '12px',
                }}>
                  Output
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}>
                  {steps[activeStep].output}
                </p>
              </div>
            </div>

            {/* Step progress */}
            <div style={{ marginTop: '40px', display: 'flex', gap: '4px', alignItems: 'center' }}>
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                  style={{
                    width: i === activeStep ? '24px' : '4px',
                    height: '4px',
                    borderRadius: '99px',
                    background: i === activeStep ? 'var(--crimson)' : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Accordion (< 768px) */}
        <div className="show-on-mobile-only" style={{ display: 'flex', flexDirection: 'column' }}>
          {steps.map((s, i) => {
            const isOpen = activeStep === i
            return (
              <div
                key={s.num}
                style={{
                  borderBottom: '1px solid',
                  borderColor: isOpen ? 'var(--crimson-border)' : 'var(--glass-border)',
                  background: isOpen ? 'var(--bg-elevated)' : 'transparent',
                  transition: 'all 0.3s var(--ease-out)',
                }}
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => setActiveStep(i)}
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
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: isOpen ? 'var(--crimson)' : 'var(--text-subtle)',
                      letterSpacing: '0.15em',
                      transition: 'color 0.3s',
                      marginTop: '4px',
                    }}>
                      {s.num}
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
                        {s.phase}
                      </div>
                      {!isOpen && (
                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--text-muted)',
                          lineHeight: 1.4,
                        }}>
                          {s.title}
                        </div>
                      )}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                    color: isOpen ? 'var(--crimson)' : 'var(--text-subtle)',
                    transition: 'all 0.3s',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                  }}>
                    {isOpen ? '−' : '+'}
                  </span>
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
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        lineHeight: 1.7,
                        color: 'var(--text-muted)',
                        marginBottom: '24px',
                      }}>
                        {s.description}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--text-subtle)',
                            marginBottom: '10px',
                          }}>
                            Tools Used
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {s.tools.map(t => (
                              <span key={t} style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                color: 'var(--text-muted)',
                                border: '1px solid rgba(196,30,58,0.15)',
                                borderRadius: '4px',
                                padding: '4px 10px',
                                background: 'var(--crimson-soft)',
                              }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--text-subtle)',
                            marginBottom: '10px',
                          }}>
                            Output
                          </div>
                          <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            color: 'var(--text-muted)',
                            lineHeight: 1.6,
                          }}>
                            {s.output}
                          </p>
                        </div>
                      </div>
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
