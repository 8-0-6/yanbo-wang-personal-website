import type { ReactNode } from "react";
import { FigletAscii } from "@/components/ui/FigletAscii";
import styles from "./section.module.css";

type SectionProps = {
  id: string;
  title?: string;
  children: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} data-home-section="true" data-active="false">
      {title && (
        <>
          <h2 className={styles.srOnly}>{title}</h2>
          <FigletAscii
            text={title.toUpperCase()}
            fontName="Isometric1"
            fontPath="/figlet-fonts/isometric1.flf"
            className={styles.figletTitle}
            targetHeightPx={50}
          />
        </>
      )}
      {children}
    </section>
  );
}
