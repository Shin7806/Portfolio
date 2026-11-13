import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion, type MotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

/**
 * Magic UI WordRotate, adapted: renders an inline span (not an h1), keeps the width of the
 * longest word so nothing reflows, stops under reduced motion, and hides the rotation from
 * screen readers in favour of one static label.
 */
export function WordRotate({
  words,
  duration = 1800,
  motionProps = {
    initial: { opacity: 0, y: '0.45em' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '-0.45em' },
    transition: { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => setIndex(previous => (previous + 1) % words.length), duration);
    return () => clearInterval(interval);
  }, [words, duration, reduced]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');
  return (
    <span className={cn('relative inline-grid overflow-hidden align-bottom', className)}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">{longest}</span>
      <AnimatePresence mode="wait" initial={false}>
        <m.span key={words[index]} aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap" {...motionProps}>
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
