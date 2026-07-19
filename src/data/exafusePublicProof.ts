import { resolveExafuseLink, type ExafuseUrlKey } from "../config/externalLinks";

export type ExafuseProofMetric = {
  label: string;
  value: string;
  unit?: string;
  sourcePath: string;
  limitation: string;
};

export type ExafusePublicProof = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  company: "Exafuse";
  sourceType: "Exafuse public case";
  /** The private repository remote is deliberately not published on this public site. */
  sourceRepositoryUrl: null;
  sourceRepositoryCommit: string;
  sourceContentPaths: string[];
  sourceMediaPaths: string[];
  sourceKey: ExafuseUrlKey;
  liveSourceStatus: "verified-production" | "verified-index";
  publicStatus: "approved-public-context";
  problem: string;
  industrialContext: string;
  processRoute: string;
  materialContext: string;
  publicMetrics: ExafuseProofMetric[];
  evidenceAndValidation: string;
  monitoringContext?: string;
  mainDecisionLesson: string;
  whatItProves: string[];
  whatItDoesNotProve: string[];
  personalContribution: null;
  personalContributionSource: null;
  interpretationByManishSharmaLab: string;
  selectedMedia: {
    src: string;
    avifSrcset: string;
    webpSrcset: string;
    width: number;
    height: number;
    alt: string;
    sourcePath: string;
  };
  captions: string;
  altText: string;
  imageCredit: "Exafuse";
  lastReviewed: string;
};

const sourceCommit = "0d4938331eaf2f586661587e427bc29aabdbf61c";

