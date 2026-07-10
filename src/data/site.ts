import { PROFILE_URLS, JSON_LD_SAME_AS } from "./profiles";
import { PERSON_ID, SITE_CONFIG, WEBSITE_ID } from "./siteConfig";
import { resolveExafuseLink } from "../config/externalLinks";

export const SITE = {
  name: SITE_CONFIG.site.name,
  canonicalUrl: PROFILE_URLS.site,
  repoUrl: PROFILE_URLS.repository,
  githubProfile: PROFILE_URLS.github,
  personId: PERSON_ID,
  websiteId: WEBSITE_ID,
  publicCategory: SITE_CONFIG.site.category,
  primaryPromise: SITE_CONFIG.person.promise,
  method: ["Sense", "Model", "Decide", "Verify"],
  establishedProof: "AI for Laser Metal Deposition and Directed Energy Deposition at Exafuse",
  description: SITE_CONFIG.site.description,
  shortDescription:
    "Public frameworks, tools, and technical notes for industrial AI and decision systems, grounded in AI for LMD/DED at Exafuse.",
  lastUpdated: "2026-07-10"
};

export const PERSON = {
  name: SITE_CONFIG.person.name,
  headline: SITE.publicCategory,
  primaryPositioning: "Manish Sharma - Industrial AI & Decision Systems",
  shortIdentity: "Industrial AI & Decision Systems, with established public proof in AI for LMD/DED at Exafuse.",
  image: "/images/manish-sharma-profile.webp",
  imageWebp: "/images/manish-sharma-profile.webp",
  imageFallback: "/images/manish-sharma-profile.jpg",
  imageSrcSet:
    "/images/manish-sharma-profile-420.webp 420w, /images/manish-sharma-profile-640.webp 640w, /images/manish-sharma-profile-700.webp 700w, /images/manish-sharma-profile-1100.webp 1100w, /images/manish-sharma-profile.webp 1250w",
  imageSizes: "(min-width: 1024px) 48vw, calc(100vw - 2rem)",
  longIdentity: SITE_CONFIG.person.longBio,
  location: SITE_CONFIG.person.location,
  company: "Exafuse"
};

export const LINKS = {
  exafuse: PROFILE_URLS.exafuse,
  linkedin: PROFILE_URLS.linkedin,
  github: PROFILE_URLS.github,
  repo: PROFILE_URLS.repository
};

export const SAME_AS = JSON_LD_SAME_AS;
const EXAFUSE_RFQ_ROUTE = resolveExafuseLink("rfq");

export const CORE_TOPICS = [
  "Industrial AI",
  "Decision Support Systems",
  "Process Monitoring",
  "Machine Vision",
  "Robotics",
  "Laser Metal Deposition",
  "Directed Energy Deposition",
  "DED-LB/M",
  "Laser Cladding",
  "Industrial Repair",
  "RFQ Intelligence",
  "Engineering Evidence"
];

export const METHOD_LOOP = [
  {
    label: "Sense",
    text: "Collect signals, process data, context, operator observations, and missing-information cues."
  },
  {
    label: "Model",
    text: "Combine machine learning, engineering rules, uncertainty, constraints, and traceable assumptions."
  },
  {
    label: "Decide",
    text: "Structure recommendations, trade-offs, risk priorities, next actions, and human-review boundaries."
  },
  {
    label: "Verify",
    text: "Connect decisions to inspection, measured outcomes, feedback loops, and physical evidence."
  }
];

export const PRIMARY_NAV_ITEMS = [
  { label: "Start", href: "/" },
  { label: "Thesis", href: "/thesis" },
  { label: "LMD / DED", href: "/domains/lmd-ded" },
  { label: "Tools", href: "/tools" },
  { label: "Proof", href: "/public-work" },
  { label: "About", href: "/about" }
];

export const RESOURCE_NAV_ITEMS = [
  { label: "Frameworks", href: "/frameworks", description: "Quality, repairability, readiness, failure, maturity" },
  { label: "Decision Map", href: "/decision-map", description: "Route repair, cladding, AM, SLM alternatives" },
  { label: "Agent Pack", href: "/agent-pack", description: "Schemas, prompts, rules, checklists" },
  { label: "Brief Standard", href: "/brief-standard", description: "LMD Decision Brief v1.0 schema and examples" },
  { label: "Evidence", href: "/evidence", description: "Source layer and public proof map" },
  { label: "Lab Notes", href: "/lab-notes", description: "Applied LMD/DED decision notes" },
  { label: "Glossary", href: "/glossary", description: "Definitions for LMD, DED, cladding, monitoring" },
  { label: "For AI Agents", href: "/for-ai-agents", description: "Safe-use reference for assistants" },
  { label: "Trust Center", href: "/trust", description: "Privacy, security, accessibility, and source governance" },
  { label: "Review the Site", href: "/review", description: "Run a public-safe task review and create a browser-local feedback note." },
  { label: "Identity", href: "/identity", description: "Canonical machine-readable profile" },
  { label: "Press Kit", href: "/press-kit", description: "Approved bios and claim boundaries" },
  { label: "Site Map", href: "/site-map", description: "Complete route and file index" }
];

