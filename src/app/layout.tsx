import type { Metadata } from "next";
import { Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import CursorSpotlight from "@/components/CursorSpotlight";

// Brockmann is loaded via @font-face in globals.css (not available on Google Fonts)
// Times New Roman is a system font — no import needed

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "the Kissa — Where Art Meets Storytelling",
  description:
    "the Kissa is a media art agency specializing in branded content, digital campaigns, video production, and immersive experiences. Every project is a kissa — a story made unforgettable.",
  openGraph: {
    title: "the Kissa — Where Art Meets Storytelling",
    description: "A media art agency. Every project is a kissa — a story made unforgettable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${splineSansMono.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ cursor: "none" }}>
        <LoadingScreen />
        <CursorSpotlight />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
