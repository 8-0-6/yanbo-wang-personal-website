"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ascii-text-portrait.module.css";

type AsciiTextPortraitProps = {
  src: string;
  alt: string;
};

function isInk(char: string) {
  return char !== " " && char !== "." && char !== "\t";
}

type ComponentBox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  area: number;
};

function buildGrid(lines: string[]) {
  const width = Math.max(...lines.map((line) => line.length), 0);
  const height = lines.length;
  const grid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => lines[y][x] ?? " ")
  );
  return { grid, width, height };
}

function findComponents(grid: string[][], width: number, height: number) {
  const visited = Array.from({ length: height }, () => Array.from({ length: width }, () => false));
  const components: ComponentBox[] = [];
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (visited[y][x] || !isInk(grid[y][x])) {
        continue;
      }

      const queue: Array<[number, number]> = [[x, y]];
      visited[y][x] = true;
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      let area = 0;

      while (queue.length > 0) {
        const [cx, cy] = queue.shift() as [number, number];
        area += 1;
        minX = Math.min(minX, cx);
        maxX = Math.max(maxX, cx);
        minY = Math.min(minY, cy);
        maxY = Math.max(maxY, cy);

        for (const [ox, oy] of offsets) {
          const nx = cx + ox;
          const ny = cy + oy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
            continue;
          }
          if (visited[ny][nx] || !isInk(grid[ny][nx])) {
            continue;
          }
          visited[ny][nx] = true;
          queue.push([nx, ny]);
        }
      }

      if (area >= 80) {
        components.push({ minX, minY, maxX, maxY, area });
      }
    }
  }

  return components;
}

function scoreComponent(component: ComponentBox, fullWidth: number, fullHeight: number) {
  const boxWidth = component.maxX - component.minX + 1;
  const boxHeight = component.maxY - component.minY + 1;
  const aspect = boxWidth / Math.max(1, boxHeight);
  const centerX = (component.minX + component.maxX) / 2 / Math.max(1, fullWidth);
  const centerY = (component.minY + component.maxY) / 2 / Math.max(1, fullHeight);
  const topRatio = component.minY / Math.max(1, fullHeight);
  const heightRatio = boxHeight / Math.max(1, fullHeight);
  const bboxRatio = (boxWidth * boxHeight) / Math.max(1, fullWidth * fullHeight);

  const aspectScore = 1 - Math.min(Math.abs(aspect - 0.62) / 0.62, 1);
  const centerXScore = 1 - Math.min(Math.abs(centerX - 0.5) / 0.5, 1);
  const centerYScore = 1 - Math.min(Math.abs(centerY - 0.42) / 0.58, 1);
  const topScore = 1 - Math.min(Math.abs(topRatio - 0.08) / 0.42, 1);
  const heightScore = 1 - Math.min(Math.abs(heightRatio - 0.62) / 0.62, 1);

  return bboxRatio * 0.35 + aspectScore * 0.2 + centerXScore * 0.18 + centerYScore * 0.1 + topScore * 0.1 + heightScore * 0.07;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function nearestResize(lines: string[], targetWidth: number, targetHeight: number) {
  if (lines.length === 0) {
    return "";
  }
  const sourceHeight = lines.length;
  const sourceWidth = Math.max(...lines.map((line) => line.length), 0);
  if (sourceWidth === 0) {
    return "";
  }

  const out: string[] = [];
  for (let y = 0; y < targetHeight; y += 1) {
    const sourceY = Math.floor((y / targetHeight) * sourceHeight);
    const row = lines[Math.min(sourceY, sourceHeight - 1)];
    let outRow = "";
    for (let x = 0; x < targetWidth; x += 1) {
      const sourceX = Math.floor((x / targetWidth) * sourceWidth);
      outRow += row[Math.min(sourceX, sourceWidth - 1)] ?? " ";
    }
    out.push(outRow);
  }

  return out.join("\n");
}

function cropAscii(text: string) {
  const rawLines = text.replace(/\r/g, "").split("\n");
  if (rawLines.length === 0) {
    return "";
  }

  const { grid, width, height } = buildGrid(rawLines);
  if (width === 0 || height === 0) {
    return "";
  }

  const components = findComponents(grid, width, height);
  if (components.length === 0) {
    return nearestResize(rawLines, 220, 220);
  }

  let chosen = components[0];
  let bestScore = Number.NEGATIVE_INFINITY;
  for (const component of components) {
    const score = scoreComponent(component, width, height);
    if (score > bestScore) {
      bestScore = score;
      chosen = component;
    }
  }

  const compWidth = chosen.maxX - chosen.minX + 1;
  const compHeight = chosen.maxY - chosen.minY + 1;
  const padTop = Math.floor(compHeight * 0.16);
  const padBottom = Math.floor(compHeight * 0.26);
  const padX = Math.floor(compWidth * 0.16);

  let cropLeft = clamp(chosen.minX - padX, 0, width - 1);
  let cropRight = clamp(chosen.maxX + padX, 0, width - 1);
  const cropTop = clamp(chosen.minY - padTop, 0, height - 1);
  let cropBottom = clamp(chosen.maxY + padBottom, 0, height - 1);

  let cropWidth = cropRight - cropLeft + 1;
  let cropHeight = cropBottom - cropTop + 1;
  const maxHeight = Math.floor(height * 0.8);
  if (cropHeight > maxHeight) {
    cropBottom = clamp(cropTop + maxHeight - 1, cropTop, height - 1);
    cropHeight = cropBottom - cropTop + 1;
  }

  const targetAspect = 1;
  const currentAspect = cropWidth / Math.max(1, cropHeight);
  if (currentAspect < targetAspect) {
    const desiredWidth = Math.floor(cropHeight * targetAspect);
    const extra = desiredWidth - cropWidth;
    const leftExtra = Math.floor(extra / 2);
    const rightExtra = extra - leftExtra;
    cropLeft = clamp(cropLeft - leftExtra, 0, width - 1);
    cropRight = clamp(cropRight + rightExtra, 0, width - 1);
  } else if (currentAspect > targetAspect) {
    const desiredHeight = Math.floor(cropWidth / targetAspect);
    const extra = desiredHeight - cropHeight;
    cropBottom = clamp(cropBottom + extra, cropTop, height - 1);
  }

  cropWidth = cropRight - cropLeft + 1;
  cropHeight = cropBottom - cropTop + 1;

  const cropped = rawLines.slice(cropTop, cropBottom + 1).map((line) => {
    const padded = line.padEnd(width, " ");
    return padded.slice(cropLeft, cropRight + 1);
  });

  const targetWidth = 220;
  const targetHeight = 220;
  if (cropWidth === targetWidth && cropHeight === targetHeight) {
    return cropped.join("\n");
  }

  return nearestResize(cropped, targetWidth, targetHeight);
}

export function AsciiTextPortrait({ src, alt }: AsciiTextPortraitProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((response) => response.text())
      .then((text) => {
        if (!cancelled) {
          setContent(cropAscii(text));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setContent("");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const body = useMemo(() => content.trimEnd(), [content]);

  return (
    <figure className={styles.frame} role="img" aria-label={alt}>
      {body ? <pre className={styles.pre}>{body}</pre> : <div className={styles.loading}>Loading ascii portrait</div>}
    </figure>
  );
}
