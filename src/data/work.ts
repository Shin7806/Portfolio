import sizes from './work-images.json';

/** One image on a story page: <base>-<width>.(avif|webp) under public/. */
export type Shot = { base: string; alt: string; widths: [number, number]; width: number; height: number; caption?: string; phone?: boolean };
/** A short muted clip shown beside a section's text (compact, not full width). `ratio` is width / height. */
export type Clip = { base: string; caption: string; ratio: number };
export type Section = { label: string; title: string; body: string[]; list?: string[]; shots?: Shot[]; clip?: Clip };
export type Story = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  meta: { label: string; value: string }[];
  link: { label: string; href: string };
  cover: Shot;
  /** A short clip of the live product's main page, shown in place of the cover image. */
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
    cover: rs('home', 'RS360 homepage: “Your interior materials. Delivered in 4 hours.” with no minimum order, free delivery, RS360 assured and secure payments.'),
    motion: { base: '/work/rs360/motion', caption: 'Browsing the RS360 homepage, from the first banner into the brands and the collection.' },
    sections: [
      { label: 'Landing', title: 'The promise, then the catalogue', body: ['The homepage opens on what matters to a contractor or homeowner: materials across Bengaluru in four hours, no minimum order, free delivery and secure payments. Partner brands and the RS360 collection follow, so the next click is already a product.'], shots: [rs('home', 'RS360 homepage: “Your interior materials. Delivered in 4 hours.” with no minimum order, free delivery, RS360 assured and secure payments.')] },
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
    tagline: 'A free peer-to-peer skill exchange: teach something you know, learn something you want, and no money changes hands.',
    intro: 'SkillBridge pairs people whose skills fit both ways, so each can teach what the other wants to learn. This is the second version: I audited the first build, rethought the product around a single idea, the swap, and rebuilt it full stack, with every rule that matters enforced by the database.',
    meta: [
      { label: 'Role', value: 'Product design and full-stack development' },
      { label: 'Year', value: '2026' },
      { label: 'Stack', value: 'React 19, TypeScript, Tailwind CSS 4, TanStack Query, Supabase' },
      { label: 'Status', value: 'Live' },
    ],
    link: { label: 'Visit the live app', href: 'https://skill-bridge-shin7806s-projects.vercel.app/' },
    cover: { base: '/projects/skillbridge', alt: 'SkillBridge landing page: “Teach what you know. Learn what you don’t.” with Get started free and a live count of members and skills.', widths: [720, 1440], width: 1440, height: 900 },
    motion: { base: '/work/skillbridge/motion', caption: 'Browsing the SkillBridge landing page, from the promise into the four-step demo.' },
    sections: [
      { label: 'Problem', title: 'It looked finished. The loop didn’t work.', body: ['An audit of the first build found that sign-up, profiles and chat worked, but the three things that make it an exchange did not: the Matches page listed profiles whatever their skills, there was no way to propose a swap to a person, and sessions could not be reached. Every rule lived in the browser.', 'The data showed the harder problem. Among the 17 members who had listed skills, only 3 of 136 possible pairs fitted both ways. Strict two-way matching on its own would show most people an empty page.'] },
      { label: 'Decisions', title: 'Make the swap the product', body: ['I rebuilt SkillBridge around one object: a swap, an agreement between two people with its own chat, sessions and progress. Everything else exists to get people into a swap or to keep one going.'], list: ['Two-way matches first, then one-way fits, labelled', 'An Asks board for specific requests', 'Chat only after a proposal is accepted', 'Vouches after a real session, instead of star ratings', 'No credits, no payments, no leaderboards', 'Bring your own meeting link instead of building video', 'Block, report and hide from the first release'] },
      { label: 'Landing', title: 'The whole idea in two lines', body: ['The page leads with the promise and one action. Underneath, a live count of members and skills comes straight from the database, so the first thing a visitor sees is real. The rest of the page explains the product with four short demos built from the app’s own components; they appear beside each feature below.'], shots: [shot('skillbridge/landing', 'The SkillBridge hero: “Teach what you know. Learn what you don’t.” with Get started free, How it works and a live member count.')] },
      { label: 'Matching', title: 'Two-way matches first', body: ['Matches are computed in Postgres from everyone’s teach and learn lists. People who fit both ways come first, with the exact skills shown; one-way fits are labelled “can teach you” or “wants your skill”, because one-way help is still free peer learning. Discover also has a directory by category and the Asks board.'], clip: { base: '/work/skillbridge/demo-match-clip', caption: 'Rohan teaches Photoshop and wants Python, so he rises to the top as a two-way match, with the swap laid out before anyone asks.', ratio: 1254 / 1126 } },
      { label: 'Swaps', title: 'One skill each way', body: ['A proposal is one skill in each direction and a short note. The other person accepts or declines, and there is only ever one open swap per pair. Once accepted, the swap becomes the home for everything the two of them do together.'], clip: { base: '/work/skillbridge/demo-propose-clip', caption: 'Asha opens Rohan’s profile, picks Python for Photoshop, adds a short note and sends it. Rohan accepts, and the swap is on.', ratio: 1254 / 1126 } },
      { label: 'Messages', title: 'Chat opens only after a yes', body: ['Every accepted swap gets a private conversation, visible only to its two members and delivered in realtime. Nobody can message you before you have said yes, which keeps unwanted contact out by design.'], clip: { base: '/work/skillbridge/demo-chat-clip', caption: 'The chat stays locked while the proposal is pending. Rohan accepts, it unlocks, and they agree to start on Saturday.', ratio: 1254 / 1126 } },
      { label: 'Sessions', title: 'The same moment in two timezones', body: ['Either person suggests a time and the other confirms or suggests another. Sessions are stored as an absolute instant and shown in each person’s own timezone, with a meeting link and a calendar file. After a completed session, the learner can vouch for their teacher.'], clip: { base: '/work/skillbridge/demo-schedule-clip', caption: 'Asha suggests 7 PM Saturday in Bengaluru. Rohan sees 1:30 PM in London, confirms, and it is added to the calendar.', ratio: 1254 / 1126 } },
      { label: 'Safety', title: 'The rules live in the database', body: ['Row level security covers every table, and anything with a business rule (proposing a swap, answering it, booking a session, vouching) runs as a Postgres function. The browser only ever holds the publishable key.', 'Members can hide from Discover, block, report or delete their account, and emails are never shown. A three-account end-to-end test runs matching, proposals, realtime chat, sessions, privacy and blocking through the same API the app uses.'], shots: [shot('skillbridge/safety', 'The SkillBridge safety section: email never shown, chat only after a yes, hide when you like, block and report, enforced by the database, delete everything.')] },
      { label: 'Accounts', title: 'In and set up in a few minutes', body: ['Sign up with email or Google, with the password rules shown as you type. Onboarding asks for at least one skill to teach and one to learn before you enter the app, so every match has something to work with.'], shots: [shot('skillbridge/signup', 'The SkillBridge sign-up screen: name, email, optional college, password rules and Continue with Google.'), shot('skillbridge/login', 'The SkillBridge log-in screen, with email, password and Continue with Google.')] },
      { label: 'What I took from it', title: 'Measure before you design', body: ['The most useful number in the project was not on any screen: 3 two-way pairs out of 136. It changed the matching design more than any mockup did, and it is why one-way matches and Asks exist. Auditing the live product and its data before redesigning saved building the wrong thing twice.'] },
    ],
    outcome: { title: 'A working exchange, end to end.', body: ['Version two is live. Matching, proposals, chat, sessions, vouches and the safety controls all work end to end, and each rule is enforced by Postgres rather than the browser. The first version’s tables were moved to a separate schema rather than dropped, so nothing was lost in the rebuild.', 'In November 2026, 18 members share 20 skills. The idea the plan leaves for later is swap circles, where A teaches B, B teaches C and C teaches A, once there is enough real usage to justify a three-way flow.'] },
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
