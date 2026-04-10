import rawUsefulLinksData from "@/data/useful-links.raw.json";
import type { UsefulLink } from "@/types";

type RawUsefulLinkRecord = {
  Rubrique: string | null;
  Qui: string | null;
  Quoi: string | null;
  Lien: string | null;
};

const rawUsefulLinks = rawUsefulLinksData as RawUsefulLinkRecord[];

function normalizeText(value: string | null | undefined, fallback: string): string {
  if (!value) {
    return fallback;
  }

  const trimmedValue = value.trim().replace(/\s+/g, " ");
  return trimmedValue === "" ? fallback : trimmedValue;
}

function normalizeComparable(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeUrl(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();
  if (trimmedValue === "") {
    return null;
  }

  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedValue)) {
    return `mailto:${trimmedValue}`;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmedValue)) {
    return trimmedValue;
  }

  return null;
}

function inferSource(url: string): string {
  if (url.startsWith("mailto:")) {
    return "Email";
  }

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    const pathname = parsedUrl.pathname.toLowerCase();

    if (hostname.includes("isagri.atlassian.net")) {
      if (pathname.includes("/servicedesk/")) {
        return "Jira Service Desk";
      }

      if (pathname.includes("/wiki/")) {
        return "Confluence";
      }

      return "Atlassian";
    }

    if (hostname.includes("groupeisagri.sharepoint.com")) {
      return "SharePoint";
    }

    if (hostname.includes("app.klaxoon.com")) {
      return "Klaxoon";
    }

    if (hostname.includes("engage.cloud.microsoft")) {
      return "Viva Engage";
    }

    if (hostname.includes("docs.groupeisa.com")) {
      return "Docs Groupe ISA";
    }

    if (hostname.includes("monespacerh.groupeisagri.com")) {
      return "Mon Espace RH";
    }

    if (hostname.includes("isamanagement.com")) {
      return "IsaManagement";
    }

    if (hostname.includes("app.jenji.io")) {
      return "Jenji";
    }

    if (hostname.includes("opence.fr")) {
      return "CSE";
    }

    if (hostname.includes("lockself-cloud.com")) {
      return "LockSelf";
    }

    return hostname.replace(/^www\./, "");
  } catch {
    return "Lien externe";
  }
}

function inferType(url: string, title: string): string {
  const normalizedTitle = normalizeComparable(title);
  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.startsWith("mailto:")) {
    return "Contact";
  }

  if (/\.(mp4|mov|webm)(\?|#|$)/i.test(normalizedUrl)) {
    return "Video";
  }

  if (/\.(xlsx|xls|csv)(\?|#|$)/i.test(normalizedUrl)) {
    return "Tableur";
  }

  if (/\.(pdf|doc|docx|ppt|pptx)(\?|#|$)/i.test(normalizedUrl)) {
    return "Document";
  }

  if (normalizedUrl.includes("/whiteboard/")) {
    return "Whiteboard";
  }

  if (normalizedUrl.includes("/database/")) {
    return "Base";
  }

  if (normalizedUrl.includes("/folder/")) {
    return "Dossier";
  }

  if (normalizedUrl.includes("/servicedesk/")) {
    return "Support";
  }

  if (normalizedTitle.includes("guide")) {
    return "Guide";
  }

  if (normalizedTitle.includes("checklist")) {
    return "Checklist";
  }

  if (normalizedTitle.includes("workflow") || normalizedTitle.includes("process")) {
    return "Processus";
  }

  if (normalizedTitle.includes("faq") || normalizedTitle.includes("glossaire")) {
    return "Reference";
  }

  if (normalizedTitle.includes("vision") || normalizedTitle.includes("presentation")) {
    return "Presentation";
  }

  return "Documentation";
}

export const usefulLinks: UsefulLink[] = rawUsefulLinks.flatMap((link, index) => {
  const quoi = normalizeText(link.Quoi, "");
  const url = normalizeUrl(link.Lien);

  if (quoi === "" || !url) {
    return [];
  }

  return [
    {
      id: `link-${String(index + 1).padStart(3, "0")}`,
      categorie: normalizeText(link.Rubrique, "Autres"),
      type: inferType(url, quoi),
      qui: normalizeText(link.Qui, "Tous"),
      quoi,
      url,
      source: inferSource(url),
      publicOrder: index + 1
    }
  ];
});
