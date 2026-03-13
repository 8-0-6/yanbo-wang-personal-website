import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/app/globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { FigletPrerenderProvider } from "@/components/providers/FigletPrerenderProvider";
import figletPrerender from "@/data/figlet-prerender.json";

export const metadata: Metadata = {
  title: "Yanbo Wang",
  description: "Founder-builder exploring product, growth, ventures, and ideas."
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
