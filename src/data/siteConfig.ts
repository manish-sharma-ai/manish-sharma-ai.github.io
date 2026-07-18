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
    preferredSiteName: "Manish Sharma",
    alternateSiteName: "Manish Sharma Lab",
    owner: "Manish Sharma",
    category: "Industrial AI & Decision Systems",
    title: "Industrial AI and Decision Systems",
    description:
      "Manish Sharma builds evidence-aware AI systems for industrial decisions, with his strongest public work in LMD/DED, process monitoring, robotics, and engineering decision support at Exafuse.",
    defaultOgImage: "/og-image.png",
    repository: GITHUB_REPO_URL
  },
  person: {
    name: "Manish Sharma",
    positioning: "Industrial AI and decision systems, grounded in current LMD/DED work",
    promise: "AI for industrial decisions that need evidence, not just predictions.",
    method: "Sense -> Model -> Decide -> Verify",
    shortBio:
      "Manish Sharma works on industrial AI and decision systems, with his strongest public work in LMD/DED, process monitoring, robotics, repair, and evidence-aware engineering decisions at Exafuse.",
    longBio:
      "Manish Sharma builds AI systems for industrial decisions that need evidence, not just predictions. His current public proving ground is Laser Metal Deposition and Directed Energy Deposition at Exafuse in Germany, where process signals, models, materials, robotics, repair, inspection, and engineering judgment need to stay connected. Manish Sharma Lab publishes public frameworks, tools, source maps, glossary notes, and RFQ resources that make this working method inspectable.",
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
