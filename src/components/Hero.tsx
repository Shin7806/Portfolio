import type { Variants } from 'motion/react';
import { Link } from 'react-router';
import { TextAnimate } from '@/components/ui/text-animate';
import { WordRotate } from '@/components/ui/word-rotate';
import { Button } from '@/components/ui/button';
import { profile } from '../data/profile';
import { heroLine, roles } from '../data/site';
import { A, Arrow } from './Primitives';

// Each letter rises a third of an em and fades in; no blur, no bounce.
const letter: Variants = {
  hidden: { opacity: 0, y: '0.32em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

const jump = (id: string) => () => document.getElementById(id)?.focus({ preventScroll: true });

export default function Hero() {
  return <section id="start" className="hero scene-grid" data-grid aria-labelledby="identity-heading" tabIndex={-1}>
    <div className="wrap">
      <div className="hero-meta">
        <span className="hero-mark" aria-hidden="true"><img src="/logo.svg" width="26" height="26" alt="" /></span>
        <p className="hero-meta-text"><span className="availability">{profile.availability}</span><span>{profile.location}</span></p>
      </div>
      <h1 id="identity-heading" className="hero-name"><span className="sr-only">Dhruv Poddar</span><TextAnimate as="span" accessible={false} aria-hidden="true" by="character" variants={letter} duration={0.4} startOnView={false} once>Dhruv Poddar</TextAnimate></h1>
      <div className="hero-split">
        <p className="hero-role"><span>Bengaluru-based</span> <WordRotate words={roles} duration={1800} className="hero-role-word" /></p>
        <div>
          <p className="hero-lead">{heroLine}</p>
          <div className="hero-actions">
            <Button nativeButton={false} render={<Link to="/work" />}>View work<Arrow /></Button>
            <Button variant="outline" nativeButton={false} render={<A href="#contact" onClick={jump('contact')} />}>Contact me</Button>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
