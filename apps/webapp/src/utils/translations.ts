"use client";

import { useState, useEffect } from 'react';

// Import translations
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';

// Define available locales
export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];

// Type for translations
type TranslationType = typeof enTranslations;

// Map of translations by locale
const translations: Record<Locale, TranslationType> = {
  en: enTranslations,
  es: esTranslations,
};

// Get browser language or default to 'en'
export const getBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0] as string;
  return locales.includes(browserLang as Locale) ? browserLang as Locale : 'en';
};

// Hook to use translations
export function useTranslations() {
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);
  
  // Initialize locale from localStorage or browser language
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('locale') as Locale | null;
      setLocale(savedLocale && locales.includes(savedLocale) ? savedLocale : getBrowserLanguage());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Fallback if localStorage is not available
      setLocale(getBrowserLanguage());
    }
    setMounted(true);
  }, []);
  
  // Save locale to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('locale', locale);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Ignore localStorage errors
      }
    }
  }, [locale, mounted]);
  
  // Change locale function
  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };
  
  return {
    t: translations[locale],
    locale,
    setLocale: changeLocale,
    locales,
  };
}
