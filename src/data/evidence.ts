import { LINKS, SITE } from "./site";

export const RESEARCH_SCAN = {
  count: 500,
  generatedAt: "2026-05-10",
  file: "/research/lmd-literature-scan.json",
  method:
    "OpenAlex reference map across eight LMD, DED, laser cladding, melt-pool monitoring, and machine-learning queries. I use it for orientation and vocabulary; exact claims still come from checked sources.",
  topVenues: [
    ["Additive Manufacturing", "54 records"],
    ["Materials & Design", "27 records"],
    ["International Journal of Advanced Manufacturing Technology", "19 records"],
    ["Journal of Materials Processing Technology", "17 records"],
    ["Materials", "16 records"]
  ]
};

export const PERSONAL_PROOF_POINTS = [
  {
    value: "6+",
    label: "years",
    detail:
      "Working with DED/LMD across university research, robotic systems, and industrial Exafuse projects."
  },
  {
    value: "2018",
    label: "first LMD paper",
    detail:
      "Co-authored a Procedia CIRP paper on laser metal deposition of lattice structures by columnar built-up."
  },
  {
    value: "97%",
    label: "M.Sc. grade",
    detail:
      "Lasers and Photonics at Ruhr University Bochum, with Faculty Prize / Best Student."
  },
  {
    value: "ROS2",
    label: "systems layer",
    detail:
      "Sensor/camera control and real-time data pipelines around DED/LMD process monitoring."
  }
];

export const FIELD_NOTES = [
  {
    title: "Height is not a cosmetic variable.",
    text:
      "In DED/LMD, stand-off distance and layer-height errors add up quickly. I treat height sensing, toolpath correction, and post-machining allowance as part of the process plan, not a late fix."
  },
  {
    title: "A camera is not a certificate.",
    text:
      "Coaxial vision, pyrometry, and melt-pool features are useful because they tell us what the process was doing. They only become strong evidence when they are connected to inspection results."
  },
  {
    title: "RFQs fail when they hide risk.",
    text:
      "A weak request is not always a short request. The real problem is missing material grade, damage depth, tolerance, operating conditions, or inspection criteria."
  },
  {
    title: "Traceability is a product feature.",
    text:
      "For industrial DED/LMD, parameter logs, change control, build reports, inspection reports, and deviation tracking are part of the work, not paperwork at the end."
  }
];

export const EVIDENCE_FACTS = [
  {
    metric: "10^3-10^5 C/s",
    label: "Typical DED cooling-rate range",
    detail:
      "A DED state-of-the-art review reports typical cooling rates in this range. That is one reason I care about process history and thermal context.",
    source: "Ahn, Directed Energy Deposition (DED) Process: State of the Art",
    href: "https://link.springer.com/article/10.1007/s40684-020-00302-7"
  },
  {
    metric: "30-200 um",
    label: "Common powder particle diameter range",
    detail:
      "The same DED review gives this as a common powder diameter range for laser additive manufacturing DED processes.",
    source: "Ahn, 2021",
    href: "https://link.springer.com/article/10.1007/s40684-020-00302-7"
  },
  {
    metric: "<30%",
    label: "General material usage efficiency reported for LAM-DED",
    detail:
      "The review notes that specific cases can be much higher, but the general reported efficiency is often below this value.",
    source: "Ahn, 2021",
    href: "https://link.springer.com/article/10.1007/s40684-020-00302-7"
  },
  {
    metric: "10-30%",
    label: "Dilution-ratio window cited for proper first-layer dilution",
    detail:
      "The review summarizes literature proposing this range. Outside it, lack-of-fusion and keyhole-type risks become part of the discussion.",
    source: "Ahn, 2021",
    href: "https://link.springer.com/article/10.1007/s40684-020-00302-7"
  },
  {
    metric: "1-3 mm vs <200 um",
    label: "LMD focus size compared with SLM in Sharma et al.",
    detail:
      "Our lattice-structure LMD paper contrasts LMD's larger focus size with SLM's smaller focus, which is why the process design logic is different.",
    source: "Sharma et al., Procedia CIRP 2018",
    href: "https://www.sciencedirect.com/science/article/pii/S2212827118308849"
  },
  {
    metric: "1070 nm / 450 W / 2 mm",
    label: "Parameters from Manish Sharma's 2018 LMD paper",
    detail:
      "The published experiment used a ytterbium fiber laser, 316L powder, a 2 mm focus size, and a 3 mm substrate for columnar built-up lattice experiments.",
    source: "Sharma et al., Procedia CIRP 2018",
    href: "https://www.sciencedirect.com/science/article/pii/S2212827118308849"
  },
  {
    metric: "45-90 um",
    label: "316L powder size in the 2018 lattice experiment",
    detail:
      "I keep details like this visible because they are more useful than a generic portfolio claim.",
    source: "Sharma et al., Procedia CIRP 2018",
    href: "https://www.sciencedirect.com/science/article/pii/S2212827118308849"
  },
  {
    metric: "5-10 mm / >95%",
    label: "BreitbahnDED project targets",
    detail:
      "From my public profile material: broad-track DED goals include rotating multi-spot optics, 5-10 mm wide tracks, multimodal monitoring, layer-to-layer control, and a >95% powder-utilization target. This is a project target, not a published result claim.",
    source: "Manish Sharma CV, local profile material",
    href: `${SITE.canonicalUrl}/about`
  }
];

export const CITED_SOURCES = [
  {
    label: "NIST Directed Energy Deposition overview",
    href: "https://www.nist.gov/additive-manufacturing/research-areas/technologies/directed-energy-deposition"
  },
  {
    label: "ASTM DED standard announcement",
    href: "https://www.astm.org/news/press-releases/new-astm-additive-manufacturing-standard-focuses-directed-energy-deposition"
  },
  {
    label: "Ahn - Directed Energy Deposition Process: State of the Art",
    href: "https://link.springer.com/article/10.1007/s40684-020-00302-7"
  },
  {
    label: "Sharma et al. - Laser metal deposition of lattice structures by columnar built-up",
    href: "https://www.sciencedirect.com/science/article/pii/S2212827118308849"
  },
  {
    label: "NIST/JOM 2024 - parallel monitoring in powder-blown DED",
    href: "https://www.nist.gov/publications/situ-parallel-monitoring-relative-temperature-material-emission-and-laser-reflection"
  },
  {
    label: "Optics and Lasers in Engineering 2019 - optical monitoring for laser-aided DMD",
    href: "https://www.sciencedirect.com/science/article/pii/S0143816619304397"
  },
  {
    label: "OpenAlex 500-record LMD/DED literature map",
    href: "/research/lmd-literature-scan.json"
  },
  {
    label: "LinkedIn / public profile",
    href: LINKS.linkedin
  }
];
