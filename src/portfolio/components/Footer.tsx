export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{ borderTop: '1px solid var(--glass-border)', padding: '36px 0' }}
    >
      <div
        className="footer-inner"
        style={{
          maxWidth: '1320px', margin: '0 auto', padding: '0 var(--pad-x)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '15px',
            fontWeight: 700, color: 'var(--text-display)', letterSpacing: '-0.01em',
          }}>
            <img
            src="/logo.svg"
            alt="Dhruv Poddar Logo"
            style={{
              width: "42px",
              height: "42px",
              objectFit: "contain",
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>
            © {year} Dhruv Poddar
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          letterSpacing: '0.1em', color: 'var(--text-subtle)', textAlign: 'center',
        }}>
          Designed & developed with intent.{' '}
          <span style={{ color: 'var(--crimson)' }}>Built in Bengaluru.</span>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { label: 'GitHub',   href: 'https://github.com/Shin7806' },
            { label: 'Behance',  href: 'https://www.behance.net/shinchangfx' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruvpoddar/' },
          ].map(l => (
            <a
              key={l.href}
              href={l.href}
              target="_blank" rel="noopener noreferrer"
              className="link-underline"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                letterSpacing: '0.1em', color: 'var(--text-subtle)',
                transition: 'color 0.22s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--crimson)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-subtle)' }}
            >{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
