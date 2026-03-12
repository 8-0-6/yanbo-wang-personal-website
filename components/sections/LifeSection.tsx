"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import type { LifeBoardItem } from "@/data/interests";
import styles from "./life-section.module.css";

type LifeSectionProps = {
  items: LifeBoardItem[];
};

type LifeMode = "albums" | "fashion";
type LayoutMap = Record<string, { x: number; y: number; width: number; height: number }>;

function createSeededRandom(seed: number) {
  let value = seed % 2147483647;
  if (value <= 0) {
    value += 2147483646;
  }

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildDistributedLayout(items: LifeBoardItem[], width: number, height: number, seed: number): LayoutMap {
  if (width <= 0 || height <= 0 || items.length === 0) {
    return {};
  }

  const random = createSeededRandom(seed);
  const count = items.length;
  const cols = Math.max(1, Math.ceil(Math.sqrt((count * width) / Math.max(height, 1))));
  const rows = Math.max(1, Math.ceil(count / cols));
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  const slotOrder = Array.from({ length: count }, (_, index) => index);

  for (let i = slotOrder.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [slotOrder[i], slotOrder[j]] = [slotOrder[j], slotOrder[i]];
  }

  const layout: LayoutMap = {};

  for (let index = 0; index < count; index += 1) {
    const item = items[index];
    const slot = slotOrder[index];
    const row = Math.floor(slot / cols);
    const col = slot % cols;
    const cellLeft = col * cellWidth;
    const cellTop = row * cellHeight;
    const maxCellWidth = Math.max(64, cellWidth * 0.82);
    const maxCellHeight = Math.max(64, cellHeight * 0.8);
    const scale = Math.min(1, maxCellWidth / item.width, maxCellHeight / item.height);
    const scaledWidth = Math.max(54, Math.round(item.width * scale));
    const scaledHeight = Math.max(54, Math.round(item.height * scale));
    const freeX = Math.max(0, cellWidth - scaledWidth);
    const freeY = Math.max(0, cellHeight - scaledHeight);
    const jitterX = (random() - 0.5) * freeX * 0.45;
    const jitterY = (random() - 0.5) * freeY * 0.45;
    const minX = cellLeft;
    const maxX = cellLeft + freeX;
    const minY = cellTop;
    const maxY = cellTop + freeY;

    layout[item.id] = {
      x: clamp(cellLeft + freeX / 2 + jitterX, minX, maxX),
      y: clamp(cellTop + freeY / 2 + jitterY, minY, maxY),
      width: scaledWidth,
      height: scaledHeight
    };
  }

  return layout;
}

export function LifeSection({ items }: LifeSectionProps) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [activeMode, setActiveMode] = useState<LifeMode>("albums");
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [layoutSeed] = useState(() => Math.floor(Math.random() * 1_000_000));
  const albumItems = useMemo(() => items.filter((item) => item.src.includes("/albums/")), [items]);
  const fashionItems = useMemo(() => items.filter((item) => item.src.includes("/brands/")), [items]);
  const albumLayout = useMemo(
    () => buildDistributedLayout(albumItems, boardSize.width, boardSize.height, layoutSeed + 11),
    [albumItems, boardSize.height, boardSize.width, layoutSeed]
  );
  const fashionLayout = useMemo(
    () => buildDistributedLayout(fashionItems, boardSize.width, boardSize.height, layoutSeed + 37),
    [fashionItems, boardSize.height, boardSize.width, layoutSeed]
  );

  useEffect(() => {
    const board = boardRef.current;

    if (!board) {
      return;
    }

    const updateBoardSize = () => {
      const rect = board.getBoundingClientRect();
      setBoardSize({
        width: rect.width,
        height: rect.height
      });
    };

    updateBoardSize();
    const observer = new ResizeObserver(updateBoardSize);
    observer.observe(board);

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="life" title="Life">
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.trigger} ${activeMode === "albums" ? styles.active : ""}`}
          onMouseEnter={() => setActiveMode("albums")}
          onFocus={() => setActiveMode("albums")}
          onClick={() => setActiveMode("albums")}
        >
          Albums that inspired me
        </button>
        <button
          type="button"
          className={`${styles.trigger} ${activeMode === "fashion" ? styles.active : ""}`}
          onMouseEnter={() => setActiveMode("fashion")}
          onFocus={() => setActiveMode("fashion")}
          onClick={() => setActiveMode("fashion")}
        >
          Fashion that inspired me
        </button>
      </div>

      <div className={styles.board} ref={boardRef} aria-label="Life inspirations board">
        <div className={`${styles.layer} ${activeMode === "albums" ? styles.layerActive : ""}`} aria-hidden={activeMode !== "albums"}>
          {albumItems.map((item, index) => (
            <div
              key={item.id}
              className={styles.item}
              style={{
                width: `${albumLayout[item.id]?.width ?? item.width}px`,
                height: `${albumLayout[item.id]?.height ?? item.height}px`,
                left: `${albumLayout[item.id]?.x ?? item.x}px`,
                top: `${albumLayout[item.id]?.y ?? item.y}px`,
                transitionDelay: `${index * 26}ms`,
                "--rotation": `${item.rotation}deg`
              } as CSSProperties}
              aria-label={item.alt}
            >
              <Image src={item.src} alt={item.alt} width={item.width} height={item.height} className={styles.image} />
            </div>
          ))}
        </div>

        <div className={`${styles.layer} ${activeMode === "fashion" ? styles.layerActive : ""}`} aria-hidden={activeMode !== "fashion"}>
          {fashionItems.map((item, index) => (
            <div
              key={item.id}
              className={styles.item}
              style={{
                width: `${fashionLayout[item.id]?.width ?? item.width}px`,
                height: `${fashionLayout[item.id]?.height ?? item.height}px`,
                left: `${fashionLayout[item.id]?.x ?? item.x}px`,
                top: `${fashionLayout[item.id]?.y ?? item.y}px`,
                transitionDelay: `${index * 26}ms`,
                "--rotation": `${item.rotation}deg`
              } as CSSProperties}
              aria-label={item.alt}
            >
              <Image src={item.src} alt={item.alt} width={item.width} height={item.height} className={styles.image} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
