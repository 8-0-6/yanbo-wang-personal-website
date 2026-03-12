import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { notes } from "@/data/notes";
import { profile } from "@/data/profile";
import styles from "@/components/sections/note-detail.module.css";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return notes.map((note) => ({
    slug: note.slug
  }));
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = notes.find((entry) => entry.slug === slug);

  if (!note) {
    notFound();
  }

  return (
    <SiteLayout profile={profile} defaultSection="notes">
      <article className={styles.article}>
        <Link href="/?section=notes#notes" className={styles.backLink} data-cursor-label="notes">
          Back
        </Link>

        <span className={styles.category}>{note.category}</span>
        <h1 className={styles.title}>{note.title}</h1>
        <p className={styles.summary}>{note.summary}</p>

        <div className={styles.body}>
          {note.previewParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </SiteLayout>
  );
}
