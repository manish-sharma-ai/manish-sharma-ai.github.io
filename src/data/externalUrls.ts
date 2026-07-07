import {
  EXAFUSE_PRODUCTION_BASE_URL,
  MANISH_SITE_URL,
  resolveExafuseUrl
} from "../config/externalLinks";

export { MANISH_SITE_URL };
export const EXAFUSE_BASE_URL = EXAFUSE_PRODUCTION_BASE_URL;
export const GITHUB_PROFILE_URL = "https://github.com/aiwithms";
export const GITHUB_REPO_URL = "https://github.com/manish-sharma-ai/manish-sharma-ai.github.io";
export const LINKEDIN_URL = "https://www.linkedin.com/in/manishsharma5/";

export const EXAFUSE_URLS = {
  homepage: resolveExafuseUrl("home"),
  services: resolveExafuseUrl("services"),
  metalAdditiveManufacturing: resolveExafuseUrl("metalAm"),
  repair: resolveExafuseUrl("repair"),
  laserCladding: resolveExafuseUrl("cladding"),
  technology: resolveExafuseUrl("technology"),
  quality: resolveExafuseUrl("quality"),
  materials: resolveExafuseUrl("materials"),
  caseStudies: resolveExafuseUrl("caseStudies"),
  duisburgBridgeCase: resolveExafuseUrl("cs15"),
  forgingHammerCase: resolveExafuseUrl("cs01"),
  extrusionScrewCase: resolveExafuseUrl("cs10"),
  drillBuildCoatCase: resolveExafuseUrl("cs13"),
  knowledgeLmd: resolveExafuseUrl("lmdGuide"),
  knowledgeLmdVsSlm: resolveExafuseUrl("lmdVsSlmGuide"),
  knowledgeLargePartLmd: resolveExafuseUrl("largePartLmdGuide"),
  knowledgeMonitoring: resolveExafuseUrl("monitoringGuide"),
  knowledgeBreitbahnDed: resolveExafuseUrl("breitbahnDedGuide"),
  knowledgePowder2024: resolveExafuseUrl("powder2024Guide"),
  knowledgeHammerRepair: resolveExafuseUrl("hammerRepairGuide"),
  knowledgeNeuralImageProcessing: resolveExafuseUrl("neuralImageProcessingGuide"),
  knowledge: resolveExafuseUrl("knowledge"),
  tools: resolveExafuseUrl("tools"),
  pathfinder: resolveExafuseUrl("pathfinder"),
  rfqBuilder: resolveExafuseUrl("rfq"),
  aiAgents: resolveExafuseUrl("aiAgents"),
  contact: resolveExafuseUrl("contact")
} as const;

export const EXAFUSE_EN_URLS = {
  homepage: resolveExafuseUrl("home"),
  services: resolveExafuseUrl("services"),
  metalAdditiveManufacturing: resolveExafuseUrl("metalAm"),
  repair: resolveExafuseUrl("repair"),
  laserCladding: resolveExafuseUrl("cladding"),
  technology: resolveExafuseUrl("technology"),
  quality: resolveExafuseUrl("quality"),
  caseStudies: resolveExafuseUrl("caseStudies"),
  duisburgBridgeCase: resolveExafuseUrl("cs15"),
  knowledge: resolveExafuseUrl("knowledge"),
  knowledgeLmd: resolveExafuseUrl("lmdGuide"),
  knowledgeLmdVsSlm: resolveExafuseUrl("lmdVsSlmGuide"),
  pathfinder: resolveExafuseUrl("pathfinder"),
  rfqBuilder: resolveExafuseUrl("rfq"),
  aiAgents: resolveExafuseUrl("aiAgents"),
  contact: resolveExafuseUrl("contact")
} as const;
