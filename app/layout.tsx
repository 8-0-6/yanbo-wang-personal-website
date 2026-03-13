import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/app/globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { FigletPrerenderProvider } from "@/components/providers/FigletPrerenderProvider";
import figletPrerender from "@/data/figlet-prerender.json";

const CANONICAL_ORIGIN = "https://www.yanbowang.space";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: "Yanbo Wang",
  description: "Founder-builder exploring product, growth, ventures, and ideas.",
  openGraph: {
    title: "Yanbo Wang",
    description: "Founder-builder exploring product, growth, ventures, and ideas.",
    type: "website",
    images: [
      {
        url: `${CANONICAL_ORIGIN}/images/og-about.png`,
        width: 1200,
        height: 630,
        alt: "Portrait of Yanbo Wang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yanbo Wang",
    description: "Founder-builder exploring product, growth, ventures, and ideas.",
    images: [`${CANONICAL_ORIGIN}/images/og-about.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistMono.variable}>
        <FigletPrerenderProvider prerender={figletPrerender as Record<string, string>}>
          <CustomCursor />
          {children}
          <Analytics />
        </FigletPrerenderProvider>
      </body>
    </html>
  );
}
