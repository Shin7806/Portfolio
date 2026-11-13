import CommitMessage from './CommitMessage';
import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { socials } from '../data/content';
import { profile } from '../data/profile';
import { Arrow, External } from './Primitives';
import { BrandIcon, type Brand } from './BrandIcon';
import { Button } from '@/components/ui/button';

const discord = { username: 'shinchan0269', href: 'https://discord.com/users/677179769774800947' };
const brandOf: Record<string, Brand> = { LinkedIn: 'linkedin', GitHub: 'github', Behance: 'behance', Instagram: 'instagram' };

/** Copy to clipboard with the icon swapping on the button and a Sonner toast as confirmation. */
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async (value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value); void import('sonner').then(({ toast }) => toast.success(message));
      clearTimeout(timer.current); timer.current = window.setTimeout(() => setCopied(null), 2000);
    } catch { void import('sonner').then(({ toast }) => toast.error('Couldn’t copy. Select the text instead.')); }
  };
  return { copied, copy };
}

function CopyIcon({ done }: { done: boolean }) {
  return <span className="copy-icon" data-copied={done || undefined} aria-hidden="true"><Copy className="copy" /><Check className="check" /></span>;
}

/** Email first, then Discord, then the other places to find me, as quiet logo links. */
export function Reach() {
  const { copied, copy } = useCopy();
  return <div className="reach">
    <p className="reach-label">Write to me</p>
    <div className="reach-email">
      <a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<Arrow /></a>
      <Button variant="outline" size="icon" className="rounded-full" aria-label={copied === profile.email ? 'Email copied' : 'Copy email address'} data-tip={copied === profile.email ? 'Copied' : 'Copy'} onClick={() => copy(profile.email, 'Email copied')}><CopyIcon done={copied === profile.email} /></Button>
    </div>
    <div className="reach-discord">
      <External href={discord.href} className="discord-link"><BrandIcon name="discord" size={18} /><span>Send a DM on Discord</span><Arrow /></External>
      <button type="button" className="discord-handle" aria-label={`Copy Discord username ${discord.username}`} onClick={() => copy(discord.username, 'Discord username copied')}>@{discord.username}<CopyIcon done={copied === discord.username} /></button>
    </div>
    <ul className="reach-icons" aria-label="Elsewhere">{socials.map(social => <li key={social.label}>
      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (opens in a new tab)`}><BrandIcon name={brandOf[social.label]} /></a>
    </li>)}</ul>
  </div>;
}

export default function Contact() {
  return <section className="wrap contact-section" id="contact" tabIndex={-1} aria-labelledby="contact-heading">
    <CommitMessage />
    <Reach />
  </section>;
}

/** Closing used on inner pages: no LED, which stays the home page's one standout moment. */
export function ContactShort() {
  return <section className="wrap contact-section closing-short" id="contact" tabIndex={-1} aria-labelledby="contact-short-heading">
    <h2 id="contact-short-heading">Let's build something.</h2>
    <Reach />
  </section>;
}