export const EXAFUSE_PUBLIC_PROOF: ExafusePublicProof[] = [
  {
    id: "cs15-duisburg-bridge",
    slug: "duisburg-bridge-components",
    title: "Duisburg Bridge Components: large-part LMD from CAD adaptation to evidence planning",
    shortTitle: "Duisburg bridge components",
    company: "Exafuse",
    sourceType: "Exafuse public case",
    sourceRepositoryUrl: null,
    sourceRepositoryCommit: sourceCommit,
    sourceContentPaths: ["src/data/contentData.js", "src/data/caseEditorial.js"],
    sourceMediaPaths: ["public/assets/images/home/candidate-knotenbest.png"],
    sourceKey: "cs15",
    liveSourceStatus: "verified-production",
    publicStatus: "approved-public-context",
    problem: "A public infrastructure project needed large structural nodes and handrail components to move from a sculptural design intent to a manufacturable, inspectable LMD route.",
    industrialContext: "Large structural metal components for a pedestrian bridge in Duisburg.",
    processRoute: "CAD adaptation, deposition-path development, long-duration LMD production, monitoring, finishing planning, and project-specific validation support.",
    materialContext: "The public case is about scale and route development; it does not publish a transferable material-acceptance basis.",
    publicMetrics: [
      {
        label: "Documented components",
        value: "750+",
        unit: "kg",
        sourcePath: "src/data/contentData.js (CS15)",
        limitation: "Project scale context only; it is not a quality approval or a transferable feasibility claim."
      },
      {
        label: "Structural nodes",
        value: "6",
        unit: "nodes",
        sourcePath: "src/data/contentData.js (CS15)",
        limitation: "A project count, not a claim that another structural component is approved."
      },
      {
        label: "Single-node build",
        value: "219",
        unit: "h",
        sourcePath: "src/data/contentData.js (CS15)",
        limitation: "Project build-duration context only; it is not a productivity, scheduling, or cost commitment."
      },
      {
        label: "Six-node robot path",
        value: "38",
        unit: "km",
        sourcePath: "src/data/contentData.js (CS15)",
        limitation: "Path-length context only; it is not a transferable process-capability claim."
      },
      {
        label: "Monitoring context",
        value: "1M+",
        unit: "melt-pool images",
        sourcePath: "src/data/contentData.js (CS15)",
        limitation: "Monitoring data supports process understanding; it does not prove final part quality by itself."
      }
    ],
    evidenceAndValidation: "The public record describes independent project-specific validation support and makes clear that another structural application needs its own engineering, inspection, and acceptance route.",
    monitoringContext: "The public case connects long-build monitoring and process analysis to production evidence without presenting monitoring as final approval.",
    mainDecisionLesson: "For large LMD, manufacturability, toolpaths, monitoring, finishing, and verification must be planned as one decision system.",
    whatItProves: [
      "A public large-part LMD project can be described as a connected CAD-to-production route.",
      "Public monitoring context can support an evidence discussion when its inspection boundary remains explicit.",
      "Complex, high-value components need a planned validation path rather than confidence from deposition alone."
    ],
    whatItDoesNotProve: [
      "It is not a blanket approval for another bridge or safety-critical component.",
      "It does not replace structural engineering, inspection, certification, or customer acceptance.",
      "It does not make the public production figures a commitment for another geometry or material."
    ],
    personalContribution: null,
    personalContributionSource: null,
    interpretationByManishSharmaLab: "This public case context is used here to explain an evidence-aware decision pattern. It is not a statement of personal ownership of Exafuse's project execution.",
    selectedMedia: {
      src: "/media/exafuse/bridge/duisburg-bridge-node-960.jpg",
      avifSrcset: "/media/exafuse/bridge/duisburg-bridge-node-480.avif 480w, /media/exafuse/bridge/duisburg-bridge-node-768.avif 768w, /media/exafuse/bridge/duisburg-bridge-node-960.avif 960w",
      webpSrcset: "/media/exafuse/bridge/duisburg-bridge-node-480.webp 480w, /media/exafuse/bridge/duisburg-bridge-node-768.webp 768w, /media/exafuse/bridge/duisburg-bridge-node-960.webp 960w",
      width: 1168,
      height: 660,
      alt: "Large LMD-manufactured bridge node component from the Duisburg project",
      sourcePath: "public/assets/images/home/candidate-knotenbest.png"
    },
    captions: "Large structural LMD proof component from the Duisburg bridge story.",
    altText: "Large LMD-manufactured bridge node component from the Duisburg project",
    imageCredit: "Exafuse",
    lastReviewed: "2026-07-19"
  },
  {
    id: "cs10-nobufil-extrusion-screw",
    slug: "nobufil-extrusion-screw-repair",
    title: "Nobufil Extrusion Screw Repair: make the damage boundary visible before rebuilding",
    shortTitle: "Nobufil screw repair",
    company: "Exafuse",
    sourceType: "Exafuse public case",
    sourceRepositoryUrl: null,
    sourceRepositoryCommit: sourceCommit,
    sourceContentPaths: ["src/data/contentData.js", "src/data/caseEditorial.js"],
    sourceMediaPaths: ["public/assets/images/cases/nobufil-extrusion-screw/nobufil-extrusion-screw-after-final-milling.webp"],
    sourceKey: "cs10",
    liveSourceStatus: "verified-production",
    publicStatus: "approved-public-context",
    problem: "A cracked extrusion-screw shaft created a local repair question with a much larger downtime and replacement-risk context.",
    industrialContext: "A high-value extrusion screw in a production environment with no immediate replacement available.",
    processRoute: "Damage review, removal of the damaged material, targeted DED/LMD build-up, mechanical finishing, and inspection context.",
    materialContext: "The public story identifies the repair chain but does not publish a transferable alloy or tolerance specification.",
    publicMetrics: [],
    evidenceAndValidation: "The public story frames images and supporting evidence as repair context, not certified performance, service-life, or universal repairability.",
    mainDecisionLesson: "Repair evidence starts by defining what must be removed, rebuilt, finished, and inspected—not by covering a visible defect.",
    whatItProves: ["A local LMD repair route can be discussed alongside downtime and replacement risk.", "Finishing is part of returning a rebuilt volume to usable geometry."],
    whatItDoesNotProve: ["It does not establish certified performance, exact tolerance, or service-life extension.", "It does not prove every cracked screw is a repair candidate."],
    personalContribution: null,
    personalContributionSource: null,
    interpretationByManishSharmaLab: "This case is used as public context for structuring repair facts, evidence needs, and an honest next action.",
    selectedMedia: {
      src: "/media/exafuse/repair/nobufil-extrusion-screw-960.jpg",
      avifSrcset: "/media/exafuse/repair/nobufil-extrusion-screw-480.avif 480w, /media/exafuse/repair/nobufil-extrusion-screw-768.avif 768w, /media/exafuse/repair/nobufil-extrusion-screw-960.avif 960w",
      webpSrcset: "/media/exafuse/repair/nobufil-extrusion-screw-480.webp 480w, /media/exafuse/repair/nobufil-extrusion-screw-768.webp 768w, /media/exafuse/repair/nobufil-extrusion-screw-960.webp 960w",
      width: 1600,
      height: 1067,
      alt: "Repaired extrusion screw after final milling",
      sourcePath: "public/assets/images/cases/nobufil-extrusion-screw/nobufil-extrusion-screw-after-final-milling.webp"
    },
    captions: "Final repaired geometry after mechanical finishing.",
    altText: "Repaired extrusion screw after final milling",
    imageCredit: "Exafuse",
    lastReviewed: "2026-07-19"
  },
  {
    id: "cs05-valve-seat-ring",
    slug: "valve-seat-ring-cladding",
    title: "Valve-Seat Ring Cladding: turn visible inspection into a bounded evidence step",
    shortTitle: "Valve-seat ring cladding",
    company: "Exafuse",
    sourceType: "Exafuse public case",
    sourceRepositoryUrl: null,
    sourceRepositoryCommit: sourceCommit,
    sourceContentPaths: ["src/data/contentData.js", "src/data/caseEditorial.js"],
    sourceMediaPaths: ["public/assets/images/cases/valve-seat-wear-ring-cladding/valve-seat-ring-dye-test.webp"],
    sourceKey: "cs05",
    liveSourceStatus: "verified-production",
    publicStatus: "approved-public-context",
    problem: "A local wear-resistant ring surface requires a controlled coating, finishing, and inspection route rather than a hardness-only choice.",
    industrialContext: "Anonymous valve-seat and wear-ring geometries with wear-critical functional surfaces.",
    processRoute: "Preheating, controlled laser cladding, layer planning, finishing allowance, visible inspection, and project-specific review.",
    materialContext: "The public case intentionally withholds the exact project alloy and transferable process parameters.",
    publicMetrics: [],
    evidenceAndValidation: "The dye-test image supports discussion of the photographed coating condition only; it does not establish universal acceptance or crack-free performance.",
    mainDecisionLesson: "A visible inspection result is useful evidence only when it is attached to geometry, material, heat, finishing, and acceptance context.",
    whatItProves: ["Laser cladding can be documented as a full coating-and-inspection process.", "Material selection, heat management, finishing, and inspection are coupled decisions."],
    whatItDoesNotProve: ["It does not guarantee crack-free performance for another material, substrate, or ring geometry.", "It does not publish a transferable parameter set or customer acceptance."],
    personalContribution: null,
    personalContributionSource: null,
    interpretationByManishSharmaLab: "This case supports a public explanation of why monitoring and inspection evidence must remain bounded by the application context.",
    selectedMedia: {
      src: "/media/exafuse/cladding/valve-seat-ring-960.jpg",
      avifSrcset: "/media/exafuse/cladding/valve-seat-ring-480.avif 480w, /media/exafuse/cladding/valve-seat-ring-768.avif 768w, /media/exafuse/cladding/valve-seat-ring-960.avif 960w",
      webpSrcset: "/media/exafuse/cladding/valve-seat-ring-480.webp 480w, /media/exafuse/cladding/valve-seat-ring-768.webp 768w, /media/exafuse/cladding/valve-seat-ring-960.webp 960w",
      width: 1600,
      height: 1530,
      alt: "Valve seat ring after dye inspection in the photographed condition",
      sourcePath: "public/assets/images/cases/valve-seat-wear-ring-cladding/valve-seat-ring-dye-test.webp"
    },
    captions: "Dye-test image for the anonymous valve-seat ring coating proof.",
    altText: "Valve seat ring after dye inspection in the photographed condition",
    imageCredit: "Exafuse",
    lastReviewed: "2026-07-19"
  },
  {
    id: "cs13-zipp-drill",
    slug: "130mm-drill-build-and-coat",
    title: "130 mm Drill Build-and-Coat: plan geometry and surface function together",
    shortTitle: "130 mm drill build-and-coat",
    company: "Exafuse",
    sourceType: "Exafuse public case",
    sourceRepositoryUrl: null,
    sourceRepositoryCommit: sourceCommit,
    sourceContentPaths: ["src/data/contentData.js", "src/data/caseEditorial.js"],
    sourceMediaPaths: ["public/assets/images/articles/zipp-drill/drill-lmd-hero.jpg"],
    sourceKey: "caseStudies",
    liveSourceStatus: "verified-index",
    publicStatus: "approved-public-context",
    problem: "A functional drill demonstrator combined geometry build-up with a wear-resistant, anti-magnetic surface-function discussion.",
    industrialContext: "A public 130 mm drill demonstrator in the Exafuse build-and-coat context.",
    processRoute: "Powder-fed LMD build-up followed by a functional coating, finishing planning, and validation planning.",
    materialContext: "The public context mentions a tungsten-carbide-containing coating; compatibility and final material selection remain application-specific.",
    publicMetrics: [
      {
        label: "Drill demonstrator",
        value: "130",
        unit: "mm",
        sourcePath: "src/data/contentData.js (CS13)",
        limitation: "A public demonstrator dimension, not a lead-time, performance, or qualification claim."
      }
    ],
    evidenceAndValidation: "The public process material makes the integrated route visible but does not certify drilling performance or publish a release basis.",
    mainDecisionLesson: "Geometry, surface function, material compatibility, finishing, and verification should be prepared as one route.",
    whatItProves: ["A build-and-coat workflow can be used to explain connected geometry and surface-function planning.", "Public process media can demonstrate a route without substituting for application validation."],
    whatItDoesNotProve: ["It does not certify performance for another drilling application.", "It does not establish a universal material, lead-time, or inspection outcome."],
    personalContribution: null,
    personalContributionSource: null,
    interpretationByManishSharmaLab: "This is public build-and-coat context used to demonstrate a decision pattern, not a statement of personal case ownership.",
    selectedMedia: {
      src: "/media/exafuse/build-coat/zipp-drill-960.jpg",
      avifSrcset: "/media/exafuse/build-coat/zipp-drill-480.avif 480w, /media/exafuse/build-coat/zipp-drill-768.avif 768w, /media/exafuse/build-coat/zipp-drill-960.avif 960w",
      webpSrcset: "/media/exafuse/build-coat/zipp-drill-480.webp 480w, /media/exafuse/build-coat/zipp-drill-768.webp 768w, /media/exafuse/build-coat/zipp-drill-960.webp 960w",
      width: 1086,
      height: 1448,
      alt: "130 mm drill during a Laser Metal Deposition build-and-coat workflow",
      sourcePath: "public/assets/images/articles/zipp-drill/drill-lmd-hero.jpg"
    },
    captions: "Process image from the public 130 mm drill build-and-coat proof story.",
    altText: "130 mm drill during a Laser Metal Deposition build-and-coat workflow",
    imageCredit: "Exafuse",
    lastReviewed: "2026-07-19"
  }
];

export const EXAFUSE_PUBLIC_PROOF_BY_SLUG = Object.fromEntries(
  EXAFUSE_PUBLIC_PROOF.map((proof) => [proof.slug, proof])
);

export function getExafuseProofSource(proof: ExafusePublicProof) {
  return resolveExafuseLink(proof.sourceKey);
}
