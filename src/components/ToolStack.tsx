import { useEffect, useRef, type CSSProperties } from 'react';
import { SectionTitle } from './Primitives';
import '../styles/toolkit.css';

const tools = [
  ['Figma', 'figma', '#A259FF'], ['Photoshop', 'photoshop', '#31A8FF'], ['Illustrator', 'illustrator', '#FF9A00'],
  ['HTML', 'html', '#E34F26'], ['CSS', 'css', '#1572B6'], ['JavaScript', 'javascript', '#F7DF1E'], ['React', 'react', '#61DAFB'], ['TypeScript', 'typescript', '#3178C6'], ['Tailwind', 'tailwind', '#38BDF8'], ['VS Code', 'vscode', '#23A9F2'], ['Git', 'git', '#F05032'], ['Notion', 'notion', '#888888'],
  ['ChatGPT', 'openai', '#8DAD9E'], ['Claude', 'claude-color', '#D97757'], ['Gemini', 'gemini-color', '#7186EE'],
  ['Antigravity', 'antigravity-color', '#7C9CF5'], ['Codex', 'codex', '#999999'],
] as const;
const mono = new Set(['notion', 'openai', 'codex']);

/** 03 / My stack: preserved section. Brand colours stay inline here, as each is the tool's own mark colour. */
export default function ToolStack() {
  const root = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const grid = root.current;
    if (!grid) return;
    let frame = 0, x = 0, y = 0;
    const query = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const paint = () => {
      frame = 0;
      grid.querySelectorAll<HTMLElement>('.tool-tile').forEach(tile => {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty('--edge-x', `${x - r.left}px`);
        tile.style.setProperty('--edge-y', `${y - r.top}px`);
      });
      grid.dataset.edgeActive = 'true';
    };
    const move = (e: PointerEvent) => { if (!query.matches) return; x = e.clientX; y = e.clientY; if (!frame) frame = requestAnimationFrame(paint); };
    const leave = () => { cancelAnimationFrame(frame); frame = 0; delete grid.dataset.edgeActive; };
    grid.addEventListener('pointermove', move, { passive: true });
    grid.addEventListener('pointerleave', leave);
    return () => { leave(); grid.removeEventListener('pointermove', move); grid.removeEventListener('pointerleave', leave); };
  }, []);
  return <section id="approach" className="toolkit-section section-space" aria-labelledby="approach-heading" tabIndex={-1}><div className="wrap">
    <SectionTitle id="approach-heading" title="My toolkit." />
    <ul className="tool-grid" ref={root}>{tools.map(([name, icon, color]) => <li key={name} className={`tool-tile${mono.has(icon) ? ' tool-mono' : ''}`} style={{ '--tool-color': color } as CSSProperties}><span className="tool-logo"><img src={`/icons/${icon}.svg`} width="30" height="30" alt="" loading="lazy" /></span><span className="tool-name">{name}</span></li>)}</ul>
  </div></section>;
}
