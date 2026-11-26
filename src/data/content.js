// src/data/content.js
// Single source of truth for everything shown on the site.
// Card fields:
//   poster   – image path (optional). If missing, a Netflix-style title card is generated from `art`.
//   fit      – "cover" (screenshots) or "contain" (logos). Logos also use `posterBg`.
//   art      – { from, to } colours for generated title cards.
//   meta     – short line shown under the title (dates, role).

export const RESUME_URL = "/resumes/Tanay_Sinha_CV.pdf";

export const links = {
  github: "https://github.com/tanaysinha1607",
  linkedin: "https://www.linkedin.com/in/tanay-sinha-236286285/",
  email: "tanaysinha1607@gmail.com",
  resume: RESUME_URL,
};

// Socials for the Curious Visitor profile. Leave url "" to hide a card until you fill it in.
export const socials = [
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "@tansssseee",
    brand: "instagram",
    art: { from: "#d62976", to: "#2b0a3d" },
    pitch: "The less formal side — music, dance, cricket and everything in between.",
    url: "https://www.instagram.com/tansssseee/",
  },
  {
    id: "youtube",
    title: "YouTube",
    subtitle: "Guitar covers",
    brand: "youtube",
    art: { from: "#ff0000", to: "#1a0000" },
    pitch: "Where the full guitar videos live.",
    url: "",
  },
  {
    id: "linkedin-social",
    title: "LinkedIn",
    subtitle: "The professional me",
    brand: "linkedin",
    art: { from: "#0a66c2", to: "#071a33" },
    pitch: "If you'd rather connect the professional way.",
    url: "https://www.linkedin.com/in/tanay-sinha-236286285/",
  },
].map((s) => ({ ...s, link: s.url, linkLabel: `Open ${s.title}` }));

