export const MANISH_SITE_URL = "https://manish-sharma-ai.github.io";
export const EXAFUSE_PRODUCTION_BASE_URL = "https://exafuse.de";
export const EXAFUSE_STAGING_BASE_URL = "https://exafuse-website-react.pages.dev";

export type ExafuseLinkMode = "production-safe" | "post-migration";
export type ExafuseLinkStatus = "public-production" | "production-link-after-migration";

export const EXAFUSE_LINK_MODE: ExafuseLinkMode = "production-safe";

export type ExafuseUrlKey =
  | "home"
  | "contact"
  | "services"
  | "rfq"
  | "pathfinder"
  | "cs15"
  | "cs01"
  | "cs10"
  | "cs13"
  | "technology"
  | "quality"
  | "repair"
  | "metalAm"
  | "cladding"
  | "materials"
  | "caseStudies"
  | "knowledge"
  | "lmdGuide"
  | "lmdVsSlmGuide"
  | "largePartLmdGuide"
  | "monitoringGuide"
  | "breitbahnDedGuide"
  | "powder2024Guide"
  | "hammerRepairGuide"
  | "neuralImageProcessingGuide"
  | "aiAgents"
  | "tools";

const productionSafePaths: Record<ExafuseUrlKey, string> = {
  home: "/",
  contact: "/kontakt/",
  services: "/leistungen/",
  rfq: "/kontakt/",
  pathfinder: "/kontakt/",
  cs15: "/fallstudien/",
  cs01: "/fallstudien/",
  cs10: "/fallstudien/",
  cs13: "/fallstudien/",
  technology: "/technologie/",
  quality: "/qualitaet/",
  repair: "/leistungen/modifikation-reparatur/",
  metalAm: "/leistungen/bauteilherstellung/",
  cladding: "/leistungen/laser-cladding/",
  materials: "/werkstoffe/",
  caseStudies: "/fallstudien/",
  knowledge: "/wissen/",
  lmdGuide: "/wissen/",
  lmdVsSlmGuide: "/wissen/",
  largePartLmdGuide: "/wissen/",
  monitoringGuide: "/wissen/",
  breitbahnDedGuide: "/wissen/",
  powder2024Guide: "/wissen/",
  hammerRepairGuide: "/wissen/",
  neuralImageProcessingGuide: "/wissen/",
  aiAgents: "/kontakt/",
  tools: "/kontakt/"
};

interface ExafuseRoute {
  label: string;
  productionSafePath: string;
  postMigrationPath: string;
  statusInProductionSafe: ExafuseLinkStatus;
}

