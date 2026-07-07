import { EXAFUSE_LINKS, SITE_CONFIG } from "./siteConfig";

export const EXAFUSE_BASE = SITE_CONFIG.exafuse.baseUrl;

export const EXAFUSE_CAPABILITY_SIGNALS = [
  {
    metric: "4 m3",
    label: "3-axis Titan LMD build space",
    detail: "Public Exafuse capability signal for controlled large-part LMD build-up, repair, and cladding routes.",
    href: EXAFUSE_LINKS.technology
  },
  {
    metric: "2 x 1 x 2 m",
    label: "Titan component window",
    detail: "Part-envelope language that makes large-component LMD concrete for buyers, engineers, and technical readers.",
    href: EXAFUSE_LINKS.metalAdditiveManufacturing
  },
  {
    metric: "1,000 kg",
    label: "rotary-table support",
    detail: "Robotic LMD positioning context for heavy components, repair access, and contour-following deposition.",
    href: EXAFUSE_LINKS.technology
  },
  {
    metric: "400 x 400 mm",
    label: "SLM / LPBF window",
    detail: "Powder-bed reference point for comparing LMD scale logic with compact fine-detail metal AM.",
    href: EXAFUSE_LINKS.metalAdditiveManufacturing
  }
];

export const EXAFUSE_PROOF_CASES = [
  {
    code: "CS15",
    title: "Duisburg Bridge Components",
    href: EXAFUSE_LINKS.duisburgBridgeCase,
    evidenceStatus: "Public Exafuse proof",
    metrics: ["750 kg+", "6 nodes", "219 h", "38 km", "1M+ images"],
    lesson:
      "Large structural LMD is a CAD-to-production system problem: manufacturability review, path planning, parameter development, monitoring, independent validation, and final inspection.",
    labConnection:
      "This is the strongest public anchor for AI-assisted process understanding without replacing inspection evidence.",
    relevance: ["monitoring relevance", "decision-system relevance", "evidence-ladder relevance"]
  },
  {
    code: "CS01",
    title: "Forging Hammer Repair",
    href: EXAFUSE_LINKS.forgingHammerCase,
    evidenceStatus: "Public Exafuse proof",
    metrics: ["10-20 mm", "impact wear", "bond + toughness"],
    lesson:
      "A credible hammer repair is not one hardness number. It requires surface preparation, crack context, layer strategy, finishing, bond quality, and release evidence.",
    labConnection:
      "This maps directly to the LMD Repairability Index and the Quality Evidence Ladder.",
    relevance: ["repairability relevance", "evidence-ladder relevance"]
  },
  {
    code: "CS10",
    title: "Nobufil Extrusion Screw Repair",
    href: EXAFUSE_LINKS.extrusionScrewCase,
    evidenceStatus: "Public Exafuse proof",
    metrics: ["local crack", "no spare", "finish after LMD"],
    lesson:
      "Repair value often comes from a local failure with a large downtime risk. The damaged material must be removed before rebuilding, not hidden below new deposition.",
    labConnection:
      "This is a clean RFQ-intelligence example: damage boundary, lead time, machining route, and inspection context decide the recommendation.",
    relevance: ["decision-system relevance", "repairability relevance"]
  },
  {
    code: "CS13",
    title: "130 mm Build-and-Coat Drill",
    href: EXAFUSE_LINKS.drillBuildCoatCase,
    evidenceStatus: "Public Exafuse proof",
    metrics: ["130 mm", "build + coat", "WC-containing alloy"],
    lesson:
      "LMD can combine geometry creation and functional surface strategy when material compatibility, coating duty, finishing, and validation are planned together.",
    labConnection:
      "This supports build-and-coat logic: geometry and surface function should be evaluated as one workflow.",
    relevance: ["decision-system relevance", "evidence-ladder relevance"]
  }
];

