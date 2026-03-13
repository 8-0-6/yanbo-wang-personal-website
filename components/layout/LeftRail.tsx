"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { FigletAscii } from "@/components/ui/FigletAscii";
import type { Profile } from "@/data/profile";
import { useActiveSection, type PrimarySection } from "@/lib/client/activeSection";
import { AsciiTextPortrait } from "./AsciiTextPortrait";
import { SignalPortrait } from "./SignalPortrait";
import styles from "./left-rail.module.css";

type LeftRailProps = {
  profile: Profile;
  defaultSection?: PrimarySection;
};

const navItems: Array<{ id: PrimarySection; label: string }> = [
  { id: "about", label: "About" },
  { id: "ventures", label: "Ventures" },
  { id: "experience", label: "Experience" },
  { id: "life", label: "Life" },
  { id: "notes", label: "Notes" },
  { id: "contact", label: "Contact" }
];

export function LeftRail({ profile, defaultSection = "about" }: LeftRailProps) {
  const activeSection = useActiveSection(defaultSection);
  const isAboutSection = activeSection === "about";
  const isVenturesSection = activeSection === "ventures";
  const isExperienceSection = activeSection === "experience";
  const isLifeSection = activeSection === "life";
  const isNotesSection = activeSection === "notes";
  const isContactSection = activeSection === "contact";
  const portraitSrc = isAboutSection
    ? "/images/about.png"
    : isVenturesSection
      ? "/images/ventures-section-portrait-v3.png"
      : isExperienceSection
        ? "/images/experience-section-portrait-v1.png"
      : isLifeSection
        ? "/images/life-section-portrait-v2.png"
        : isNotesSection
          ? "/images/notes-section-portrait-v2.png"
          : isContactSection
            ? "/images/contact-section-portrait-v2.png"
      : profile.portraitPath;
  const portraitMode =
    isAboutSection || isVenturesSection || isExperienceSection || isLifeSection || isNotesSection || isContactSection
      ? "image"
      : profile.portraitMode;

  const handleNavJump = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();
    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${id}`);
    window.dispatchEvent(new Event("hashchange"));
  };

  return (
    <aside className={`${styles.rail} ${styles.forceAmatic}`}>
      <div className={styles.identity}>
        <h1 className={styles.srOnly}>{profile.displayName}</h1>
        <FigletAscii
          text="Yanbo Wang"
          fontName="Isometric1"
          fontPath="/figlet-fonts/isometric1.flf"
          className={styles.figletName}
          targetHeightPx={28}
        />
      </div>

      <div className={styles.portraitWrap}>
        {portraitSrc ? (
          portraitMode === "asciiText" ? (
            <AsciiTextPortrait src={portraitSrc} alt={profile.portraitAlt} />
          ) : portraitMode === "image" ? (
            <Image
              src={portraitSrc}
              alt={profile.portraitAlt}
              width={720}
              height={1024}
              className={`${styles.portrait} ${styles.asciiPortrait}`}
              priority
            />
          ) : (
            <SignalPortrait
              src={portraitSrc}
              alt={profile.portraitAlt}
              words={profile.signalWords}
              maxWordRepeats={profile.maxWordRepeats}
            />
          )
        ) : (
          <div className={styles.portraitPlaceholder} aria-label={profile.portraitAlt}>
            Add your portrait
          </div>
        )}
      </div>

      <nav className={styles.nav} aria-label="Primary">
        {navItems.map((item) => {
          const active = item.id === activeSection;
          return (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              scroll={false}
              className={`${styles.navItem} ${active ? styles.active : ""}`}
              data-cursor-label={item.label.toLowerCase()}
              onClick={(event) => handleNavJump(event, item.id)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <p className={styles.tagline}>
        {profile.tagline}
      </p>
    </aside>
  );
}
