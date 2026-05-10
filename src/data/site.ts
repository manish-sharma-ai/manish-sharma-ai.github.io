export const SITE = {
  name: "Manish Sharma Lab",
  canonicalUrl: "https://manish-sharma-ai.github.io",
  repoUrl: "https://github.com/manish-sharma-ai/manish-sharma-ai.github.io",
  githubProfile: "https://github.com/aiwithms",
  description:
    "A public technical lab for inspection-aware AI in Laser Metal Deposition: frameworks, tools, lab notes, RFQ intelligence, and AI-agent resources.",
  lastUpdated: "2026-05-10"
};

export const PERSON = {
  name: "Manish Sharma",
  headline: "AI for Laser Metal Deposition",
  primaryPositioning: "Manish Sharma — AI for Laser Metal Deposition",
  shortIdentity: "AI for Laser Metal Deposition at Exafuse.",
  image: "/images/manish-sharma-profile.jpg",
  longIdentity:
    "Manish Sharma works on AI-assisted decision systems, process monitoring, and RFQ intelligence for Laser Metal Deposition, Directed Energy Deposition, laser cladding, industrial repair, and metal additive manufacturing at Exafuse in Germany.",
  location: "Germany",
  company: "Exafuse"
};

export const LINKS = {
  exafuse: "https://www.exafuse.de/",
  linkedin: "https://www.linkedin.com/in/manishsharma5/",
  github: "https://github.com/aiwithms",
  repo: "https://github.com/manish-sharma-ai/manish-sharma-ai.github.io",
  orcid: "#",
  zenodo: "#",
  huggingFace: "#",
  googleScholar: "#",
  researchGate: "#"
};

export const SAME_AS = [LINKS.linkedin, LINKS.github, LINKS.exafuse];

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

export const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Identity", href: "/identity" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Agent Pack", href: "/agent-pack" },
  { label: "Tools", href: "/tools" },
  { label: "Lab Notes", href: "/lab-notes" },
  { label: "Glossary", href: "/glossary" },
  { label: "Public Work", href: "/public-work" },
  { label: "Press Kit", href: "/press-kit" }
];

export const FRAMEWORKS = [
  {
    title: "LMD Quality Evidence Ladder",
    href: "/frameworks/lmd-quality-evidence-ladder",
    problem:
      "Teams often confuse process monitoring signals with final quality proof.",
    idea: "Separate process awareness, AI anomaly detection, inspection evidence, and field performance into explicit evidence levels.",
    status: "Open framework",
    tags: ["Quality evidence", "Monitoring", "Inspection"]
  },
  {
    title: "LMD Repairability Index",
    href: "/frameworks/lmd-repairability-index",
    problem:
      "Repair requests arrive with uneven data, unclear risk, and missing material or inspection details.",
    idea: "Score material, damage, access, machining, inspection, economics, and criticality before making a repair recommendation.",
    status: "Interactive",
    tags: ["Repair", "RFQ", "Decision support"]
  },
  {
    title: "LMD-AI Readiness Score",
    href: "/frameworks/lmd-ai-readiness-score",
    problem:
      "AI monitoring projects fail when process data, inspection results, and operator feedback are not connected.",
    idea: "Measure whether an LMD workflow has the data foundations needed for useful AI-assisted monitoring.",
    status: "Interactive",
    tags: ["AI readiness", "Data", "Monitoring"]
  },
  {
    title: "LMD Agent Pack",
    href: "/agent-pack",
    problem:
      "AI agents need structured context before they can prepare useful LMD RFQ summaries.",
    idea: "Provide schemas, prompts, decision rules, and checklists for safer AI-assisted RFQ preparation.",
    status: "Agent-ready",
    tags: ["Schema", "Prompts", "RFQ"]
  },
  {
    title: "LMD Failure Atlas",
    href: "/frameworks/lmd-failure-atlas",
    problem:
      "Failure language can be inconsistent across process signals, inspection findings, and repair decisions.",
    idea: "Map failure modes, process signals, AI visibility, and validation evidence in one shared vocabulary.",
    status: "Open framework",
    tags: ["Failure modes", "Signals", "Validation"]
  },
  {
    title: "LMD-AI Maturity Model",
    href: "/frameworks/lmd-ai-maturity-model",
    problem:
      "Companies need a staged path from manual records to validated AI decision support.",
    idea: "Define maturity stages for LMD data capture, analytics, decision support, and closed-loop development.",
    status: "Open framework",
    tags: ["Maturity", "Strategy", "AI"]
  },
  {
    title: "LMD Prompt Library",
    href: "/agent-pack#prompt-library",
    problem:
      "Unstructured prompts can produce confident answers before the RFQ is complete.",
    idea: "Use prompts that force missing-information checks, risk separation, and next-step summaries.",
    status: "Part of Agent Pack",
    tags: ["Prompts", "AI agents", "RFQ"]
  },
  {
    title: "LMD RFQ Checklist",
    href: "/agent-pack#quality-checklist",
    problem:
      "RFQs often miss the evidence and acceptance criteria needed for serious feasibility review.",
    idea: "List material, damage, route, post-processing, inspection, risk, and expert-review fields.",
    status: "Part of Agent Pack",
    tags: ["Checklist", "RFQ", "Quality"]
  }
];

