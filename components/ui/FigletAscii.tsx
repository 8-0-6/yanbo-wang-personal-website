"use client";

import { useEffect, useMemo, useState } from "react";

type FigletAsciiProps = {
  text: string;
  fontName?: string;
  fontPath?: string;
  className?: string;
  targetHeightPx?: number;
  rainbow?: boolean;
};

const loadedFonts = new Set<string>();

type RainbowGlyph = {
  lines: string[];
  width: number;
  color?: string;
};

function splitAsciiLines(value: string) {
  const lines = value.replace(/\r/g, "").split("\n");
  while (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines;
}

export function FigletAscii({
  text,
  fontName = "Slant",
  fontPath = "/figlet-fonts/slant.flf",
  className,
  targetHeightPx,
  rainbow = false
}: FigletAsciiProps) {
  const [asciiArt, setAsciiArt] = useState(text);
  const [rainbowGlyphs, setRainbowGlyphs] = useState<RainbowGlyph[]>([]);

  useEffect(() => {
    let cancelled = false;

    const renderFiglet = async () => {
      try {
        const figletModule = await import("figlet");
        const figlet = "default" in figletModule ? figletModule.default : figletModule;

        if (!loadedFonts.has(fontName)) {
          const response = await fetch(fontPath);
          if (!response.ok) {
            throw new Error(`Failed to load FIGlet font: ${fontPath}`);
          }
          const fontData = await response.text();
          figlet.parseFont(fontName, fontData);
          loadedFonts.add(fontName);
        }

        const output = figlet.textSync(text, {
          font: fontName,
          horizontalLayout: "fitted",
          verticalLayout: "default"
        });

        if (!cancelled) {
          setAsciiArt(output);

          if (rainbow) {
            const glyphs = text.split("").map((char, index) => {
              if (char === " ") {
                return {
                  lines: [],
                  width: 3
                } satisfies RainbowGlyph;
              }

              const glyphOutput = figlet.textSync(char, {
                font: fontName,
                horizontalLayout: "default",
                verticalLayout: "default"
              });
              const glyphLines = splitAsciiLines(glyphOutput);
              const width = Math.max(1, ...glyphLines.map((line) => line.length));
              const hue = (seed * 17 + index * 53) % 360;

              return {
                lines: glyphLines,
                width,
                color: `hsl(${hue}, 88%, 62%)`
              } satisfies RainbowGlyph;
            });

            setRainbowGlyphs(glyphs);
          } else {
            setRainbowGlyphs([]);
          }
        }
      } catch {
        if (!cancelled) {
          setAsciiArt(text);
          setRainbowGlyphs([]);
        }
      }
    };

    renderFiglet();

    return () => {
      cancelled = true;
    };
  }, [fontName, fontPath, text]);

  const seed = useMemo(() => {
    let value = 0;
    const source = `${text}|${fontName}`;
    for (let index = 0; index < source.length; index += 1) {
      value = (value * 31 + source.charCodeAt(index)) % 1_000_003;
    }
    return value;
  }, [fontName, text]);
  const lineCount = useMemo(() => {
    if (rainbow && rainbowGlyphs.length > 0) {
      return Math.max(1, ...rainbowGlyphs.map((glyph) => glyph.lines.length));
    }
    return Math.max(1, asciiArt.split("\n").filter((line) => line.trim().length > 0).length);
  }, [asciiArt, rainbow, rainbowGlyphs]);
  const computedFontSize = targetHeightPx ? Math.max(1, targetHeightPx / lineCount) : undefined;

  const rainbowContent = useMemo(() => {
    if (!rainbow || rainbowGlyphs.length === 0) {
      return asciiArt;
    }

    const maxLines = Math.max(1, ...rainbowGlyphs.map((glyph) => glyph.lines.length));

    return Array.from({ length: maxLines }, (_, lineIndex) => (
      <span key={`line-${lineIndex}`} style={{ display: "block", whiteSpace: "pre" }}>
        {rainbowGlyphs.map((glyph, glyphIndex) => {
          const line = glyph.lines[lineIndex] ?? "";
          const padded = line.padEnd(glyph.width, " ");
          return (
            <span key={`glyph-${lineIndex}-${glyphIndex}`} style={glyph.color ? { color: glyph.color } : undefined}>
              {padded}
            </span>
          );
        })}
      </span>
    ));
  }, [asciiArt, rainbow, rainbowGlyphs]);

  return (
    <pre className={className} style={computedFontSize ? { fontSize: `${computedFontSize}px` } : undefined}>
      {rainbowContent}
    </pre>
  );
}
