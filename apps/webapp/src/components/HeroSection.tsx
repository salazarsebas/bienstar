"use client";

/**
 * Hero section component for Bien Star homepage
 * Displays main call-to-action and value proposition
 */
import Link from 'next/link';
import { useTranslations } from '../context/TranslationContext';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';

// Import the 3D model component with SSR disabled to avoid hydration issues
const BitcoinModelCanvas = dynamic(() => import('./BitcoinModelCanvas').then(mod => ({ default: mod.default })), { ssr: false });

export default function HeroSection() {
  const { t } = useTranslations();

  return (
    <section className="bg-white dark:bg-background pt-2 pb-16 px-6 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* 3D Bitcoin Model */}
        <div className="w-full h-[500px] mb-8">
          <BitcoinModelCanvas />
        </div>

        {/* Centered Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white text-center max-w-5xl">
          {t('home.hero.title')}
        </h1>

        {/* Subtitle explaining the mechanism */}
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl">
          {t('home.hero.subtitle')}
        </p>

        {/* CTA */}
        <Link
          href="#organizations"
          className="mt-8 inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          {t('home.hero.cta')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
