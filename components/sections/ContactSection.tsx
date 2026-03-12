import { Section } from "@/components/ui/Section";
import type { SiteMeta } from "@/data/site";
import styles from "./contact-section.module.css";

type ContactSectionProps = {
  siteMeta: SiteMeta;
};

export function ContactSection({ siteMeta }: ContactSectionProps) {
  return (
    <Section id="contact" title="Contact">
      <p className={styles.statement}>
        If the overlap is product, growth, or a weirdly good idea: reach out.
      </p>

      <div className={styles.contactRow}>
        <a href={`mailto:${siteMeta.email}`} className={styles.email} data-cursor-label="email">
          {siteMeta.email}
        </a>
        <a href={siteMeta.linkedIn} target="_blank" rel="noreferrer" className={styles.link}>
          LinkedIn
        </a>
        <a href={siteMeta.x} target="_blank" rel="noreferrer" className={styles.link}>
          {siteMeta.xHandle}
        </a>
      </div>
    </Section>
  );
}
