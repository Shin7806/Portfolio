import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const roles = ["Product Designer", "UI/UX Designer", "Graphic Designer"];

const marqueeParts = [
  "Product Design",
  "·",
  "UI/UX",
  "·",
  "Brand Identity",
  "·",
  "Design Systems",
  "·",
  "Prototyping",
  "·",
  "Frontend Dev",
  "·",
  "Typography",
  "·",
  "Visual Design",
  "·",
  "Figma",
  "·",
  "React",
  "·",
];

const socials = [
  { label: "GitHub", href: "https://github.com/Shin7806", abbr: "GH" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dhruvpoddar/",
    abbr: "LI",
  },
  { label: "Behance", href: "https://www.behance.net/shinchangfx", abbr: "BE" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_shinchan_op/",
    abbr: "IG",
  },
];

function useTypewriter(words: string[]) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const target = words[wordIdx];
    if (typing) {
      if (displayed.length < target.length) {
        timer.current = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          58,
        );
      } else {
        timer.current = setTimeout(() => setTyping(false), 2600);
      }
    } else {
      if (displayed.length > 0) {
        timer.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          28,
        );
      } else {
        setWordIdx((v) => (v + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timer.current);
  }, [displayed, typing, wordIdx, words]);

  return displayed;
}

export default function Hero() {
  const role = useTypewriter(roles);
  const sectionRef = useRef<HTMLElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);

  // Subtle cursor-parallax on the two atmospheric orbs — this is what
  // "landing page should feel alive" means in practice. Skipped entirely
  // on touch devices and for prefers-reduced-motion. The orbs keep their
  // existing CSS glow-pulse animation (scale/opacity) on an inner div;
  // this effect only ever writes `transform: translate3d(...)` on the
  // outer wrapper, so the two never fight over the same property.
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      if (orbARef.current) {
        orbARef.current.style.transform = `translate3d(${curX * 26}px, ${curY * 22}px, 0)`;
      }
      if (orbBRef.current) {
        orbBRef.current.style.transform = `translate3d(${-curX * 20}px, ${-curY * 18}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="hero"
      aria-label="Introduction"
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Atmospheric orbs ── */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {/* Primary orb — top-left */}
        <div ref={orbARef} className="hero-parallax-layer">
          <div
            style={{
              position: "absolute",
              top: "-15%",
              left: "-8%",
              width: "65%",
              height: "65%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(192,31,58,0.15) 0%, transparent 72%)",
              filter: "blur(56px)",
              animation: "glow-pulse 9s ease-in-out infinite",
            }}
          />
        </div>
        {/* Secondary orb — bottom-right */}
        <div ref={orbBRef} className="hero-parallax-layer">
          <div
            style={{
              position: "absolute",
              bottom: "-8%",
              right: "-4%",
              width: "50%",
              height: "50%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(120,14,38,0.1) 0%, transparent 70%)",
              filter: "blur(72px)",
              animation: "glow-pulse 14s ease-in-out infinite 5s",
            }}
          />
        </div>
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
            linear-gradient(rgba(192,31,58,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,31,58,0.035) 1px, transparent 1px)
          `,
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div
        className="hero-grid"
        style={{
          flex: 1,
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 var(--pad-x)",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          alignItems: "center",
          gap: "48px",
          paddingTop: "96px",
          paddingBottom: "80px",
        }}
      >
        {/* Left column */}
        <div>
          {/* Status pill */}
          <motion.div {...fadeUp(0.25)} style={{ marginBottom: "36px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--crimson)",
                border: "1px solid var(--crimson-border)",
                borderRadius: "99px",
                padding: "7px 16px",
                background: "var(--crimson-soft)",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--crimson)",
                  display: "inline-block",
                  animation: "glow-pulse 2.2s ease-in-out infinite",
                }}
              />
              Open to Work · Bengaluru, India
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.42)}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(58px, 8.5vw, 128px)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
              color: "var(--text-display)",
              marginBottom: "0px",
            }}
          >
            <span style={{ display: "block" }}>DHRUV</span>
            <span
              style={{
                display: "block",
                color: "transparent",
                WebkitTextStroke: "1.2px rgba(240,232,236,0.18)",
                marginTop: "6px",
              }}
            >
              PODDAR
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            {...fadeUp(0.6)}
            style={{
              marginTop: "28px",
              marginBottom: "32px",
              minHeight: "28px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(13px, 1.8vw, 17px)",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
              }}
            >
              {role}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1em",
                  background: "var(--crimson)",
                  marginLeft: "2px",
                  verticalAlign: "middle",
                  animation: "blink 1.1s step-end infinite",
                }}
              />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            {...fadeUp(0.74)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.4vw, 16px)",
              lineHeight: 1.8,
              color: "var(--text-muted)",
              maxWidth: "500px",
              marginBottom: "44px",
            }}
          >
            Designing since 2019. I create digital products, user interfaces,
            and visual identities that are simple, purposeful, and built with
            attention to both people and detail.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.84)}
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "48px",
            }}
          >
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#work")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover-lift-sm btn-tactile"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "var(--crimson)",
                color: "#fdf0f3",
                borderRadius: "4px",
                padding: "13px 26px",
                transition: "background 0.22s, box-shadow 0.25s",
                border: "1px solid var(--crimson)",
                boxShadow: "0 0 0 rgba(192,31,58,0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--crimson-bright)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--crimson)";
              }}
            >
              View Selected Work
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6.5h9M7.5 2.5l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <Link
              to="/resume"
              className="hover-lift-sm btn-tactile"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--text-body)",
                border: "1px solid var(--glass-border)",
                borderRadius: "4px",
                padding: "13px 26px",
                transition: "all 0.22s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--crimson-border)";
                e.currentTarget.style.color = "var(--text-display)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--glass-border)";
                e.currentTarget.style.color = "var(--text-body)";
              }}
            >
              Resume
            </Link>
          </motion.div>

          {/* Social row */}
          <motion.div
            {...fadeUp(0.96)}
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="icon-hover"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "4px",
                  transition: "border-color 0.22s, color 0.22s, background 0.22s, transform 0.3s var(--ease-spring)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--crimson-border)";
                  e.currentTarget.style.color = "var(--crimson)";
                  e.currentTarget.style.background = "var(--crimson-soft)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {s.abbr}
              </a>
            ))}
            <div
              style={{
                width: "1px",
                height: "28px",
                background: "var(--glass-border)",
                margin: "0 6px",
              }}
              aria-hidden="true"
            />
            <a
              href="mailto:dhruvp0629@gmail.com"
              aria-label="Email Dhruv"
              className="hover-lift-sm"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                textDecoration: "none",
                height: "38px",
                padding: "0 14px",
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid var(--glass-border)",
                borderRadius: "4px",
                transition: "all 0.22s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--crimson-border)";
                e.currentTarget.style.color = "var(--crimson)";
                e.currentTarget.style.background = "var(--crimson-soft)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--glass-border)";
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              dhruvp0629@gmail.com
            </a>
          </motion.div>
        </div>

        {/* Right: stat column */}
        <motion.aside
          className="stat-aside"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          aria-label="Quick facts"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            alignItems: "flex-end",
          }}
        >
          {[
            { num: "7+", label: "Years Designing" },
            { num: "4", label: "Featured Projects" },
            { num: "100+", label: "Creative Works" },
            { num: "∞", label: "Iterations Shipped" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "44px",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "var(--text-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginTop: "5px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.aside>
      </div>

      {/* ── Marquee strip ── */}
      <div
        className="marquee-wrap"
        aria-hidden="true"
        style={{
          borderTop: "1px solid var(--glass-border)",
          borderBottom: "1px solid var(--glass-border)",
          padding: "14px 0",
          overflow: "hidden",
        }}
      >
        <div className="marquee-track" style={{ gap: "32px" }}>
          {[...marqueeParts, ...marqueeParts].map((p, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: p === "·" ? "var(--crimson)" : "var(--text-subtle)",
                whiteSpace: "nowrap",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "72px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "44px",
            background:
              "linear-gradient(to bottom, var(--crimson), transparent)",
            animation: "float 2.2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
