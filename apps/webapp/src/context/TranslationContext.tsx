"use client";

/**
 * TranslationContext provides multilingual support for the Bien Star application
 * using Languine AI for translation management.
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
import jaTranslations from '../locales/ja.json';

// Define available locales
export const locales = ['en', 'es', 'ja'] as const;
export type Locale = typeof locales[number];

// Type for translations
type TranslationType = typeof enTranslations;

// Type for translation function
type TranslationFunction = (key: string, params?: Record<string, string>) => string;

// Map of translations by locale
const translations: Record<Locale, TranslationType> = {
  en: enTranslations,
  es: esTranslations,
  ja: jaTranslations,
};

// Get browser language or default to 'en'
export const getBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0] as string;
  return locales.includes(browserLang as Locale) ? browserLang as Locale : 'en';
};

// Create context type
type TranslationContextType = {
  t: TranslationFunction;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  locales: readonly Locale[];
};

// Create context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider component
export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  
  // Initialize locale from localStorage or browser language
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && locales.includes(savedLocale)) {
        setLocale(savedLocale);
      } else {
        setLocale(getBrowserLanguage());
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Ignore localStorage errors (e.g. in SSR or when cookies are disabled)
      setLocale(getBrowserLanguage());
    }
  }, []);
  
  // Save locale to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('locale', locale);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Ignore localStorage errors
    }
  }, [locale]);
  
  /**
   * Translation function that handles nested keys and parameter replacement
   * @param key - Dot-notation key path (e.g., "home.hero.title")
   * @param params - Optional parameters for string interpolation
   */
  const t = (key: string, params?: Record<string, string>): string => {
    try {
      // Handle nested keys using dot notation
      const keys = key.split('.');
      let value: Record<string, unknown> | string = translations[locale];
      
      // Navigate through nested objects
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k] as Record<string, unknown> | string;
        } else {
          // Key not found, return the key itself as fallback
          return key;
        }
      }
      
      // If we have a string value and params for interpolation
      if (typeof value === 'string' && params) {
        return Object.entries(params).reduce(
          (str, [paramKey, paramValue]) => 
            str.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue),
          value
        );
      }
      
      return typeof value === 'string' ? value : key;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Return the key as fallback in case of any errors
      return key;
    }
  };
  
  const value = {
    t,
    locale,
    setLocale,
    locales,
  };
  
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook to use translations
export function useTranslations() {
  const context = useContext(TranslationContext);
  
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }
  
  return context;
}
