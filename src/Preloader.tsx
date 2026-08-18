import { useEffect, useRef, useState } from 'react'

// Keep it brief on purpose — this is a first-paint courtesy, not a gate.
// MIN keeps it from flashing on instant loads; MAX guarantees it never
// hangs around if the load event is slow to fire.
const MIN_VISIBLE_MS = 500
const MAX_WAIT_MS = 2200
const EXIT_DURATION_MS = 550

export default function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading')
  const mountedAt = useRef(Date.now())

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let finished = false
    let exitTimer: number | undefined

    const finish = () => {
      if (finished) return
      finished = true

      const elapsed = Date.now() - mountedAt.current
      const remaining = reduceMotion ? 0 : Math.max(0, MIN_VISIBLE_MS - elapsed)

      window.setTimeout(() => {
        setPhase('exiting')
        exitTimer = window.setTimeout(
          () => setPhase('done'),
          reduceMotion ? 0 : EXIT_DURATION_MS,
        )
      }, remaining)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish)
    }
    const maxTimer = window.setTimeout(finish, MAX_WAIT_MS)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(maxTimer)
      if (exitTimer) window.clearTimeout(exitTimer)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={`preloader${phase === 'exiting' ? ' preloader-exit' : ''}`}
      aria-hidden="true"
    >
      <div className="preloader-mark">
        <img
            src="/logo.svg"
            alt="Dhruv Poddar Logo"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
      </div>
      <div className="preloader-bar-track">
        <div className="preloader-bar-fill" />
      </div>
      <span className="sr-only" role="status">Loading</span>
    </div>
  )
}
