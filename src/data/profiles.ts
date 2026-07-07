import { SITE_CONFIG } from "./siteConfig";

export type ProfileStatus = "active" | "planned";

export interface ProfileLink {
  key: string;
  label: string;
  href: string | null;
  status: ProfileStatus;
  description?: string;
}

export type ActiveProfileLink = ProfileLink & {
  href: string;
  status: "active";
};

export const PROFILE_URLS = {
  site: SITE_CONFIG.site.baseUrl,
  exafuse: SITE_CONFIG.exafuse.canonicalLinks.homepage,
  linkedin: SITE_CONFIG.person.links.linkedin,
  github: SITE_CONFIG.person.links.github,
  githubOrganization: "https://github.com/manish-sharma-ai",
  repository: SITE_CONFIG.site.repository,
  orcid: SITE_CONFIG.person.links.orcid,
  zenodo: SITE_CONFIG.person.links.zenodo,
  huggingFace: SITE_CONFIG.person.links.huggingFace,
  googleScholar: SITE_CONFIG.person.links.googleScholar,
  researchGate: SITE_CONFIG.person.links.researchGate
} as const;

export const GITHUB_IDENTITY = {
  profile: {
    label: "GitHub profile",
    slug: "aiwithms",
    href: PROFILE_URLS.github,
    description: "Personal public GitHub profile for Manish Sharma."
  },
  repositoryOwner: {
    label: "Site/repository owner",
    slug: "manish-sharma-ai",
    href: PROFILE_URLS.githubOrganization,
    description: "GitHub organization that owns the GitHub Pages repository."
  },
  repository: {
    label: "Website repository",
    slug: "manish-sharma-ai/manish-sharma-ai.github.io",
    href: PROFILE_URLS.repository,
    description: "Public source repository for this website."
  },
  aliases: [] as string[]
} as const;

export const PROFILE_LINKS: ProfileLink[] = [
  {
    key: "site",
    label: "Manish Sharma Lab",
    href: PROFILE_URLS.site,
    status: "active",
    description: "Canonical website."
  },
  {
    key: "exafuse",
    label: "Exafuse",
    href: PROFILE_URLS.exafuse,
    status: "active",
    description: "Company connection and industrial LMD context."
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: PROFILE_URLS.linkedin,
    status: "active",
    description: "Public professional profile."
  },
  {
    key: "github",
    label: "GitHub profile",
    href: PROFILE_URLS.github,
    status: "active",
    description: "Personal GitHub profile."
  },
  {
    key: "orcid",
    label: "ORCID",
    href: PROFILE_URLS.orcid,
    status: "planned",
    description: "Planned research profile."
  },
  {
    key: "zenodo",
    label: "Zenodo",
    href: PROFILE_URLS.zenodo,
    status: "planned",
    description: "Planned public archive profile."
  },
  {
    key: "huggingFace",
    label: "Hugging Face",
    href: PROFILE_URLS.huggingFace,
    status: "planned",
    description: "Planned model or dataset profile."
  },
  {
    key: "googleScholar",
    label: "Google Scholar",
    href: PROFILE_URLS.googleScholar,
    status: "planned",
    description: "Planned research profile."
  },
  {
    key: "researchGate",
    label: "ResearchGate",
    href: PROFILE_URLS.researchGate,
    status: "planned",
    description: "Planned research profile."
  }
];

export const ACTIVE_PROFILE_LINKS = PROFILE_LINKS.filter(
  (profile): profile is ActiveProfileLink => profile.status === "active" && Boolean(profile.href)
);

export const PLANNED_PROFILE_LINKS = PROFILE_LINKS.filter((profile) => profile.status === "planned");

export const JSON_LD_SAME_AS = ACTIVE_PROFILE_LINKS
  .filter((profile) => ["linkedin", "github", "exafuse"].includes(profile.key))
  .map((profile) => profile.href as string);
