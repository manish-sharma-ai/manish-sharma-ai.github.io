import { PROFILE_URLS, JSON_LD_SAME_AS } from "./profiles";

export const SITE = {
  name: "Manish Sharma Lab",
  canonicalUrl: PROFILE_URLS.site,
  repoUrl: PROFILE_URLS.repository,
  githubProfile: PROFILE_URLS.github,
  description:
    "Working notes, tools, and practical frameworks on AI for Laser Metal Deposition, process monitoring, repair decisions, and RFQ preparation.",
  lastUpdated: "2026-05-10"
};

export const PERSON = {
  name: "Manish Sharma",
  headline: "AI for Laser Metal Deposition",
  primaryPositioning: "Manish Sharma - AI for Laser Metal Deposition",
  shortIdentity: "AI for Laser Metal Deposition at Exafuse.",
  image: "/images/manish-sharma-profile.webp",
  imageWebp: "/images/manish-sharma-profile.webp",
  imageFallback: "/images/manish-sharma-profile.jpg",
  imageSrcSet:
    "/images/manish-sharma-profile-700.webp 700w, /images/manish-sharma-profile-1100.webp 1100w, /images/manish-sharma-profile.webp 1400w",
  imageSizes: "(min-width: 1024px) 48vw, calc(100vw - 2rem)",
  longIdentity:
    "Manish Sharma works on AI for Laser Metal Deposition at Exafuse in Germany, with a focus on process monitoring, robotic DED/LMD workflows, repair decisions, and practical RFQ preparation.",
  location: "Germany",
  company: "Exafuse"
};

export const LINKS = {
  exafuse: PROFILE_URLS.exafuse,
  linkedin: PROFILE_URLS.linkedin,
  github: PROFILE_URLS.github,
  repo: PROFILE_URLS.repository
};

export const SAME_AS = JSON_LD_SAME_AS;

export const CORE_TOPICS = [
  "Laser Metal Deposition",
  "Directed Energy Deposition",
  "DED-LB/M",
  "Metal Additive Manufacturing",
  "Laser Cladding",
  "Industrial Repair",
  "Process Monitoring",
  "Melt-Pool Monitoring",
  "AI in Additive Manufacturing",
  "Machine Learning for Manufacturing",
  "RFQ Intelligence"
];

export const NAV_GROUPS = [
  {
    label: "Profile",
    description: "Who Manish is, what he works on, and where to find public links.",
    items: [
      { label: "About", href: "/about", description: "Personal technical profile with experience, focus areas, and proof points." },
      { label: "Identity", href: "/identity", description: "Stable public profile facts and reference links." },
      { label: "Public Profile", href: "/profile/public-profile", description: "Public-safe identity facts and planned profile links." },
      { label: "Public Work", href: "/public-work", description: "Profiles, public assets, notes, tools, and future outputs." },
      { label: "Links", href: "/links", description: "Exafuse, LinkedIn, GitHub, and research-profile links." },
      { label: "Contact", href: "/contact", description: "Professional contact routes and Exafuse RFQ direction." }
    ]
  },
  {
    label: "Proof",
    description: "Sources, industrial context, press assets, and public reference files.",
    items: [
      { label: "Evidence Base", href: "/evidence", description: "Checked facts, field notes, and source links." },
      { label: "Core LMD-AI Sources", href: "/research/core-lmd-ai-sources", description: "Curated source map for AI and Laser Metal Deposition." },
      { label: "Industrial Proof Map", href: "/industrial-proof", description: "Public Exafuse cases connected to the site themes." },
      { label: "Press Kit", href: "/press-kit", description: "Media facts, brand assets, and short profile summaries." },
      { label: "Literature Map JSON", href: "/research/lmd-literature-scan.json", description: "500-record LMD/DED reference map." },
      { label: "Exafuse Proof JSON", href: "/research/exafuse-public-proof-map.json", description: "Public Exafuse proof map." }
    ]
  },
  {
    label: "Frameworks",
    description: "Practical frameworks for LMD, AI, repair, and evidence.",
    items: [
      { label: "Frameworks Index", href: "/frameworks", description: "All LMD and AI working frameworks in one place." },
      { label: "Quality Evidence Ladder", href: "/frameworks/lmd-quality-evidence-ladder", description: "What monitoring can show and what inspection must prove." },
      { label: "Repairability Index", href: "/frameworks/lmd-repairability-index", description: "A practical scoring model for early LMD repair screening." },
      { label: "AI Readiness Score", href: "/frameworks/lmd-ai-readiness-score", description: "Check whether a workflow has enough data for useful AI monitoring." },
      { label: "Failure Atlas", href: "/frameworks/lmd-failure-atlas", description: "Failure modes, process signals, AI visibility, and validation evidence." },
      { label: "AI Maturity Model", href: "/frameworks/lmd-ai-maturity-model", description: "From manual records to validated AI decision support." }
    ]
  },
  {
    label: "Workbench",
    description: "Tools, notes, glossary pages, and RFQ resources.",
    items: [
      { label: "RFQ Toolkit", href: "/agent-pack", description: "Schemas, prompts, decision rules, and RFQ checklists." },
      { label: "Tools", href: "/tools", description: "LMD vs SLM, repairability, and RFQ structuring tools." },
      { label: "Lab Notes", href: "/lab-notes", description: "Short practical notes for LMD, AI, RFQ, monitoring, and repair." },
      { label: "Glossary", href: "/glossary", description: "Clear definitions for LMD, DED, cladding, and melt-pool monitoring." },
      { label: "For AI Agents", href: "/for-ai-agents", description: "Clear guidance on how the site should and should not be used." },
      { label: "Site Map", href: "/site-map", description: "A complete linked map of the website and public assets." }
    ]
  }
];

