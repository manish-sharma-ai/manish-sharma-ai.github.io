import {
  EXAFUSE_PRODUCTION_BASE_URL,
  MANISH_SITE_URL,
  resolveProductionSafeExafuseUrl
} from "../config/externalLinks";

export { MANISH_SITE_URL };
export const EXAFUSE_BASE_URL = EXAFUSE_PRODUCTION_BASE_URL;
export const GITHUB_PROFILE_URL = "https://github.com/aiwithms";
export const GITHUB_REPO_URL = "https://github.com/manish-sharma-ai/manish-sharma-ai.github.io";
export const LINKEDIN_URL = "https://www.linkedin.com/in/manishsharma5/";

export const EXAFUSE_URLS = {
  homepage: resolveProductionSafeExafuseUrl("home"),
  services: resolveProductionSafeExafuseUrl("services"),
  metalAdditiveManufacturing: resolveProductionSafeExafuseUrl("metalAm"),
  repair: resolveProductionSafeExafuseUrl("repair"),
  laserCladding: resolveProductionSafeExafuseUrl("cladding"),
  technology: resolveProductionSafeExafuseUrl("technology"),
  quality: resolveProductionSafeExafuseUrl("quality"),
  materials: resolveProductionSafeExafuseUrl("materials"),
  caseStudies: resolveProductionSafeExafuseUrl("caseStudies"),
  duisburgBridgeCase: resolveProductionSafeExafuseUrl("cs15"),
  forgingHammerCase: resolveProductionSafeExafuseUrl("cs01"),
  extrusionScrewCase: resolveProductionSafeExafuseUrl("cs10"),
  drillBuildCoatCase: resolveProductionSafeExafuseUrl("cs13"),
  knowledgeLmd: resolveProductionSafeExafuseUrl("lmdGuide"),
  knowledgeLmdVsSlm: resolveProductionSafeExafuseUrl("lmdVsSlmGuide"),
  knowledgeLargePartLmd: resolveProductionSafeExafuseUrl("largePartLmdGuide"),
  knowledgeMonitoring: resolveProductionSafeExafuseUrl("monitoringGuide"),
  knowledgeBreitbahnDed: resolveProductionSafeExafuseUrl("breitbahnDedGuide"),
  knowledgePowder2024: resolveProductionSafeExafuseUrl("powder2024Guide"),
  knowledgeHammerRepair: resolveProductionSafeExafuseUrl("hammerRepairGuide"),
  knowledgeNeuralImageProcessing: resolveProductionSafeExafuseUrl("neuralImageProcessingGuide"),
  knowledge: resolveProductionSafeExafuseUrl("knowledge"),
  tools: resolveProductionSafeExafuseUrl("tools"),
  pathfinder: resolveProductionSafeExafuseUrl("pathfinder"),
  rfqBuilder: resolveProductionSafeExafuseUrl("rfq"),
  aiAgents: resolveProductionSafeExafuseUrl("aiAgents"),
  contact: resolveProductionSafeExafuseUrl("contact")
} as const;

export const EXAFUSE_EN_URLS = {
  homepage: resolveProductionSafeExafuseUrl("home"),
  services: resolveProductionSafeExafuseUrl("services"),
  metalAdditiveManufacturing: resolveProductionSafeExafuseUrl("metalAm"),
  repair: resolveProductionSafeExafuseUrl("repair"),
  laserCladding: resolveProductionSafeExafuseUrl("cladding"),
  technology: resolveProductionSafeExafuseUrl("technology"),
  quality: resolveProductionSafeExafuseUrl("quality"),
  caseStudies: resolveProductionSafeExafuseUrl("caseStudies"),
  duisburgBridgeCase: resolveProductionSafeExafuseUrl("cs15"),
  knowledge: resolveProductionSafeExafuseUrl("knowledge"),
  knowledgeLmd: resolveProductionSafeExafuseUrl("lmdGuide"),
  knowledgeLmdVsSlm: resolveProductionSafeExafuseUrl("lmdVsSlmGuide"),
  pathfinder: resolveProductionSafeExafuseUrl("pathfinder"),
  rfqBuilder: resolveProductionSafeExafuseUrl("rfq"),
  aiAgents: resolveProductionSafeExafuseUrl("aiAgents"),
  contact: resolveProductionSafeExafuseUrl("contact")
} as const;
