"use client";

/**
 * Hero section component for Bien Star homepage
 * Displays main call-to-action and value proposition
 */
import { useTranslations } from '../context/TranslationContext';
import dynamic from 'next/dynamic';

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
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white text-center">
          {t('home.hero.title')}
        </h1>
      </div>
    </section>
  );
}
