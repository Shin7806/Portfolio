import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const socials = [
  { label: 'LinkedIn',  sub: '/dhruvpoddar',  href: 'https://www.linkedin.com/in/dhruvpoddar/',        abbr: 'LI' },
  { label: 'GitHub',    sub: 'Shin7806',       href: 'https://github.com/Shin7806',                    abbr: 'GH' },
  { label: 'Behance',   sub: 'shinchangfx',    href: 'https://www.behance.net/shinchangfx',            abbr: 'BE' },
  { label: 'Instagram', sub: '_shinchan_op',   href: 'https://www.instagram.com/_shinchan_op/',        abbr: 'IG' },
  { label: 'Resume',    sub: 'View & Download',href: 'https://dhruvpoddar.is-a.dev/resume',            abbr: 'CV' },
]

export default function Contact() {
  const { ref, inView } = useInView()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('dhruvp0629@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch { /* silent */ }
  }

  return (
    <section id="contact" aria-label="Contact" style={{ padding: '128px 0' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 var(--pad-x)' }}>
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            textAlign: 'center', marginBottom: '72px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s var(--ease-out)',
          }}
        >
          <span className="section-label">Get in Touch</span>
          <div style={{ height: '14px' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: 700, color: 'var(--text-display)',
            letterSpacing: '-0.035em', lineHeight: 0.94,
            marginBottom: '28px',
          }}>
            Let's Build<br />
            <em style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Something</em><br />
            Exceptional
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.8,
            color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 44px',
          }}>
            Open to full-time Product Designer roles, freelance projects, and creative collaborations. If you're building something that matters, I'd love to be part of it.
          </p>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <a
              href="mailto:dhruvp0629@gmail.com"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(18px, 2.8vw, 30px)',
                fontWeight: 700, color: 'var(--text-display)',
                textDecoration: 'none', letterSpacing: '-0.01em',
                borderBottom: '1px solid var(--crimson-border)',
                paddingBottom: '3px', transition: 'all 0.22s',
                wordBreak: 'break-all', textAlign: 'center',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--crimson)'; e.currentTarget.style.borderColor = 'var(--crimson)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-display)'; e.currentTarget.style.borderColor = 'var(--crimson-border)' }}
            >
              dhruvp0629@gmail.com
            </a>
            <button
              onClick={copy}
              aria-live="polite"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: copied ? '#22c55e' : 'var(--text-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px 12px', transition: 'color 0.22s',
              }}
            >
              {copied ? '✓ Copied to clipboard' : '⌘ Copy email'}
            </button>
          </div>
        </div>

        {/* Social cards */}
        <div
          className="social-grid"
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px', maxWidth: '860px', margin: '0 auto 72px',
          }}
        >
          {socials.map(s => (
            <a
              key={s.href}
              href={s.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '10px', padding: '24px 12px',
                border: '1px solid var(--glass-border)',
                borderRadius: '6px', background: 'var(--card)',
                textDecoration: 'none',
                transition: 'all 0.3s var(--ease-out)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--crimson-border)'
                e.currentTarget.style.background = 'var(--bg-elevated)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--glass-border)'
                e.currentTarget.style.background = 'var(--card)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--crimson)', letterSpacing: '0.05em' }}>
                {s.abbr}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text-display)', marginBottom: '3px' }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  {s.sub}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Meta info */}
        <div style={{
          textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '44px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span aria-hidden="true">📍</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
              Bengaluru, India · Open to Remote
            </span>
          </div>

          <div className="contact-stats" style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Response time', val: '< 24 hours' },
              { label: 'Availability',  val: 'Immediate'  },
              { label: 'Time zone',     val: 'IST UTC+5:30' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700,
                  color: 'var(--text-display)', marginBottom: '3px',
                }}>{s.val}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
