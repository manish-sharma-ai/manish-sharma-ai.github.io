import { RESOURCE_NAV_ITEMS } from "./site";

type ResourcePath = (typeof RESOURCE_NAV_ITEMS)[number]["href"];

const itemFor = (href: ResourcePath) => {
  const item = RESOURCE_NAV_ITEMS.find((candidate) => candidate.href === href);
  if (!item) throw new Error(`Missing resource navigation item: ${href}`);
  return item;
};

export const RESOURCE_NAV_GROUPS = [
  {
    id: "learn",
    label: "Learn",
    labelDe: "Lernen",
    items: [itemFor("/frameworks"), itemFor("/lab-notes"), itemFor("/glossary")]
  },
  {
    id: "tools",
    label: "Tools",
    labelDe: "Werkzeuge",
    items: [itemFor("/decision-map"), itemFor("/agent-pack"), itemFor("/brief-standard")]
  },
  {
    id: "evidence",
    label: "Evidence",
    labelDe: "Nachweise",
    items: [itemFor("/evidence"), itemFor("/trust"), itemFor("/review")]
  },
  {
    id: "ai-media",
    label: "For AI and media",
    labelDe: "Für KI und Medien",
    items: [itemFor("/for-ai-agents"), itemFor("/identity"), itemFor("/press-kit"), itemFor("/site-map")]
  }
] as const;