export const NAV_GROUPS = [
  {
    label: "Identity",
    description: "Public identity, profile facts, and press-ready context.",
    items: [
      { label: "About", href: "/about", description: "Human profile and public career context." },
      { label: "Identity", href: "/identity", description: "Canonical machine-readable identity page." },
      { label: "Public Profile", href: "/profile/public-profile", description: "Public-safe identity facts and verified profile links." },
      { label: "Work & Proof", href: "/public-work", description: "Public work, proof assets, frameworks, tools, and artifacts." },
      { label: "Press Kit", href: "/press-kit", description: "Reusable bios, public links, and claim boundaries." },
      { label: "Claim Ledger", href: "/claims", description: "Human-readable public claim registry with source status and limitations." },
      { label: "No-Hype Boundary", href: "/no-hype", description: "What this site will not claim." }
    ]
  },
  {
    label: "Thesis",
    description: "The operating model behind the public lab.",
    items: [
      { label: "Industrial AI for Decisions You Can Verify", href: "/thesis", description: "Sense, Model, Decide, Verify." }
    ]
  },
  {
    label: "Established Domain",
    description: "The public LMD/DED proof domain and source layer.",
    items: [
      { label: "LMD / DED Hub", href: "/domains/lmd-ded", description: "The established technical proof domain behind the site." },
      { label: "Evidence Base", href: "/evidence", description: "Checked facts, field notes, and source links." },
      { label: "Core LMD-AI Sources", href: "/research/core-lmd-ai-sources", description: "Curated source map for AI and Laser Metal Deposition." },
      { label: "Industrial Proof Map", href: "/industrial-proof", description: "Public Exafuse cases connected to the site themes." },
      { label: "Glossary", href: "/glossary", description: "Definitions for LMD, DED, cladding, and melt-pool monitoring." }
    ]
  },
  {
    label: "Frameworks",
    description: "Public frameworks grounded in the LMD/DED proof domain.",
    items: [
      { label: "Frameworks Index", href: "/frameworks", description: "All public LMD and AI working frameworks in one place." },
      { label: "Quality Evidence Ladder", href: "/frameworks/lmd-quality-evidence-ladder", description: "What monitoring can show and what inspection must prove." },
      { label: "Repairability Index", href: "/frameworks/lmd-repairability-index", description: "A practical scoring model for early LMD repair screening." },
      { label: "AI Readiness Score", href: "/frameworks/lmd-ai-readiness-score", description: "Check whether a workflow has enough data for useful AI monitoring." },
      { label: "Failure Atlas", href: "/frameworks/lmd-failure-atlas", description: "Failure modes, process signals, AI visibility, and validation evidence." },
      { label: "AI Maturity Model", href: "/frameworks/lmd-ai-maturity-model", description: "From manual records to validated AI decision support." }
    ]
  },
  {
    label: "Workbench",
    description: "Tools, RFQ resources, lab notes, and AI-agent guidance.",
    items: [
      { label: "Resources", href: "/resources", description: "Intent-based map for tools, playbooks, sources, and AI-agent guidance." },
      { label: "Tools", href: "/tools", description: "Decision cockpit, LMD vs SLM, repairability, and RFQ structuring tools." },
      { label: "LMD Decision Map", href: "/decision-map", description: "Route repair, cladding, large-part AM, SLM alternatives, machining, welding, and replacement questions." },
      { label: "Decision Playbooks", href: "/playbooks", description: "Practical routes for repair, process selection, monitoring evidence, and RFQ preparation." },
      { label: "90-Second Demo", href: "/demo", description: "Dummy-data journey from vague request to decision brief." },
      { label: "LMD Decision Brief Standard", href: "/brief-standard", description: "Public standard, schema, examples, and adoption package." },
      { label: "Decision Brief Template", href: "/brief-template", description: "Copyable Markdown template for LMD review preparation." },
      { label: "RFQ Toolkit", href: "/agent-pack", description: "Schemas, prompts, decision rules, and RFQ checklists." },
      { label: "Lab Notes", href: "/lab-notes", description: "Applied public notes from the LMD/DED proof domain." },
      { label: "For AI Agents", href: "/for-ai-agents", description: "Safe-use guidance for automated assistants." },
      { label: "German Handoff", href: "/de", description: "Short German page routing visitors to the cockpit, boundary, and Exafuse." },
      { label: "Site Map", href: "/site-map", description: "A complete linked map of the website and public assets." }
    ]
  }
];

