import { useState, useEffect } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Process", href: "#process" },
  { label: "Archive", href: "#archive" },
  { label: "Toolbox", href: "#toolbox" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        }),
      { threshold: 0.35 },
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s var(--ease-out)",
        background: scrolled ? "rgba(7,5,10,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(28px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(28px)" : "none",
        borderBottom: scrolled ? "1px solid var(--glass-border)" : "none",
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 40px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#hero");
          }}
          aria-label="Dhruv Poddar — back to top"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            textDecoration: "none",
            lineHeight: 0,
          }}
        >
          <img
            src="/logo.svg"
            alt="Dhruv Poddar Logo"
            style={{
              width: "32px",
              height: "32px",
              objectFit: "contain",
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </a>

        {/* Desktop nav */}
        <ul
          role="list"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
            listStyle: "none",
          }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(l.href);
                }}
                aria-current={active === l.href ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:
                    active === l.href ? "var(--crimson)" : "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.22s",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-body)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    active === l.href ? "var(--crimson)" : "var(--text-muted)";
                }}
              >
                {l.label}
                {active === l.href && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "var(--crimson)",
                    }}
                    aria-hidden="true"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume */}
        <a
          href="https://dhruvpoddar.is-a.dev/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--crimson)",
            textDecoration: "none",
            border: "1px solid var(--crimson-border)",
            borderRadius: "4px",
            padding: "8px 16px",
            transition: "all 0.22s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--crimson-soft)";
            e.currentTarget.style.borderColor = "var(--crimson)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--crimson-border)";
          }}
        >
          Resume ↗
        </a>

        {/* Mobile toggle */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-body)",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background:
                  i === 1 && menuOpen
                    ? "transparent"
                    : i === 0 && menuOpen
                      ? "var(--crimson)"
                      : i === 2 && menuOpen
                        ? "var(--crimson)"
                        : "currentColor",
                transition: "all 0.28s",
                transform:
                  i === 0 && menuOpen
                    ? "rotate(45deg) translate(4.5px, 4.5px)"
                    : i === 2 && menuOpen
                      ? "rotate(-45deg) translate(4.5px, -4.5px)"
                      : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden"
          style={{
            background: "rgba(7,5,10,0.97)",
            backdropFilter: "blur(28px)",
            borderTop: "1px solid var(--crimson-border)",
            padding: "24px 40px 32px",
            animation: "fade-in 0.22s var(--ease-out)",
          }}
        >
          <ul
            role="list"
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginBottom: "24px",
            }}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(l.href);
                  }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color:
                      active === l.href ? "var(--crimson)" : "var(--text-body)",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://dhruvpoddar.is-a.dev/resume"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              textDecoration: "none",
              border: "1px solid var(--crimson-border)",
              borderRadius: "4px",
              padding: "10px 20px",
              display: "inline-block",
            }}
          >
            Resume ↗
          </a>
        </div>
      )}
    </header>
  );
}