export const FRAMEWORKS = [
  {
    title: "LMD Quality Evidence Ladder",
    href: "/frameworks/lmd-quality-evidence-ladder",
    problem:
      "Monitoring data is often treated as if it proves final part quality.",
    idea: "Separate process awareness, AI flags, inspection evidence, and field performance so each claim uses the right proof.",
    status: "Working framework",
    tags: ["Quality evidence", "Monitoring", "Inspection"]
  },
  {
    title: "LMD Repairability Index",
    href: "/frameworks/lmd-repairability-index",
    problem:
      "Repair requests often arrive before the material, damage, access, and inspection details are clear.",
    idea: "Score material, damage, access, machining, inspection, economics, and criticality before calling a repair promising.",
    status: "Interactive",
    tags: ["Repair", "RFQ", "Decision support"]
  },
  {
    title: "LMD-AI Readiness Score",
    href: "/frameworks/lmd-ai-readiness-score",
    problem:
      "AI monitoring work gets weak when process data, inspection results, and operator feedback stay separate.",
    idea: "Check whether an LMD workflow has the data foundations needed for useful AI-assisted monitoring.",
    status: "Interactive",
    tags: ["AI readiness", "Data", "Monitoring"]
  },
  {
    title: "LMD RFQ Toolkit",
    href: "/agent-pack",
    problem:
      "Vague LMD requests need to be turned into facts, gaps, risks, and next questions.",
    idea: "Provide schemas, prompts, decision rules, and checklists for safer RFQ preparation.",
    status: "Toolkit",
    tags: ["Schema", "Prompts", "RFQ"]
  },
  {
    title: "LMD Failure Atlas",
    href: "/frameworks/lmd-failure-atlas",
    problem:
      "Failure language gets messy when process signals, inspection findings, and repair decisions are mixed.",
    idea: "Map failure modes, process signals, AI visibility, and validation evidence in one vocabulary.",
    status: "Working framework",
    tags: ["Failure modes", "Signals", "Validation"]
  },
  {
    title: "LMD-AI Maturity Model",
    href: "/frameworks/lmd-ai-maturity-model",
    problem:
      "Companies need a practical path from manual records to validated AI decision support.",
    idea: "Define maturity stages for LMD data capture, analytics, decision support, and closed-loop development.",
    status: "Working framework",
    tags: ["Maturity", "Strategy", "AI"]
  },
  {
    title: "LMD Prompt Library",
    href: "/agent-pack#prompt-library",
    problem:
      "Loose prompts can produce confident answers before the RFQ is complete.",
    idea: "Use prompts that force missing-information checks, risk separation, and next-step summaries.",
    status: "Part of RFQ Toolkit",
    tags: ["Prompts", "AI agents", "RFQ"]
  },
  {
    title: "LMD RFQ Checklist",
    href: "/agent-pack#quality-checklist",
    problem:
      "RFQs often miss the evidence and acceptance criteria needed for a serious feasibility review.",
    idea: "List material, damage, route, post-processing, inspection, risk, and expert-review fields.",
    status: "Part of RFQ Toolkit",
    tags: ["Checklist", "RFQ", "Quality"]
  }
];