export const FRAMEWORKS = [
  {
    title: "LMD Quality Evidence Ladder",
    href: "/frameworks/lmd-quality-evidence-ladder",
    problem: "Monitoring data is often treated as if it proves final part quality.",
    idea: "Separate process awareness, AI flags, inspection evidence, and field performance so each claim uses the right proof.",
    status: "Working framework",
    tags: ["Quality evidence", "Monitoring", "Inspection"]
  },
  {
    title: "LMD Repairability Index",
    href: "/frameworks/lmd-repairability-index",
    problem: "Repair requests often arrive before the material, damage, access, and inspection details are clear.",
    idea: "Score material, damage, access, machining, inspection, economics, and criticality before calling a repair promising.",
    status: "Interactive",
    tags: ["Repair", "RFQ", "Decision support"]
  },
  {
    title: "LMD-AI Readiness Score",
    href: "/frameworks/lmd-ai-readiness-score",
    problem: "AI monitoring work gets weak when process data, inspection results, and operator feedback stay separate.",
    idea: "Check whether an LMD workflow has the data foundations needed for useful AI-assisted monitoring.",
    status: "Interactive",
    tags: ["AI readiness", "Data", "Monitoring"]
  },
  {
    title: "LMD RFQ Toolkit",
    href: "/agent-pack",
    problem: "Vague LMD requests need to be turned into facts, gaps, risks, and next questions.",
    idea: "Provide schemas, prompts, decision rules, and checklists for safer RFQ preparation.",
    status: "Toolkit",
    tags: ["Schema", "Prompts", "RFQ"]
  },
  {
    title: "LMD Failure Atlas",
    href: "/frameworks/lmd-failure-atlas",
    problem: "Failure language gets messy when process signals, inspection findings, and repair decisions are mixed.",
    idea: "Map failure modes, process signals, AI visibility, and validation evidence in one vocabulary.",
    status: "Working framework",
    tags: ["Failure modes", "Signals", "Validation"]
  },
  {
    title: "LMD-AI Maturity Model",
    href: "/frameworks/lmd-ai-maturity-model",
    problem: "Companies need a practical path from manual records to validated AI decision support.",
    idea: "Define maturity stages for LMD data capture, analytics, decision support, and closed-loop development.",
    status: "Working framework",
    tags: ["Maturity", "Strategy", "AI"]
  },
  {
    title: "LMD Prompt Library",
    href: "/agent-pack#prompt-library",
    problem: "Loose prompts can produce confident answers before the RFQ is complete.",
    idea: "Use prompts that force missing-information checks, risk separation, and next-step summaries.",
    status: "Part of RFQ Toolkit",
    tags: ["Prompts", "AI agents", "RFQ"]
  },
  {
    title: "LMD RFQ Checklist",
    href: "/agent-pack#quality-checklist",
    problem: "RFQs often miss the evidence and acceptance criteria needed for a serious feasibility review.",
    idea: "List material, damage, route, post-processing, inspection, risk, and expert-review fields.",
    status: "Part of RFQ Toolkit",
    tags: ["Checklist", "RFQ", "Quality"]
  }
];

