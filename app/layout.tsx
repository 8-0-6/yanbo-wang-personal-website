import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/app/globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { FigletPrerenderProvider } from "@/components/providers/FigletPrerenderProvider";
import figletPrerender from "@/data/figlet-prerender.json";

export const metadata: Metadata = {
  // Use www so og:image URL returns 200; non-www redirects (307) and X's crawler won't follow for images
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.yanbowang.space"
  ),
  title: "Yanbo Wang",
  description: "Founder-builder exploring product, growth, ventures, and ideas.",
  openGraph: {
    title: "Yanbo Wang",
    description: "Founder-builder exploring product, growth, ventures, and ideas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yanbo Wang",
    description: "Founder-builder exploring product, growth, ventures, and ideas.",
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
