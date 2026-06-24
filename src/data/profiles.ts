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
  site: "https://manish-sharma-ai.github.io",
  exafuse: "https://www.exafuse.de/",
  linkedin: "https://www.linkedin.com/in/manishsharma5/",
  github: "https://github.com/aiwithms",
  repository: "https://github.com/manish-sharma-ai/manish-sharma-ai.github.io",
  googleScholar: "https://scholar.google.com/citations?hl=en&user=-F9cDT0AAAAJ",
  orcid: null,
  zenodo: null,
  huggingFace: null,
  researchGate: null
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
    label: "GitHub",
    href: PROFILE_URLS.github,
    status: "active",
    description: "Personal GitHub profile."
  },
  {
    key: "googleScholar",
    label: "Google Scholar",
    href: PROFILE_URLS.googleScholar,
    status: "active",
    description: "Public research profile."
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
  .filter((profile) => ["linkedin", "github", "exafuse", "googleScholar"].includes(profile.key))
  .map((profile) => profile.href as string);