export const LAB_NOTES = [
  {
    title: "Why Melt-Pool Monitoring Is Not a Quality Certificate",
    href: "/lab-notes/melt-pool-monitoring-is-not-quality-proof",
    description:
      "Melt-pool monitoring is useful process evidence, but final release still needs inspection matched to part risk.",
    date: "2026-05-09",
    tags: ["Melt-pool monitoring", "Quality evidence", "AI"]
  },
  {
    title: "What AI Needs Before Recommending LMD Repair",
    href: "/lab-notes/what-ai-needs-before-lmd-repair",
    description:
      "Before recommending LMD repair, ask for material, geometry, damage, service conditions, tolerances, and inspection requirements.",
    date: "2026-05-09",
    tags: ["Repair", "AI agents", "RFQ"]
  },
  {
    title: "LMD vs SLM: Decision Signals",
    href: "/lab-notes/lmd-vs-slm-decision-signals",
    description:
      "A practical comparison of decision signals for Laser Metal Deposition and SLM/LPBF.",
    date: "2026-05-09",
    tags: ["LMD", "SLM", "LPBF"]
  },
  {
    title: "How to Structure a Laser Metal Deposition RFQ",
    href: "/lab-notes/structuring-an-lmd-rfq-for-ai-agents",
    description:
      "A useful RFQ separates known facts, missing information, assumptions, risks, and next steps.",
    date: "2026-05-09",
    tags: ["RFQ", "AI agents", "Schema"]
  },
  {
    title: "Why Many LMD RFQs Fail Before Engineering Review",
    href: "/lab-notes/why-many-lmd-rfqs-fail-before-engineering-review",
    description:
      "Most weak RFQs fail because they hide material, damage, access, inspection, tolerance, and service-risk information.",
    date: "2026-05-09",
    tags: ["RFQ", "Industrial repair", "Missing information"]
  },
  {
    title: "From Process Signals to Inspection Evidence in LMD",
    href: "/lab-notes/from-process-signals-to-inspection-evidence-in-lmd",
    description:
      "A practical chain for connecting monitoring signals, AI flags, inspection findings, and quality evidence.",
    date: "2026-05-09",
    tags: ["Process monitoring", "Inspection", "Quality evidence"]
  },
  {
    title: "Why Local Damage on Large Parts Is an LMD Signal",
    href: "/lab-notes/why-local-damage-on-large-parts-is-an-lmd-signal",
    description:
      "Local damage on a large, valuable part can make Laser Metal Deposition worth exploring, but only with material and risk context.",
    date: "2026-05-09",
    tags: ["Repairability", "Large parts", "LMD"]
  },
  {
    title: "Post-Machining Is Part of the LMD Repair Plan",
    href: "/lab-notes/post-machining-is-part-of-the-lmd-repair-plan",
    description:
      "LMD repair decisions should include machining allowance, tolerance recovery, inspection access, and acceptance criteria from the start.",
    date: "2026-05-09",
    tags: ["Post-machining", "Tolerance", "Repair"]
  },
  {
    title: "AI Red-Team Questions for LMD Repair Recommendations",
    href: "/lab-notes/ai-red-team-questions-for-lmd-repair-recommendations",
    description:
      "A checklist of questions that exposes overconfident AI repair recommendations before they reach an engineering workflow.",
    date: "2026-05-09",
    tags: ["AI safety", "Repair", "Red team"]
  },
  {
    title: "DED-LB/M Terms That Should Not Be Mixed Up",
    href: "/lab-notes/ded-lb-m-terms-ai-systems-should-not-mix-up",
    description:
      "Clear terminology keeps LMD, DED, laser cladding, SLM, LPBF, monitoring, and certification claims from being mixed together.",
    date: "2026-05-09",
    tags: ["DED-LB/M", "Glossary", "AI readability"]
  }
];