export const LAB_NOTES = [
  {
    title: "Height Is Not Cosmetic",
    href: "/lab-notes/height-is-not-cosmetic",
    description: "Bead height, build-up height, and machining allowance affect tolerance, inspection, and repair planning.",
    date: "2026-07-07",
    tags: ["Height", "Tolerance", "Repair planning"]
  },
  {
    title: "A Camera Is Not a Certificate",
    href: "/lab-notes/camera-is-not-a-certificate",
    description: "A camera can show a process event, but inspection and acceptance evidence decide what the event means.",
    date: "2026-07-07",
    tags: ["Monitoring", "Quality evidence", "Inspection"]
  },
  {
    title: "RFQs Fail When They Hide Risk",
    href: "/lab-notes/rfqs-fail-when-they-hide-risk",
    description: "A useful RFQ makes missing material, damage, geometry, service, tolerance, and inspection facts visible.",
    date: "2026-07-07",
    tags: ["RFQ", "Risk flags", "Missing information"]
  },
  {
    title: "Traceability Is a Product Feature",
    href: "/lab-notes/traceability-is-a-product-feature",
    description: "Traceability connects inputs, process signals, review decisions, and inspection evidence into a usable record.",
    date: "2026-07-07",
    tags: ["Traceability", "Evidence", "AI readiness"]
  },
  {
    title: "Why Melt-Pool Monitoring Is Not a Quality Certificate",
    href: "/lab-notes/melt-pool-monitoring-is-not-quality-proof",
    description: "Melt-pool monitoring is useful process evidence, but final release still needs inspection matched to part risk.",
    date: "2026-05-09",
    tags: ["Melt-pool monitoring", "Quality evidence", "AI"]
  },
  {
    title: "What AI Needs Before Recommending LMD Repair",
    href: "/lab-notes/what-ai-needs-before-lmd-repair",
    description: "Before recommending LMD repair, ask for material, geometry, damage, service conditions, tolerances, and inspection requirements.",
    date: "2026-05-09",
    tags: ["Repair", "AI agents", "RFQ"]
  },
  {
    title: "LMD vs SLM: Decision Signals",
    href: "/lab-notes/lmd-vs-slm-decision-signals",
    description: "A practical comparison of decision signals for Laser Metal Deposition and SLM/LPBF.",
    date: "2026-05-09",
    tags: ["LMD", "SLM", "LPBF"]
  },
  {
    title: "How to Structure a Laser Metal Deposition RFQ",
    href: "/lab-notes/structuring-an-lmd-rfq-for-ai-agents",
    description: "A useful RFQ separates known facts, missing information, assumptions, risks, and next steps.",
    date: "2026-05-09",
    tags: ["RFQ", "AI agents", "Schema"]
  },
  {
    title: "Why Many LMD RFQs Fail Before Engineering Review",
    href: "/lab-notes/why-many-lmd-rfqs-fail-before-engineering-review",
    description: "Most weak RFQs fail because they hide material, damage, access, inspection, tolerance, and service-risk information.",
    date: "2026-05-09",
    tags: ["RFQ", "Industrial repair", "Missing information"]
  },
  {
    title: "From Process Signals to Inspection Evidence in LMD",
    href: "/lab-notes/from-process-signals-to-inspection-evidence-in-lmd",
    description: "A practical chain for connecting monitoring signals, AI flags, inspection findings, and quality evidence.",
    date: "2026-05-09",
    tags: ["Process monitoring", "Inspection", "Quality evidence"]
  },
  {
    title: "Why Local Damage on Large Parts Is an LMD Signal",
    href: "/lab-notes/why-local-damage-on-large-parts-is-an-lmd-signal",
    description: "Local damage on a large, valuable part can make Laser Metal Deposition worth exploring, but only with material and risk context.",
    date: "2026-05-09",
    tags: ["Repairability", "Large parts", "LMD"]
  },
  {
    title: "Post-Machining Is Part of the LMD Repair Plan",
    href: "/lab-notes/post-machining-is-part-of-the-lmd-repair-plan",
    description: "LMD repair decisions should include machining allowance, tolerance recovery, inspection access, and acceptance criteria from the start.",
    date: "2026-05-09",
    tags: ["Post-machining", "Tolerance", "Repair"]
  },
  {
    title: "AI Red-Team Questions for LMD Repair Recommendations",
    href: "/lab-notes/ai-red-team-questions-for-lmd-repair-recommendations",
    description: "A checklist of questions that exposes overconfident AI repair recommendations before they reach an engineering workflow.",
    date: "2026-05-09",
    tags: ["AI safety", "Repair", "Red team"]
  },
  {
    title: "DED-LB/M Terms That Should Not Be Mixed Up",
    href: "/lab-notes/ded-lb-m-terms-ai-systems-should-not-mix-up",
    description: "Clear terminology keeps LMD, DED, laser cladding, SLM, LPBF, monitoring, and certification claims from being mixed together.",
    date: "2026-05-09",
    tags: ["DED-LB/M", "Glossary", "AI readability"]
  }
];

