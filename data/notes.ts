export type Note = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  previewParagraphs: string[];
};

export const notes: Note[] = [
  {
    slug: "drop-the-good-student-mindset",
    category: "Founder Mindset",
    title: "Outgrowing the 'Good Student' Mindset.",
    summary:
      "Prestige chasing is often a substitute for judgment. Real career decisions require standards beyond brand names.",
    previewParagraphs: [
      "Growing up in China, I saw many people trapped in the pressure to look like a 'good student': top schools, big-name internships, stable jobs, and socially approved outcomes.",
      "In environments where people have limited exposure, prestige becomes the default scoring system. Many cannot confidently judge whether one path is truly better than another, so they use brand names as a proxy.",
      "That is how talented people end up on the same track by default. At some point, you have to replace borrowed standards with your own and choose based on direction, not label."
    ]
  },
  {
    slug: "taste-matters-in-the-age-of-ai-slop",
    category: "AI x Product",
    title: "In the Age of AI Slop, Taste Is the Moat.",
    summary:
      "When everyone can ship software, technical execution becomes table stakes. The durable edge shifts to taste and distribution.",
    previewParagraphs: [
      "In the AI era, the two profiles with the biggest upside are Designer + PM and GTM + PM. Both combine product judgment with either craft or distribution.",
      "As building gets easier, code is no longer the strongest moat. More people can make products, so the competitive edge shifts toward sharp taste and clear go-to-market instincts.",
      "The winner is not just the team that can build; it is the team that knows what to build, how to position it, and how to sell it."
    ]
  },
  {
    slug: "customers-pay-to-avoid-falling-behind",
    category: "Customer Psychology",
    title: "Customers Pay to Avoid Loss, Not to Learn a New Workflow.",
    summary:
      "Adoption cost kills many products. The strongest value proposition is often loss prevention, not novelty.",
    previewParagraphs: [
      "A common startup mistake is selling customers on a brand-new way of working. Even when the tool is better, the customer has to absorb behavior change, process change, and organizational friction.",
      "Most buyers are not paying for experimentation. They are paying to stop losing time, revenue, position, or momentum.",
      "Founders should pitch in that language: what pain is already expensive today, and how quickly your product reduces that downside."
    ]
  }
];
