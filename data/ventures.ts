export type VentureMetric = {
  label: string;
  value: string;
};

export type Venture = {
  slug: string;
  name: string;
  status: string;
  website: string;
  tagline: string;
  description: string;
  role: string;
  theme: "ember" | "lime";
  metrics: VentureMetric[];
  story: string[];
};

export const ventures: Venture[] = [
  {
    slug: "fineme",
    name: "FineMe",
    status: "Building as a solo founder",
    website: "https://fineme.io",
    tagline: "Behavioral fitness built on loss aversion, real stakes, and daily accountability.",
    description:
      "FineMe came from a personal frustration: I had gone to the gym since high school, but stayed skinny because consistency kept breaking. I realized that if I had done 100 pushups every day, my physique would look completely different. So I built a product around loss aversion instead of motivation.",
    role: "Founder & CEO",
    theme: "ember",
    metrics: [
      { label: "Core concept", value: "AI rep tracking" },
      { label: "Engine", value: "Loss aversion" },
      { label: "Why it matters", value: "Consistency over intention" }
    ],
    story: [
      "Most habit apps use positive reinforcement: reminders, streaks, and encouragement. FineMe takes the opposite approach and uses loss aversion to make the habit feel real.",
      "Users stake money up front, for example $10, and commit to daily rep goals. If they miss their target more than twice in a week, the money is sent to charity. That creates real consequences, not just notifications.",
      "The idea is simple: when there is real downside, people treat consistency seriously. FineMe turns discipline from a wish into a system."
    ]
  },
  {
    slug: "jobro",
    name: "Jobro",
    status: "HKSTP-backed venture",
    website: "https://apple.co/4sr9d5e",
    tagline: "A HKSTP-backed product that started as 'Tinder for jobs' and is now pivoting to an agent-to-agent hiring model.",
    description:
      "Jobro is HKSTP-backed and first launched as a 'Tinder for jobs' app: swipe left to skip, swipe right to send your resume directly to HR. It made job discovery faster and more intuitive for users who hate traditional application flows.",
    role: "Cofounder, CMO & CPO",
    theme: "lime",
    metrics: [
      { label: "Downloads", value: "40K" },
      { label: "Social reach", value: "8M+" },
      { label: "China App Store (Free)", value: "Top 200" }
    ],
    story: [
      "The current direction is an agent-to-agent model. One agent represents the employer and deeply understands role requirements; another represents the candidate and understands skills, goals, and constraints.",
      "Instead of forcing both sides through static forms, the two agents interact to evaluate fit, surface better matches, and help settle interview opportunities.",
      "Jobro now evolves from a fast consumer interface into a matching system where both sides are represented with more context and less friction."
    ]
  }
];
