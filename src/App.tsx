import { Component, Suspense, lazy, useEffect, useRef, type ReactNode } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router';
import Portfolio from './Portfolio';
import { ThemeProvider } from './theme';
import { useMeta } from './components/Primitives';
const Resume = lazy(() => import('./resume/ResumeRoute'));
const WorkIndex = lazy(() => import('./pages/WorkIndex'));
const WorkStory = lazy(() => import('./pages/WorkStory'));
const ArchivePage = lazy(() => import('./pages/ArchivePage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));

/** On navigation: jump to the hash target, or to the top and move focus to the page heading. */
function PagePosition() {
  const { pathname, hash } = useLocation();
  const previous = useRef<string | null>(null);
  useEffect(() => {
    if (pathname.replace(/\/$/, '') === '/resume') document.title = 'Résumé — Dhruv Poddar';
    const first = previous.current === null;
    previous.current = pathname;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (hash) {
          let id = hash.slice(1); try { id = decodeURIComponent(id); } catch { /* Keep the literal hash. */ }
          const target = document.getElementById(id);
          target?.scrollIntoView({ behavior: 'instant' }); target?.focus({ preventScroll: true });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
          if (!first) { const title = document.querySelector('h1'); title?.setAttribute('tabindex', '-1'); title?.focus({ preventScroll: true }); }
        }
      });
    });
    return () => cancelAnimationFrame(frame);
    // Same-page hash changes keep native scrolling and history behaviour.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

function NotFound() {
  useMeta('Page not found', 'This page does not exist on Dhruv Poddar’s portfolio.');
  return <main className="route-message"><h1>This page isn’t here.</h1><Link to="/">Back to the portfolio</Link></main>;
}

class PageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <main className="route-message"><h1>The page couldn’t load.</h1><p>Please reload, or email Dhruv directly.</p><a href="/">Reload the portfolio</a><a href="mailto:dhruvp0629@gmail.com">dhruvp0629@gmail.com</a></main> : this.props.children;
  }
}

export default function App() {
  return <ThemeProvider><PageBoundary><Suspense fallback={<main className="route-message" role="status">Loading…</main>}><PagePosition /><Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/work" element={<WorkIndex />} />
    <Route path="/work/:slug" element={<WorkStory />} />
    <Route path="/archive" element={<ArchivePage />} />
    <Route path="/timeline" element={<TimelinePage />} />
    <Route path="/resume" element={<Resume />} />
    <Route path="*" element={<NotFound />} />
  </Routes></Suspense></PageBoundary></ThemeProvider>;
}
