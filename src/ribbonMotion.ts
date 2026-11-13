import { useEffect, useRef } from 'react';

/** CSS owns the three moving layers; JS only gates visibility and preferences. */
export function attachRibbonPlayback(element: HTMLElement, enabled: boolean) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  const update = () => element.setAttribute('data-ribbon-running',String(enabled && visible && !document.hidden && !reduced.matches));
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();}) : null;
  observer?.observe(element); update();
  document.addEventListener('visibilitychange',update); reduced.addEventListener('change',update);
  return ()=>{observer?.disconnect();document.removeEventListener('visibilitychange',update);reduced.removeEventListener('change',update);element.removeAttribute('data-ribbon-running');};
}
export function useRibbonPlayback(enabled: boolean) {
  const root = useRef<HTMLElement>(null);
  useEffect(()=>root.current ? attachRibbonPlayback(root.current,enabled) : undefined,[enabled]);
  return root;
}
