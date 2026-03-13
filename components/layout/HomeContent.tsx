"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { LifeSection } from "@/components/sections/LifeSection";
import { NotesSection } from "@/components/sections/NotesSection";
import { VenturesSection } from "@/components/sections/VenturesSection";
import type { ExperienceEntry } from "@/data/experience";
import type { LifeBoardItem } from "@/data/interests";
import type { Note } from "@/data/notes";
import type { SiteMeta } from "@/data/site";
import type { Venture } from "@/data/ventures";
import styles from "./home-content.module.css";

type HomeContentProps = {
  siteMeta: SiteMeta;
  ventures: Venture[];
  experienceEntries: ExperienceEntry[];
  notes: Note[];
  lifeBoardItems: LifeBoardItem[];
};

export function HomeContent({
  siteMeta,
  ventures,
  experienceEntries,
  notes,
  lifeBoardItems
}: HomeContentProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);

  const isScrollableSectionRoot = (element: Element | null): element is HTMLElement => {
    if (!(element instanceof HTMLElement)) {
      return false;
    }
    const styles = window.getComputedStyle(element);
    const overflowY = styles.overflowY;
    const allowsScroll = overflowY === "auto" || overflowY === "scroll";
    return allowsScroll && element.scrollHeight > element.clientHeight + 1;
  };

  useLayoutEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const sections = Array.from(stage.querySelectorAll<HTMLElement>("section[data-home-section='true']"));
    const scrollRoot = stage.closest("section");

    if (sections.length === 0 || !scrollRoot) {
      return;
    }

    const hashSection = window.location.hash.replace("#", "");
    const params = new URLSearchParams(window.location.search);
    const querySection = params.get("section") ?? params.get("scene") ?? "";
    const requested = hashSection || querySection;
    const target = sections.find((section) => section.id === requested);

    if (!target) {
      return;
    }

    if (isScrollableSectionRoot(scrollRoot)) {
      const previousScrollBehavior = scrollRoot.style.scrollBehavior;
      scrollRoot.style.scrollBehavior = "auto";
      scrollRoot.scrollTop = target.offsetTop;
      scrollRoot.style.scrollBehavior = previousScrollBehavior;
    } else {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }

    for (const section of sections) {
      section.dataset.active = section.id === target.id ? "true" : "false";
    }
  }, []);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const sections = Array.from(stage.querySelectorAll<HTMLElement>("section[data-home-section='true']"));

    if (sections.length === 0) {
      return;
    }

    const scrollRoot = stage.closest("section");
    const observerRoot = isScrollableSectionRoot(scrollRoot) ? scrollRoot : null;
    const isNarrowViewport = typeof window !== "undefined" && window.matchMedia("(max-width: 1040px)").matches;
    const rootMargin = isNarrowViewport ? "-25% 0px -25% 0px" : "-45% 0px -45% 0px";
    const observer = new IntersectionObserver(
      (entries) => {
        let activeId = "";

        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            activeId = target.id;
          }
        }

        if (!activeId) {
          return;
        }

        for (const section of sections) {
          section.dataset.active = section.id === activeId ? "true" : "false";
        }

        const currentHash = window.location.hash.replace("#", "");
        if (activeId !== currentHash) {
          window.history.replaceState(null, "", `/#${activeId}`);
          window.dispatchEvent(new Event("hashchange"));
        }
      },
      {
        root: observerRoot,
        rootMargin,
        threshold: 0
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.stage} ref={stageRef}>
      <AboutSection />
      <VenturesSection ventures={ventures} />
      <ExperienceSection experienceEntries={experienceEntries} />
      <LifeSection items={lifeBoardItems} />
      <NotesSection notes={notes} />
      <ContactSection siteMeta={siteMeta} />
    </div>
  );
}
