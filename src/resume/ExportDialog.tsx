import { useEffect, useRef, useState } from 'react';
import { Download, ExternalLink, Printer, RotateCcw, X } from 'lucide-react';
import { logoPaths, pdfFileName } from './data';
import type { ResumePdf } from './pdf';

// One build per visit: reopening the dialog shows the same file instantly.
let pending: Promise<ResumePdf> | null = null;
const build = () => (pending ??= import('./pdf').then(module => module.buildResumePdf()).catch(error => { pending = null; throw error; }));

/** Inline PDF preview works in desktop browsers; phones get a download card instead. */
const canPreview = () => typeof navigator !== 'undefined' && navigator.pdfViewerEnabled !== false && !matchMedia('(max-width: 640px), (pointer: coarse)').matches;

export function Mark({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 180 180" aria-hidden="true" focusable="false">{logoPaths.map(d => <path key={d} d={d} fill="currentColor" />)}</svg>;
}

/** Builds the A4 PDF, then previews it with Download, Print and Open. Esc or the backdrop closes it. */
export default function ExportDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [file, setFile] = useState<ResumePdf | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const preview = canPreview();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!element.open) element.showModal();
    document.documentElement.style.overflow = 'hidden';
    // A click on the dialog element itself lands on the backdrop (the content fills the box). Esc covers keyboards.
    const backdrop = (event: MouseEvent) => { if (event.target === element) onClose(); };
    element.addEventListener('click', backdrop);
    return () => { element.removeEventListener('click', backdrop); document.documentElement.style.overflow = ''; };
  }, [onClose]);

  useEffect(() => {
    let live = true;
    build().then(result => { if (live) setFile(result); }, () => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [attempt]);

  const retry = () => { setFailed(false); setAttempt(n => n + 1); };
  const print = () => {
    if (!file) return;
    try {
      const target = frame.current?.contentWindow;
      if (!target) throw new Error('no preview');
      target.focus();
      target.print();
    } catch {
      window.open(file.url, '_blank', 'noopener');
    }
  };

  return <dialog ref={dialog} className="cv-export" aria-labelledby="cv-export-title" aria-busy={!file && !failed} onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="cv-export-bar">
      <div className="cv-export-file">
        <span className="cv-export-icon"><Mark size={14} /></span>
        <div>
          <h2 id="cv-export-title">{pdfFileName}</h2>
          <p>{file ? `A4 · ${file.pages} ${file.pages === 1 ? 'page' : 'pages'} · ${file.size}` : failed ? 'Couldn’t build the PDF' : 'Building PDF…'}</p>
        </div>
      </div>
      <div className="cv-export-actions">
        {file && <>
          {preview && <button type="button" className="cv-btn cv-btn-ghost" onClick={print}><Printer aria-hidden="true" /><span>Print</span></button>}
          {preview && <a className="cv-btn cv-btn-primary" href={file.url} download={pdfFileName}><Download aria-hidden="true" /><span>Download</span></a>}
        </>}
        <button type="button" className="cv-btn cv-btn-icon" aria-label="Close" onClick={onClose}><X aria-hidden="true" /></button>
      </div>
    </div>

    <div className="cv-export-body">
      {failed ? <div className="cv-export-state">
        <p>Something went wrong while building the PDF.</p>
        <button type="button" className="cv-btn cv-btn-ghost" onClick={retry}><RotateCcw aria-hidden="true" /><span>Try again</span></button>
      </div> : !file ? <div className="cv-export-state cv-loading" role="status">
        <span className="cv-loader"><Mark size={26} /></span>
        <span className="cv-loading-text">Preparing your PDF</span>
      </div> : preview ? <iframe ref={frame} className="cv-export-frame" src={`${file.url}#view=FitH&toolbar=0&navpanes=0`} title="Résumé PDF preview" /> : <div className="cv-export-state cv-export-card">
        <span className="cv-loader cv-loader-still"><Mark size={26} /></span>
        <p>Your résumé is ready as an A4 PDF.</p>
        <div className="cv-export-card-actions">
          <a className="cv-btn cv-btn-primary" href={file.url} download={pdfFileName}><Download aria-hidden="true" /><span>Download PDF</span></a>
          <a className="cv-btn cv-btn-ghost" href={file.url} target="_blank" rel="noopener"><ExternalLink aria-hidden="true" /><span>Open</span></a>
        </div>
      </div>}
    </div>
  </dialog>;
}
