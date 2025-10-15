import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import enTranslations from "../locales/en.json";
import { TranslationProvider } from "../context/TranslationContext";
import { ThemeProvider } from "../context/ThemeProvider";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: enTranslations.common.title,
  description: enTranslations.common.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider>
          <TranslationProvider>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-grow pt-24 mt-8">
                {children}
              </main>
              <Footer />
            </div>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
