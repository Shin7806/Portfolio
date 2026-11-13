import sizes from './work-images.json';

/** One image on a story page: <base>-<width>.(avif|webp) under public/. */
export type Shot = { base: string; alt: string; widths: [number, number]; width: number; height: number; caption?: string; phone?: boolean };
export type Section = { label: string; title: string; body: string[]; list?: string[]; shots?: Shot[] };
export type Story = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  meta: { label: string; value: string }[];
  link: { label: string; href: string };
  cover: Shot;
  /** A short muted clip of the live product, shown under “In motion”. */
  motion?: { base: string; caption: string };
  sections: Section[];
  outcome?: { title: string; body: string[] };
};

const known: Record<string, number[]> = sizes;
/** Images produced by scripts/stories.mjs (700 and 1400 wide). */
const shot = (key: string, alt: string, caption?: string): Shot => {
  const [width, height] = known[key] ?? [1400, 875];
  return { base: `/work/${key}`, alt, widths: [700, 1400], width, height, caption };
};
/** RS360 captures from scripts/capture.mjs (720/1440 desktop, 390/780 phone). */
const rs = (file: string, alt: string, phone = false): Shot => phone
  ? { base: `/work/rs360/${file}`, alt, widths: [390, 780], width: 780, height: 1688, phone }
  : { base: `/work/rs360/${file}`, alt, widths: [720, 1440], width: 1440, height: 900 };