const routes: Record<ExafuseUrlKey, ExafuseRoute> = {
  home: {
    label: "Exafuse homepage",
    productionSafePath: "/",
    postMigrationPath: "/",
    statusInProductionSafe: "public-production"
  },
  contact: {
    label: "Exafuse contact",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/kontakt/",
    statusInProductionSafe: "public-production"
  },
  services: {
    label: "Exafuse services",
    productionSafePath: "/leistungen/",
    postMigrationPath: "/leistungen/",
    statusInProductionSafe: "public-production"
  },
  rfq: {
    label: "Exafuse RFQ path",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/tools/rfq-builder/",
    statusInProductionSafe: "production-link-after-migration"
  },
  pathfinder: {
    label: "Exafuse Pathfinder",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/tools/pathfinder/",
    statusInProductionSafe: "production-link-after-migration"
  },
  cs15: {
    label: "CS15 Duisburg Bridge Components",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/duisburger-bruecke-lmd-fallstudie/",
    statusInProductionSafe: "production-link-after-migration"
  },
  cs01: {
    label: "CS01 Forging Hammer Repair",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/schmiedehammer-reparatur-lmd/",
    statusInProductionSafe: "production-link-after-migration"
  },
  cs10: {
    label: "CS10 Nobufil Extrusion Screw Repair",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/extrusionsschnecke-reparatur-lmd/",
    statusInProductionSafe: "production-link-after-migration"
  },
  cs13: {
    label: "CS13 130 mm Build-and-Coat Drill",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/bombenbohrer-lmd-aufbau-beschichtung/",
    statusInProductionSafe: "production-link-after-migration"
  },
  technology: {
    label: "Exafuse technology",
    productionSafePath: "/technologie/",
    postMigrationPath: "/technologie/",
    statusInProductionSafe: "public-production"
  },
  quality: {
    label: "Exafuse quality",
    productionSafePath: "/qualitaet/",
    postMigrationPath: "/qualitaet/",
    statusInProductionSafe: "public-production"
  },
  repair: {
    label: "Exafuse repair and modification",
    productionSafePath: "/leistungen/modifikation-reparatur/",
    postMigrationPath: "/leistungen/modifikation-reparatur/",
    statusInProductionSafe: "public-production"
  },
  metalAm: {
    label: "Exafuse metal additive manufacturing",
    productionSafePath: "/leistungen/bauteilherstellung/",
    postMigrationPath: "/leistungen/bauteilherstellung/",
    statusInProductionSafe: "public-production"
  },
  cladding: {
    label: "Exafuse laser cladding",
    productionSafePath: "/leistungen/laser-cladding/",
    postMigrationPath: "/leistungen/laser-cladding/",
    statusInProductionSafe: "public-production"
  },
  materials: {
    label: "Exafuse materials",
    productionSafePath: "/werkstoffe/",
    postMigrationPath: "/werkstoffe/",
    statusInProductionSafe: "public-production"
  },
  caseStudies: {
    label: "Exafuse case studies",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/",
    statusInProductionSafe: "public-production"
  },
  knowledge: {
    label: "Exafuse knowledge",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/",
    statusInProductionSafe: "public-production"
  },
  lmdGuide: {
    label: "Exafuse LMD guide",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/laser-metal-deposition-ded-lbm/",
    statusInProductionSafe: "production-link-after-migration"
  },
  lmdVsSlmGuide: {
    label: "Exafuse LMD vs SLM guide",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/lmd-vs-slm-lpbf/",
    statusInProductionSafe: "production-link-after-migration"
  },
  largePartLmdGuide: {
    label: "Exafuse large-part LMD guide",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/grosse-bauteile-laser-metal-deposition/",
    statusInProductionSafe: "production-link-after-migration"
  },
  monitoringGuide: {
    label: "Exafuse monitoring guide",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/lmd-prozessueberwachung-qualitaet/",
    statusInProductionSafe: "production-link-after-migration"
  },
  breitbahnDedGuide: {
    label: "Exafuse BreitbahnDED guide",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/breitbahn-ded-lmd/",
    statusInProductionSafe: "production-link-after-migration"
  },
  powder2024Guide: {
    label: "Exafuse 2024 powder review",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/lmd-pulver-jahresrueckblick-2024/",
    statusInProductionSafe: "production-link-after-migration"
  },
  hammerRepairGuide: {
    label: "Exafuse hammer repair guide",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/lmd-reparatur-schmiedehammer/",
    statusInProductionSafe: "production-link-after-migration"
  },
  neuralImageProcessingGuide: {
    label: "Exafuse neural image-processing guide",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/neuronale-bildverarbeitung-lmd/",
    statusInProductionSafe: "production-link-after-migration"
  },
  aiAgents: {
    label: "Exafuse AI-agent page",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/fuer-ki-agenten/",
    statusInProductionSafe: "production-link-after-migration"
  },
  tools: {
    label: "Exafuse tools",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/tools/",
    statusInProductionSafe: "production-link-after-migration"
  }
};

function withBase(path: string) {
  return `${EXAFUSE_PRODUCTION_BASE_URL}${path}`;
}

export function resolveProductionSafeExafuseUrl(key: ExafuseUrlKey): string {
  return withBase(productionSafePaths[key]);
}

export function resolveExafuseUrl(key: ExafuseUrlKey): string {
  const route = routes[key];
  const path = EXAFUSE_LINK_MODE === "post-migration" ? route.postMigrationPath : route.productionSafePath;
  return withBase(path);
}

export function resolveExafuseLink(key: ExafuseUrlKey) {
  const route = routes[key];
  return {
    key,
    label: route.label,
    href: resolveExafuseUrl(key),
    status:
      EXAFUSE_LINK_MODE === "post-migration"
        ? ("public-production" as const)
        : route.statusInProductionSafe,
    mode: EXAFUSE_LINK_MODE
  };
}

export const EXAFUSE_LINK_REGISTRY = routes;
