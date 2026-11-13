import ColorPicker from './ColorPicker';
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { projects } from '../data/content';
import { getSpecimenAccentColor, getSpecimenTokens, initialSpecimenSettings, serializeSpecimenTokens, singleLine, type SpecimenAccent, type SpecimenSettings, type SpecimenTheme } from '../data/specimen';
import { useTheme } from '../theme';
import '../styles/lab.css';

const tabs = ['Components', 'Type', 'Tokens'] as const;
const accents: SpecimenAccent[] = ['crimson', 'ink', 'blue', 'green'];
const project = projects[0];
const initialCopy = { title: project.title, description: project.description, action: 'View case study' };

function Icon({ name }: { name: 'reset' | 'pencil' | 'arrow' }) {
  const paths = { reset: 'M3 8a7 7 0 1 1 .6 6M3 3v5h5', pencil: 'm4 13 9-9 3 3-9 9-4 1 1-4Zm7-7 3 3', arrow: 'M4 16 16 4M4 4h12v12' };
  return <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path d={paths[name]} /></svg>;
}

/**
 * Inline editable text. The text stays in its own element with its own wrapping, so clicking places the
 * caret exactly where you clicked and nothing reflows. Plain text only, one paragraph, capped at `limit`.
 */
function Editable({ value, label, onChange, className = '', limit = 120 }: { value: string; label: string; onChange: (value: string) => void; className?: string; limit?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Seed the text once; after that the DOM owns it, so React never rewrites nodes under the caret.
  const [initial] = useState(() => ({ __html: value.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!) }));
  // Sync from outside (reset) without fighting the caret while typing.
  useEffect(() => { const node = ref.current; if (node && node.textContent !== value) node.textContent = value; }, [value]);
  const commit = (node: HTMLSpanElement) => {
    const text = singleLine(node.textContent ?? '', limit);
    if (text !== node.textContent) { node.textContent = text; const range = document.createRange(); range.selectNodeContents(node); range.collapse(false); const selection = getSelection(); selection?.removeAllRanges(); selection?.addRange(range); }
    onChange(text);
  };
  return <span ref={ref} className={`ds-edit ${className}`} role="textbox" aria-label={label} tabIndex={0} contentEditable="plaintext-only" suppressContentEditableWarning spellCheck={false}
    onInput={event => commit(event.currentTarget)}
    onKeyDown={event => { if (event.key === 'Enter' || event.key === 'Escape') { event.preventDefault(); event.currentTarget.blur(); } }}
    onPaste={event => { event.preventDefault(); document.execCommand('insertText', false, singleLine(event.clipboardData.getData('text/plain'), limit)); }}
    dangerouslySetInnerHTML={initial} />;
}

/** An editable component card driven entirely by design tokens. */
export type SpecimenTokens = ReturnType<typeof getSpecimenTokens>;

