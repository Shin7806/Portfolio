import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router';
type Theme = 'light' | 'dark';
const valid = (value: unknown): value is Theme => value === 'light' || value === 'dark';
const Context = createContext({ theme: 'light' as Theme, toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [saved, setSaved] = useState<Theme | null>(() => {
    try { const value = localStorage.getItem('dhruv-folio-theme'); return valid(value) ? value : null; } catch { return null; }
  });
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const theme = saved ?? (dark ? 'dark' : 'light');
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const system = () => setDark(query.matches);
    const storage = (event: StorageEvent) => {
      if (event.key === 'dhruv-folio-theme' || event.key === null) setSaved(valid(event.newValue) ? event.newValue : null);
    };
    query.addEventListener('change', system); window.addEventListener('storage', storage);
    return () => { query.removeEventListener('change', system); window.removeEventListener('storage', storage); };
  }, []);
  useLayoutEffect(() => {
    const resume = pathname.replace(/\/$/, '') === '/resume';
    const root = document.documentElement;
    root.dataset.theme = theme; root.dataset.route = resume ? 'resume' : 'folio';
    root.style.colorScheme = resume ? 'light' : theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resume ? '#F3F1EC' : theme === 'dark' ? '#141417' : '#F5F2ED');
  }, [theme, pathname]);
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setSaved(next);
    try { localStorage.setItem('dhruv-folio-theme', next); } catch { /* In-memory preference remains usable. */ }
  };
  return <Context.Provider value={{ theme, toggle }}>{children}</Context.Provider>;
}
export const useTheme = () => useContext(Context);
