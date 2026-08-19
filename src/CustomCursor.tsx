import { useEffect, useRef } from "react";

const RING_EASE = 0.18;
const SCALE_EASE = 0.22;

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label, ' +
  ".hover-card, .hover-shadow, .icon-hover, .link-underline, [data-cursor-hover]";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (!canHover) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    let scale = 1;
    let targetScale = 1;

    let visible = false;
    let hovering = false;

    let rafId = 0;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) {
      document.documentElement.classList.remove("custom-cursor-active");
      return;
    }

    const setVisible = (next: boolean) => {
      if (visible === next) return;

      visible = next;

      dot.classList.toggle("is-visible", next);
      ring.classList.toggle("is-visible", next);
    };

    const setHovering = (next: boolean) => {
      if (hovering === next) return;

      hovering = next;
      targetScale = next ? 1.7 : 1;

      ring.classList.toggle("is-hovering", next);
    };

    const setPosition = (x: number, y: number) => {
      const transform = `translate3d(${x}px, ${y}px, 0)`;
      dot.style.transform = transform;

      return transform;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      setVisible(true);
      setPosition(mouseX, mouseY);

      const target = e.target;

      if (target instanceof Element) {
        setHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
      } else {
        setHovering(false);
      }
    };

    const onMouseDown = () => {
      targetScale = 0.7;
    };

    const onMouseUp = () => {
      targetScale = hovering ? 1.7 : 1;
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setVisible(false);
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * RING_EASE;
      ringY += (mouseY - ringY) * RING_EASE;
      scale += (targetScale - scale) * SCALE_EASE;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;

      rafId = requestAnimationFrame(tick);
    };

    const onVisibilityChange = () => {
      cancelAnimationFrame(rafId);

      if (!document.hidden) {
        rafId = requestAnimationFrame(tick);
      }
    };

    if (reduceMotion) {
      const onMoveReduced = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        setVisible(true);

        const transform = setPosition(mouseX, mouseY);
        ring.style.transform = transform;

        const target = e.target;

        if (target instanceof Element) {
          setHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
        } else {
          setHovering(false);
        }
      };

      window.addEventListener("mousemove", onMoveReduced, {
        passive: true,
      });

      window.addEventListener("mouseout", onMouseLeave);

      return () => {
        window.removeEventListener("mousemove", onMoveReduced);
        window.removeEventListener("mouseout", onMouseLeave);

        document.documentElement.classList.remove("custom-cursor-active");
      };
    }

    window.addEventListener("mousemove", onMouseMove, {
      passive: true,
    });

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseout", onMouseLeave);

    document.addEventListener("visibilitychange", onVisibilityChange);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseout", onMouseLeave);

      document.removeEventListener("visibilitychange", onVisibilityChange);

      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />

      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
