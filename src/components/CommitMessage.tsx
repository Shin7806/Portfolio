import { useEffect, useMemo, useRef, useState } from 'react';

const letters: Record<string, string[]> = { L: ['1000','1000','1000','1000','1000','1000','1111'], E: ['1111','1000','1000','1110','1000','1000','1111'], T: ['11111','00100','00100','00100','00100','00100','00100'], S: ['0111','1000','1000','0110','0001','0001','1110'], B: ['1110','1001','1001','1110','1001','1001','1110'], U: ['1001','1001','1001','1001','1001','1001','0110'], I: ['111','010','010','010','010','010','111'], D: ['1110','1001','1001','1001','1001','1001','1110'], O: ['0110','1001','1001','1001','1001','1001','0110'], M: ['10001','11011','10101','10101','10001','10001','10001'], H: ['1001','1001','1001','1111','1001','1001','1001'], N: ['10001','11001','11001','10101','10011','10011','10001'], G: ['0111','1000','1000','1011','1001','1001','0111'], "'": ['1','1','0','0','0','0','0'], '.': ['0','0','0','0','0','1','1'], ' ': ['00','00','00','00','00','00','00'] };

/** Which cells form the message, for the one-line (desktop) or two-line (mobile) layout. */
function buildLayout(mobile: boolean) {
  const lines = mobile ? ["LET'S BUILD", 'SOMETHING.'] : ["LET'S BUILD SOMETHING."];
  const rows = lines.map(line => {
    const result = Array.from({ length: 7 }, () => [] as boolean[]);
    for (const ch of line) letters[ch].forEach((row, y) => result[y].push(...row.split('').map(c => c === '1'), false));
    return result.map(row => [false, ...row, false]);
  });
  const width = Math.max(...rows.map(r => r[0].length));
  const height = lines.length === 1 ? 9 : 19;
  const lit: boolean[] = [];
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const line = lines.length === 1 ? 0 : y < 9 ? 0 : 1;
    const row = rows[line]?.[y - (line === 0 ? 1 : 11)];
    const offset = Math.floor((width - (row?.length ?? width)) / 2);
    lit.push(row?.[x - offset] ?? false);
  }
  return { width, height, lit };
}

/** 06 / The next chapter: preserved LED panel. Same frames as before, but only changed cells are written. */
export default function CommitMessage() {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [mobile, setMobile] = useState(false);
  const layout = useMemo(() => buildLayout(mobile), [mobile]);

  useEffect(() => {
    const q = matchMedia('(max-width:600px)');
    const resize = () => setMobile(q.matches);
    resize(); q.addEventListener('change', resize);
    return () => q.removeEventListener('change', resize);
  }, []);

  useEffect(() => {
    const cells = svg.current ? [...svg.current.querySelectorAll('rect')] : [];
    if (!root.current || !cells.length) return;
    const salt = Math.random() * 10000;
    const random = (n: number) => { const v = Math.sin(n * 127.1 + salt) * 43758.5453; return v - Math.floor(v); };
    const classes = cells.map(() => '');
    const opacities = cells.map(() => '.23');
    cells.forEach((cell, index) => { cell.style.transitionDelay = `${random(index) * 120}ms`; });
    const paint = (tick: number, still = false) => {
      const phase = tick % 100, cycle = Math.floor(tick / 100);
      for (let index = 0; index < cells.length; index++) {
        const lit = layout.lit[index];
        const seed = random(index + cycle * 977), reveal = 4 + Math.floor(random(index * 3 + cycle * 311) * 11);
        const settled = phase >= reveal && phase < 99;
        const flash = !still && random(index * 7 + Math.floor(tick / 4) * 139) < (phase < 15 ? .17 : .012);
        const on = lit && settled || flash;
        const className = on ? `commit-on commit-tone-${Math.floor(random(index * 13 + cycle * 177) * 3)}` : '';
        const opacity = String(on ? (lit && settled ? .82 + seed * .18 : .35 + seed * .35) : .23);
        if (className !== classes[index]) { cells[index].setAttribute('class', className); classes[index] = className; }
        if (opacity !== opacities[index]) { cells[index].style.opacity = opacity; opacities[index] = opacity; }
      }
    };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let timer = 0, start = 0;
    if (reduced.matches) paint(16, true); // The still frame costs nothing, so show it straight away.
    const run = () => { if (document.hidden) return; paint(Math.floor((performance.now() - start) / 120)); timer = window.setTimeout(run, 120); };
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (!entry.isIntersecting) return;
      start = performance.now();
      if (reduced.matches) paint(16, true); else run();
    });
    observer.observe(root.current);
    const visibility = () => {
      clearTimeout(timer);
      if (document.hidden || !root.current || reduced.matches) return;
      const r = root.current.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) run();
    };
    document.addEventListener('visibilitychange', visibility);
    return () => { clearTimeout(timer); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, [layout]);

  const { width, height } = layout;
  return <div ref={root} className="commit-message">
    <h2 id="contact-heading" className="sr-only">Let's build something.</h2>
    <svg ref={svg} viewBox={`0 0 ${width * 10} ${height * 10}`} role="presentation" aria-hidden="true">
      {Array.from({ length: height * width }, (_, index) => <rect key={`${mobile}-${index}`} x={(index % width) * 10 + 1} y={Math.floor(index / width) * 10 + 1} width="7" height="7" rx="1.2" style={{ opacity: .23 }} />)}
    </svg>
  </div>;
}
