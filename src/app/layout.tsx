import type { Metadata } from "next";
import { Fraunces, Archivo, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

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
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${splineSansMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
