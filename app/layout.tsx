import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";

export const metadata: Metadata = {
  title: "Yanbo Wang",
  description: "Founder-builder exploring product, growth, ventures, and ideas."
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
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
