import { useState, useEffect, createContext, useContext } from "react";

const C = {
  white: "#FFFFFF",
  bg: "#FAFAFA",
  sidebar: "#F5F5F5",
  text: "#181818",
  mid: "#444444",
  muted: "#666666",
  light: "#999999",
  divider: "#E5E5E5",
  accent: "#303030",
  rule: "#D0D0D0",
};

const FONT = "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif";

// ─── Responsive Context ───────────────────────────────────────────────────────
const RCtx = createContext(false);

// ─── Data ────────────────────────────────────────────────────────────────────

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

const designSkills = [
  "UI/UX Design",
  "Interface Design",
  "Wireframing & Prototyping",
  "Visual Design",
  "Brand Identity",
  "Typography",
  "Layout Systems",
  "Responsive Design",
];

const thinkingSkills = [
  "User-centered Design",
  "Visual Hierarchy",
  "Design Consistency",
  "Problem Solving",
  "Accessibility Awareness",
];

const techSkills = ["HTML", "CSS", "JavaScript Fundamentals", "Git / GitHub"];

const tools = [
  { name: "Figma", note: "Primary" },
  { name: "Adobe Photoshop", note: "" },
  { name: "Adobe Illustrator", note: "" },
  { name: "VS Code", note: "" },
  { name: "GitHub", note: "" },
];

const focus = [
  "Clean Interfaces",
  "Visual Systems",
  "Human-centered Experiences",
  "Responsive Layouts",
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
          fontSize: m ? 10 : 7.5,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase" as const,
          color: C.light,
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
        fontSize: m ? 10 : 7,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: C.light,
        marginBottom: m ? 14 : 12,
        paddingBottom: m ? 10 : 8,
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
    <div style={{ display: "flex", gap: 10, marginBottom: m ? 10 : 7 }}>
      <span
        style={{
          color: C.rule,
          fontSize: m ? 13 : 9,
          marginTop: 1.5,
          flexShrink: 0,
          lineHeight: 1.6,
        }}
      >
        —
      </span>
      <span style={{ fontSize: m ? 13 : 9.5, color: C.mid, lineHeight: 1.7 }}>
        {text}
      </span>
    </div>
  );
}

