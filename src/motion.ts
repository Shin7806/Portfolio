import { useEffect, useRef } from 'react';

export function useEntrances() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.target.hasAttribute('data-reveal-complete')) continue;
        entry.target.classList.add('arrived');
        observer.unobserve(entry.target);
      }
    }, { threshold: .06 });
    const container = root.current;
    const finish = (node: Element) => {
      node.setAttribute('data-reveal-complete', '');
      node.classList.remove('arrived');
      observer.unobserve(node);
    };
    const finishAnimation = (event: AnimationEvent) => {
      if (event.target instanceof Element && event.target.matches('[data-reveal]')) finish(event.target);
    };
    const finishInteraction = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const node = event.target.closest('[data-reveal]');
      if (node && container.contains(node)) finish(node);
    };
    container.addEventListener('animationend', finishAnimation);
    container.addEventListener('focusin', finishInteraction);
    container.addEventListener('pointerdown', finishInteraction);
    container.querySelectorAll('[data-reveal]:not([data-reveal-complete])').forEach(node => observer.observe(node));
    const stop = () => { if (preference.matches) observer.disconnect(); };
    preference.addEventListener('change', stop);
    return () => { observer.disconnect(); preference.removeEventListener('change', stop); container.removeEventListener('animationend', finishAnimation); container.removeEventListener('focusin', finishInteraction); container.removeEventListener('pointerdown', finishInteraction); };
  }, []);
  return root;
}
