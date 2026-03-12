import Link from "next/link";
import { Section } from "@/components/ui/Section";
import type { Note } from "@/data/notes";
import styles from "./notes-section.module.css";

type NotesSectionProps = {
  notes: Note[];
};

export function NotesSection({ notes }: NotesSectionProps) {
  return (
    <Section id="notes" title="Notes">
      <ul className={styles.list}>
        {notes.map((note) => (
          <li key={note.slug} className={styles.item}>
            <Link href={`/notes/${note.slug}`} className={styles.link} data-cursor-label="read">
              <span className={styles.title}>{note.title}</span>
              <span className={styles.category}>{note.category}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