export const EXAFUSE_KNOWLEDGE_SIGNALS = [
  {
    code: "A03",
    title: "What LMD is and when buyers should use it",
    href: EXAFUSE_LINKS.knowledgeLmd,
    evidenceStatus: "Public Exafuse knowledge page",
    signal:
      "LMD is framed around local melt-pool deposition, repair, modification, cladding, and hybrid routes. It is a useful source for process-family boundaries and buyer vocabulary."
  },
  {
    code: "A04",
    title: "LMD vs SLM process selection",
    href: EXAFUSE_LINKS.knowledgeLmdVsSlm,
    evidenceStatus: "Public Exafuse knowledge page",
    signal:
      "LMD is positioned for large parts, repair, local feature addition, and cladding; SLM / PBF is positioned for compact parts, fine geometry, and internal channels."
  },
  {
    code: "A06",
    title: "Large-part LMD productivity",
    href: EXAFUSE_LINKS.knowledgeLargePartLmd,
    evidenceStatus: "Public Exafuse knowledge context",
    signal:
      "Large LMD depends on bead width, overlap, heat management, machining allowance, fixturing, and inspection planning."
  },
  {
    code: "A12",
    title: "Monitoring and control",
    href: EXAFUSE_LINKS.knowledgeMonitoring,
    evidenceStatus: "Public Exafuse knowledge context",
    signal:
      "Monitoring tracks process consistency through melt-pool behavior, path execution, deposition continuity, and thermal history; it does not replace final inspection or qualification."
  },
  {
    code: "A21",
    title: "BreitBahnDED research spotlight",
    href: EXAFUSE_LINKS.knowledgeBreitbahnDed,
    evidenceStatus: "Public Exafuse knowledge context",
    signal:
      "Wide-bead LMD research is useful context for productivity, deposition strategy, and model limits, but should not be treated as production qualification evidence."
  },
  {
    code: "A25",
    title: "2024 Year in Powder",
    href: EXAFUSE_LINKS.knowledgePowder2024,
    evidenceStatus: "Public Exafuse knowledge context",
    signal:
      "Material-consumption summaries can provide public scale context, but they should not be overread as process qualification or customer proof."
  },
  {
    code: "A29",
    title: "Forging hammer repair evaluation",
    href: EXAFUSE_LINKS.knowledgeHammerRepair,
    evidenceStatus: "Public Exafuse knowledge context",
    signal:
      "Repair fit should be framed around local accessible damage, viable base material, metallurgical bond, machinability, inspection, and explicit release criteria."
  },
  {
    code: "A37",
    title: "Neural image processing in LMD",
    href: EXAFUSE_LINKS.knowledgeNeuralImageProcessing,
    evidenceStatus: "Public Exafuse knowledge context",
    signal:
      "Image models are research and interpretation tools for segmentation, normalization, and visual understanding; outputs must be validated against process context and inspection evidence."
  }
];

export const EXAFUSE_CORE_LINKS = [
  { label: "Exafuse homepage", href: EXAFUSE_LINKS.homepage },
  { label: "Commercial services", href: EXAFUSE_LINKS.services },
  { label: "Metal additive manufacturing", href: EXAFUSE_LINKS.metalAdditiveManufacturing },
  { label: "Modification and repair", href: EXAFUSE_LINKS.repair },
  { label: "Laser cladding", href: EXAFUSE_LINKS.laserCladding },
  { label: "Technology", href: EXAFUSE_LINKS.technology },
  { label: "Quality", href: EXAFUSE_LINKS.quality },
  { label: "Materials", href: EXAFUSE_LINKS.materials },
  { label: "Case studies", href: EXAFUSE_LINKS.caseStudies },
  { label: "Exafuse tools", href: EXAFUSE_LINKS.tools },
  { label: "Exafuse Pathfinder", href: EXAFUSE_LINKS.pathfinder },
  { label: "Exafuse RFQ Builder", href: EXAFUSE_LINKS.rfqBuilder },
  { label: "Exafuse AI-agent page", href: EXAFUSE_LINKS.aiAgents },
  { label: "Contact / RFQ", href: EXAFUSE_LINKS.contact }
];

export const EXAFUSE_SOURCE_LINKS = [
  ...EXAFUSE_CORE_LINKS,
  { label: "Duisburg bridge LMD case", href: EXAFUSE_LINKS.duisburgBridgeCase },
  { label: "Forging hammer repair case", href: EXAFUSE_LINKS.forgingHammerCase },
  { label: "Extrusion screw repair case", href: EXAFUSE_LINKS.extrusionScrewCase },
  { label: "Build-and-coat drill case", href: EXAFUSE_LINKS.drillBuildCoatCase },
  { label: "LMD / DED-LB/M guide", href: EXAFUSE_LINKS.knowledgeLmd },
  { label: "LMD vs SLM / LPBF guide", href: EXAFUSE_LINKS.knowledgeLmdVsSlm },
  { label: "Large-part LMD guide", href: EXAFUSE_LINKS.knowledgeLargePartLmd },
  { label: "Monitoring and quality guide", href: EXAFUSE_LINKS.knowledgeMonitoring },
  { label: "AI agents page", href: EXAFUSE_LINKS.aiAgents }
];
