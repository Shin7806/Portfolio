import { useEffect, useRef } from 'react'

/**
 * Thin crimson line at the very top that tracks scroll position.
 * Deliberately avoids React state: a single passive scroll listener,
 * throttled to one rAF, writes directly to the DOM (transform: scaleX).
 * Cheapest possible way to do this — safe for low-end/mobile devices.
 */
export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`
      }
      ticking.current = false
    }

    const onScrollOrResize = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={fillRef} className="scroll-progress-bar" />
    </div>
  )
}
