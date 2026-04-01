import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { LucidityProvider } from "@/components/LucidityProvider";
import { ClientScene } from "@/components/ClientScene";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARISE OSC - Conscious Open-Source Community",
  description: "A conscious, immersive open-source community where projects, ideas, and people evolve together. Track your lucidity journey through interactive experiences.",
  keywords: ["open-source", "community", "projects", "collective intelligence", "immersive"],
  authors: [{ name: "ARISE Community" }],
  creator: "ARISE OSC",
  publisher: "ARISE OSC",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arise-osc.vercel.app",
    title: "ARISE OSC - Conscious Open-Source Community",
    description: "A conscious, immersive open-source community where projects, ideas, and people evolve together.",
    images: [
      {
        url: "https://arise-osc.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ARISE OSC - Conscious Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARISE OSC",
    description: "A conscious open-source community",
    images: ["https://arise-osc.vercel.app/og-image.png"],
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-screen flex flex-col bg-[--background] text-[--foreground] overflow-x-hidden">
        {/* World Layer: Persistent 3D environment - safe client mount */}
        <ClientScene />

        {/* UI Layer: Route-aware shell and pages with lucidity tracking */}
        <LucidityProvider>
          <AppShell>{children}</AppShell>
        </LucidityProvider>
      </body>
    </html>
  );
}
