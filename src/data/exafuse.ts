import { EXAFUSE_LINKS, SITE_CONFIG } from "./siteConfig";
import { getRenderableClaimsForCase } from "./publicClaims";
import { resolveExafuseLink, type ExafuseUrlKey } from "../config/externalLinks";

export const EXAFUSE_BASE = SITE_CONFIG.exafuse.baseUrl;

function sourceLink(key: ExafuseUrlKey, description?: string) {
  const link = resolveExafuseLink(key);
  return {
    label: link.label,
    href: link.href,
    status: link.status,
    description:
      description ??
      (link.migrationGated
        ? "Use the current Exafuse contact or index page while exact supporting source pages are verified."
        : "Verified production Exafuse route.")
  };
}

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
    sourceStatus: resolveExafuseLink("cs15").status,
    evidenceStatus: "Public Exafuse proof context",
    metricClaims: getRenderableClaimsForCase("CS15"),
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
    sourceStatus: resolveExafuseLink("cs01").status,
    evidenceStatus: "Public Exafuse proof context",
    metricClaims: getRenderableClaimsForCase("CS01"),
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
    sourceStatus: resolveExafuseLink("cs10").status,
    evidenceStatus: "Public Exafuse proof context",
    metricClaims: getRenderableClaimsForCase("CS10"),
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
    sourceStatus: resolveExafuseLink("cs13").status,
    evidenceStatus: "Public Exafuse proof context",
    metricClaims: getRenderableClaimsForCase("CS13"),
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
  sourceLink("home"),
  sourceLink("services"),
  sourceLink("metalAm"),
  sourceLink("repair"),
  sourceLink("cladding"),
  sourceLink("technology"),
  sourceLink("quality"),
  sourceLink("materials"),
  sourceLink("caseStudies"),
  sourceLink("tools"),
  sourceLink("pathfinder"),
  sourceLink("rfq"),
  sourceLink("aiAgents"),
  sourceLink("contact", "Commercial RFQ and company contact route.")
];

export const EXAFUSE_SOURCE_LINKS = [
  ...EXAFUSE_CORE_LINKS,
  sourceLink("cs15"),
  sourceLink("cs01"),
  sourceLink("cs10"),
  sourceLink("cs13"),
  sourceLink("lmdGuide"),
  sourceLink("lmdVsSlmGuide"),
  sourceLink("largePartLmdGuide"),
  sourceLink("monitoringGuide"),
  sourceLink("aiAgents")
];
