import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import DesignSpecimen, { type SpecimenTokens } from './DesignSpecimen';
import { SectionTitle } from './Primitives';
import { Button } from '@/components/ui/button';

const order: (keyof SpecimenTokens)[] = ['canvas', 'surface', 'text', 'muted', 'line', 'accent', 'accentInk', 'onAccent', 'radius', 'space', 'typeSize', 'fontFamily'];
const kebab = (name: string) => `--ds-${name.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)}`;
const shown = (name: keyof SpecimenTokens, value: string) => name === 'fontFamily' ? value.split(',')[0] : value;

/** The design widget on a canvas, beside the CSS its controls write. Changed lines flash once. */
export default function Lab() {
  const [tokens, setTokens] = useState<SpecimenTokens | null>(null);
  const [changed, setChanged] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const previous = useRef<SpecimenTokens | null>(null);
  const json = useRef('');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const receive = useCallback((next: SpecimenTokens, exported: string) => {
    const before = previous.current;
    setChanged(new Set(before ? order.filter(name => before[name] !== next[name]) : []));
    previous.current = next;
    json.current = exported;
    setTokens(next);
  }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json.current);
      setCopied(true); void import('sonner').then(({ toast }) => toast.success('Tokens copied as JSON'));
      clearTimeout(timer.current); timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch { void import('sonner').then(({ toast }) => toast.error('Copying is unavailable in this browser.')); }
  };
  return <section id="lab" className="lab-section section-space" aria-labelledby="lab-heading" tabIndex={-1}>
    <div className="wrap">
      <SectionTitle id="lab-heading" title="Lab" note="A small component system you can edit. Change the card and watch the tokens it writes, the same way a design system hands values to code." />
      <div className="lab-canvas">
        <div className="lab-stage"><DesignSpecimen onTokens={receive} /></div>
        <figure className="lab-code">
          <figcaption><span className="lab-dots" aria-hidden="true"><i /><i /><i /></span>tokens.css<span className="lab-live">Live</span></figcaption>
          <pre aria-label="Design tokens the card currently uses"><code>
            <span className="tok-brace">:root {'{'}</span>
            {tokens && order.map(name => {
              const value = shown(name, tokens[name]);
              const colour = /^#[0-9a-f]{6}$/i.test(value);
              return <span key={`${name}-${value}`} className="tok" data-changed={changed.has(name) || undefined}>
                <span className="tok-key">{kebab(name)}</span>: {colour && <i className="tok-swatch" style={{ background: value }} aria-hidden="true" />}<span className="tok-value">{value}</span>;
              </span>;
            })}
            <span className="tok-brace">{'}'}</span>
          </code></pre>
          <div className="lab-foot">
            <p>Every control on the card writes one of these.</p>
            <Button variant="outline" size="sm" onClick={copy} aria-label={copied ? 'Tokens copied' : 'Copy variables as JSON'}>
              <span className="copy-icon" data-copied={copied || undefined} aria-hidden="true"><Copy className="copy" /><Check className="check" /></span>{copied ? 'Copied' : 'Copy variables'}
            </Button>
          </div>
        </figure>
      </div>
    </div>
  </section>;
}
