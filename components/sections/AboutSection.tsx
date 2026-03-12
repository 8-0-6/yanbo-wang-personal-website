import { Section } from "@/components/ui/Section";
import styles from "./about-section.module.css";

export function AboutSection() {
  return (
    <Section id="about" title="About">
      <div className={styles.copy}>
        <p className={styles.statement}>
          I&apos;m Yanbo Wang and I go by Bob.
        </p>
        <p className={styles.statement}>
          I&apos;m 21, from Changsha, China, and currently based in Hong Kong.
        </p>
        <p className={styles.statement}>
          I&apos;m a consultant turned entrepreneur, and a business major turned builder.
        </p>
        <p className={styles.statement}>
          I like products that feel inevitable, brands that travel, and systems that change behavior.
        </p>
      </div>
    </Section>
  );
}
