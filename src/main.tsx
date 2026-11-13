import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
// Self-hosted, Latin-only web fonts (OFL), bundled by Vite: no render-blocking third-party CSS.
import '@fontsource/instrument-sans/latin-400.css';
import '@fontsource/instrument-sans/latin-500.css';
import '@fontsource/newsreader/latin-400.css';
import '@fontsource/dm-mono/latin-400.css';
import './styles/app.css';
import './styles/base.css';

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
