"use strict";

const figlet = require("figlet");
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const fontPath = path.join(projectRoot, "public/figlet-fonts/isometric1.flf");
const fontData = fs.readFileSync(fontPath, "utf-8");

figlet.parseFont("Isometric1", fontData);

const opts = { font: "Isometric1", horizontalLayout: "fitted", verticalLayout: "default" };

const entries = [
  "Yanbo Wang",
  "ABOUT",
  "VENTURES",
  "EXPERIENCE",
  "LIFE",
  "NOTES",
  "CONTACT"
];

const out = {};
for (const text of entries) {
  const key = `${text}|Isometric1`;
  out[key] = figlet.textSync(text, opts);
}

const outPath = path.join(projectRoot, "data/figlet-prerender.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out), "utf-8");

console.log("Wrote", outPath, "with", entries.length, "entries");