export const GLOSSARY_TERMS = [
  {
    term: "Laser Metal Deposition",
    href: "/glossary/laser-metal-deposition",
    short:
      "Laser Metal Deposition is a metal additive manufacturing process where a focused energy source melts feedstock as it is deposited, often used for repair, cladding, and large-part additive manufacturing.",
    related: ["Directed Energy Deposition", "Laser Cladding", "Melt-Pool Monitoring"]
  },
  {
    term: "Directed Energy Deposition",
    href: "/glossary/directed-energy-deposition",
    short:
      "Directed Energy Deposition is a category of additive manufacturing processes where focused thermal energy fuses material as it is being deposited.",
    related: ["Laser Metal Deposition", "DED-LB/M", "Metal Additive Manufacturing"]
  },
  {
    term: "Laser Cladding",
    href: "/glossary/laser-cladding",
    short:
      "Laser cladding uses a laser to deposit material onto a surface, often to improve wear, corrosion, or heat resistance or restore dimensions.",
    related: ["Laser Metal Deposition", "Industrial Repair", "Wear Resistance"]
  },
  {
    term: "Melt-Pool Monitoring",
    href: "/glossary/melt-pool-monitoring",
    short:
      "Melt-pool monitoring observes the molten region during deposition to support process awareness, anomaly detection, and parameter understanding.",
    related: ["Process Monitoring", "AI Anomaly Detection", "Quality Evidence"]
  }
];

export const COMMAND_PAGES = [
  { title: "Home", href: "/", group: "Core" },
  { title: "About Manish Sharma", href: "/about", group: "Core" },
  { title: "Identity", href: "/identity", group: "Core" },
  { title: "Manish Sharma Public Profile", href: "/profile/public-profile", group: "Core" },
  { title: "Evidence Base", href: "/evidence", group: "Core" },
  { title: "Core Sources for AI and Laser Metal Deposition", href: "/research/core-lmd-ai-sources", group: "Core" },
  { title: "Industrial Proof Map", href: "/industrial-proof", group: "Core" },
  { title: "Frameworks", href: "/frameworks", group: "Core" },
  { title: "LMD Quality Evidence Ladder", href: "/frameworks/lmd-quality-evidence-ladder", group: "Frameworks" },
  { title: "LMD Repairability Index", href: "/frameworks/lmd-repairability-index", group: "Frameworks" },
  { title: "LMD-AI Readiness Score", href: "/frameworks/lmd-ai-readiness-score", group: "Frameworks" },
  { title: "LMD Failure Atlas", href: "/frameworks/lmd-failure-atlas", group: "Frameworks" },
  { title: "LMD-AI Maturity Model", href: "/frameworks/lmd-ai-maturity-model", group: "Frameworks" },
  { title: "LMD RFQ Toolkit", href: "/agent-pack", group: "RFQ Toolkit" },
  { title: "Tools", href: "/tools", group: "Tools" },
  { title: "Lab Notes", href: "/lab-notes", group: "Lab Notes" },
  ...LAB_NOTES.map((note) => ({ title: note.title, href: note.href, group: "Lab Notes" })),
  { title: "Glossary", href: "/glossary", group: "Glossary" },
  ...GLOSSARY_TERMS.map((term) => ({ title: term.term, href: term.href, group: "Glossary" })),
  { title: "Public Work", href: "/public-work", group: "Core" },
  { title: "Press Kit", href: "/press-kit", group: "Core" },
  { title: "Site Map", href: "/site-map", group: "Core" },
  { title: "For AI Agents", href: "/for-ai-agents", group: "AI Agents" },
  { title: "Links", href: "/links", group: "Core" },
  { title: "Contact", href: "/contact", group: "Core" }
];

