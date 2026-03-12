import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { profile } from "@/data/profile";
import { ventures } from "@/data/ventures";
import styles from "@/components/sections/venture-detail.module.css";

type VenturePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return ventures.map((venture) => ({
    slug: venture.slug
  }));
}

export default async function VentureDetailPage({ params }: VenturePageProps) {
  const { slug } = await params;
  const venture = ventures.find((entry) => entry.slug === slug);

  if (!venture) {
    notFound();
  }

  return (
    <SiteLayout profile={profile} defaultSection="ventures">
      <article className={styles.article}>
        <Link href="/?section=ventures#ventures" className={styles.backLink} data-cursor-label="back">
          Back
        </Link>

        <span className={styles.status}>{venture.status}</span>
        <h1 className={styles.title}>{venture.name}</h1>
        <p className={styles.tagline}>{venture.tagline}</p>
        <a href={venture.website} target="_blank" rel="noreferrer" className={styles.website}>
          {venture.website.replace(/^https?:\/\//, "")}
        </a>

        <div className={styles.metrics}>
          {venture.metrics.map((metric) => (
            <div key={metric.label} className={styles.metric}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.story}>
          {venture.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </SiteLayout>
  );
}
