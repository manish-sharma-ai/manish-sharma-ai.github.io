export const SITE_CONFIG = {
  site: {
    baseUrl: "https://manish-sharma-ai.github.io",
    name: "Manish Sharma Lab",
    title: "Industrial AI and Decision Systems",
    description:
      "Public expert layer for industrial AI, inspection-aware decision systems, LMD/DED, additive manufacturing repair, evidence interpretation, and AI-assisted manufacturing decisions.",
    defaultOgImage: "/og-image.png",
    repository: "https://github.com/manish-sharma-ai/manish-sharma-ai.github.io"
  },
  person: {
    name: "Manish Sharma",
    shortBio:
      "Manish Sharma works on inspection-aware AI and decision systems for industrial additive manufacturing, with a public proof domain around LMD/DED, repair, and evidence-based manufacturing decisions.",
    longBio:
      "Manish Sharma works on industrial AI, monitoring, and decision-support systems for engineering processes, grounded in public work on Laser Metal Deposition and Directed Energy Deposition at Exafuse in Germany. Manish Sharma Lab publishes public frameworks, tools, source maps, glossary notes, and RFQ resources that connect process signals, model assumptions, repairability, inspection evidence, and engineering decisions.",
    location: "Germany",
    currentPublicRole: "Industrial AI and decision systems, with established public LMD/DED work at Exafuse",
    domains: [
      "Industrial AI",
      "Decision systems",
      "Laser Metal Deposition / DED",
      "Additive manufacturing repair",
      "Monitoring interpretation",
      "Evidence ladders",
      "Repairability scoring"
    ],
    links: {
      linkedin: "https://www.linkedin.com/in/manishsharma5/",
      github: "https://github.com/aiwithms",
      exafuseProfile: null,
      orcid: null,
      zenodo: null,
      huggingFace: null,
      googleScholar: null,
      researchGate: null
    }
  },
  exafuse: {
    baseUrl: "https://exafuse.de",
    canonicalLinks: {
      homepage: "https://exafuse.de/",
      services: "https://exafuse.de/leistungen/",
      metalAdditiveManufacturing: "https://exafuse.de/leistungen/bauteilherstellung/",
      repair: "https://exafuse.de/leistungen/modifikation-reparatur/",
      laserCladding: "https://exafuse.de/leistungen/laser-cladding/",
      technology: "https://exafuse.de/technologie/",
      quality: "https://exafuse.de/qualitaet/",
      materials: "https://exafuse.de/werkstoffe/",
      caseStudies: "https://exafuse.de/fallstudien/",
      duisburgBridgeCase: "https://exafuse.de/fallstudien/duisburger-bruecke-lmd-fallstudie/",
      forgingHammerCase: "https://exafuse.de/fallstudien/schmiedehammer-reparatur-lmd/",
      extrusionScrewCase: "https://exafuse.de/fallstudien/extrusionsschnecke-reparatur-lmd/",
      drillBuildCoatCase: "https://exafuse.de/fallstudien/bombenbohrer-lmd-aufbau-beschichtung/",
      knowledgeLmd: "https://exafuse.de/wissen/laser-metal-deposition-ded-lbm/",
      knowledgeLmdVsSlm: "https://exafuse.de/wissen/lmd-vs-slm-lpbf/",
      knowledgeLargePartLmd: "https://exafuse.de/wissen/grosse-bauteile-laser-metal-deposition/",
      knowledgeMonitoring: "https://exafuse.de/wissen/lmd-prozessueberwachung-qualitaet/",
      knowledgeBreitbahnDed: "https://exafuse.de/wissen/breitbahn-ded-lmd/",
      knowledgePowder2024: "https://exafuse.de/wissen/lmd-pulver-jahresrueckblick-2024/",
      knowledgeHammerRepair: "https://exafuse.de/wissen/lmd-reparatur-schmiedehammer/",
      knowledgeNeuralImageProcessing: "https://exafuse.de/wissen/neuronale-bildverarbeitung-lmd/",
      aiAgents: "https://exafuse.de/fuer-ki-agenten/",
      contact: "https://exafuse.de/kontakt/"
    }
  }
} as const;

export const PERSON_ID = `${SITE_CONFIG.site.baseUrl}/#person`;
export const WEBSITE_ID = `${SITE_CONFIG.site.baseUrl}/#website`;
export const EXAFUSE_LINKS = SITE_CONFIG.exafuse.canonicalLinks;
