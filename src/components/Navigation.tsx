import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../theme';
import { Arrow } from './Primitives';
import { Button } from '@/components/ui/button';

const items = [
  { to: '/', text: 'Index' },
  { to: '/work', text: 'Work' },
  { to: '/archive', text: 'Archive' },
  { to: '/timeline', text: 'Timeline' },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const { theme, toggle } = useTheme();
  const current = (to: string) => to === '/' ? pathname === '/' : pathname.startsWith(to);

  useEffect(() => {
    if (!expanded) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setExpanded(false); menu.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !header.current?.contains(event.target)) setExpanded(false); };
    const wide = window.matchMedia('(min-width: 801px)');
    const resize = () => { if (wide.matches) setExpanded(false); };
    document.addEventListener('keydown', escape); document.addEventListener('pointerdown', outside); wide.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); wide.removeEventListener('change', resize); };
  }, [expanded]);

  const close = () => setExpanded(false);
  const themeLabel = `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`;
  return <header ref={header} className="masthead" onBlur={event => { if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}>
    <nav className="wrap masthead-inner" aria-label="Main">
      <Link to="/" className="brand" aria-label="Dhruv Poddar, index" onClick={close}><span className="brand-mark"><img src="/logo.svg" width="22" height="22" alt="" /></span></Link>
      <div className="desktop-nav">{items.map(item => <Link key={item.to} to={item.to} aria-current={current(item.to) ? 'page' : undefined}>{item.text}</Link>)}</div>
      <div className="nav-utilities">
        <Button size="sm" nativeButton={false} render={<Link to="/resume" />}>Résumé<Arrow /></Button>
        <Button variant="ghost" size="icon-sm" aria-label={themeLabel} data-tip={theme === 'light' ? 'Dark mode' : 'Light mode'} data-tip-side="bottom" onClick={toggle}>
          <span className="theme-icon" aria-hidden="true"><Moon className="moon" strokeWidth={1.6} /><Sun className="sun" strokeWidth={1.6} /></span>
        </Button>
        <Button variant="ghost" size="icon-sm" className="menu-button hidden max-[800px]:inline-flex" ref={menu} aria-label={expanded ? 'Close menu' : 'Open menu'} aria-expanded={expanded} aria-controls="site-menu" onClick={() => setExpanded(value => !value)}>{expanded ? <X /> : <Menu />}</Button>
      </div>
      <div id="site-menu" className="mobile-nav" hidden={!expanded}>{items.map(item => <Link key={item.to} to={item.to} aria-current={current(item.to) ? 'page' : undefined} onClick={close}>{item.text}<Arrow /></Link>)}</div>
    </nav>
    <div className="reading-progress" aria-hidden="true" />
  </header>;
}
