import { useState, useEffect, createContext, useContext } from "react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  white: "#FFFFFF",
  bg: "#F7F7F5",
  sidebar: "#F2F2F0",
  text: "#141414",
  mid: "#3D3D3D",
  muted: "#5C5C5C",
  light: "#909090",
  divider: "#E2E2E0",
  accent: "#1A1A1A",
  rule: "#C8C8C4",
  tag: "#EAEAE8",
};

const FONT = "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif";

// ─── Responsive Context ───────────────────────────────────────────────────────
const RCtx = createContext(false);

// ─── Data ─────────────────────────────────────────────────────────────────────

const links = [
  { label: "Behance", href: "https://www.behance.net/shinchangfx/" },
  { label: "GitHub", href: "https://github.com/Shin7806/" },
  { label: "Instagram", href: "https://www.instagram.com/_shinchan_op/" },
];

const certs = [
  {
    name: "Designing Microinteractions Using Figma",
    url: "https://www.linkedin.com/learning/certificates/5bcbefd00ea0cd3c3ddebb5955372ab01f9f7cc08cf90304b92db6f1d6badb9c",
  },
  {
    name: "Figma for UX Design",
    url: "https://www.linkedin.com/learning/certificates/a70d35b0a22b57f8266003c7ac02163769adcc9d6fc4131b28a029402095f177",
  },
  {
    name: "AI Tools for UX Design",
    url: "https://www.linkedin.com/learning/certificates/77191783387d27c26b84108c94d42a0f5a1bea15aadb96d9b317f757aab64c75",
  },
  {
    name: "UX Foundations: Prototyping",
    url: "https://www.linkedin.com/learning/certificates/bb9e0dc8c889de7d7e070b6d0311f4a40c5af494d43d255d6f1042d8421ecb52",
  },
  {
    name: "Figma Design to CSS Implementation",
    url: "https://www.linkedin.com/learning/certificates/b5d71ac107ba0347656b499e77be4e3d11fc94ee4af051c0700ab0d2dbd7dc59",
  },
  {
    name: "Essential Skills in Adobe Photoshop 2025",
    url: "https://www.linkedin.com/learning/certificates/6d74bbb21b1d06c976db4a676d68970ce4b9454145ffd408b331dd69a92d1da8",
  },
];

const skillGroups = [
  {
    title: "Product Design",
    skills: [
      "Product Design",
      "UX Design",
      "UI Design",
      "User Research",
      "Information Architecture",
      "User Flows",
      "Wireframing",
      "Prototyping",
      "Design Systems",
    ],
  },
  {
    title: "Visual Design",
    skills: ["Graphic Design", "Branding", "Typography", "Visual Design"],
  },
  {
    title: "Technical",
    skills: ["HTML", "CSS", "JavaScript", "Git / GitHub"],
  },
  {
    title: "Tools",
    skills: ["Figma", "Photoshop", "Illustrator", "VS Code"],
  },
  {
    title: "AI Workflow",
    skills: [
      "AI-assisted Research",
      "AI-assisted Ideation",
      "AI-assisted UX Writing",
      "AI-assisted Design Critique",
    ],
  },
];

