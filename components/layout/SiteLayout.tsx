import type { ReactNode } from "react";
import { LeftRail } from "@/components/layout/LeftRail";
import type { Profile } from "@/data/profile";
import type { PrimarySection } from "@/lib/client/activeSection";
import styles from "./site-layout.module.css";

type SiteLayoutProps = {
  children: ReactNode;
  profile: Profile;
  defaultSection?: PrimarySection;
};

export function SiteLayout({
  children,
  profile,
  defaultSection = "about"
}: SiteLayoutProps) {
  return (
    <main className={styles.shell}>
      <div className={styles.grid}>
        <LeftRail profile={profile} defaultSection={defaultSection} />
        <section className={styles.content}>{children}</section>
      </div>
    </main>
  );
}