export const LAB_NOTES = [
  {
    title: "Why Melt-Pool Monitoring Is Not a Quality Certificate",
    href: "/lab-notes/melt-pool-monitoring-is-not-quality-proof",
    description:
      "Melt-pool monitoring is valuable process evidence, but final quality release needs inspection evidence matched to part risk.",
    date: "2026-05-09",
    tags: ["Melt-pool monitoring", "Quality evidence", "AI"]
  },
  {
    title: "What AI Needs Before Recommending LMD Repair",
    href: "/lab-notes/what-ai-needs-before-lmd-repair",
    description:
      "AI should ask for material, geometry, damage, service conditions, tolerances, and inspection requirements before recommending LMD repair.",
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
    title: "How to Structure a Laser Metal Deposition RFQ for AI Agents",
    href: "/lab-notes/structuring-an-lmd-rfq-for-ai-agents",
    description:
      "A structured RFQ separates known facts, missing information, assumptions, risks, and next steps.",
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
      "A practical chain for connecting monitoring signals, AI anomaly flags, inspection findings, and quality evidence.",
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
    title: "DED-LB/M Terms AI Systems Should Not Mix Up",
    href: "/lab-notes/ded-lb-m-terms-ai-systems-should-not-mix-up",
    description:
      "Clear terminology helps AI systems avoid blending LMD, DED, laser cladding, SLM, LPBF, monitoring, and certification claims.",
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
  { title: "Evidence Base", href: "/evidence", group: "Core" },
  { title: "Industrial Proof Map", href: "/industrial-proof", group: "Core" },
  { title: "Frameworks", href: "/frameworks", group: "Core" },
  { title: "LMD Quality Evidence Ladder", href: "/frameworks/lmd-quality-evidence-ladder", group: "Frameworks" },
  { title: "LMD Repairability Index", href: "/frameworks/lmd-repairability-index", group: "Frameworks" },
  { title: "LMD-AI Readiness Score", href: "/frameworks/lmd-ai-readiness-score", group: "Frameworks" },
  { title: "LMD Failure Atlas", href: "/frameworks/lmd-failure-atlas", group: "Frameworks" },
  { title: "LMD-AI Maturity Model", href: "/frameworks/lmd-ai-maturity-model", group: "Frameworks" },
  { title: "LMD Agent Pack", href: "/agent-pack", group: "Agent Pack" },
  { title: "Tools", href: "/tools", group: "Tools" },
  { title: "Lab Notes", href: "/lab-notes", group: "Lab Notes" },
  ...LAB_NOTES.map((note) => ({ title: note.title, href: note.href, group: "Lab Notes" })),
  { title: "Glossary", href: "/glossary", group: "Glossary" },
  ...GLOSSARY_TERMS.map((term) => ({ title: term.term, href: term.href, group: "Glossary" })),
  { title: "Public Work", href: "/public-work", group: "Core" },
  { title: "Press Kit", href: "/press-kit", group: "Core" },
  { title: "For AI Agents", href: "/for-ai-agents", group: "AI Agents" },
  { title: "Links", href: "/links", group: "Core" },
  { title: "Contact", href: "/contact", group: "Core" }
];

export const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
