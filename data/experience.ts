export type ExperienceEntry = {
  title: string;
  label: string;
  period: string;
  summary: string;
  location: string;
  whyItMatters: string;
  proofPoints: string[];
  accent: "ember" | "blue" | "lime";
};

export const experienceEntries: ExperienceEntry[] = [
  {
    title: "Oliver Wyman",
    label: "Management Consulting",
    period: "2025",
    summary:
      "Strategy, PMO, and delivery work across wagering, commercial diligence, and operational research.",
    location: "Hong Kong",
    whyItMatters:
      "This trained the structure layer: how to decompose messy business problems, communicate clearly, and operate inside high-stakes execution environments.",
    proofPoints: ["PMO + tech delivery", "CDD / ODD support", "sports wagering", "consumer chain diligence"],
    accent: "ember"
  },
  {
    title: "TikTok",
    label: "Strategy",
    period: "2024",
    summary:
      "Benchmarking, strategic research, and risk-governance work that translated directly into executive planning.",
    location: "Beijing",
    whyItMatters:
      "This sharpened the product-and-platform lens: benchmarking markets, making messy intelligence useful, and translating research into something senior teams could actually act on.",
    proofPoints: ["Audience insights benchmarking", "AIGC governance analysis", "Executive planning input", "Global tool landscape"],
    accent: "blue"
  },
  {
    title: "HKU / Columbia / Harvard",
    label: "Academic arc",
    period: "2022-2025",
    summary:
      "Economics and finance foundation, sharpened by exchange and visiting-student experiences across New York and Cambridge.",
    location: "Hong Kong / New York / Cambridge",
    whyItMatters:
      "The academic layer matters less as a trophy and more as evidence of range: finance rigor, global context, and enough institutional depth to make the founder story feel grounded.",
    proofPoints: ["Economics & finance", "Exchange in New York", "Visiting student at Harvard", "Scholarship-backed trajectory"],
    accent: "lime"
  }
];