const projects = [
  {
    type: "FEATURED WORK · PRODUCT DESIGN",
    name: "NeuroTwin",
    subtitle: "AI Personal Intelligence Platform",
    description:
      "AI-powered productivity companion focused on behavioural awareness, consistency, and contextual insights.",
    bullet:
      "Designed the product strategy, UX, UI, and scalable design system from concept to high-fidelity prototype.",
    ctas: [
      {
        label: "View Behance Case Study",
        href: "https://www.behance.net/gallery/251900711/NeuroTwin-Product-Design-Case-Study",
      },
    ],
    hero: true,
  },
  {
    type: "PRODUCT DESIGN · DEVELOPMENT",
    name: "SkillBridge",
    subtitle: "Peer-to-Peer Skill Exchange Platform",
    description:
      "A platform where users exchange skills directly — removing friction from finding, offering, and scheduling sessions.",
    bullet:
      "Designed and developed a full-stack learning platform, bridging product thinking with real-world implementation.",
    ctas: [
      {
        label: "View Full-Stack Website",
        href: "https://skill-bridge-shin7806s-projects.vercel.app/",
      },
    ],
    hero: false,
  },
  {
    type: "Graphic Design · Behance",
    name: "Visual Identity Collection",
    subtitle: "Brand Identity · LogoFolio 2025",
    description:
      "A curated set of identity systems demonstrating mark-making, type pairing, and visual communication.",
    bullet:
      "Curated a collection of identity systems demonstrating branding, typography, and visual communication.",
    ctas: [
      {
        label: "View Behance Project",
        href: "https://www.behance.net/gallery/240883105/LogoFolio-2025-Collection-I",
      },
      {
        label: "View on Instagram",
        href: "https://www.instagram.com/_shinchan_op/",
      },
    ],
    hero: false,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  const m = useContext(RCtx);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: m ? 20 : 16,
      }}
    >
      <span
        style={{
          fontSize: m ? 9 : 7,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: C.light,
          whiteSpace: "nowrap" as const,
        }}
      >
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: C.divider }} />
    </div>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  const m = useContext(RCtx);
  return (
    <div
      style={{
        fontSize: m ? 9 : 7,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: C.light,
        marginBottom: m ? 12 : 10,
        paddingBottom: m ? 8 : 7,
        borderBottom: `1px solid ${C.divider}`,
      }}
    >
      {children}
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  const m = useContext(RCtx);
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: m ? 9 : 6 }}>
      <span
        style={{
          color: C.rule,
          fontSize: m ? 12 : 9,
          marginTop: 1,
          flexShrink: 0,
          lineHeight: 1.7,
        }}
      >
        —
      </span>
      <span
        style={{ fontSize: m ? 12.5 : 9.5, color: C.mid, lineHeight: 1.75 }}
      >
        {text}
      </span>
    </div>
  );
}

