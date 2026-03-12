export type Profile = {
  displayName: string;
  shortName: string;
  tagline: string;
  portraitAlt: string;
  portraitPath?: string;
  portraitMode?: "signal" | "image" | "asciiText";
  signalWords?: string;
  maxWordRepeats?: number;
};

export const profile: Profile = {
  displayName: "Yanbo Wang",
  shortName: "Yanbo",
  tagline:
    "Welcome to Yanbo (Bob)'s place, scroll around and explore my world of ventures, notes, and ideas.",
  portraitAlt: "Portrait of Yanbo Wang",
  portraitPath: "/images/yanbo-ascii-final.png",
  portraitMode: "image",
  signalWords: "FOUNDER BUILDER STRATEGY PRODUCT GROWTH YANBO WANG",
  maxWordRepeats: 3
};
