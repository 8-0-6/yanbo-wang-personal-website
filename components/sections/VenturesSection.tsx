import Link from "next/link";
import { Section } from "@/components/ui/Section";
import type { Venture } from "@/data/ventures";
import styles from "./ventures-section.module.css";

type VenturesSectionProps = {
  ventures: Venture[];
};

export function VenturesSection({ ventures }: VenturesSectionProps) {
  return (
    <Section id="ventures" title="Ventures">
      <div className={styles.grid}>
        {ventures.map((venture) => (
          <Link
            key={venture.slug}
            href={`/ventures/${venture.slug}`}
            className={styles.card}
            data-cursor-label="open"
          >
            <span className={styles.status}>{venture.status}</span>
            <h3 className={styles.name}>{venture.name}</h3>
            <span className={styles.website}>{venture.website.replace(/^https?:\/\//, "")}</span>
            <p className={styles.tagline}>{venture.tagline}</p>
            <div className={styles.metrics}>
              {venture.metrics.map((m) => (
                <span key={m.label} className={styles.metric}>
                  {m.value} <span className={styles.metricLabel}>{m.label}</span>
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