function SkillPill({ label }: { label: string }) {
  const m = useContext(RCtx);
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: m ? 10.5 : 8,
        color: C.mid,
        background: C.tag,
        borderRadius: 2,
        padding: m ? "3px 8px" : "2px 6px",
        marginBottom: m ? 5 : 4,
        marginRight: m ? 4 : 3,
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      }}
    >
      {label}
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const m = windowWidth < 860;

  return (
    <RCtx.Provider value={m}>
      <div
        style={{
          minHeight: "100vh",
          background: m ? C.white : "#D8D8D6",
          fontFamily: FONT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: m ? 0 : 28,
          paddingBottom: m ? 0 : 56,
        }}
      >
        {/* ── Toolbar ── */}
        <div
          className="no-print"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: m ? "100%" : 794,
            marginBottom: m ? 0 : 14,
            padding: m ? "12px 20px" : 0,
            borderBottom: m ? `1px solid ${C.divider}` : "none",
            background: m ? C.white : "transparent",
            boxSizing: "border-box" as const,
          }}
        >
          <span
            style={{
              fontSize: m ? 10 : 9,
              color: "#999",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
            }}
          >
            Resume · Dhruv Poddar
          </span>
          <button
            onClick={() => window.print()}
            style={{
              fontFamily: FONT,
              fontSize: m ? 10 : 9,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              color: C.white,
              background: C.text,
              border: "none",
              borderRadius: 3,
              padding: m ? "7px 14px" : "7px 16px",
              cursor: "pointer",
            }}
          >
            Export PDF ↗
          </button>
        </div>

        {/* ── Resume Sheet ── */}
        <div
          id="resume"
          style={{
            width: m ? "100%" : 794,
            minHeight: m ? "auto" : 1123,
            background: C.white,
            boxShadow: m
              ? "none"
              : "0 2px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box" as const,
            overflow: "hidden",
          }}
        >
          {/* ════ HEADER ════ */}
          <div
            style={{
              padding: m ? "32px 20px 0" : "40px 52px 0",
              background: C.white,
            }}
          >
            {/* Name + Badge */}
            <div
              style={{
                display: "flex",
                flexDirection: m ? "column" : "row",
                alignItems: m ? "flex-start" : "flex-end",
                justifyContent: "space-between",
                gap: m ? 12 : 0,
                marginBottom: 16,
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: m ? 36 : 40,
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    color: C.text,
                    lineHeight: 1.0,
                  }}
                >
                  Dhruv Poddar
                </h1>
                <p
                  style={{
                    margin: "9px 0 0",
                    fontSize: m ? 13 : 11.5,
                    fontWeight: 400,
                    color: C.muted,
                    letterSpacing: "0.02em",
                  }}
                >
                  Product Designer&nbsp;&nbsp;·&nbsp;&nbsp;UI/UX
                  Designer&nbsp;&nbsp;·&nbsp;&nbsp;Graphic Designer
                </p>
              </div>
              <div
                style={{
                  fontSize: m ? 9 : 7.5,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: C.muted,
                  border: `1px solid ${C.divider}`,
                  borderRadius: 2,
                  padding: "5px 10px",
                  alignSelf: "flex-start",
                }}
              >
                Open to Work
              </div>
            </div>

            {/* Contact bar */}
            <div
              style={{
                display: "flex",
                flexWrap: m ? ("wrap" as const) : ("nowrap" as const),
                alignItems: "center",
                rowGap: m ? 6 : 0,
                columnGap: m ? 14 : 0,
                paddingTop: 14,
                paddingBottom: 18,
                borderTop: `1px solid ${C.divider}`,
              }}
            >
              <a
                href="mailto:dhruvp0629@gmail.com"
                style={{
                  fontSize: m ? 11.5 : 8.5,
                  color: C.muted,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  paddingRight: m ? 0 : 16,
                  borderRight: m ? "none" : `1px solid ${C.divider}`,
                }}
              >
                dhruvp0629@gmail.com
              </a>
              {links.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: m ? 11.5 : 8.5,
                    color: C.text,
                    textDecoration: "none",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    paddingLeft: m ? 0 : 16,
                    paddingRight: m ? 0 : i < links.length - 1 ? 16 : 0,
                    borderRight: m
                      ? "none"
                      : i < links.length - 1
                        ? `1px solid ${C.divider}`
                        : "none",
                  }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* ════ BODY ════ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 212px",
              flex: 1,
              borderTop: `1px solid ${C.divider}`,
            }}
          >
            {/* ── LEFT COLUMN ── */}
            <div
              style={{
                padding: m ? "28px 20px 36px" : "30px 38px 40px 52px",
                borderRight: m ? "none" : `1px solid ${C.divider}`,
                display: "flex",
                flexDirection: "column",
                gap: m ? 30 : 26,
              }}
            >
              {/* SUMMARY */}
              <section>
                <SectionTitle>Summary</SectionTitle>
                <p
                  style={{
                    fontSize: m ? 13 : 10,
                    color: C.mid,
                    lineHeight: 1.85,
                    margin: 0,
                  }}
                >
                  Product Designer with a strong foundation in UI/UX and Graphic
                  Design, focused on transforming complex ideas into intuitive
                  digital products. I combine product thinking, visual design,
                  scalable systems, and front-end awareness to create
                  experiences that are useful, thoughtful, and
                  implementation-ready.
                </p>
              </section>

              {/* EXPERIENCE */}
              <section>
                <SectionTitle>Experience</SectionTitle>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      flexWrap: m ? ("wrap" as const) : ("nowrap" as const),
                      gap: m ? 4 : 0,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: m ? 15 : 11.5,
                        fontWeight: 600,
                        color: C.text,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Freelance Product & UI Designer
                    </span>
                    <span
                      style={{
                        fontSize: m ? 11 : 8.5,
                        color: C.muted,
                        letterSpacing: "0.04em",
                        fontVariantNumeric: "tabular-nums",
                        flexShrink: 0,
                      }}
                    >
                      2019 — Present
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: m ? 9.5 : 8,
                      color: C.light,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      margin: "0 0 12px",
                      fontWeight: 500,
                    }}
                  >
                    Independent Practice
                  </p>
                  <div
                    style={{
                      borderLeft: `2px solid ${C.text}`,
                      paddingLeft: 14,
                    }}
                  >
                    <Bullet text="Identified user problems and business goals across client briefs, then translated them into structured visual and interaction solutions." />
                    <Bullet text="Designed end-to-end experiences — from initial concept and user flows through to high-fidelity interfaces — maintaining consistency across components." />
                    <Bullet text="Iterated through feedback loops with clients, balancing aesthetic decisions against practical constraints and implementation realities." />
                    <Bullet text="Built and shipped projects with direct awareness of HTML and CSS, reducing the gap between design intent and front-end output." />
                  </div>
                </div>
              </section>

              {/* PROJECTS */}
              <section>
                <SectionTitle>Selected Projects</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {projects.map((p, i) => (
                    <div
                      key={p.name}
                      style={{
                        paddingTop: i === 0 ? 0 : m ? 14 : 12,
                        paddingBottom: m ? 14 : 12,
                        borderBottom:
                          i < projects.length - 1
                            ? `1px solid ${C.divider}`
                            : "none",
                      }}
                    >
                      {/* Category eyebrow */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: m ? "4px 8px" : "3px 7px",
                          background: C.tag,
                          borderRadius: 0,
                          fontSize: m ? 7.5 : 6.5,
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: C.mid,
                          marginBottom: 10,
                        }}
                      >
                        {p.type}
                      </div>

                      {/* Name */}
                      <span
                        style={{
                          display: "block",
                          fontSize: m ? 14 : p.hero ? 13 : 11,
                          fontWeight: p.hero ? 700 : 600,
                          color: C.text,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.1,
                          marginBottom: 2,
                        }}
                      >
                        {p.name}
                      </span>

                      {/* Subtitle */}
                      <span
                        style={{
                          display: "block",
                          fontSize: m ? 10 : 8.5,
                          color: C.light,
                          letterSpacing: "0.01em",
                          fontWeight: 400,
                          marginBottom: 7,
                        }}
                      >
                        {p.subtitle}
                      </span>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: m ? 11 : 9,
                          color: C.muted,
                          margin: "0 0 7px",
                          lineHeight: 1.7,
                          letterSpacing: "0.005em",
                        }}
                      >
                        {p.description}
                      </p>

                      {/* Single bullet */}
                      <div style={{ display: "flex", gap: 8, marginBottom: 9 }}>
                        <span
                          style={{
                            color: C.rule,
                            fontSize: m ? 10 : 8.5,
                            flexShrink: 0,
                            marginTop: 1,
                            lineHeight: 1.7,
                          }}
                        >
                          —
                        </span>
                        <span
                          style={{
                            fontSize: m ? 11 : 9,
                            color: C.mid,
                            lineHeight: 1.7,
                          }}
                        >
                          {p.bullet}
                        </span>
                      </div>

                      {/* CTAs */}
                      <div
                        style={{
                          display: "flex",
                          gap: m ? 14 : 12,
                          flexWrap: "wrap" as const,
                        }}
                      >
                        {p.ctas.map((cta) => (
                          <a
                            key={cta.label}
                            href={cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: m ? 10 : 8,
                              fontWeight: 500,
                              color: C.muted,
                              textDecoration: "none",
                              letterSpacing: "0.02em",
                              transition: "color 0.15s",
                              borderBottom: `1px solid ${C.divider}`,
                              paddingBottom: 1,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = C.text)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = C.muted)
                            }
                          >
                            {cta.label}
                            <span
                              className="cta-arrow"
                              style={{
                                display: "inline-block",
                                transition: "transform 0.15s",
                                fontSize: m ? 10 : 8,
                              }}
                            >
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CERTIFICATIONS */}
              <section>
                <SectionTitle>Certifications</SectionTitle>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: m ? 9 : 7.5,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: C.light,
                    }}
                  >
                    LinkedIn Learning
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: C.divider,
                      maxWidth: 60,
                    }}
                  />
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 0 }}
                >
                  {certs.map((cert, i) => (
                    <div
                      key={cert.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: m ? "9px 0" : "6px 0",
                        borderBottom:
                          i < certs.length - 1
                            ? `1px solid ${C.divider}`
                            : "none",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: m ? 12 : 9,
                          color: C.mid,
                          lineHeight: 1.4,
                        }}
                      >
                        {cert.name}
                      </span>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: m ? 9.5 : 7.5,
                          color: C.light,
                          textDecoration: "none",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
                          flexShrink: 0,
                          fontWeight: 500,
                        }}
                      >
                        View ↗
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ── RIGHT COLUMN (Sidebar) ── */}
            <div
              style={{
                background: C.sidebar,
                padding: m ? "28px 20px 40px" : "30px 22px 40px",
                display: "flex",
                flexDirection: "column",
                gap: m ? 26 : 22,
                borderTop: m ? `1px solid ${C.divider}` : "none",
              }}
            >
              {/* SKILLS */}
              {skillGroups.map((group) => (
                <section key={group.title}>
                  <SidebarTitle>{group.title}</SidebarTitle>
                  <div style={{ display: "flex", flexWrap: "wrap" as const }}>
                    {group.skills.map((s) => (
                      <SkillPill key={s} label={s} />
                    ))}
                  </div>
                </section>
              ))}

              {/* LANGUAGES */}
              <section>
                <SidebarTitle>Languages</SidebarTitle>
                {[
                  { lang: "Hindi", level: "Native" },
                  { lang: "English", level: "Professional" },
                  { lang: "Kannada", level: "Working Proficiency" },
                ].map(({ lang, level }) => (
                  <div key={lang} style={{ marginBottom: m ? 12 : 9 }}>
                    <div
                      style={{
                        fontSize: m ? 12.5 : 9.5,
                        fontWeight: 600,
                        color: C.text,
                      }}
                    >
                      {lang}
                    </div>
                    <div
                      style={{
                        fontSize: m ? 10 : 8,
                        color: C.light,
                        marginTop: 1,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {level}
                    </div>
                  </div>
                ))}
              </section>

              {/* EDUCATION */}
              <section style={{ marginTop: m ? 0 : "auto" }}>
                <SidebarTitle>Education</SidebarTitle>
                <div
                  style={{
                    fontSize: m ? 11 : 8.5,
                    color: C.mid,
                    lineHeight: 1.75,
                  }}
                >
                  <div style={{ marginBottom: 12 }}>
                    <strong style={{ color: C.text, fontSize: m ? 12 : 9 }}>
                      Bachelor of Computer Applications
                    </strong>
                    <br />
                    ASC Degree College
                    <br />
                    2023 — 2026
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <strong style={{ color: C.text, fontSize: m ? 12 : 9 }}>
                      Pre-University Course (PUC)
                    </strong>
                    <br />
                    Carmel PU College
                    <br />
                    2021 — 2023
                  </div>

                  <div>
                    <strong style={{ color: C.text, fontSize: m ? 12 : 9 }}>
                      Product, UI/UX & Graphic Design
                    </strong>
                    <br />
                    Built through hands-on product development, real-world
                    design projects, continuous self-learning, and LinkedIn
                    Learning certifications since 2019.
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* ════ FOOTER ════ */}
          <div
            style={{
              padding: m ? "12px 20px" : "10px 52px",
              borderTop: `1px solid ${C.divider}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: C.white,
            }}
          >
            <span
              style={{
                fontSize: m ? 9.5 : 7.5,
                color: C.light,
                letterSpacing: "0.04em",
              }}
            >
              dhruvp0629@gmail.com
            </span>
            <div style={{ width: 20, height: 1, background: C.divider }} />
            <span
              style={{
                fontSize: m ? 9.5 : 7.5,
                color: C.light,
                letterSpacing: "0.04em",
              }}
            >
              Product Designer · UI/UX Designer · Graphic Designer
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { -webkit-font-smoothing: antialiased; }
        a:hover .cta-arrow { transform: translateX(3px); }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; }
          #resume {
            width: 210mm !important;
            min-height: 297mm !important;
            box-shadow: none !important;
            margin: 0 !important;
          }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </RCtx.Provider>
  );
}
