import { RESOURCE_NAV_ITEMS } from "./site";

type ResourcePath = (typeof RESOURCE_NAV_ITEMS)[number]["href"];

const itemFor = (href: ResourcePath) => {
  const item = RESOURCE_NAV_ITEMS.find((candidate) => candidate.href === href);
  if (!item) throw new Error(`Missing resource navigation item: ${href}`);
  return item;
};

export const RESOURCE_NAV_GROUPS = [
  {
    id: "work",
    label: "Work",
    labelDe: "Arbeit",
    items: [itemFor("/domains/lmd-ded"), itemFor("/tools"), itemFor("/frameworks")]
  },
  {
    id: "reference",
    label: "Reference",
    labelDe: "Referenz",
    items: [itemFor("/resources"), itemFor("/evidence"), itemFor("/glossary")]
  },
  {
    id: "trust-media",
    label: "Trust & media",
    labelDe: "Vertrauen & Medien",
    items: [itemFor("/trust"), itemFor("/for-ai-agents"), itemFor("/identity"), itemFor("/press-kit")]
  }
] as const;