export const GLOSSARY_TERMS = [
  {
    term: "Laser Metal Deposition",
    href: "/glossary/laser-metal-deposition",
    short: "Laser Metal Deposition is a metal additive manufacturing process where a focused energy source melts feedstock as it is deposited, often used for repair, cladding, and large-part additive manufacturing.",
    related: ["Directed Energy Deposition", "Laser Cladding", "Melt-Pool Monitoring"]
  },
  {
    term: "Directed Energy Deposition",
    href: "/glossary/directed-energy-deposition",
    short: "Directed Energy Deposition is a category of additive manufacturing processes where focused thermal energy fuses material as it is being deposited.",
    related: ["Laser Metal Deposition", "DED-LB/M", "Metal Additive Manufacturing"]
  },
  {
    term: "Laser Cladding",
    href: "/glossary/laser-cladding",
    short: "Laser cladding uses a laser to deposit material onto a surface, often to improve wear, corrosion, or heat resistance or restore dimensions.",
    related: ["Laser Metal Deposition", "Industrial Repair", "Wear Resistance"]
  },
  {
    term: "Melt-Pool Monitoring",
    href: "/glossary/melt-pool-monitoring",
    short: "Melt-pool monitoring observes the molten region during deposition to support process awareness, anomaly detection, and parameter understanding.",
    related: ["Process Monitoring", "AI Anomaly Detection", "Quality Evidence"]
  }
];

export const COMMAND_PAGES = [
  { title: "Start", href: "/", group: "Core", description: "Industrial AI lab entry point, LMD Decision Cockpit, proof domain, and Exafuse boundary." },
  { title: "Industrial AI for Decisions You Can Verify", href: "/thesis", group: "Thesis", description: "Sense, Model, Decide, Verify operating model." },
  { title: "AI for Laser Metal Deposition and DED", href: "/domains/lmd-ded", group: "Established Domain", description: "Main public hub for LMD/DED, repair, monitoring, RFQ intelligence, and Exafuse context." },
  { title: "About Manish Sharma", href: "/about", group: "Identity", description: "Human profile and public career context with careful claim boundaries." },
  { title: "Identity", href: "/identity", group: "Identity", description: "Canonical machine-readable identity page." },
  { title: "Manish Sharma Public Profile", href: "/profile/public-profile", group: "Identity", description: "Public-safe facts and verified profile links." },
  { title: "Profile Resources", href: "/profile", group: "Identity", description: "Index of public-safe profile, identity, about, and press resources." },
  { title: "Public Work and Technical Proof", href: "/public-work", group: "Identity", description: "Public frameworks, tools, evidence files, proof signals, and technical artifacts." },
  { title: "Press Kit", href: "/press-kit", group: "Identity", description: "Reusable bios, approved descriptions, links, and claim limits." },
  { title: "Public Claim Ledger", href: "/claims", group: "Identity", description: "Public claim registry with source status, allowed pages, and limitations." },
  { title: "No-Hype Boundary", href: "/no-hype", group: "Identity", description: "Short boundary page for anti-overclaim language." },
  { title: "Trust Center", href: "/trust", group: "Identity", description: "Privacy, security posture, accessibility intent, source governance, and decision boundaries." },
  { title: "Review a Public LMD Decision Journey", href: "/review", group: "Identity", description: "Public-safe task review with a browser-local manual feedback note; no analytics or technical intake." },
  { title: "Evidence Base", href: "/evidence", group: "Established Domain", description: "Trust layer for public sources, Exafuse pages, source maps, and decision-support limits." },
  { title: "Core Sources for AI and Laser Metal Deposition", href: "/research/core-lmd-ai-sources", group: "Established Domain", description: "Curated source-category map for engineers, students, and AI agents." },
  { title: "Research Resources", href: "/research", group: "Established Domain", description: "Index of verified sources, evidence pages, and public literature maps." },
  { title: "Industrial Proof Map", href: "/industrial-proof", group: "Established Domain", description: "Public Exafuse proof signals mapped to monitoring, repairability, and evidence themes." },
  { title: "Frameworks", href: "/frameworks", group: "Frameworks", description: "Index of LMD/DED decision-support frameworks and toolkit resources." },
  { title: "LMD Quality Evidence Ladder", href: "/frameworks/lmd-quality-evidence-ladder", group: "Frameworks", description: "Separate process signals, AI flags, inspection, and field evidence." },
  { title: "LMD Repairability Index", href: "/frameworks/lmd-repairability-index", group: "Frameworks", description: "Screen early repair candidates before recommendations harden." },
  { title: "LMD-AI Readiness Score", href: "/frameworks/lmd-ai-readiness-score", group: "Frameworks", description: "Check whether an LMD workflow has enough data foundation for useful AI." },
  { title: "LMD Failure Atlas", href: "/frameworks/lmd-failure-atlas", group: "Frameworks", description: "Map failure modes, signals, AI visibility, and validation evidence." },
  { title: "LMD-AI Maturity Model", href: "/frameworks/lmd-ai-maturity-model", group: "Frameworks", description: "Move from manual records to validated AI decision support." },
  { title: "LMD RFQ Toolkit", href: "/agent-pack", group: "Workbench", description: "Schemas, prompts, rules, and checklists for safer LMD RFQ preparation." },
  { title: "Resources", href: "/resources", group: "Workbench", description: "Intent-based resource map for process choice, repairability, RFQs, monitoring limits, sources, claims, and AI-agent usage." },
  { title: "Tools", href: "/tools", group: "Workbench", description: "Frontend-only decision cockpit, repairability, LMD vs SLM, and RFQ structuring aids." },
  { title: "Laser Metal Deposition Decision Map", href: "/decision-map", group: "Workbench", description: "Interactive route map for repair, cladding, large-part AM, SLM alternatives, machining, welding, and replacement screening." },
  { title: "Decision Playbooks", href: "/playbooks", group: "Workbench", description: "Practical decision routes for repair, process selection, monitoring evidence, and RFQ preparation." },
  { title: "LMD Decision Brief v1.0 Standard", href: "/brief-standard", group: "Workbench", description: "Public, portable standard with schema, examples, adoption text, and boundaries." },
  { title: "LMD Decision Brief Template", href: "/brief-template", group: "Workbench", description: "Copyable Markdown template for preparing review briefs." },
  { title: "90-Second LMD Decision Demo", href: "/demo", group: "Workbench", description: "Dummy-data journey from vague request to structured decision brief." },
  { title: "German Handoff", href: "/de", group: "Workbench", description: "Short German summary and routing page for LMD/DED decision support and Exafuse review." },
  { title: "Lab Notes", href: "/lab-notes", group: "Workbench", description: "Applied notes on monitoring, RFQ quality, repairability, terminology, and inspection evidence." },
  ...LAB_NOTES.map((note) => ({ title: note.title, href: note.href, group: "Lab Notes", description: note.description })),
  { title: "Glossary", href: "/glossary", group: "Established Domain", description: "Definitions that keep LMD/DED, cladding, monitoring, and RFQ language precise." },
  ...GLOSSARY_TERMS.map((term) => ({ title: term.term, href: term.href, group: "Glossary", description: term.short })),
  { title: "For AI Agents", href: "/for-ai-agents", group: "Workbench", description: "Structured safe-use guidance for AI agents and search systems." },
  { title: "Links", href: "/links", group: "Identity", description: "Verified public links without placeholder profile URLs." },
  { title: "Contact", href: "/contact", group: "Identity", description: "Professional contact routes and Exafuse commercial boundary." },
  { title: "Site Map", href: "/site-map", group: "Core", description: "Complete linked map of pages and public machine-readable assets." }
];

