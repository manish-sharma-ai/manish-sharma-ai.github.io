import type { ExafuseUrlKey } from "../config/externalLinks";
import { resolveExafuseLink } from "../config/externalLinks";
import { SITE } from "./site";

export type PublicClaimSourceType =
  | "exafuse-public"
  | "personal-public"
  | "published-paper"
  | "public-profile"
  | "interpretation";

export type PublicClaimConfidence =
  | "publicly-supported"
  | "needs-migration"
  | "interpretation"
  | "do-not-render";

export interface PublicClaim {
  id: string;
  caseCode?: "CS15" | "CS01" | "CS10" | "CS13";
  shortLabel: string;
  value: string;
  unit: string;
  fullText: string;
  sourceType: PublicClaimSourceType;
  sourceUrlKey?: ExafuseUrlKey;
  sourceUrl?: string;
  confidence: PublicClaimConfidence;
  lastReviewed: string;
  allowedPages: string[];
  limitation: string;
}

export const PUBLIC_CLAIMS: PublicClaim[] = [
  {
    id: "cs15-bridge-components-750kg",
    caseCode: "CS15",
    shortLabel: "750 kg+ components",
    value: "750",
    unit: "kg+",
    fullText: "Public CS15 narrative describes LMD bridge components above 750 kg.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs15",
    confidence: "needs-migration",
    lastReviewed: "2026-07-07",
    allowedPages: ["/", "/public-work", "/industrial-proof", "/domains/lmd-ded"],
    limitation: "Scale context only; not a quality approval or transferable feasibility claim."
  },
  {
    id: "cs15-six-structural-nodes",
    caseCode: "CS15",
    shortLabel: "6 structural nodes",
    value: "6",
    unit: "nodes",
    fullText: "Public CS15 narrative describes six structural nodes.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs15",
    confidence: "needs-migration",
    lastReviewed: "2026-07-07",
    allowedPages: ["/", "/public-work", "/industrial-proof", "/domains/lmd-ded"],
    limitation: "Project scale context; not a claim that this site can approve structural parts."
  },
  {
    id: "cs15-single-node-build-219h",
    caseCode: "CS15",
    shortLabel: "219 h single-node build",
    value: "219",
    unit: "h",
    fullText: "Public CS15 narrative describes one node build taking 219 hours.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs15",
    confidence: "needs-migration",
    lastReviewed: "2026-07-07",
    allowedPages: ["/", "/public-work", "/industrial-proof", "/domains/lmd-ded"],
    limitation: "Build-time context only; not a productivity guarantee."
  },
  {
    id: "cs15-six-node-robot-path-38km",
    caseCode: "CS15",
    shortLabel: "approx. 38 km robot path",
    value: "38",
    unit: "km",
    fullText: "Public CS15 narrative describes roughly 38 km of robot path across six nodes.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs15",
    confidence: "needs-migration",
    lastReviewed: "2026-07-07",
    allowedPages: ["/", "/public-work", "/industrial-proof", "/domains/lmd-ded"],
    limitation: "Path-length context only; not a process capability guarantee."
  },
  {
    id: "cs15-melt-pool-images-1m",
    caseCode: "CS15",
    shortLabel: "1M+ melt-pool images",
    value: "1M+",
    unit: "images",
    fullText: "Use the conservative public CS15 scope: more than one million melt-pool images in the case narrative.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs15",
    confidence: "needs-migration",
    lastReviewed: "2026-07-07",
    allowedPages: ["/", "/public-work", "/industrial-proof", "/domains/lmd-ded"],
    limitation: "Monitoring-image count is process context; it does not prove final part quality."
  },
  {
    id: "cs15-machine-hours-1000",
    caseCode: "CS15",
    shortLabel: "machine-hour scale",
    value: "nearly 1,000",
    unit: "machine hours",
    fullText: "Potential CS15 machine-hour claim retained for post-migration source review.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs15",
    confidence: "do-not-render",
    lastReviewed: "2026-07-07",
    allowedPages: [],
    limitation: "Do not render until the production source explicitly supports the scope."
  },
  {
    id: "cs15-print-time-reduction-20",
    caseCode: "CS15",
    shortLabel: "print-time reduction",
    value: "almost 20",
    unit: "%",
    fullText: "Potential CS15 print-time reduction claim retained for post-migration source review.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs15",
    confidence: "do-not-render",
    lastReviewed: "2026-07-07",
    allowedPages: [],
    limitation: "Do not render until the production source explicitly supports the scope."
  },
  {
    id: "cs15-kit-validation-context",
    caseCode: "CS15",
    shortLabel: "KIT validation context",
    value: "KIT",
    unit: "validation support",
    fullText: "CS15 public context includes independent validation support by KIT where the production source confirms it.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs15",
    confidence: "needs-migration",
    lastReviewed: "2026-07-07",
    allowedPages: ["/industrial-proof", "/domains/lmd-ded"],
    limitation: "Validation support context is not a site-level approval claim."
  },
  {
    id: "cs01-local-wear-repair",
    caseCode: "CS01",
    shortLabel: "local wear repair",
    value: "local",
    unit: "wear",
    fullText: "Forging hammer repair context is useful for local wear, rebuild strategy, finishing, and inspection planning.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs01",
    confidence: "needs-migration",
    lastReviewed: "2026-07-07",
    allowedPages: ["/", "/public-work", "/industrial-proof"],
    limitation: "Does not prove all hammers or safety-critical parts are repairable."
  },
  {
    id: "cs10-local-crack-repair",
    caseCode: "CS10",
    shortLabel: "local crack context",
    value: "local",
    unit: "crack",
    fullText: "Extrusion screw repair context is useful for local damage, downtime pressure, finishing, and missing RFQ fields.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs10",
    confidence: "needs-migration",
    lastReviewed: "2026-07-07",
    allowedPages: ["/", "/public-work", "/industrial-proof"],
    limitation: "Crack repair always needs material, removal, inspection, and expert review."
  },
  {
    id: "cs13-build-and-coat-130mm",
    caseCode: "CS13",
    shortLabel: "130 mm build-and-coat drill",
    value: "130",
    unit: "mm",
    fullText: "Build-and-coat drill context is useful for combining geometry build-up, coating function, finishing, and validation planning.",
    sourceType: "exafuse-public",
    sourceUrlKey: "cs13",
    confidence: "needs-migration",
    lastReviewed: "2026-07-07",
    allowedPages: ["/", "/public-work", "/industrial-proof"],
    limitation: "Does not prove surface performance without application-specific validation."
  },
  {
    id: "lmd-literature-map-500",
    shortLabel: "500-record LMD/DED map",
    value: "500",
    unit: "records",
    fullText: "Public LMD/DED literature map contains 500 metadata records for orientation.",
    sourceType: "personal-public",
    sourceUrl: `${SITE.canonicalUrl}/research/lmd-literature-scan.json`,
    confidence: "publicly-supported",
    lastReviewed: "2026-07-07",
    allowedPages: ["/evidence", "/research/core-lmd-ai-sources", "/public-work", "/about"],
    limitation: "Metadata map only; not a complete systematic review."
  },
  {
    id: "sharma-2018-lmd-parameters",
    shortLabel: "2018 LMD paper parameters",
    value: "1070 nm / 450 W / 2 mm",
    unit: "paper parameters",
    fullText: "Published 2018 LMD lattice experiment reports a 1070 nm laser, 450 W power, and 2 mm focus size.",
    sourceType: "published-paper",
    sourceUrl: "https://www.sciencedirect.com/science/article/pii/S2212827118308849",
    confidence: "publicly-supported",
    lastReviewed: "2026-07-07",
    allowedPages: ["/evidence", "/about"],
    limitation: "Paper parameter context; not a production parameter recommendation."
  },
  {
    id: "breitbahn-ded-targets",
    shortLabel: "BreitbahnDED targets",
    value: "5-10 mm / >95%",
    unit: "project targets",
    fullText: "Public profile material describes broad-track DED targets including 5-10 mm tracks and a >95% powder-utilization target.",
    sourceType: "public-profile",
    sourceUrl: `${SITE.canonicalUrl}/profile/public-profile`,
    confidence: "publicly-supported",
    lastReviewed: "2026-07-07",
    allowedPages: ["/evidence", "/about", "/profile/public-profile"],
    limitation: "Project target, not a published production result claim."
  }
];

export const CLAIMS_BY_ID = Object.fromEntries(PUBLIC_CLAIMS.map((claim) => [claim.id, claim]));

export function getClaim(id: string) {
  return CLAIMS_BY_ID[id];
}

export function getRenderableClaimsForCase(caseCode: PublicClaim["caseCode"]) {
  return PUBLIC_CLAIMS.filter((claim) => claim.caseCode === caseCode && claim.confidence !== "do-not-render");
}

export function getClaimSourceStatus(claim: PublicClaim) {
  if (claim.confidence === "interpretation") return "Interpretation by Manish Sharma Lab";
  if (claim.confidence === "needs-migration") return "Production link after Exafuse migration";
  return claim.sourceType === "exafuse-public" ? "Public Exafuse source" : "Public source";
}

export function getClaimHref(claim: PublicClaim) {
  if (claim.sourceUrl) return claim.sourceUrl;
  if (claim.sourceUrlKey) return resolveExafuseLink(claim.sourceUrlKey).href;
  return SITE.canonicalUrl;
}