export const SITE_MAP_GROUPS = [
  {
    label: "Start Here",
    description: "Primary entry points for readers, search engines, and technical references.",
    links: [
      { label: "Home", href: "/", description: "Top-level profile, frameworks, and proof context." },
      { label: "About", href: "/about", description: "Personal technical profile and experience-backed positioning." },
      { label: "Identity", href: "/identity", description: "Stable public profile page for Manish Sharma." },
      { label: "Public Profile", href: "/profile/public-profile", description: "Public-safe profile facts and planned profile links." },
      { label: "For AI Agents", href: "/for-ai-agents", description: "How automated assistants should use and not use this site." },
      { label: "Press Kit", href: "/press-kit", description: "Official short bios, assets, and machine-readable profile data." }
    ]
  },
  {
    label: "Proof and Evidence",
    description: "Pages that anchor the site's claims in sources and public industrial context.",
    links: [
      { label: "Evidence Base", href: "/evidence", description: "Reference map, field notes, and checked facts." },
      { label: "Core LMD-AI Sources", href: "/research/core-lmd-ai-sources", description: "Curated starting map for source categories and further reading." },
      { label: "Industrial Proof Map", href: "/industrial-proof", description: "Public Exafuse case and article signals." },
      { label: "LMD Literature Map JSON", href: "/research/lmd-literature-scan.json", description: "500-record LMD/DED reference map." },
      { label: "Exafuse Proof Map JSON", href: "/research/exafuse-public-proof-map.json", description: "Public proof map." }
    ]
  },
  {
    label: "Frameworks",
    description: "Working frameworks for repair decisions, evidence planning, and AI maturity.",
    links: FRAMEWORKS.map((framework) => ({
      label: framework.title,
      href: framework.href,
      description: framework.idea
    }))
  },
  {
    label: "Workbench",
    description: "Interactive and structured resources for LMD decisions and RFQ workflows.",
    links: [
      { label: "RFQ Toolkit", href: "/agent-pack", description: "RFQ schema, prompts, rules, and quality checklist." },
      { label: "Tools", href: "/tools", description: "Frontend-only advisor and structuring tools." },
      { label: "Lab Notes", href: "/lab-notes", description: "Index of short technical notes." },
      { label: "Glossary", href: "/glossary", description: "Index of practical LMD definitions." }
    ]
  },
  {
    label: "Lab Notes",
    description: "Short technical pages that turn the site's frameworks into practical explanations.",
    links: LAB_NOTES.map((note) => ({
      label: note.title,
      href: note.href,
      description: note.description
    }))
  },
  {
    label: "Glossary",
    description: "Definitions that keep common LMD terms clean and usable.",
    links: GLOSSARY_TERMS.map((term) => ({
      label: term.term,
      href: term.href,
      description: term.short
    }))
  },
  {
    label: "Public Channels",
    description: "External and supporting public links.",
    links: [
      { label: "Public Work", href: "/public-work", description: "Profiles, repositories, reports, future talks, and datasets." },
      { label: "Public Profile", href: "/profile/public-profile", description: "Public-safe profile facts." },
      { label: "Links", href: "/links", description: "LinkedIn, GitHub, Exafuse, and research-profile links." },
      { label: "Contact", href: "/contact", description: "Professional contact routes." },
      { label: "Repository", href: LINKS.repo, description: "Source repository for this website." }
    ]
  }
];