function SkillRow({ label }: { label: string }) {
  const m = useContext(RCtx);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: m ? 10 : 7,
      }}
    >
      <div
        style={{
          width: m ? 5 : 4,
          height: m ? 5 : 4,
          borderRadius: 1,
          background: C.rule,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: m ? 12 : 9, color: C.mid, lineHeight: 1.4 }}>
        {label}
      </span>
    </div>
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
          background: m ? C.white : "#DCDCDC",
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
            marginBottom: m ? 0 : 16,
            padding: m ? "12px 20px" : 0,
            borderBottom: m ? `1px solid ${C.divider}` : "none",
            background: m ? C.white : "transparent",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontSize: m ? 11 : 10,
              color: "#999",
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
            }}
          >
            Resume · Dhruv Poddar
          </span>
          <button
            onClick={() => window.print()}
            style={{
              fontFamily: FONT,
              fontSize: m ? 11 : 10,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: C.white,
              background: C.text,
              border: "none",
              borderRadius: 3,
              padding: m ? "8px 14px" : "8px 18px",
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
              : "0 2px 32px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* ════ HEADER ════ */}
          <div
            style={{
              padding: m ? "28px 20px 0" : "44px 52px 0",
              background: C.white,
            }}
          >
            {/* Name row */}
            <div
              style={{
                display: "flex",
                flexDirection: m ? "column" : "row",
                alignItems: m ? "flex-start" : "flex-end",
                justifyContent: "space-between",
                gap: m ? 10 : 0,
                marginBottom: 14,
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: m ? 34 : 42,
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    color: C.text,
                    lineHeight: 1.0,
                  }}
                >
                  Dhruv Poddar
                </h1>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: m ? 14 : 13,
                    fontWeight: 400,
                    color: C.muted,
                    letterSpacing: "0.02em",
                  }}
                >
                  UI/UX Designer&nbsp;&nbsp;·&nbsp;&nbsp;Graphic Designer
                </p>
              </div>

              {/* Availability badge */}
              <div
                style={{
                  fontSize: m ? 9 : 8,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
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
                paddingBottom: 20,
                borderTop: `1px solid ${C.divider}`,
              }}
            >
              <a
                href="mailto:dhruvp0629@gmail.com"
                style={{
                  fontSize: m ? 12 : 9,
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
                    fontSize: m ? 12 : 9,
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

          {/* ════ BODY: Two-column on desktop, single column on mobile ════ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 224px",
              flex: 1,
              borderTop: `1px solid ${C.divider}`,
            }}
          >
            {/* ── LEFT COLUMN ── */}
            <div
              style={{
                padding: m ? "28px 20px 36px" : "32px 40px 40px 52px",
                borderRight: m ? "none" : `1px solid ${C.divider}`,
                display: "flex",
                flexDirection: "column",
                gap: m ? 32 : 30,
              }}
            >
              {/* SUMMARY */}
              <section>
                <SectionTitle>Summary</SectionTitle>
                <p
                  style={{
                    fontSize: m ? 13.5 : 10.5,
                    color: C.mid,
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: m ? "none" : 390,
                  }}
                >
                  UI/UX and Graphic Designer practicing since 2019, building
                  clean digital interfaces, visual identities, and user-focused
                  experiences. Proficient in Figma and Adobe Creative Suite,
                  with a practical understanding of front-end fundamentals and
                  the craft of translating design intent into structured,
                  functional products.
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
                        fontSize: m ? 16 : 12,
                        fontWeight: 600,
                        color: C.text,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Freelance UI &amp; Graphic Designer
                    </span>
                    <span
                      style={{
                        fontSize: m ? 12 : 9,
                        color: C.muted,
                        letterSpacing: "0.04em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      2019 — Present
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: m ? 10 : 9,
                      color: C.light,
                      letterSpacing: "0.06em",
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
                    <Bullet text="Designed digital visuals including branding assets, posters, social media creatives, and interface concepts for a range of client briefs." />
                    <Bullet text="Created user interface layouts with deliberate attention to usability, spacing, visual hierarchy, and design-system consistency." />
                    <Bullet text="Translated client requirements into structured visual solutions through iterative design, feedback loops, and purposeful revision." />
                    <Bullet text="Developed practical understanding of bridging design with front-end implementation using HTML, CSS, and foundational JavaScript." />
                  </div>
                </div>
              </section>

              {/* PROJECTS */}
              <section>
                <SectionTitle>Selected Projects</SectionTitle>

                {/* Project 1 */}
                <div
                  style={{
                    marginBottom: 20,
                    paddingBottom: 20,
                    borderBottom: `1px solid ${C.divider}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontSize: m ? 9 : 7,
                          fontWeight: 600,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase" as const,
                          color: C.light,
                          marginBottom: 3,
                        }}
                      >
                        UI/UX Case Study
                      </span>

                      <span
                        style={{
                          fontSize: m ? 16 : 12,
                          fontWeight: 600,
                          color: C.text,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        SkillBridge — Skill Exchange Platform
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: m ? 12 : 9.5,
                      color: C.muted,
                      margin: "8px 0 12px",
                      lineHeight: 1.65,
                      letterSpacing: "0.01em",
                      maxWidth: 560,
                    }}
                  >
                    A peer-to-peer product concept focused on skill discovery,
                    meaningful connections, and structured knowledge exchange.
                  </p>

                  <Bullet text="Designed complete user journeys covering onboarding, profiles, discovery flows, and interactions." />

                  <Bullet text="Created scalable interface layouts using reusable patterns for consistent user experiences." />

                  <Bullet text="Focused on usability, visual hierarchy, and simplified interactions across key touchpoints." />
                </div>

                {/* Project 2 */}
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: m ? 9 : 7,
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase" as const,
                      color: C.light,
                      marginBottom: 3,
                    }}
                  >
                    UI/UX Redesign
                  </span>

                  <span
                    style={{
                      fontSize: m ? 16 : 12,
                      fontWeight: 600,
                      color: C.text,
                      letterSpacing: "-0.01em",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Library Management System
                  </span>

                  <p
                    style={{
                      fontSize: m ? 12 : 9.5,
                      color: C.muted,
                      margin: "8px 0 12px",
                      lineHeight: 1.65,
                      letterSpacing: "0.01em",
                      maxWidth: 560,
                    }}
                  >
                    A redesign concept improving library workflows, resource
                    accessibility, and everyday user interactions.
                  </p>

                  <Bullet text="Redesigned key flows including resource discovery, management actions, and navigation structures." />

                  <Bullet text="Improved information architecture through clearer grouping and task-focused interface patterns." />

                  <Bullet text="Built a cleaner visual system emphasizing readability, accessibility, and efficient interactions." />
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
                      fontSize: m ? 10 : 8,
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
                        padding: m ? "10px 0" : "7px 0",
                        borderBottom:
                          i < certs.length - 1
                            ? `1px solid ${C.divider}`
                            : "none",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: m ? 12.5 : 9.5,
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
                          fontSize: m ? 10 : 7.5,
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
                padding: m ? "28px 20px 40px" : "32px 24px 40px",
                display: "flex",
                flexDirection: "column",
                gap: m ? 28 : 26,
                borderTop: m ? `1px solid ${C.divider}` : "none",
              }}
            >
              {/* DESIGN SKILLS */}
              <section>
                <SidebarTitle>Design</SidebarTitle>
                {designSkills.map((s) => (
                  <SkillRow key={s} label={s} />
                ))}
              </section>

              {/* DESIGN THINKING */}
              <section>
                <SidebarTitle>Thinking</SidebarTitle>
                {thinkingSkills.map((s) => (
                  <SkillRow key={s} label={s} />
                ))}
              </section>

              {/* TECHNICAL */}
              <section>
                <SidebarTitle>Technical</SidebarTitle>
                {techSkills.map((s) => (
                  <SkillRow key={s} label={s} />
                ))}
              </section>

              {/* TOOLS */}
              <section>
                <SidebarTitle>Tools</SidebarTitle>
                {tools.map((t) => (
                  <div
                    key={t.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: m ? 10 : 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: m ? 12 : 9,
                        color: C.mid,
                        fontWeight: 500,
                      }}
                    >
                      {t.name}
                    </span>
                    {t.note && (
                      <span
                        style={{
                          fontSize: m ? 9 : 7,
                          color: C.light,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase" as const,
                        }}
                      >
                        {t.note}
                      </span>
                    )}
                  </div>
                ))}
              </section>

              {/* LANGUAGES */}
              <section>
                <SidebarTitle>Languages</SidebarTitle>
                {[
                  { lang: "Hindi", level: "Native" },
                  { lang: "English", level: "Professional" },
                ].map(({ lang, level }) => (
                  <div key={lang} style={{ marginBottom: m ? 14 : 10 }}>
                    <div
                      style={{
                        fontSize: m ? 13 : 9.5,
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
                        marginTop: 2,
                        letterSpacing: "0.03em",
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
                    fontSize: 9.5,
                    color: C.mid,
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ marginBottom: 12 }}>
                    <strong style={{ color: C.text }}>
                      Bachelor of Computer Applications (BCA)
                    </strong>
                    <br />
                    ASC Degree College
                    <br />
                    2023 — 2026
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <strong style={{ color: C.text }}>
                      Pre-University Course (PUC)
                    </strong>
                    <br />
                    Carmel PU College
                    <br />
                    2021 — 2023
                  </div>

                  <div>
                    <strong style={{ color: C.text }}>UI/UX Design</strong>
                    <br />
                    Self-taught through practical projects and structured
                    LinkedIn Learning certifications.
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* ════ FOOTER ════ */}
          <div
            style={{
              padding: m ? "12px 20px" : "12px 52px",
              borderTop: `1px solid ${C.divider}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: C.white,
            }}
          >
            <span
              style={{
                fontSize: m ? 10 : 7.5,
                color: C.light,
                letterSpacing: "0.04em",
              }}
            >
              dhruvp629@gmail.com
            </span>
            <div style={{ width: 24, height: 1, background: C.divider }} />
            <span
              style={{
                fontSize: m ? 10 : 7.5,
                color: C.light,
                letterSpacing: "0.04em",
              }}
            >
              UI/UX Designer · Graphic Designer
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
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