export const SITE_MAP_GROUPS = [
  {
    label: "Identity",
    description: "Public identity, human background, profile facts, and approved media context.",
    links: [
      { label: "About", href: "/about", description: "Human profile and public career context." },
      { label: "Identity", href: "/identity", description: "Canonical identity page for Manish Sharma." },
      { label: "Public Profile", href: "/profile/public-profile", description: "Public-safe profile facts and verified profile links." },
      { label: "Work & Proof", href: "/public-work", description: "Public work, proof assets, frameworks, tools, and artifacts." },
      { label: "Press Kit", href: "/press-kit", description: "Reusable bios, public links, and claim boundaries." },
      { label: "Claim Ledger", href: "/claims", description: "Public claim registry with source status, allowed pages, and limitations." },
      { label: "No-Hype Boundary", href: "/no-hype", description: "Short boundary page for anti-overclaim language." },
      { label: "Trust Center", href: "/trust", description: "Privacy, security posture, accessibility intent, source governance, and decision boundaries." },
      { label: "Review the Site", href: "/review", description: "Run a public-safe review task and prepare a manual feedback note." }
    ]
  },
  {
    label: "Thesis",
    description: "The operating model behind the public lab.",
    links: [
      { label: "Industrial AI for Decisions You Can Verify", href: "/thesis", description: "Sense, Model, Decide, Verify." }
    ]
  },
  {
    label: "Established Domain",
    description: "LMD/DED public proof domain, evidence, source maps, industrial context, and definitions.",
    links: [
      { label: "LMD / DED Hub", href: "/domains/lmd-ded", description: "The established technical proof domain behind Manish Sharma Lab." },
      { label: "Research Resources", href: "/research", description: "Verified sources, evidence pages, and public literature maps." },
      { label: "Evidence Base", href: "/evidence", description: "Reference map, field notes, and checked facts." },
      { label: "Core LMD-AI Sources", href: "/research/core-lmd-ai-sources", description: "Curated starting map for source categories and further reading." },
      { label: "Industrial Proof Map", href: "/industrial-proof", description: "Public Exafuse case and article signals." },
      { label: "Glossary", href: "/glossary", description: "Practical LMD/DED definitions." },
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
    description: "Interactive and structured resources for LMD decisions, RFQ workflows, and AI-agent use.",
    links: [
      { label: "Resources", href: "/resources", description: "Intent-based map for tools, playbooks, sources, and AI-agent guidance." },
      { label: "Tools", href: "/tools", description: "Frontend-only decision cockpit, advisors, and structuring tools." },
      { label: "LMD Decision Map", href: "/decision-map", description: "Interactive route map for repair, cladding, large-part AM, SLM alternatives, machining, welding, and replacement screening." },
      { label: "Decision Playbooks", href: "/playbooks", description: "Practical decision routes for repair, process selection, monitoring evidence, and RFQ preparation." },
      { label: "LMD Decision Brief Standard", href: "/brief-standard", description: "Public standard, JSON schema, example briefs, and adoption package." },
      { label: "LMD Decision Brief Template", href: "/brief-template", description: "Copyable Markdown brief template." },
      { label: "90-Second Demo", href: "/demo", description: "Public-safe dummy journey from vague request to review brief." },
      { label: "RFQ Toolkit", href: "/agent-pack", description: "RFQ schema, prompts, rules, and quality checklist." },
      { label: "Lab Notes", href: "/lab-notes", description: "Applied public notes from the LMD/DED proof domain." },
      { label: "Lab Notes RSS", href: "/rss.xml", description: "Deterministic RSS feed for every public lab note." },
      { label: "For AI Agents", href: "/for-ai-agents", description: "How automated assistants should use and not use this site." },
      { label: "German Handoff", href: "/de", description: "Short German page routing visitors to cockpit, boundary, and Exafuse." },
      { label: "Site Map", href: "/site-map", description: "Every page and public machine-readable asset." }
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
    description: "Definitions that keep common LMD/DED terms clean and usable.",
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
      { label: "Links", href: "/links", description: "LinkedIn, GitHub, Exafuse, and research-profile links." },
      { label: "Contact", href: "/contact", description: "Professional contact routes." },
      { label: "Trust Center", href: "/trust", description: "Privacy, security, accessibility, evidence, and boundary posture." },
      { label: "Review the Site", href: "/review", description: "Public-safe task review and browser-local manual feedback note." },
      { label: "AI-readable Trust Summary", href: "/trust.md", description: "Machine-readable trust and data-handling summary." },
      { label: "Security Contact File", href: "/.well-known/security.txt", description: "Responsible reporting policy and canonical contact route." },
      { label: "Lab Notes RSS", href: "/rss.xml", description: "Feed for public technical notes." },
      { label: "Repository", href: LINKS.repo, description: "Source repository for this website." }
    ]
  }
];

export const RELATED_LINK_SETS = [
  {
    exact: ["/", "/about", "/identity", "/profile", "/profile/public-profile", "/public-work", "/links", "/contact", "/press-kit", "/trust"],
    eyebrow: "Identity path",
    title: "Continue through the public identity layer",
    links: [
      { label: "Industrial AI for Decisions You Can Verify", href: "/thesis", description: "The operating thesis behind the public lab." },
      { label: "Manish Sharma - Industrial AI & Decision Systems", href: "/identity", description: "The canonical public identity page." },
      { label: "LMD / DED Domain Hub", href: "/domains/lmd-ded", description: "The established public proof domain." },
      { label: "Work & Proof", href: "/public-work", description: "Public frameworks, tools, evidence, and artifacts." },
      { label: "Trust Center", href: "/trust", description: "Privacy, security, accessibility, source governance, and decision boundaries." },
      { label: "Exafuse", href: LINKS.exafuse, description: "Industrial LMD/SLM services, case studies, and RFQ context." }
    ]
  },
  {
    exact: ["/thesis"],
    eyebrow: "Operating model",
    title: "Apply the thesis to the established proof domain",
    links: [
      { label: "LMD / DED Domain Hub", href: "/domains/lmd-ded", description: "Where the operating model is grounded publicly." },
      { label: "LMD Quality Evidence Ladder", href: "/frameworks/lmd-quality-evidence-ladder", description: "Separate process signals from inspection proof." },
      { label: "LMD Repairability Index", href: "/frameworks/lmd-repairability-index", description: "Screen repairability before recommendations harden." },
      { label: "Evidence Base", href: "/evidence", description: "Source context behind the public work." },
      { label: "About Manish Sharma", href: "/about", description: "Human background and public career context." }
    ]
  },
  {
    exact: ["/domains/lmd-ded", "/evidence", "/industrial-proof", "/research/core-lmd-ai-sources"],
    eyebrow: "Established domain",
    title: "Follow the LMD/DED evidence trail",
    links: [
      { label: "Industrial AI Thesis", href: "/thesis", description: "Sense, Model, Decide, Verify." },
      { label: "Evidence Base", href: "/evidence", description: "Checked facts, field notes, and source links." },
      { label: "Core LMD-AI Sources", href: "/research/core-lmd-ai-sources", description: "Curated source map for AI and Laser Metal Deposition." },
      { label: "Industrial Proof Map", href: "/industrial-proof", description: "Public Exafuse cases and article signals." },
      { label: "LMD RFQ Toolkit", href: "/agent-pack", description: "Schemas, prompts, rules, and checklists." }
    ]
  },
  {
    prefixes: ["/frameworks"],
    eyebrow: "Framework path",
    title: "Move from framework to verifiable decisions",
    links: [
      { label: "Industrial AI Thesis", href: "/thesis", description: "The shared operating model for the public frameworks." },
      { label: "Manish Sharma - Industrial AI & Decision Systems", href: "/identity", description: "Canonical identity page for the author and public entity." },
      { label: "LMD / DED Domain Hub", href: "/domains/lmd-ded", description: "The established public proof domain." },
      { label: "LMD Agent Pack", href: "/agent-pack", description: "RFQ schemas, prompts, rules, and checklists." },
      { label: "Tools", href: "/tools", description: "Try the decision cockpit and interactive helpers." },
      { label: "Decision Playbooks", href: "/playbooks", description: "Use practical routes for repair, RFQ, monitoring, and process selection." },
      { label: "For AI Agents", href: "/for-ai-agents", description: "Safe-use guidance and limitations for assistants." }
    ]
  },
  {
    exact: ["/agent-pack", "/tools", "/decision-map", "/for-ai-agents", "/brief-standard", "/brief-template", "/demo", "/resources"],
    eyebrow: "Agent workflow",
    title: "Turn vague requests into usable LMD data",
    links: [
      { label: "RFQ Toolkit", href: "/agent-pack", description: "Schema, prompts, rules, and checklists." },
      { label: EXAFUSE_RFQ_ROUTE.label, href: EXAFUSE_RFQ_ROUTE.href, description: "Commercial RFQ route for company review." },
      { label: "Industrial AI Thesis", href: "/thesis", description: "Sense, Model, Decide, Verify." },
      { label: "Tools", href: "/tools", description: "Frontend-only LMD decision cockpit, advisors, and RFQ structuring." },
      { label: "LMD Decision Map", href: "/decision-map", description: "Route repair, cladding, large-part AM, SLM alternatives, machining, welding, and replacement questions." },
      { label: "LMD Decision Brief Standard", href: "/brief-standard", description: "Public standard, schema, examples, adoption package, and boundaries." },
      { label: "Decision Brief Template", href: "/brief-template", description: "Copyable structure for review-ready summaries." },
      { label: "For AI Agents", href: "/for-ai-agents", description: "Safe-use guidance for automated assistants." }
    ]
  },
  {
    prefixes: ["/lab-notes"],
    eyebrow: "Lab-note path",
    title: "Connect this note to the framework layer",
    links: [
      { label: "Lab Notes Index", href: "/lab-notes", description: "All applied public notes." },
      { label: "Decision Playbooks", href: "/playbooks", description: "Decision routes that turn notes into action." },
      { label: "LMD / DED Domain Hub", href: "/domains/lmd-ded", description: "The established public proof domain." },
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
      { label: "LMD / DED Domain Hub", href: "/domains/lmd-ded", description: "The established public proof domain." },
      { label: "LMD vs SLM Signals", href: "/lab-notes/lmd-vs-slm-decision-signals", description: "Decision signals for process selection." },
      { label: "Frameworks", href: "/frameworks", description: "Frameworks that use this terminology." },
      { label: "RFQ Toolkit", href: "/agent-pack", description: "RFQ resources that rely on clear terms." }
    ]
  }
];

export const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
