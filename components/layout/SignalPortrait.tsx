"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./signal-portrait.module.css";

type SignalPortraitProps = {
  src: string;
  alt: string;
  words?: string;
  maxWordRepeats?: number;
};

const DEFAULT_WORDS = "YANBO WANG FOUNDER BUILDER STRATEGY PRODUCT GROWTH";

export function SignalPortrait({ src, alt, words, maxWordRepeats = 3 }: SignalPortraitProps) {
  const [ascii, setAscii] = useState("");
  const wordTokens = useMemo(() => {
    const normalized = (words ?? DEFAULT_WORDS).toUpperCase().trim();
    const rawTokens = normalized.split(/\s+/).filter(Boolean);
    const seen = new Set<string>();
    const uniqueTokens: string[] = [];

    for (const token of rawTokens) {
      if (!seen.has(token)) {
        seen.add(token);
        uniqueTokens.push(token);
      }
    }

    if (uniqueTokens.length > 0) {
      return uniqueTokens;
    }

    return DEFAULT_WORDS.split(" ");
  }, [words]);

  useEffect(() => {
    let disposed = false;
    const image = new Image();
    image.src = src;

    image.onload = () => {
      if (disposed) {
        return;
      }

      const maskWidth = 92;
      const maskHeight = Math.max(104, Math.floor((image.height / image.width) * maskWidth));
      const slotsX = 8;
      const slotsY = Math.max(20, Math.min(28, Math.floor((maskHeight / maskWidth) * slotsX * 2.1)));
      const cellWidth = Math.max(8, Math.min(12, Math.max(...wordTokens.map((token) => token.length))));
      const blankCell = `${" ".repeat(cellWidth)} `;
      const canvas = document.createElement("canvas");
      canvas.width = maskWidth;
      canvas.height = maskHeight;
      const context = canvas.getContext("2d", { willReadFrequently: true });

      if (!context) {
        return;
      }

      context.filter = "grayscale(1) contrast(1.45)";
      context.drawImage(image, 0, 0, maskWidth, maskHeight);
      const { data } = context.getImageData(0, 0, maskWidth, maskHeight);

      const luminance = new Array<number>(maskWidth * maskHeight);
      let sum = 0;

      for (let i = 0; i < luminance.length; i += 1) {
        const base = i * 4;
        const lum = 0.2126 * data[base] + 0.7152 * data[base + 1] + 0.0722 * data[base + 2];
        luminance[i] = lum;
        sum += lum;
      }

      const mean = sum / luminance.length;
      const adaptiveThreshold = Math.max(86, Math.min(168, mean - 10));
      const slotMask = Array.from({ length: slotsY }, () => Array.from({ length: slotsX }, () => false));

      for (let sy = 0; sy < slotsY; sy += 1) {
        for (let sx = 0; sx < slotsX; sx += 1) {
          const startX = Math.floor((sx * maskWidth) / slotsX);
          const endX = Math.floor(((sx + 1) * maskWidth) / slotsX);
          const startY = Math.floor((sy * maskHeight) / slotsY);
          const endY = Math.floor(((sy + 1) * maskHeight) / slotsY);

          let score = 0;
          let samples = 0;

          for (let y = startY; y < endY; y += 1) {
            for (let x = startX; x < endX; x += 1) {
              const idx = y * maskWidth + x;
              const lum = luminance[idx];
              const right = x + 1 < maskWidth ? luminance[idx + 1] : lum;
              const down = y + 1 < maskHeight ? luminance[idx + maskWidth] : lum;
              const edge = Math.abs(lum - right) + Math.abs(lum - down);
              const xNorm = x / maskWidth;
              const yNorm = y / maskHeight;
              const isFaceZone = yNorm < 0.56 && xNorm > 0.18 && xNorm < 0.82;
              const dark = lum < adaptiveThreshold + (isFaceZone ? 20 : 0);
              const structural = edge > (isFaceZone ? 16 : 22);

              if (dark || structural) {
                score += isFaceZone ? 1.25 : 1;
              }
              samples += 1;
            }
          }

          const density = score / Math.max(samples, 1);
          const slotYNorm = sy / slotsY;
          const centerBias = Math.abs(sx - (slotsX - 1) / 2) <= 2;
          const threshold = slotYNorm < 0.62 && centerBias ? 0.27 : 0.34;
          slotMask[sy][sx] = density > threshold;
        }
      }

      const cleanedMask = slotMask.map((row) => [...row]);
      for (let sy = 0; sy < slotsY; sy += 1) {
        for (let sx = 0; sx < slotsX; sx += 1) {
          let neighbors = 0;
          for (let oy = -1; oy <= 1; oy += 1) {
            for (let ox = -1; ox <= 1; ox += 1) {
              if (ox === 0 && oy === 0) {
                continue;
              }
              const ny = sy + oy;
              const nx = sx + ox;
              if (ny < 0 || ny >= slotsY || nx < 0 || nx >= slotsX) {
                continue;
              }
              if (slotMask[ny][nx]) {
                neighbors += 1;
              }
            }
          }

          if (slotMask[sy][sx] && neighbors <= 1) {
            cleanedMask[sy][sx] = false;
          } else if (!slotMask[sy][sx] && neighbors >= 6) {
            cleanedMask[sy][sx] = true;
          }
        }
      }

      const budget = new Map<string, number>();
      for (const token of wordTokens) {
        budget.set(token, maxWordRepeats);
      }

      let tokenPointer = 0;
      const nextWord = () => {
        if (budget.size === 0) {
          return null;
        }

        for (let tries = 0; tries < wordTokens.length; tries += 1) {
          const candidate = wordTokens[tokenPointer % wordTokens.length];
          tokenPointer += 1;
          const remaining = budget.get(candidate) ?? 0;
          if (remaining > 0) {
            budget.set(candidate, remaining - 1);
            return candidate;
          }
        }

        return null;
      };

      const lines: string[] = [];
      for (let sy = 0; sy < slotsY; sy += 1) {
        let line = "";
        for (let sx = 0; sx < slotsX; sx += 1) {
          if (!cleanedMask[sy][sx]) {
            line += blankCell;
            continue;
          }

          const word = nextWord();
          if (!word) {
            const dotFill = ".".repeat(Math.max(3, Math.floor(cellWidth * 0.6))).padEnd(cellWidth, " ");
            line += `${dotFill} `;
            continue;
          }

          line += `${word.padEnd(cellWidth, " ").slice(0, cellWidth)} `;
        }

        lines.push(line.replace(/\s+$/, ""));
      }

      setAscii(lines.join("\n"));
    };

    return () => {
      disposed = true;
    };
  }, [maxWordRepeats, src, wordTokens]);

  return (
    <figure className={styles.frame} role="img" aria-label={alt}>
      {ascii ? <pre className={styles.ascii}>{ascii}</pre> : <div className={styles.loading}>Loading portrait</div>}
    </figure>
  );
}
