import { Section } from "@/components/ui/Section";
import type { ExperienceEntry } from "@/data/experience";
import styles from "./experience-section.module.css";

type ExperienceSectionProps = {
  experienceEntries: ExperienceEntry[];
};

export function ExperienceSection({ experienceEntries }: ExperienceSectionProps) {
  const workEntries = experienceEntries.filter(
    (entry) => entry.title === "Oliver Wyman" || entry.title === "TikTok"
  );

  return (
    <Section id="experience" title="Experience">
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Work Experience</h3>
        <ul className={styles.list}>
          {workEntries.map((entry) => (
            <li key={entry.title} className={styles.item}>
              <span className={styles.org}>{entry.title}</span>
              <span className={styles.role}>{entry.label}</span>
              <span className={styles.period}>{entry.period}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Academic</h3>
        <ul className={styles.academicList}>
          <li className={styles.academicItem}>
            <span className={styles.org}>University of Hong Kong</span>
            <span className={styles.role}>Economics & Finance</span>
            <span className={styles.period}>2022-2026</span>
          </li>
          <li className={styles.academicItem}>
            <span className={styles.org}>Columbia University</span>
            <span className={styles.role}>Exchange</span>
            <span className={styles.period}>2024</span>
          </li>
          <li className={styles.academicItem}>
            <span className={styles.org}>Harvard University</span>
            <span className={styles.role}>Visiting</span>
            <span className={styles.period}>2025</span>
          </li>
        </ul>
      </div>
    </Section>
  );
}
