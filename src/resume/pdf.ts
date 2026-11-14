// Builds the résumé PDF in the browser. Loaded only when someone presses Export PDF.
import { pdf } from '@react-pdf/renderer';
import { createElement } from 'react';
import sans400 from '@fontsource/inter/files/inter-latin-400-normal.woff?url';
import sans500 from '@fontsource/inter/files/inter-latin-500-normal.woff?url';
import sans600 from '@fontsource/inter/files/inter-latin-600-normal.woff?url';
import serif500 from '@fontsource/newsreader/files/newsreader-latin-500-normal.woff?url';
import { ResumeDocument, registerResumeFonts } from './ResumePdf';

export type ResumePdf = { blob: Blob; url: string; pages: number; size: string };

export async function buildResumePdf(): Promise<ResumePdf> {
  registerResumeFonts({ sans400, sans500, sans600, serif500 });
  const blob = await pdf(createElement(ResumeDocument) as unknown as Parameters<typeof pdf>[0]).toBlob();
  const pages = ((await blob.text()).match(/\/Type\s*\/Page[^s]/g) ?? []).length || 1;
  return { blob, url: URL.createObjectURL(blob), pages, size: `${Math.max(1, Math.round(blob.size / 1024))} kB` };
}
