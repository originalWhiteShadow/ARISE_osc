import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/providers";
import { SignInModal } from "@/components/ui/SignInModal";
import { GlobalHUD } from "@/components/ui/GlobalHUD";
import { GlobalDecorations } from "@/components/ui/GlobalDecorations";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { AiAssistant } from "@/components/ui/AiAssistant";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARISE | Open Source Community",
  description: "A modern, minimal open-source community platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col pt-14">
        <Providers attribute="class" defaultTheme="light" enableSystem={false}>
          <SplashScreen />
          <Navbar />
          <GlobalDecorations />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Suspense fallback={null}>
            <SignInModal />
          </Suspense>
          <AiAssistant />
          <GlobalHUD />
        </Providers>
      </body>
    </html>
  );
}
