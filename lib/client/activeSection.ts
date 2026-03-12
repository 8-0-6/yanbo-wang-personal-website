import { useSyncExternalStore } from "react";

export type PrimarySection = "about" | "ventures" | "experience" | "life" | "notes" | "contact";

const validSections = new Set<PrimarySection>(["about", "ventures", "experience", "life", "notes", "contact"]);

export function useActiveSection(fallback: PrimarySection) {
  return useSyncExternalStore(subscribeToLocationChanges, () => getActiveSectionSnapshot(fallback), () => fallback);
}

function subscribeToLocationChanges(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);

  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getActiveSectionSnapshot(fallback: PrimarySection) {
  const pathname = window.location.pathname;

  if (pathname.startsWith("/ventures")) {
    return "ventures";
  }

  if (pathname.startsWith("/notes")) {
    return "notes";
  }

  const hash = window.location.hash.replace("#", "");

  if (validSections.has(hash as PrimarySection)) {
    return hash as PrimarySection;
  }

  return fallback;
}