export const profiles = [
  {
    id: "recruiter",
    name: "Recruiter",
    color: "#3b82f6",
    tagline: "Here to see if I can actually do the job.",
    summary: "Hiring, evaluation, and technical fit.",
    resume: RESUME_URL,
  },
  {
    id: "investor",
    name: "Investor",
    color: "#22c55e",
    tagline: "Here to see if I'm worth betting on.",
    summary: "Ventures, traction, and product vision.",
    resume: RESUME_URL,
  },
  {
    id: "collaborator",
    name: "Collaborator",
    color: "#f59e0b",
    tagline: "Here to see if we should build something together.",
    summary: "Systems thinking, execution, and technical depth.",
    resume: RESUME_URL,
  },
  {
    id: "curious",
    name: "Curious Visitor",
    color: "#ef4444",
    tagline: "Just looking around. Welcome.",
    summary: "A quick look into what I build.",
    resume: RESUME_URL,
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */


const ARIA = {
  id: "aria",
  title: "ARIA",
  subtitle: "AI candidate ranking · Redrob Hackathon",
  meta: "Redrob AI Hackathon 2026 · Top 25 · Team CoffeeNCode",
  art: { from: "#f43f5e", to: "#1a0610" },
  tags: ["Python", "FAISS", "Sentence Transformers", "NetworkX", "Streamlit"],
  pitch:
    "Ranks 100,000 candidates against a Senior AI Engineer job description — going beyond keyword matching with semantic embeddings, skill-graph reasoning, behavioural signals and integrity checks.",
  bullets: [
    "Five-signal scoring engine: structural career evidence, semantic similarity (MiniLM embeddings + FAISS), a PMI-weighted skill graph, 23 behavioural signals in 5 clusters, and an integrity multiplier.",
    "Honeypot-style anomaly detection (skill-duration mismatch, keyword stuffing, impossible timelines) — 0% flagged profiles in the final top 100.",
    "Ranks all 100K candidates in ~32 seconds on CPU. I owned the data & artifacts pipeline — embeddings, FAISS index, skill graph, behavioural and integrity features — backed by 37 artifact tests.",
  ],
  githubLink: "https://github.com/tanaysinha1607/aria",
  demoLink: "https://aria-redrob.streamlit.app",
};

const SETU = {
  id: "setu",
  title: "Setu",
  subtitle: "Adaptive AI credit risk for microfinance",
  meta: "Google DeepMind Bangalore Hackathon 2026 · Top 25",
  poster: "/images/setu_pic.png",
  posterPosition: "center",
  art: { from: "#14b8a6", to: "#0a0e1a" },
  tags: ["Gemma · llama.cpp", "Gemini", "Google ADK", "FastAPI", "React", "Three.js"],
  pitch:
    "Helps microfinance field officers assess unbanked borrowers in seconds from messy inputs — SMS logs, handwritten ledger photos and voice notes. Reason locally, escalate only when it matters.",
  bullets: [
    "Hybrid edge–cloud routing: an on-device Gemma model (llama.cpp, quantised GGUF) extracts financials from SMS privately and offline; low-confidence or high-risk cases escalate to Gemini.",
    "Reads handwritten ledger photos and spoken income descriptions to build structured credit scorecards for borrowers with no formal credit history.",
    "Gemini Live voice Q&A lets field officers simply ask why a borrower was rated the way they were.",
  ],
  githubLink: "https://github.com/tanaysinha1607/Setu",
  demoLink: "https://setu-lime-theta.vercel.app/",
};

const allProjects = [
  {
    id: "nexus",
    title: "Nexus",
    subtitle: "Autonomous Software Engineering Engine",
    meta: "August 2026",
    art: { from: "#0ea5e9", to: "#1e1b4b" },
    tags: ["Multi-agent", "Docker", "FastAPI", "React", "WebSockets"],
    pitch:
      "Type a plain-English prompt, get a backend API that has been generated, built, tested and shipped as a real GitHub pull request — with no code passing on an LLM's judgment alone.",
    bullets: [
      "Autonomous multi-agent engine that generates, builds and verifies backend web APIs in 2 languages (Python/FastAPI, Node/Express).",
      "6 objective verification gates (Docker, pytest, bandit/semgrep SAST, hadolint, tsc) with a self-healing loop that reads real tracebacks and auto-fixes failing code — backed by 117 passing tests.",
      "DAG scheduler with artifact-gated execution and a live React + WebSocket dashboard; ships verified output as real GitHub PRs.",
    ],
    githubLink: "https://github.com/tanaysinha1607/Nexus",
    demoLink: "https://nexus-nine-sandy.vercel.app/",
  },
  {
    id: "lockin",
    title: "LockIn",
    subtitle: "AI Gym Accountability & Buddy-Matching App",
    meta: "November 2026",
    art: { from: "#f97316", to: "#450a0a" },
    tags: ["React Native", "Expo", "Node.js", "MongoDB", "Socket.io", "Groq"],
    pitch:
      "A cross-platform app (iOS, Android, Web) that pairs gym-goers with workout buddies and keeps them consistent with shared streaks and daily check-ins.",
    bullets: [
      "GPS-verified check-ins — you have to be within 300 m of your gym, which stops fake streaks.",
      "Real-time buddy chat, streaks and nudges via Socket.io and push notifications.",
      "AI coach (Llama 3.3 70B via Groq) writes personalised workout and diet plans from logged sessions, with a fallback so the app keeps working if the AI is down.",
    ],
    githubLink: "https://github.com/tanaysinha1607/LockIn",
    demoLink: "https://lockin-mobile.vercel.app/",
  },
  {
    id: "resumematch-ai",
    title: "ResumeMatch-AI",
    subtitle: "Resume ↔ Job Description Matching",
    meta: "March 2026",
    poster: "/images/resumematch_logo.png",
    art: { from: "#6366f1", to: "#0b1026" },
    tags: ["MERN", "React", "NLP", "REST APIs"],
    pitch: "An AI platform that matches resumes to job descriptions with ATS-style scoring.",
    bullets: [
      "91%+ matching accuracy via ATS-style scoring using the MERN stack and NLP models.",
      "Keyword recommendation engine for ATS optimisation — 60% faster resume analysis.",
      "Job discovery relevance up 70% by aggregating and ranking listings with similarity algorithms.",
    ],
    githubLink: "https://github.com/tanaysinha1607/ResumeMatch-AI",
    demoLink: "https://resume-match-ai-rxcl.vercel.app/",
  },
  {
    id: "adaptive-risk-engine",
    title: "Adaptive Risk Engine",
    subtitle: "Real-time Trading Risk Dashboard",
    poster: "/images/adaptiveengine_pic.png",
    art: { from: "#22c55e", to: "#0a0a0a" },
    tags: ["FastAPI", "PostgreSQL", "WebSockets", "Python"],
    pitch: "A real-time risk engine that scores exposure, leverage, volatility and anomaly signals live.",
    bullets: [
      "0–100 risk score with threshold-driven controls (block trades, reduce leverage).",
      "Live trade feed and alerts streamed over WebSockets.",
      "Audit-friendly risk logs for high-stakes trading environments.",
    ],
    githubLink: "https://github.com/tanaysinha1607/Adaptive-Risk-Engine",
    demoLink: "https://adaptive-risk-engine.vercel.app/",
  },
  {
    id: "aegis",
    title: "Aegis",
    subtitle: "Dual-Engine Fraud Detection",
    poster: "/images/aegis_pic.png",
    art: { from: "#64748b", to: "#020617" },
    posterPosition: "left 35%",
    tags: ["Transformer", "GNN", "FAISS", "RAG", "Python"],
    pitch: "A fraud detection system combining deep learning and explainability for near-real-time decisions.",
    bullets: [
      "Dual-model setup (Transformer + GNN) with ensemble scoring and stress testing.",
      "RAG-based explanations turn model scores into human-readable fraud insights.",
    ],
    githubLink: "https://github.com/tanaysinha1607/Aegis",
  },
];

// Display order everywhere (Top Picks etc.)
const PROJECT_ORDER = ["lockin", "nexus", "resumematch-ai", "aria", "setu", "adaptive-risk-engine", "aegis"];
export const projects = PROJECT_ORDER.map((id) => [...allProjects, ARIA, SETU].find((p) => p.id === id));

/* ------------------------------------------------------------------ */
/* Experience & ventures                                               */
/* ------------------------------------------------------------------ */

export const experience = [
  {
    id: "times-internet",
    title: "Times Internet",
    subtitle: "Software Development Intern",
    meta: "June – August 2025",
    poster: "/images/times-internet-logo.webp",
    fit: "contain",
    posterBg: "#0b1f4b",
    tags: ["FastAPI", "CrewAI", "REST APIs", "Agentic AI"],
    bullets: [
      "Engineered an end-to-end cohort media-plan automation system with FastAPI and CrewAI, cutting manual deck-building effort by 70–85%.",
      "Accelerated turnaround by 55% with scalable sync/async REST APIs supporting 6+ cohort categories and parallel execution.",
      "Built an AI-driven lead intelligence system, reducing manual prospecting effort by 70%.",
      "Added sector-specific filters to dynamic workflows across multiple business verticals for sharper targeting.",
    ],
  },
  {
    id: "on2nextnow",
    title: "On2NextNow",
    subtitle: "Director · Built BizEdge",
    meta: "November 2025 – Present",
    poster: "/images/bizedge_pic.png",
    posterPosition: "left top",
    art: { from: "#3b82f6", to: "#0b1220" },
    tags: ["Python", "Claude Haiku 4.5", "PIB data", "Email digests"],
    pitch:
      "At On2NextNow I designed, built and deployed BizEdge — the company's government-intelligence product for Indian business. It's live and onboarding invite-only early users.",
    bullets: [
      "Checks the Press Information Bureau every four hours for releases from all central ministries and de-duplicates them.",
      "AI writes a business summary for each release, tags it to 22 sectors, pulls out the key figures and rates risk and opportunity — with suggested next steps.",
      "Delivered as a ranked feed, personalised morning emails and per-ministry briefings for banks, pharma, PE/VC, consulting and law firms.",
    ],
    demoLink: "https://bizedge.on2nextnow.com/",
  },

];

export const bizedge = {
  id: "bizedge",
  title: "BizEdge",
  subtitle: "Government intelligence for Indian business · by On2NextNow",
  poster: "/images/bizedge_pic.png",
  posterPosition: "left top",
  badge: "LIVE PRODUCT",
  tags: ["Python", "Claude Haiku 4.5", "PIB data", "22 sectors"],
  pitch:
    "Know what the government just did — and what it means for your business. I built and deployed BizEdge for On2NextNow: it turns every central-ministry press release into a business summary with a risk & opportunity rating.",
  bullets: [
    "Live product, invite-only while onboarding early users from banks, NBFCs, pharma, PE/VC, consulting and law firms.",
    "Automated pipeline: PIB checked every four hours, AI summaries, 22-sector tagging, key-figure extraction, risk & opportunity ratings.",
    "Personalised morning emails by ministry and sector, plus one-page ministry briefings for board notes and client updates.",
  ],
  demoLink: "https://bizedge.on2nextnow.com/",
};

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */

export const achievements = [
  {
    id: "hf-transformers",
    title: "Hugging Face",
    subtitle: "Transformers · merged open-source PR",
    meta: "June 2026",
    art: { from: "#facc15", to: "#422006" },
    pitch:
      "Fixed an AttributeError in auto_factory triggered when a model class lacks a config_class attribute — merged into one of the most widely used ML libraries.",
    tags: ["Open Source", "Python"],
  },
  {
    id: "deepmind-hack",
    title: "Google DeepMind",
    subtitle: "Bangalore Hackathon 2026 · Top 25",
    art: { from: "#4285f4", to: "#0f172a" },
    pitch: "Top 25 at the Google DeepMind Bangalore 2026 hackathon, with Setu — adaptive AI credit risk for microfinance.",
    githubLink: "https://github.com/tanaysinha1607/Setu",
    demoLink: "https://setu-lime-theta.vercel.app/",
  },
  {
    id: "samsung-ennovatex",
    title: "Samsung EnnovateX",
    subtitle: "AI Challenge 2025 · Top 10",
    art: { from: "#1428a0", to: "#020617" },
    pitch: "Top 10 in the Samsung EnnovateX 2025 AI Challenge.",
  },
  {
    id: "bits-techfest",
    title: "BITS Tech Fest",
    subtitle: "2025 · Top 10",
    art: { from: "#a855f7", to: "#1e1b4b" },
    pitch: "Top 10 at BITS Tech Fest 2025.",
  },
  {
    id: "redrob",
    title: "Redrob AI Hackathon",
    subtitle: "2026 · Top 25",
    art: { from: "#dc2626", to: "#1c1917" },
    pitch: "Top 25 at the Redrob AI Hackathon 2026, with ARIA — ranking 100,000 candidates beyond keyword matching.",
    githubLink: "https://github.com/tanaysinha1607/aria",
    demoLink: "https://aria-redrob.streamlit.app",
  },
  {
    id: "leetcode",
    title: "LeetCode",
    subtitle: "150+ DSA problems",
    art: { from: "#f59e0b", to: "#18181b" },
    pitch: "Solved 150+ LeetCode DSA problems, sharpening algorithmic thinking and coding efficiency.",
  },
];

/* ------------------------------------------------------------------ */
/* Leadership                                                          */
/* ------------------------------------------------------------------ */

export const leadership = [
  {
    id: "ecell",
    title: "E-Cell, BITS Pilani Dubai",
    subtitle: "Co-Head, Events",
    meta: "August 2025 – May 2026",
    art: { from: "#14b8a6", to: "#042f2e" },
    bullets: [
      "Led large-scale events including the E-Summit and finance competitions — planning, execution and cross-team coordination.",
    ],
  },
  {
    id: "iei",
    title: "IEI Club, BITS Pilani Dubai",
    subtitle: "Events Executive",
    meta: "September 2024 – May 2025",
    art: { from: "#64748b", to: "#0f172a" },
    bullets: ["Organised technical workshops and seminars to promote industry exposure."],
  },
  {
    id: "jashn",
    title: "JASHN",
    subtitle: "Registrations Head",
    meta: "April 2024",
    art: { from: "#ec4899", to: "#3b0764" },
    bullets: ["Managed onboarding and database operations for 3,000+ attendees."],
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const education = [
  {
    id: "bits-pilani",
    title: "BITS Pilani, Dubai",
    subtitle: "B.E. Computer Science (Core)",
    meta: "August 2023 – Present",
    poster: "/images/bits_logo.jpg",
    fit: "contain",
    posterBg: "#ffffff",
    detail:
      "Coursework: Object Oriented Programming, Database Management, Discrete Maths, Data Structures & Algorithms, Operating Systems, Computer Networks, Machine Learning, Deep Learning, Natural Language Processing.",
  },
  {
    id: "lvis",
    title: "Lotus Valley International School",
    subtitle: "Class 10 & Class 12 (PCM)",
    poster: "/images/lvis_logo.jpg",
    fit: "contain",
    posterBg: "#ffffff",
    detail: "Completed Class 10 and Class 12 with Physics, Chemistry and Mathematics.",
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skills = [
  {
    id: "languages",
    title: "Languages",
    art: { from: "#3b82f6", to: "#0f172a" },
    items: ["Python", "C", "Java", "JavaScript", "TypeScript", "HTML/CSS", "SQL (MySQL)"],
  },
  {
    id: "ai-agents",
    title: "AI & Agents",
    art: { from: "#8b5cf6", to: "#1e1b4b" },
    items: ["CrewAI", "Google ADK", "Gemma / llama.cpp (GGUF)", "TensorFlow", "scikit-learn", "NumPy", "Pandas"],
  },
  {
    id: "backend",
    title: "Backend",
    art: { from: "#10b981", to: "#022c22" },
    items: ["FastAPI", "Pydantic", "Node.js / Express", "SQLAlchemy", "Redis", "WebSockets / Socket.io"],
  },
  {
    id: "frontend",
    title: "Frontend & Mobile",
    art: { from: "#06b6d4", to: "#083344" },
    items: ["React (Vite)", "React Native (Expo)", "Three.js / R3F", "Zustand"],
  },
  {
    id: "platforms",
    title: "Data & Platforms",
    art: { from: "#f43f5e", to: "#1c1917" },
    items: ["Docker", "PostgreSQL", "MongoDB", "Supabase", "Render", "Vercel", "Git / GitHub", "Semgrep / Bandit"],
  },
];

/* ------------------------------------------------------------------ */
/* Recruiter quick links / actions                                     */
/* ------------------------------------------------------------------ */

export const recruiterQuickLinks = [
  {
    id: "resume",
    title: "Resume",
    subtitle: "Latest CV · PDF",
    brand: "resume",
    art: { from: "#e50914", to: "#2a0a0a" },
    pitch: "My latest CV — a one-glance overview of experience, projects and achievements.",
    link: RESUME_URL,
    linkLabel: "Open Resume",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    subtitle: "Work history & recommendations",
    brand: "linkedin",
    art: { from: "#0a66c2", to: "#071a33" },
    pitch: "Explore my work history, recommendations and current focus areas.",
    link: links.linkedin,
    linkLabel: "Open LinkedIn",
  },
  {
    id: "github",
    title: "GitHub",
    subtitle: "Repos & experiments",
    brand: "github",
    art: { from: "#3f3f46", to: "#09090b" },
    pitch: "Repositories and experiments that reflect how I build.",
    link: links.github,
    linkLabel: "Open GitHub",
  },
  {
    id: "email",
    title: "Email",
    subtitle: links.email,
    brand: "email",
    art: { from: "#16a34a", to: "#052e16" },
    pitch: "Reach out for interviews, follow-ups or collaboration opportunities.",
    link: `mailto:${links.email}`,
    linkLabel: "Send Email",
  },
];

/* ------------------------------------------------------------------ */
/* Numbers & fun facts (rendered as big-number "stat" cards)           */
/* ------------------------------------------------------------------ */

export const investorStats = [
  { id: "stat-22", stat: "22", title: "Sectors every release is tagged to", subtitle: "BizEdge · live for On2NextNow", art: { from: "#3b82f6", to: "#0b1220" } },
  { id: "stat-4h", stat: "4 hrs", title: "Between checks of every ministry", subtitle: "BizEdge's automated PIB pipeline", art: { from: "#e50914", to: "#1a0505" } },
  { id: "stat-100k", stat: "100K", title: "Candidates ranked in ~32 seconds", subtitle: "ARIA · Redrob AI Hackathon", art: { from: "#f43f5e", to: "#1a0610" } },
  { id: "stat-85", stat: "70–85%", title: "Less manual deck-building", subtitle: "Automation shipped at Times Internet", art: { from: "#0b5cff", to: "#06122e" } },
  { id: "stat-55", stat: "55%", title: "Faster turnaround", subtitle: "Sync/async APIs across 6+ cohorts", art: { from: "#14b8a6", to: "#042f2e" } },
  { id: "stat-91", stat: "91%+", title: "Matching accuracy", subtitle: "ResumeMatch-AI scoring engine", art: { from: "#6366f1", to: "#0b1026" } },
  { id: "stat-3000", stat: "3,000+", title: "Attendees onboarded", subtitle: "JASHN registrations, run end-to-end", art: { from: "#ec4899", to: "#3b0764" } },
].map((s) => ({ ...s, pitch: `${s.stat} — ${s.title.toLowerCase()}. ${s.subtitle}.` }));

export const funFacts = [
  { id: "fact-pr", stat: "1", title: "PR merged into Hugging Face", subtitle: "Yes, the Transformers library", art: { from: "#facc15", to: "#422006" } },
  { id: "fact-300", stat: "300 m", title: "How close you must be to the gym", subtitle: "…for LockIn to count your check-in", art: { from: "#f97316", to: "#450a0a" } },
  { id: "fact-150", stat: "150+", title: "LeetCode problems solved", subtitle: "Mostly late at night", art: { from: "#f59e0b", to: "#18181b" } },
  { id: "fact-117", stat: "117", title: "Tests guarding Nexus", subtitle: "Because the AI doesn't get to grade itself", art: { from: "#0ea5e9", to: "#1e1b4b" } },
].map((s) => ({ ...s, pitch: `${s.stat} — ${s.title}. ${s.subtitle}.` }));

/* ------------------------------------------------------------------ */
/* Off-duty (Curious Visitor) — guitar, dance, cricket                 */
/* Videos live in public/videos, thumbnails in public/images/offduty.  */
/* ------------------------------------------------------------------ */

const INSTAGRAM_URL = "https://www.instagram.com/tansssseee/";

export const offDuty = [
  {
    id: "guitar2",
    title: "Unplugged · Vol. 1",
    subtitle: "Guitar under the night sky",
    poster: "/images/offduty/guitar2.jpg",
    posterPosition: "50% 70%",
    video: "/videos/guitar2.mp4",
    duration: "1:03",
    tags: ["Guitar", "Vocals"],
    pitch: "When I'm not building, I'm usually playing guitar. This one's from a quiet night outdoors.",
  },
  {
    id: "guitar1",
    title: "Unplugged · Vol. 2",
    subtitle: "A late-night session at home",
    poster: "/images/offduty/guitar1.jpg",
    posterPosition: "50% 45%",
    video: "/videos/guitar1.mp4",
    duration: "0:44",
    tags: ["Vocals", "Acoustic"],
    pitch: "Earphones in, lights low, one take. Some songs just have to be sung.",
  },
  {
    id: "dance2",
    title: "On Stage",
    subtitle: "Group performance",
    poster: "/images/offduty/dance2.jpg",
    posterPosition: "50% 60%",
    video: "/videos/dance2.mp4",
    duration: "0:56",
    tags: ["Dance", "Performance"],
    pitch: "Weeks of practice, one shot under the lights. Same rule as shipping software: rehearse, then deliver.",
  },
  {
    id: "dance1",
    title: "After Hours",
    subtitle: "Freestyle on the dance floor",
    poster: "/images/offduty/dance1.jpg",
    posterPosition: "50% 40%",
    video: "/videos/dance1.mp4",
    duration: "0:25",
    tags: ["Dance", "Freestyle"],
    pitch: "No choreography, just the beat.",
  },
  {
    id: "cricket",
    title: "Game On",
    subtitle: "Cricket & tennis — always up for a match",
    poster: "/images/offduty/cricket.jpg",
    posterPosition: "50% 25%",
    tags: ["Cricket", "Tennis"],
    pitch:
      "That's #45 with the trophy. I play cricket and tennis, and I'm always looking for the next game.",
    bullets: [
      "Running a tournament and need one more player? Count me in.",
      "Up for a friendly match? Let's play, then grab a coffee and talk about whatever we're building.",
    ],
    link: `mailto:${links.email}?subject=${encodeURIComponent("Game + coffee?")}&body=${encodeURIComponent("Hey Tanay, fancy a game? Cricket / tennis on <date> at <place>.")}`,
    linkLabel: "Invite Me to Play",
    extraLinks: [{ href: INSTAGRAM_URL, label: "DM on Instagram" }],
  },
];

/* ------------------------------------------------------------------ */
/* Collaborator-only cards                                             */
/* ------------------------------------------------------------------ */

export const openTo = [
  {
    id: "open-agents",
    title: "Agentic Dev Tools",
    subtitle: "Agents that prove their own work",
    art: { from: "#0ea5e9", to: "#0c1a2b" },
    pitch: "Tools where agents write, run and verify code against real execution — the Nexus philosophy, applied elsewhere.",
  },
  {
    id: "open-realtime",
    title: "Real-time Systems",
    subtitle: "WebSockets, live dashboards, risk",
    art: { from: "#22c55e", to: "#052e16" },
    pitch: "Anything streaming: live scoring, monitoring, multiplayer state. I've built it for trading risk and gym streaks.",
  },
  {
    id: "open-hackathons",
    title: "Hackathon Squads",
    subtitle: "Need a builder who ships by demo time?",
    art: { from: "#a855f7", to: "#1e1b4b" },
    pitch: "Top-10 and Top-25 finishes across Google DeepMind, Samsung, Redrob and BITS. Always up for the next one.",
  },
  {
    id: "open-oss",
    title: "Open Source",
    subtitle: "Bugs to fix, features to ship",
    art: { from: "#facc15", to: "#422006" },
    pitch: "Already merged a fix into Hugging Face Transformers. Happy to dig into more ML and Python tooling.",
  },
].map((x) => ({ ...x, link: `mailto:${links.email}?subject=${encodeURIComponent(`Let's build: ${x.title}`)}`, linkLabel: "Pitch me an idea" }));

openTo.push({
  id: "open-coffee",
  title: "Cricket, Then Coffee",
  subtitle: "Best ideas start off-screen",
  poster: "/images/offduty/cricket.jpg",
  posterPosition: "50% 25%",
  pitch:
    "Some of the best collaborations start away from a laptop. Got a match this weekend? I'll bring the bat (or the racket) — we play, then talk ideas over coffee.",
  link: `mailto:${links.email}?subject=${encodeURIComponent("Cricket, then coffee?")}`,
  linkLabel: "Set It Up",
  extraLinks: [{ href: "https://www.instagram.com/tansssseee/", label: "DM on Instagram" }],
});

/* ------------------------------------------------------------------ */
/* Per-profile hero: photo + song + copy                               */
/* Each profile looks for its own files — just drop them in:           */
/*   photo → public/images/hero-<profile>.jpg                          */
/*   song  → public/audio/<profile>.mp3                                */
/* Until a photo exists the hero shows a styled backdrop; until a      */
/* song exists the music player simply hides.                          */
/* ------------------------------------------------------------------ */

const byId = (list, id) => list.find((x) => x.id === id);
const pick = (list, ids) => ids.map((id) => byId(list, id)).filter(Boolean);

export const heroByProfile = {
  recruiter: {
    photo: "/images/hero-recruiter.jpg",
    mobilePosition: "45% 10%",
    photoPosition: "45% 40%",
    song: { src: "/audio/recruiter-clip.mp3", title: "For A Reason", artist: "Karan Aujla" },
    headline: "Hiring? Let's Make It Easy!",
    blurb:
      "You're looking for top talent, and—surprise—it's me. I build agentic AI systems and full-stack products that ship. Check out my projects, skills, and why I'm the right fit.",
    chips: ["SDE Intern @ Times Internet", "Hugging Face Transformers contributor", "CSE @ BITS Pilani"],
    actions: ["resume", "linkedin", "github", "contact"],
  },
  investor: {
    photo: "/images/hero-investor.jpg",
    mobilePosition: "58% 42%",
    photoPosition: "55% 50%",
    song: { src: "/audio/investor.mp3", title: "Winning Speech", artist: "Karan Aujla" },
    headline: "Bet on the Builder.",
    blurb:
      "I built and shipped BizEdge for On2NextNow — a live AI product that turns Indian government releases into business intelligence — and I build consumer products like LockIn on the side. Here's the traction, not just the pitch.",
    chips: ["Director @ On2NextNow", "Built & deployed BizEdge", "Top 25 @ Google DeepMind hackathon"],
    actions: [{ type: "open", item: "bizedge", label: "See BizEdge" }, "linkedin", "contact"],
  },
  collaborator: {
    photo: "/images/hero-collaborator.jpg",
    mobilePosition: "68% 55%",
    photoPosition: "60% 50%",
    song: { src: "/audio/collaborator.mp3", title: "Softly", artist: "Karan Aujla" },
    headline: "Let's Build Something Real.",
    blurb:
      "I like systems that prove themselves — verification gates over vibes. Agents, real-time backends, mobile apps: if it's ambitious and needs to actually work, I'm in.",
    chips: ["Merged into Hugging Face Transformers", "Python · TypeScript · React", "Agentic AI · Real-time"],
    actions: ["github", { type: "open", item: "nexus", label: "Explore Nexus" }, "contact"],
  },
  curious: {
    photo: "/images/hero-curious.jpg",
    mobilePosition: "50% 30%",
    photoPosition: "50% 50%",
    song: { src: "/audio/curious.mp3", title: "Tauba Tauba", artist: "Karan Aujla" },
    headline: "Oh hey, you found me.",
    blurb:
      "CS student at BITS Pilani Dubai and builder of AI things — who also sings, plays guitar, dances and never says no to a game of cricket. No interview here, just have a look around.",
    chips: ["Guitar & vocals", "Dance", "Cricket & tennis", "Builds apps for fun"],
    actions: [{ type: "open", item: "guitar2", label: "Watch Me Play" }, "instagram", "contact"],
  },
};

/* ------------------------------------------------------------------ */
/* Rows per profile — each profile tells a different story             */
/* `variant: "top10"` renders the big-number Netflix Top 10 row.       */
/* ------------------------------------------------------------------ */

const hackathons = achievements.filter((a) => a.id !== "hf-transformers" && a.id !== "leetcode");

const lockinVenture = {
  ...byId(projects, "lockin"),
  id: "lockin-venture",
  subtitle: "Consumer app · iOS, Android & Web",
  pitch:
    "A social fitness product: gym-goers get matched with workout buddies and stay consistent through shared streaks, GPS-verified check-ins and an AI coach. Live on web and mobile.",
};

const tryIt = pick(projects, ["lockin", "setu", "resumematch-ai", "aria", "nexus", "adaptive-risk-engine"]).map((p) => ({
  ...p,
  id: `try-${p.id}`,
  subtitle: "Live — click Play to try it",
}));

export const rowsByProfile = {
  // The full, structured résumé view.
  recruiter: [
    { title: "Top Picks for You", variant: "top10", data: projects },
    { title: "Experience", data: experience },
    { title: "Skills", data: skills },
    { title: "Education", data: education },
    { title: "Awards & Open Source", data: achievements },
  ],
  // Ventures, numbers and operating track record.
  investor: [
    { title: "Ventures", data: [bizedge, lockinVenture] },
    { title: "By the Numbers", data: investorStats },
    { title: "Competition Track Record", variant: "top10", data: hackathons },
    { title: "Leadership & Operations", data: leadership },
  ],
  // How I build, and what we could build together.
  collaborator: [
    { title: "Currently Building", data: pick(projects, ["lockin", "nexus", "setu"]) },
    { title: "Ideas I'd Jump On", data: openTo },
    { title: "Systems to Dig Into", data: pick(projects, ["aria", "adaptive-risk-engine", "aegis", "resumematch-ai"]) },
    { title: "Stack I Work In", data: skills },
    { title: "Open Source", data: [byId(achievements, "hf-transformers"), recruiterQuickLinks.find((q) => q.id === "github")] },
  ],
  // The personal side.
  curious: [
    { title: "When I'm Not Coding", data: offDuty },
    { title: "Try These Yourself", data: tryIt },
    { title: "Fun Facts", data: funFacts },
    { title: "Find Me Online", data: socials.filter((s) => s.url) },
  ],
};

/* Look up any item by id (used by hero buttons like "Explore Nexus"). */
export function findItem(id) {
  return [bizedge, ...projects, ...experience, ...achievements, ...offDuty, ...leadership, ...education].find((x) => x.id === id);
}