export const RELATED_LINK_SETS = [
  {
    exact: ["/about", "/identity", "/profile/public-profile", "/public-work", "/links", "/contact"],
    eyebrow: "Identity path",
    title: "Continue through the public identity layer",
    links: [
      { label: "Canonical Identity", href: "/identity", description: "The stable public profile page for references." },
      { label: "Public Profile Facts", href: "/profile/public-profile", description: "Public-safe identity facts and planned profile links." },
      { label: "Evidence Base", href: "/evidence", description: "Source-checked numbers and proof points behind the profile." },
      { label: "Industrial Proof Map", href: "/industrial-proof", description: "Public Exafuse work connected to the lab themes." },
      { label: "Public Work", href: "/public-work", description: "Profiles, public resources, and future outputs." }
    ]
  },
  {
    exact: ["/evidence", "/industrial-proof", "/press-kit", "/research/core-lmd-ai-sources"],
    eyebrow: "Proof path",
    title: "Follow the evidence trail",
    links: [
      { label: "Evidence Base", href: "/evidence", description: "Checked facts, field notes, and source links." },
      { label: "Core LMD-AI Sources", href: "/research/core-lmd-ai-sources", description: "Curated source map for AI and Laser Metal Deposition." },
      { label: "Industrial Proof Map", href: "/industrial-proof", description: "Public Exafuse cases and article signals." },
      { label: "Press Kit", href: "/press-kit", description: "Profile facts and brand assets." },
      { label: "For AI Agents", href: "/for-ai-agents", description: "Usage boundaries for automated assistants." }
    ]
  },
  {
    prefixes: ["/frameworks"],
    eyebrow: "Framework path",
    title: "Move from framework to practical workflow",
    links: [
      { label: "Manish Sharma - AI for Laser Metal Deposition", href: "/identity", description: "Canonical identity page for the author and public entity." },
      { label: "Frameworks Index", href: "/frameworks", description: "All public LMD and AI frameworks." },
      { label: "Quality Evidence Ladder", href: "/frameworks/lmd-quality-evidence-ladder", description: "Separate process signals from inspection proof." },
      { label: "Repairability Index", href: "/frameworks/lmd-repairability-index", description: "Score LMD repair feasibility inputs." },
      { label: "LMD Agent Pack", href: "/agent-pack", description: "RFQ schemas, prompts, rules, and checklists." },
      { label: "Tools", href: "/tools", description: "Try the interactive decision helpers." },
      { label: "For AI Agents", href: "/for-ai-agents", description: "Safe-use guidance and limitations for assistants." }
    ]
  },
  {
    exact: ["/agent-pack", "/tools", "/for-ai-agents"],
    eyebrow: "Agent workflow",
    title: "Turn vague requests into usable LMD data",
    links: [
      { label: "RFQ Toolkit", href: "/agent-pack", description: "Schema, prompts, rules, and checklists." },
      { label: "Tools", href: "/tools", description: "Frontend-only LMD advisors and RFQ structuring." },
      { label: "RFQ Lab Note", href: "/lab-notes/structuring-an-lmd-rfq-for-ai-agents", description: "How to separate known facts, missing data, and risks." },
      { label: "For AI Agents", href: "/for-ai-agents", description: "Safe-use guidance for automated assistants." }
    ]
  },
  {
    prefixes: ["/lab-notes"],
    eyebrow: "Lab-note path",
    title: "Connect this note to the framework layer",
    links: [
      { label: "Lab Notes Index", href: "/lab-notes", description: "All practical notes." },
      { label: "Quality Evidence Ladder", href: "/frameworks/lmd-quality-evidence-ladder", description: "Use when monitoring claims need evidence boundaries." },
      { label: "RFQ Toolkit", href: "/agent-pack", description: "Prompts and schemas for LMD RFQ structuring." },
      { label: "Glossary", href: "/glossary", description: "Terminology definitions used across the site." }
    ]
  },
  {
    prefixes: ["/glossary"],
    eyebrow: "Glossary path",
    title: "Use definitions inside decision workflows",
    links: [
      { label: "Glossary Index", href: "/glossary", description: "All practical LMD definitions." },
      { label: "LMD vs SLM Signals", href: "/lab-notes/lmd-vs-slm-decision-signals", description: "Decision signals for process selection." },
      { label: "Frameworks", href: "/frameworks", description: "Frameworks that use this terminology." },
      { label: "RFQ Toolkit", href: "/agent-pack", description: "RFQ resources that rely on clear terms." }
    ]
  }
];

export const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
