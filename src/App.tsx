import type { ReactNode } from "react";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PortfolioApp from "./portfolio/PortfolioApp";
import ResumeApp from "./resume/ResumeApp";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";

// Subtle cross-fade + drift between routes. Wrapping here (instead of
// inside each page) keeps PortfolioApp/ResumeApp untouched — this is the
// only place that knows a route change happened.
function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.36,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Preloader />
      <CustomCursor />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <PortfolioApp />
              </PageTransition>
            }
          />
          <Route
            path="/resume"
            element={
              <PageTransition>
                <ResumeApp />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
