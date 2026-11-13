import type { ReactNode } from 'react';
import { lazy, Suspense } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import Navigation from './Navigation';
import Footer from './Footer';
import { useEntrances } from '../motion';
import { useHoverGrid } from '../hoverGrid';
import '../styles/layout.css';
import '../styles/nav.css';
import '../styles/contact.css';

// Sonner loads after the page: nothing toasts until someone copies the email.
const Toaster = lazy(() => import('@/components/ui/sonner').then(module => ({ default: module.Toaster })));

/** Shared page shell: the two-level frame, skip link, navigation, main landmark and footer. */
export default function SiteFrame({ children, closing }: { children: ReactNode; closing: ReactNode }) {
  const root = useEntrances();
  useHoverGrid(root);
  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user">
    <div className="folio" ref={root}>
      <div className="frame" aria-hidden="true"><b /><b /><i /><i /></div>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main" tabIndex={-1}>{children}<div className="closing scene-grid" data-grid>{closing}</div></main>
      <Footer />
    </div>
    <Suspense fallback={null}><Toaster /></Suspense>
  </MotionConfig></LazyMotion>;
}
