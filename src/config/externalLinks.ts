export const MANISH_SITE_URL = "https://manish-sharma-ai.github.io";
export const EXAFUSE_PRODUCTION_BASE_URL = "https://exafuse.de";
export const EXAFUSE_STAGING_BASE_URL = "https://exafuse-website-react.pages.dev";

export type ExafuseLinkMode = "production-safe" | "post-migration";
export type ExafuseLinkStatus = "public-production" | "production-link-after-migration";
export type ExafuseLinkGroup = "core" | "case" | "knowledge" | "rfq-tool";

export const EXAFUSE_LINK_MODE: ExafuseLinkMode = "production-safe";
export const EXAFUSE_MIGRATION_HELPER = "New Exafuse case/tool deep links activate after production migration.";

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
  productionSafeLabel: string;
  productionSafePath: string;
  postMigrationPath: string;
  statusInProductionSafe: ExafuseLinkStatus;
  group: ExafuseLinkGroup;
}

const routes: Record<ExafuseUrlKey, ExafuseRoute> = {
  home: {
    label: "Exafuse homepage",
    productionSafeLabel: "Exafuse homepage",
    productionSafePath: "/",
    postMigrationPath: "/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  contact: {
    label: "Exafuse contact",
    productionSafeLabel: "Exafuse contact",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/kontakt/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  services: {
    label: "Exafuse services",
    productionSafeLabel: "Exafuse services",
    productionSafePath: "/leistungen/",
    postMigrationPath: "/leistungen/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  rfq: {
    label: "Exafuse RFQ Builder",
    productionSafeLabel: "Request Exafuse review",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/tools/rfq-builder/",
    statusInProductionSafe: "production-link-after-migration",
    group: "rfq-tool"
  },
  pathfinder: {
    label: "Exafuse Pathfinder",
    productionSafeLabel: "Discuss with Exafuse",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/tools/pathfinder/",
    statusInProductionSafe: "production-link-after-migration",
    group: "rfq-tool"
  },
  cs15: {
    label: "CS15 Duisburg Bridge Components",
    productionSafeLabel: "Contact Exafuse",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/duisburger-bruecke-lmd-fallstudie/",
    statusInProductionSafe: "production-link-after-migration",
    group: "case"
  },
  cs01: {
    label: "CS01 Forging Hammer Repair",
    productionSafeLabel: "Contact Exafuse",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/schmiedehammer-reparatur-lmd/",
    statusInProductionSafe: "production-link-after-migration",
    group: "case"
  },
  cs10: {
    label: "CS10 Nobufil Extrusion Screw Repair",
    productionSafeLabel: "Contact Exafuse",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/extrusionsschnecke-reparatur-lmd/",
    statusInProductionSafe: "production-link-after-migration",
    group: "case"
  },
  cs13: {
    label: "CS13 130 mm Build-and-Coat Drill",
    productionSafeLabel: "Contact Exafuse",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/bombenbohrer-lmd-aufbau-beschichtung/",
    statusInProductionSafe: "production-link-after-migration",
    group: "case"
  },
  technology: {
    label: "Exafuse technology",
    productionSafeLabel: "Exafuse technology",
    productionSafePath: "/technologie/",
    postMigrationPath: "/technologie/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  quality: {
    label: "Exafuse quality",
    productionSafeLabel: "Exafuse quality",
    productionSafePath: "/qualitaet/",
    postMigrationPath: "/qualitaet/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  repair: {
    label: "Exafuse repair and modification",
    productionSafeLabel: "Exafuse repair and modification",
    productionSafePath: "/leistungen/modifikation-reparatur/",
    postMigrationPath: "/leistungen/modifikation-reparatur/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  metalAm: {
    label: "Exafuse metal additive manufacturing",
    productionSafeLabel: "Exafuse metal additive manufacturing",
    productionSafePath: "/leistungen/bauteilherstellung/",
    postMigrationPath: "/leistungen/bauteilherstellung/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  cladding: {
    label: "Exafuse laser cladding",
    productionSafeLabel: "Exafuse laser cladding",
    productionSafePath: "/leistungen/laser-cladding/",
    postMigrationPath: "/leistungen/laser-cladding/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  materials: {
    label: "Exafuse materials",
    productionSafeLabel: "Exafuse materials",
    productionSafePath: "/werkstoffe/",
    postMigrationPath: "/werkstoffe/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  caseStudies: {
    label: "Exafuse case studies",
    productionSafeLabel: "Exafuse case studies",
    productionSafePath: "/fallstudien/",
    postMigrationPath: "/fallstudien/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  knowledge: {
    label: "Exafuse knowledge",
    productionSafeLabel: "Exafuse knowledge",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/",
    statusInProductionSafe: "public-production",
    group: "core"
  },
  lmdGuide: {
    label: "Exafuse LMD guide",
    productionSafeLabel: "View Exafuse after migration",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/laser-metal-deposition-ded-lbm/",
    statusInProductionSafe: "production-link-after-migration",
    group: "knowledge"
  },
  lmdVsSlmGuide: {
    label: "Exafuse LMD vs SLM guide",
    productionSafeLabel: "View Exafuse after migration",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/lmd-vs-slm-lpbf/",
    statusInProductionSafe: "production-link-after-migration",
    group: "knowledge"
  },
  largePartLmdGuide: {
    label: "Exafuse large-part LMD guide",
    productionSafeLabel: "View Exafuse after migration",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/grosse-bauteile-laser-metal-deposition/",
    statusInProductionSafe: "production-link-after-migration",
    group: "knowledge"
  },
  monitoringGuide: {
    label: "Exafuse monitoring guide",
    productionSafeLabel: "View Exafuse after migration",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/lmd-prozessueberwachung-qualitaet/",
    statusInProductionSafe: "production-link-after-migration",
    group: "knowledge"
  },
  breitbahnDedGuide: {
    label: "Exafuse BreitbahnDED guide",
    productionSafeLabel: "View Exafuse after migration",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/breitbahn-ded-lmd/",
    statusInProductionSafe: "production-link-after-migration",
    group: "knowledge"
  },
  powder2024Guide: {
    label: "Exafuse 2024 powder review",
    productionSafeLabel: "View Exafuse after migration",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/lmd-pulver-jahresrueckblick-2024/",
    statusInProductionSafe: "production-link-after-migration",
    group: "knowledge"
  },
  hammerRepairGuide: {
    label: "Exafuse hammer repair guide",
    productionSafeLabel: "View Exafuse after migration",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/lmd-reparatur-schmiedehammer/",
    statusInProductionSafe: "production-link-after-migration",
    group: "knowledge"
  },
  neuralImageProcessingGuide: {
    label: "Exafuse neural image-processing guide",
    productionSafeLabel: "View Exafuse after migration",
    productionSafePath: "/wissen/",
    postMigrationPath: "/wissen/neuronale-bildverarbeitung-lmd/",
    statusInProductionSafe: "production-link-after-migration",
    group: "knowledge"
  },
  aiAgents: {
    label: "Exafuse AI-agent page",
    productionSafeLabel: "Contact Exafuse",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/fuer-ki-agenten/",
    statusInProductionSafe: "production-link-after-migration",
    group: "rfq-tool"
  },
  tools: {
    label: "Exafuse tools",
    productionSafeLabel: "Contact Exafuse",
    productionSafePath: "/kontakt/",
    postMigrationPath: "/tools/",
    statusInProductionSafe: "production-link-after-migration",
    group: "rfq-tool"
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

export function resolveExafuseLabel(key: ExafuseUrlKey): string {
  const route = routes[key];
  if (EXAFUSE_LINK_MODE === "post-migration") return route.label;
  return route.statusInProductionSafe === "public-production" ? route.label : route.productionSafeLabel;
}

export function resolveExafuseLink(key: ExafuseUrlKey) {
  const route = routes[key];
  return {
    key,
    label: resolveExafuseLabel(key),
    canonicalLabel: route.label,
    href: resolveExafuseUrl(key),
    status:
      EXAFUSE_LINK_MODE === "post-migration"
        ? ("public-production" as const)
        : route.statusInProductionSafe,
    mode: EXAFUSE_LINK_MODE,
    group: route.group,
    migrationGated: EXAFUSE_LINK_MODE === "production-safe" && route.statusInProductionSafe === "production-link-after-migration"
  };
}

export const EXAFUSE_LINK_REGISTRY = routes;
