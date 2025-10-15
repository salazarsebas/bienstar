"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from '../context/TranslationContext';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { locale, setLocale, locales } = useTranslations();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener('click', handleClickOutside);
    
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  if (!mounted) return null;
  
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent immediate closing
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center justify-center">
      <button 
        onClick={toggleDropdown}
        className="p-2 rounded-full bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center justify-center"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-0 mt-2 py-2 w-28 bg-white dark:bg-black rounded-xl shadow-lg z-10 border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          {locales.map((lang) => (
            <button
              key={lang}
              onClick={(e) => {
                e.stopPropagation();
                setLocale(lang);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${locale === lang ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              {lang === 'en' ? 'English' : lang === 'es' ? 'Español' : '日本語'}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