export default function DesignSpecimen({ onTokens }: { onTokens?: (tokens: SpecimenTokens, json: string) => void }) {
  const { theme } = useTheme();
  const id = useId();
  const [active, setActive] = useState(0);
  const [settings, setSettings] = useState<SpecimenSettings>({ ...initialSpecimenSettings });
  const [copy, setCopy] = useState(initialCopy);
  const [canvas, setCanvas] = useState<SpecimenTheme | null>(null);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState('');
  const [picker, setPicker] = useState(false);

  const colorButton = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const localTheme = canvas ?? theme;
  const tokens = getSpecimenTokens(settings, localTheme);
  const style = Object.fromEntries(Object.entries(tokens).map(([name, value]) => [`--ds-${name}`, value])) as CSSProperties;

  // Report the live tokens (and their JSON export) so the Lab can show and copy them.
  const serialized = JSON.stringify(tokens);
  const json = serializeSpecimenTokens(settings, localTheme);
  useEffect(() => { onTokens?.(JSON.parse(serialized), json); }, [serialized, json, onTokens]);
  useEffect(() => {
    if (!picker) return;
    const outside = (event: PointerEvent) => { if (!pickerRef.current?.contains(event.target as Node) && !colorButton.current?.contains(event.target as Node)) setPicker(false); };
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape' || !pickerRef.current?.contains(document.activeElement)) return;
      event.preventDefault(); event.stopPropagation(); setPicker(false); colorButton.current?.focus();
    };
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape, true);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape, true); };
  }, [picker]);

  const update = <K extends keyof SpecimenSettings>(key: K, value: SpecimenSettings[K]) => setSettings(previous => ({ ...previous, [key]: value }));
  const edit = (key: keyof typeof initialCopy) => (value: string) => setCopy(previous => ({ ...previous, [key]: value }));
  const announce = (message: string) => setStatus(message);
  const reset = () => { setSettings({ ...initialSpecimenSettings }); setCopy(initialCopy); setCanvas(null); setSaved(false); setPicker(false); announce('Study reset to its defaults.'); };
  const moveTab = (event: KeyboardEvent<HTMLButtonElement>) => {
    let next = active;
    if (event.key === 'ArrowRight') next = (active + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (active + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault(); setActive(next); setPicker(false); tabRefs.current[next]?.focus();
  };

  const specimen = <section className="design-specimen" style={style} data-canvas={localTheme} aria-label="Interface study">
    <div className="ds-header">
      <span className="ds-title"><i aria-hidden="true" />Interface study</span>
      <div className="ds-utilities">
        <button className="ds-canvas-toggle" onClick={() => { const next = localTheme === 'light' ? 'dark' : 'light'; setCanvas(next); announce(next === 'light' ? 'Light canvas.' : 'Dark canvas.'); }} aria-label={`Switch study to ${localTheme === 'light' ? 'dark' : 'light'} canvas`} title="Canvas"><span className="ds-canvas-icon" aria-hidden="true" /></button>
        <button className="ds-icon-button" onClick={reset} aria-label="Reset study" title="Reset"><Icon name="reset" /></button>
      </div>
    </div>
    <div className="ds-preview">
      <article className="ds-project-card" data-density={settings.density}>
        <div className="ds-card-top"><span className="ds-overline">Project</span><button className="ds-bookmark ds-icon-button" aria-label={saved ? 'Remove NeuroTwin bookmark' : 'Bookmark NeuroTwin'} aria-pressed={saved} onClick={() => { setSaved(value => !value); announce(saved ? 'Bookmark removed.' : 'Bookmarked.'); }}><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M5 3h10v14l-5-3-5 3V3Z" /></svg></button></div>
        <Editable className="ds-edit-title" value={copy.title} label="Edit project title" onChange={edit('title')} limit={48} />
        <Editable className="ds-edit-description" value={copy.description} label="Edit project description" onChange={edit('description')} limit={180} />
        <div className="ds-demo-action" data-outlined={settings.outlined || undefined}><Editable value={copy.action} label="Edit action label" onChange={edit('action')} limit={32} /><a href={project.href} target="_blank" rel="noopener noreferrer" aria-label="Open the NeuroTwin case study in a new tab"><Icon name="arrow" /></a></div>
      </article>
      <span className="ds-preview-note"><Icon name="pencil" />Click any text to edit it</span>
    </div>
    <div className="ds-tabs" role="tablist" aria-label="Study panels">{tabs.map((tab, index) => <button key={tab} ref={node => { tabRefs.current[index] = node; }} role="tab" id={`ds-tab-${index}-${id}`} aria-controls={`ds-panel-${index}-${id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onKeyDown={moveTab} onClick={() => { setActive(index); setPicker(false); }}>{tab}</button>)}</div>
    <div className="ds-panels">
      <div role="tabpanel" id={`ds-panel-0-${id}`} aria-labelledby={`ds-tab-0-${id}`} hidden={active !== 0} className="ds-panel">
        <div className="ds-inspector"><div className="ds-control-row"><span className="ds-control-label">Density</span><div className="ds-segment" role="group" aria-label="Component spacing">{(['relaxed', 'compact'] as const).map(value => <button key={value} aria-pressed={settings.density === value} onClick={() => update('density', value)}>{value === 'relaxed' ? 'Relaxed' : 'Compact'}</button>)}</div></div><div className="ds-control-row"><span className="ds-control-label">Outline action</span><button role="switch" aria-checked={settings.outlined} aria-label="Outline action style" className="ds-switch" onClick={() => update('outlined', !settings.outlined)}><span aria-hidden="true" /></button></div></div>
      </div>
      <div role="tabpanel" id={`ds-panel-1-${id}`} aria-labelledby={`ds-tab-1-${id}`} hidden={active !== 1} className="ds-panel">
        <div className="ds-inspector"><div className="ds-control-row"><span className="ds-control-label">Typeface</span><div className="ds-segment" role="group" aria-label="Study typeface">{(['sans', 'serif'] as const).map(value => <button key={value} aria-pressed={settings.font === value} onClick={() => update('font', value)}>{value === 'sans' ? 'Sans' : 'Serif'}</button>)}</div></div><label className="ds-control-row ds-range-row" htmlFor={`ds-size-${id}`}><span className="ds-control-label">Type size</span><input id={`ds-size-${id}`} type="range" min="18" max="36" value={settings.typeSize} onChange={event => update('typeSize', Number(event.target.value))} /><output htmlFor={`ds-size-${id}`}>{settings.typeSize}px</output></label></div>
      </div>
      <div role="tabpanel" id={`ds-panel-2-${id}`} aria-labelledby={`ds-tab-2-${id}`} hidden={active !== 2} className="ds-panel">
        <div className="ds-inspector"><label className="ds-control-row ds-range-row" htmlFor={`ds-radius-${id}`}><span className="ds-control-label">Corners</span><input id={`ds-radius-${id}`} type="range" min="0" max="16" value={settings.radius} onChange={event => update('radius', Number(event.target.value))} /><output htmlFor={`ds-radius-${id}`}>{settings.radius}px</output></label><div className="ds-control-row"><span className="ds-control-label">Palette</span><div className="ds-inline-tokens">{(['canvas', 'text', 'accent'] as const).map(name => <span key={name}><i style={{ background: tokens[name] }} aria-hidden="true" />{tokens[name]}</span>)}</div></div></div>
      </div>
    </div>
    <div className="ds-accent-row"><span className="ds-control-label">Accent</span><div className="ds-accent-options" role="group" aria-label="Study accent colour">{accents.map(accent => <button key={accent} aria-label={`${accent[0].toUpperCase()}${accent.slice(1)} accent`} aria-pressed={settings.accent === accent} onClick={() => { update('accent', accent); setPicker(false); }}><span style={{ background: getSpecimenAccentColor(accent, localTheme) }} aria-hidden="true" /></button>)}<button ref={colorButton} className="ds-custom-accent" aria-label="Choose a custom accent colour" aria-expanded={picker} aria-controls={`ds-picker-${id}`} aria-pressed={settings.accent === 'custom'} onClick={() => setPicker(value => !value)}><span style={settings.accent === 'custom' ? { background: tokens.accent, color: tokens.onAccent } : undefined}><Icon name="pencil" /></span></button></div><span className="ds-accent-value" aria-hidden="true">{tokens.accent}</span>
      {picker && <div ref={pickerRef} className="ds-color-picker" id={`ds-picker-${id}`} role="group" aria-label="Custom accent"><div><span className="ds-overline">Your own accent</span><button className="ds-picker-close" aria-label="Close colour picker" onClick={() => { setPicker(false); colorButton.current?.focus(); }}>×</button></div><ColorPicker value={settings.customColor ?? '#8763D0'} onChange={value => setSettings(previous => ({ ...previous, accent: 'custom', customColor: value }))} announce={announce} /><p>Text on the accent switches to black or white for contrast.</p></div>}
    </div>
    <p className="sr-only" role="status" aria-live="polite">{status}</p>
  </section>;

  return <div className="ds-mount">{specimen}</div>;
}
