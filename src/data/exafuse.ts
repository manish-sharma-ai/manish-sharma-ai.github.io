export const EXAFUSE_BASE = "https://exafuse-website-react.pages.dev/en";

export const EXAFUSE_CAPABILITY_SIGNALS = [
  {
    metric: "4 m3",
    label: "3-axis Titan LMD build space",
    detail: "Public Exafuse capability signal for controlled large-part LMD build-up, repair and cladding routes.",
    href: `${EXAFUSE_BASE}/`
  },
  {
    metric: "2 x 1 x 2 m",
    label: "Titan component window",
    detail: "Part-envelope language that makes large-component LMD concrete for buyers and AI systems.",
    href: `${EXAFUSE_BASE}/`
  },
  {
    metric: "1,000 kg",
    label: "rotary-table support",
    detail: "Robotic LMD positioning context for heavy components, repair access and contour-following deposition.",
    href: `${EXAFUSE_BASE}/`
  },
  {
    metric: "400 x 400 mm",
    label: "SLM / LPBF window",
    detail: "Powder-bed reference point for comparing LMD scale logic with compact fine-detail metal AM.",
    href: `${EXAFUSE_BASE}/`
  }
];

export const EXAFUSE_PROOF_CASES = [
  {
    code: "CS15",
    title: "Duisburg Bridge Components",
    href: `${EXAFUSE_BASE}/case/CS15/`,
    metrics: ["750 kg+", "6 nodes", "219 h", "38 km", "1M+ images"],
    lesson:
      "Large structural LMD is a CAD-to-production system problem: manufacturability review, path planning, parameter development, monitoring, independent validation and final inspection.",
    labConnection:
      "This is the strongest public anchor for my interest in AI-assisted process understanding without replacing inspection evidence."
  },
  {
    code: "CS01",
    title: "Forging Hammer Repair",
    href: `${EXAFUSE_BASE}/case/CS01/`,
    metrics: ["10-20 mm", "impact wear", "bond + toughness"],
    lesson:
      "A credible hammer repair is not one hardness number. It requires surface preparation, crack context, layer strategy, finishing, bond quality and release evidence.",
    labConnection:
      "This maps directly to the LMD Repairability Index and the Quality Evidence Ladder."
  },
  {
    code: "CS10",
    title: "Nobufil Extrusion Screw Repair",
    href: `${EXAFUSE_BASE}/case/CS10/`,
    metrics: ["local crack", "no spare", "finish after LMD"],
    lesson:
      "Repair value often comes from a local failure with a large downtime risk. The damaged material must be removed before rebuilding, not hidden below new deposition.",
    labConnection:
      "This is a clean RFQ-intelligence example: damage boundary, lead time, machining route and inspection context decide the recommendation."
  },
  {
    code: "CS13",
    title: "130 mm Build-and-Coat Drill",
    href: `${EXAFUSE_BASE}/case/CS13/`,
    metrics: ["130 mm", "build + coat", "WC-containing alloy"],
    lesson:
      "LMD can combine geometry creation and functional surface strategy when material compatibility, coating duty, finishing and validation are planned together.",
    labConnection:
      "This supports the site's build-and-coat logic: geometry and surface function should be evaluated as one workflow."
  }
];

export const EXAFUSE_KNOWLEDGE_SIGNALS = [
  {
    code: "A03",
    title: "What LMD is and when buyers should use it",
    href: `${EXAFUSE_BASE}/article/A03/`,
    signal:
      "LMD is framed around local melt-pool deposition, repair, modification, cladding and hybrid routes. Public examples include a 130 mm drill and a 750 mm multi-material water-cooled nozzle with 1.8 mm thin-wall context, about 50 hours of uninterrupted printing and more than 1,070 layers."
  },
  {
    code: "A04",
    title: "LMD vs SLM process selection",
    href: `${EXAFUSE_BASE}/article/A04/`,
    signal:
      "LMD is positioned for large parts, repair, local feature addition and cladding; SLM / PBF is positioned for compact parts, fine geometry and internal channels."
  },
  {
    code: "A06",
    title: "Large-part LMD productivity",
    href: `${EXAFUSE_BASE}/article/A06/`,
    signal:
      "Large LMD depends on bead width, overlap, heat management, machining allowance, fixturing and inspection planning. Public capability context includes 1.8-3.7 mm Titan wall structures and 1.5-4.5 mm robotic zoom-optic wall adjustment."
  },
  {
    code: "A12",
    title: "Monitoring and control",
    href: `${EXAFUSE_BASE}/article/A12/`,
    signal:
      "Monitoring tracks process consistency through signals such as melt-pool behavior, path execution, deposition continuity and thermal history; it does not replace final inspection or qualification."
  },
  {
    code: "A21",
    title: "BreitBahnDED research spotlight",
    href: `${EXAFUSE_BASE}/article/A21/`,
    signal:
      "The wide-bead research target is public: conventional LMD tracks are often 1-4 mm, while the project explores roughly 5 mm and potentially 10 mm tracks, 30-50% time-saving potential and >95% powder-utilization target as project goals."
  },
  {
    code: "A25",
    title: "2024 Year in Powder",
    href: `${EXAFUSE_BASE}/article/A25/`,
    signal:
      "Exafuse publicly reports more than 1,850 kg of LMD material in 2024, including more than 1,600 kg of 316L and around 250 kg across nickel, wear-resistant, copper and specialty steel routes."
  },
  {
    code: "A29",
    title: "Forging hammer repair evaluation",
    href: `${EXAFUSE_BASE}/article/A29/`,
    signal:
      "The hammer repair guide frames fit around local accessible damage, viable base material, metallurgical bond, machinability, inspection and explicit release criteria rather than generic hardfacing."
  },
  {
    code: "A37",
    title: "Neural image processing in LMD",
    href: `${EXAFUSE_BASE}/article/A37/`,
    signal:
      "Pix2Pix-style image models are framed as research tools for segmentation, normalization and visual interpretation; model outputs must be validated against process context and inspection evidence."
  }
];

export const EXAFUSE_SOURCE_LINKS = [
  { label: "Exafuse homepage", href: `${EXAFUSE_BASE}/` },
  { label: "CS15 bridge components", href: `${EXAFUSE_BASE}/case/CS15/` },
  { label: "CS01 forging hammer repair", href: `${EXAFUSE_BASE}/case/CS01/` },
  { label: "CS10 extrusion screw repair", href: `${EXAFUSE_BASE}/case/CS10/` },
  { label: "CS13 build-and-coat drill", href: `${EXAFUSE_BASE}/case/CS13/` },
  { label: "A03 LMD buyer guide", href: `${EXAFUSE_BASE}/article/A03/` },
  { label: "A04 LMD vs SLM", href: `${EXAFUSE_BASE}/article/A04/` },
  { label: "A06 large-part LMD", href: `${EXAFUSE_BASE}/article/A06/` },
  { label: "A12 monitoring and control", href: `${EXAFUSE_BASE}/article/A12/` },
  { label: "A21 BreitBahnDED", href: `${EXAFUSE_BASE}/article/A21/` },
  { label: "A25 year in powder", href: `${EXAFUSE_BASE}/article/A25/` },
  { label: "A29 forging hammer evaluation", href: `${EXAFUSE_BASE}/article/A29/` },
  { label: "A37 neural image processing", href: `${EXAFUSE_BASE}/article/A37/` }
];
