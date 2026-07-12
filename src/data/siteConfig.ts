import {
  EXAFUSE_BASE_URL,
  EXAFUSE_EN_URLS,
  EXAFUSE_URLS,
  GITHUB_PROFILE_URL,
  GITHUB_REPO_URL,
  LINKEDIN_URL,
  MANISH_SITE_URL
} from "./externalUrls";

export const SITE_CONFIG = {
  site: {
    baseUrl: MANISH_SITE_URL,
    name: "Manish Sharma Lab",
    owner: "Manish Sharma",
    category: "Industrial AI & Decision Systems",
    title: "Industrial AI and Decision Systems",
    description:
      "Inspection-aware AI and decision systems for industrial additive manufacturing, LMD/DED, repair, monitoring and evidence-based manufacturing decisions.",
    defaultOgImage: "/og-image.png",
    repository: GITHUB_REPO_URL
  },
  person: {
    name: "Manish Sharma",
    positioning: "Industrial AI and decision systems for additive manufacturing",
    promise: "AI for Laser Metal Deposition decisions you can verify.",
    method: "Sense -> Model -> Decide -> Verify",
    shortBio:
      "Manish Sharma works on inspection-aware AI and decision systems for industrial additive manufacturing, with public LMD/DED work around repair, monitoring, and evidence-based manufacturing decisions.",
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
      "Repairability scoring",
      "AI readiness for manufacturing"
    ],
    links: {
      linkedin: LINKEDIN_URL,
      github: GITHUB_PROFILE_URL,
      exafuseProfile: null,
      orcid: null,
      zenodo: null,
      huggingFace: null,
      googleScholar: null,
      researchGate: null
    }
  },
  exafuse: {
    baseUrl: EXAFUSE_BASE_URL,
    canonicalLinks: EXAFUSE_URLS
  },
  exafuseEn: {
    canonicalLinks: EXAFUSE_EN_URLS
  }
} as const;

export const PERSON_ID = `${SITE_CONFIG.site.baseUrl}/identity#manish-sharma`;
export const WEBSITE_ID = `${SITE_CONFIG.site.baseUrl}/#website`;
export const EXAFUSE_LINKS = SITE_CONFIG.exafuse.canonicalLinks;
export const EXAFUSE_EN_LINKS = SITE_CONFIG.exafuseEn.canonicalLinks;
