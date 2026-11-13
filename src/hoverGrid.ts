import { useEffect, type RefObject } from 'react';

export function useHoverGrid(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const surface = root.current;
    if (!surface) return;
    const allowed = matchMedia('(min-width: 801px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let active: HTMLElement | null = null;
    let frame = 0;
    let x = 0;
    let y = 0;
    const reset = () => { cancelAnimationFrame(frame); frame = 0; active?.removeAttribute('data-grid-active'); active = null; };
    const paint = () => {
      frame = 0;
      if (!active || !allowed.matches || document.hidden) return reset();
      const rect = active.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return reset();
      active.style.setProperty('--grid-x', `${x - rect.left}px`);
      active.style.setProperty('--grid-y', `${y - rect.top}px`);
      active.setAttribute('data-grid-active', 'true');
    };
    const move = (event: PointerEvent) => {
      if (!allowed.matches || event.pointerType === 'touch' || document.hidden) return;
      const next = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-grid]') : null;
      if (next !== active) { reset(); active = next; }
      if (!active) return;
      x = event.clientX; y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const scroll = () => { if (!active) return; const next = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-grid]') ?? null; if (next !== active) { reset(); active = next; } if (active && !frame) frame = requestAnimationFrame(paint); };
    surface.addEventListener('pointermove', move, { passive: true }); surface.addEventListener('pointerleave', reset);
    allowed.addEventListener('change', reset);  window.addEventListener('scroll', scroll, { passive: true });
    return () => { reset(); surface.removeEventListener('pointermove', move); surface.removeEventListener('pointerleave', reset); allowed.removeEventListener('change', reset);  window.removeEventListener('scroll', scroll); };
  }, [root]);
}