export const stories: Story[] = [
  {
    slug: 'rs360',
    title: 'RS360',
    tagline: 'A digital catalogue and commerce platform for RadheShyam Laminates, a Bengaluru supplier of laminates and architectural hardware with more than 25 years in the trade.',
    intro: 'RadheShyam carries a 7,000+ laminate range and hardware from 22+ brands, and choosing from it used to mean leafing through bulky printed catalogues. The work was to turn a complex offline catalogue business into one digital experience that connects product information, pricing, customer journeys and internal operations.',
    meta: [
      { label: 'Role', value: 'Product designer, full-stack developer and creative lead' },
      { label: 'Timeline', value: '2026 – present' },
      { label: 'Built with', value: 'RadheShyam Laminates' },
      { label: 'Stack', value: 'React 19, TypeScript, Vite, Tailwind CSS v4, Supabase, Vercel, Cashfree' },
    ],
    link: { label: 'Visit rs360.in', href: 'https://rs360.in/' },
    cover: rs('home', 'RS360 homepage, with the line “Decades of RadheShyam’s expertise, now online with RS360.” above the product collections.'),
    motion: { base: '/work/rs360/motion', caption: 'The RS360 homepage, scrolled from the hero into the collections.' },
    sections: [
      { label: 'Scope', title: 'Everything from the database to the launch posts.', body: ['I worked across design, development, catalogue operations and launch content: the website and database, product listings, pricing workflows, promotional videos, social posts and support for offline marketing.'], list: ['Responsive UI and UX', 'Authentication and accounts', 'Multi-brand product discovery', 'Stock and pricing management', 'Customer and Pro pricing', 'Cart, checkout and payments', 'PDF quotations', 'Order management', 'Internal operations tools', 'Product imagery and catalogue cleanup', 'Brand presentation', 'Promotional videos and social posts'] },
      { label: 'Discovery', title: 'One catalogue across many brands', body: ['Laminates filter by brand and thickness (0.8 mm, 1.0 mm, 6 mm). Hardware filters by brand and by subcategory: handles and locks, sliding and folding systems, kitchen storage, cabinet hinges and drawer slides. Per-brand e-catalogues replace the printed books customers used to leaf through.'], shots: [rs('catalogue', 'The RS360 laminate catalogue, filterable by brand and thickness.')] },
      { label: 'Product', title: 'Everything to decide on one page', body: ['A product page carries the code, finish, stock status, price and quantity, with add-to-cart and enquiry side by side. Variants such as SF and HGF laminate finishes, and hardware options, live under one product instead of separate pages.'], shots: [rs('product', 'An RS360 laminate product page showing the product code, finish and stock status.')] },
      { label: 'Quotation', title: 'A quotation in seconds, two ways', body: ['Write a list or upload one, with no account needed. Or build the quotation while browsing: add products and quantities to the cart, then download a PDF quotation, usually ready in seconds.'], shots: [rs('quotation', 'The RS360 Smart Quotation page: write or upload a requirements list, with no account needed.')] },
      { label: 'RS360 Pro', title: 'Dealer pricing without a second account', body: ['GST-registered businesses apply with their GSTIN and GST certificate, and the team reviews it within 12–24 hours. Existing members are upgraded in place and keep their login, orders and saved details.'], shots: [rs('pro', 'The RS360 Pro page: an account for GST-registered dealers, with dealer pricing and priority support.')] },
      { label: 'Mobile', title: 'Designed for the phone as well', body: ['Every page is responsive, and on phones a bottom navigation bar keeps the main sections within reach.'], shots: [rs('mobile-home', 'RS360 on a phone: the homepage with the bottom navigation bar.', true), rs('mobile-catalogue', 'RS360 on a phone: the laminate catalogue in a single column.', true)] },
      { label: 'Under the hood', title: 'A small stack, plus tools for the work behind the shop.', body: ['Alongside the storefront I built custom tools for catalogue imports, pricing, quotations and operations, with repeatable workflows for importing, matching and maintaining product data.'] },
    ],
    outcome: { title: 'A live platform, end to end.', body: ['RS360 is live with searchable multi-brand catalogues, account-based pricing, downloadable quotations, checkout and the operations tools behind them. What I’m proudest of is turning a complex offline catalogue business into one cohesive digital experience, connecting product information, pricing, customer journeys and internal operations, while building the visual identity and launch material around it.', 'Traffic, revenue and conversion figures aren’t public yet.'] },
  },
  {
    slug: 'neurotwin',
    title: 'NeuroTwin',
    tagline: 'An AI-powered productivity companion that helps people build healthier routines through personalised insights, focus sessions, readiness scoring and daily habit tracking.',
    intro: 'NeuroTwin is a product design case study. I took it through the full cycle, from research to high-fidelity UI and a design system, covering onboarding, the dashboard, the productivity tools and settings.',
    meta: [
      { label: 'Role', value: 'Product design' },
      { label: 'Year', value: '2026' },
      { label: 'Type', value: 'Design case study' },
      { label: 'Tools', value: 'Figma' },
    ],
    link: { label: 'View on Behance', href: 'https://www.behance.net/gallery/251900711/NeuroTwin-Product-Design-Case-Study' },
    cover: { base: '/projects/neurotwin', alt: 'NeuroTwin cover: the product name above Focus, Sleep and Habits tags and the line “Your AI productivity twin, built around you.”', widths: [720, 1440], width: 1440, height: 900 },
    sections: [
      { label: 'Problem', title: 'A system before screens', body: ['The starting point: students struggle to balance study consistency, sleep, focus and daily performance. NeuroTwin answers with an AI productivity system that analyses daily behaviour, optimises focus sessions, improves lifestyle balance and gives personal insights.', 'Everything sits on a small system: one typeface, Inter, in several weights, and a short set of primary and secondary colour tokens built on a calm violet.'], shots: [shot('neurotwin/system', 'The NeuroTwin problem and solution, the Inter type specimen, and the primary and secondary colour tokens.')] },
      { label: 'Landing', title: 'A calm first impression', body: ['The landing page introduces the product with a quiet, AI-forward identity: clear product messaging, a minimal SaaS layout and one focused call to action.'], shots: [shot('neurotwin/landing', 'The NeuroTwin landing page: “Your AI productivity twin, built around you.” beside a glowing orb.')] },
      { label: 'Onboarding', title: 'Personalised from the start', body: ['After signing in, people build a productivity profile, so the first dashboard they see is already shaped around them.'], shots: [shot('neurotwin/onboarding', 'NeuroTwin onboarding: the login screen, then the “Build your productivity profile” form.')] },
      { label: 'Dashboard', title: 'Understand your performance', body: ['The dashboard brings the day’s scores, a weekly performance chart and personalised insights onto one screen.'], shots: [shot('neurotwin/dashboard', 'The NeuroTwin dashboard with summary scores, a weekly performance bar chart and personalised insights.')] },
      { label: 'Daily rhythm', title: 'Measure, improve, repeat', body: ['Daily use is built around a loop: personalised insights, a daily check-in and a focused work session with a timer.'], shots: [shot('neurotwin/rhythm', 'Three NeuroTwin screens: personalised insights, the daily check-in and a 25-minute focus session.')] },
      { label: 'Settings', title: 'Personalised control', body: ['Settings keep the profile, preferences and appearance in one place, so the product adapts without getting in the way.'], shots: [shot('neurotwin/settings', 'NeuroTwin settings: profile details, preferences and appearance options.')] },
    ],
    outcome: { title: 'Designed for better focus. Built for better habits.', body: ['The full case study, with every screen, is on Behance.'] },
  },
  {
    slug: 'skillbridge',
    title: 'SkillBridge',
    tagline: 'A peer-to-peer skill exchange platform: teach what you know, learn what you don’t, with no money involved.',
    intro: 'SkillBridge connects people with complementary skills, so two people can each teach what the other wants to learn. It was the first project where I owned both the design and the frontend implementation, end to end.',
    meta: [
      { label: 'Role', value: 'Design and frontend' },
      { label: 'Year', value: '2026' },
      { label: 'Status', value: 'Live' },
    ],
    link: { label: 'Visit the live app', href: 'https://skill-bridge-shin7806s-projects.vercel.app/' },
    cover: { base: '/projects/skillbridge', alt: 'SkillBridge landing page: “Teach what you know. Learn what you don’t.” with a row of skill tags.', widths: [720, 1440], width: 1440, height: 900 },
    motion: { base: '/work/skillbridge/motion', caption: 'The SkillBridge landing page, scrolled from the hero into how it works.' },
    sections: [
      { label: 'Landing', title: 'One sentence, then a way in', body: ['The landing page leads with the whole idea in two lines, then two clear ways forward: start for free, or log in. A slow row of skills, from JavaScript to yoga, shows the range at a glance.'], shots: [shot('skillbridge/landing', 'The SkillBridge hero: “Teach what you know. Learn what you don’t.” with Start for free and Log in buttons.')] },
      { label: 'How it works', title: 'Three steps to a first swap', body: ['Build a profile listing what you can teach and what you want to learn. Get matched with people whose skills complement yours. Then message your match, schedule sessions and start learning.'], shots: [shot('skillbridge/steps', 'The SkillBridge “Three steps to your first swap” section: build your profile, get matched, start exchanging.')] },
      { label: 'Inside the app', title: 'Find, request, talk, learn', body: ['Once in, everything sits behind one sidebar. The dashboard shows active requests and connections at a glance; Matches lists people whose skills complement yours; Requests tracks each swap from open to accepted; Chats keeps the conversation going; and the profile says what you teach and want to learn.', 'These screens are recreated from the live app with sample data, so no real member appears.'], shots: [shot('skillbridge/app-dashboard', 'Recreated SkillBridge dashboard with sample data: active requests, chats, skills learning, connections and quick actions.')] },
      { label: 'Matching', title: 'From a match to a conversation', body: ['A match card shows what someone teaches and wants to learn, with a direct way to message them. Conversations stay in one thread per person.'], shots: [shot('skillbridge/app-matches', 'Recreated “Find a Match” screen with four sample people and their teach and learn skills.'), shot('skillbridge/app-chats', 'Recreated Messages screen: a list of sample conversations and an open chat arranging a Saturday session.')] },
      { label: 'Requests', title: 'Every swap, tracked', body: ['Requests carry the level, session length, cadence and goals, with clear states from pending to accepted. The profile keeps the teach and learn lists that drive matching.'], shots: [shot('skillbridge/app-requests', 'Recreated Skill Requests screen with two pending swaps: teaching Graphic Design, learning Java.'), shot('skillbridge/app-profile', 'Recreated profile with sample details: what the user can teach and wants to learn.')] },
      { label: 'Accounts', title: 'Getting in should take a minute', body: ['Sign-up and log-in share one quiet layout, with email or Google, so the first swap is never far away.'], shots: [shot('skillbridge/signup', 'The SkillBridge sign-up screen, with email fields and Continue with Google.'), shot('skillbridge/login', 'The SkillBridge log-in screen, with email, password and Continue with Google.')] },
    ],
  },
  {
    slug: 'logofolio',
    title: 'LogoFolio',
    tagline: 'A curated set of logo designs exploring typography, symbols and visual identity, with a focus on minimal, character-driven and conceptual marks.',
    intro: 'LogoFolio 2025, Collection I gathers identity work across four kinds of mark: anime logotypes, illustrated character marks, text logos and symbols.',
    meta: [
      { label: 'Role', value: 'Brand identity' },
      { label: 'Year', value: '2025' },
      { label: 'Collection', value: 'Collection I' },
      { label: 'Tools', value: 'Photoshop, Illustrator, Figma' },
    ],
    link: { label: 'View on Behance', href: 'https://www.behance.net/gallery/240883105/LogoFolio-2025-Collection-I' },
    cover: shot('logofolio/cover', 'LogoFolio 2025, Collection I: “Anime · Illustration · Minimal”.'),
    sections: [
      { label: 'Anime', title: 'Logotypes with a character', body: ['Name marks built around anime characters, where the lettering carries as much attitude as the artwork behind it.'], shots: [shot('logofolio/anime-1', 'Two anime logotypes: Obito and Kakashi.'), shot('logofolio/anime-2', 'Two anime logotypes: Arthyst and ShinChan.')] },
      { label: 'Illustration', title: 'From outline to colour', body: ['Character marks drawn twice: once as a clean outline, then fully coloured, so each works in a single colour as well as in full.'], shots: [shot('logofolio/illustration-1', 'An illustrated character mark shown as an outline and in colour.'), shot('logofolio/illustration-2', 'A second character mark shown as an outline and in colour.')] },
      { label: 'Text and symbols', title: 'Down to the essentials', body: ['Text logos, including one for an esports team, then a set of symbols reduced to a few confident shapes.'], shots: [shot('logofolio/text', 'Two text logos: “Text” and “B4R Esports”.'), shot('logofolio/symbols', 'Six minimal symbol marks in black on white.')] },
    ],
  },
];

export const storyBySlug = (slug?: string) => stories.find(story => story.slug === slug);
