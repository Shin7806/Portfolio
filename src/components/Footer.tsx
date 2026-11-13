import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { A } from './Primitives';

export default function Footer() {
  return <footer className="site-footer">
    <div className="colophon wrap">
      <Link to="/" className="sign-off"><span className="brand-mark"><img src="/logo.svg" width="22" height="22" alt="" /></span><span>Dhruv Poddar<span className="colophon-year">© {new Date().getFullYear()}</span></span></Link>
      <Button variant="ghost" size="sm" nativeButton={false} render={<A href="#main" />} className="back-to-top">Back to top<ArrowUp className="transition-transform group-hover/button:-translate-y-0.5" /></Button>
    </div>
  </footer>;
}
