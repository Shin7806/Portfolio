import { Link } from "react-router";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import DesignPhilosophy from "./components/DesignPhilosophy";
import DesignProcess from "./components/DesignProcess";
import CreativeArchive from "./components/CreativeArchive";
import Toolbox from "./components/Toolbox";
import CareerTimeline from "./components/CareerTimeline";
import CurrentFocus from "./components/CurrentFocus";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Link is imported for potential future use but the resume CTA link
// is handled inside Nav.tsx and Hero.tsx directly.
// This export silences the unused import lint warning.
export { Link };

export default function PortfolioApp() {
  return (
    <div
      className="page-bg"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      {/* Film-grain noise overlay */}
      <div className="noise-layer" aria-hidden="true" />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Skip to content */}
      <a
        href="#main-content"
        style={{
          position: "fixed",
          top: "-100px",
          left: "16px",
          zIndex: 9999,
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          fontWeight: 600,
          background: "var(--crimson)",
          color: "#fdf0f3",
          padding: "12px 20px",
          borderRadius: "4px",
          textDecoration: "none",
          transition: "top 0.25s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.top = "16px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.top = "-100px";
        }}
      >
        Skip to main content
      </a>

      <Nav />

      <main id="main-content">
        <Hero />
        <SelectedWork />
        <DesignPhilosophy />
        <DesignProcess />
        <CreativeArchive />
        <Toolbox />
        <CareerTimeline />
        <CurrentFocus />
        <Contact />
      </main>

      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="hover-lift-sm btn-tactile"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          width: "42px",
          height: "42px",
          borderRadius: "4px",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          color: "var(--text-muted)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "all 0.25s",
          fontSize: "16px",
          zIndex: 50,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--crimson-border)";
          e.currentTarget.style.color = "var(--crimson)";
          e.currentTarget.style.background = "var(--crimson-soft)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--glass-border)";
          e.currentTarget.style.color = "var(--text-muted)";
          e.currentTarget.style.background = "var(--glass-bg)";
        }}
      >
        ↑
      </button>
    </div>
  );
}
