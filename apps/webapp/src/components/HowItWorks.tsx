"use client";

/**
 * HowItWorks component explaining the platform's process
 * Shows the three main steps: Donate, Verify, and Make Impact
 * Styled with numbered steps and connecting arrows
 */
import React from 'react';
import { useTranslations } from '../context/TranslationContext';
import { Bitcoin, ShieldCheck, Sprout } from 'lucide-react';

export default function HowItWorks() {
  const { t } = useTranslations();
  
  return (
    <section className="bg-white dark:bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
            {t('home.how.subtitle')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            {t('home.how.title')}
          </h2>
        </div>
        
        <div className="relative">
          {/* Desktop connecting arrows */}
          <div className="hidden md:block absolute top-24 left-1/4 w-1/2 h-4">
            <div className="w-full h-0.5 bg-gray-200 dark:bg-gray-700 absolute top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-45 w-3 h-3 border-t-2 border-r-2 border-gray-200 dark:border-gray-700"></div>
          </div>
          
          {/* Steps container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative">
            {/* Step 1: Donate */}
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="text-8xl font-bold text-primary/20 dark:text-primary/10">
                  1
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black dark:bg-white rounded-full p-4 shadow-md">
                    <Bitcoin className="w-12 h-12 text-yellow-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                {t('home.how.donate.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {t('home.how.donate.description')}
              </p>
            </div>
            
            {/* Step 2: Verify */}
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="text-8xl font-bold text-primary/20 dark:text-primary/10">
                  2
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black dark:bg-white rounded-full p-4 shadow-md">
                    <ShieldCheck className="w-12 h-12 text-green-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                {t('home.how.verify.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {t('home.how.verify.description')}
              </p>
            </div>
            
            {/* Step 3: Impact */}
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="text-8xl font-bold text-primary/20 dark:text-primary/10">
                  3
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black dark:bg-white rounded-full p-4 shadow-md">
                    <Sprout className="w-12 h-12 text-emerald-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                {t('home.how.impact.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {t('home.how.impact.description')}
              </p>
            </div>
          </div>
          
          {/* Mobile connecting lines */}
          <div className="md:hidden flex flex-col items-center">
            <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700 my-2"></div>
            <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700 my-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

