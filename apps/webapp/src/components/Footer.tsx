"use client";

/**
 * Footer component for Bien Star
 * Displays copyright information, links, social media, and theme toggle
 */
import React from 'react';
import Link from 'next/link';
import { useTranslations } from '../context/TranslationContext';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

export default function Footer() {
  const { t } = useTranslations();
  // const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 py-8 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Bien Star" width={40} height={40} className="object-contain" />
              <span className="font-bold text-xl text-black dark:text-white">{t('common.name')}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
              {t('common.description')}
            </p>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
          
          {/* Links section */}
          <div>
            <h3 className="font-medium text-black dark:text-white mb-4">{t('nav.projects')}</h3>
            <ul className="space-y-2">
              <FooterLink href="/projects">
                {t('home.featured.title')}
              </FooterLink>
              <FooterLink href="/create">
                {t('create.title')}
              </FooterLink>
              <FooterLink href="/about">
                {t('nav.about')}
              </FooterLink>
            </ul>
          </div>
          
          {/* Legal section */}
          <div>
            <h3 className="font-medium text-black dark:text-white mb-4">{t('footer.rights')}</h3>
            <ul className="space-y-2">
              <FooterLink href="/privacy">
                {t('footer.privacy')}
              </FooterLink>
              <FooterLink href="/terms">
                {t('footer.terms')}
              </FooterLink>
              <FooterLink href="/contact">
                {t('footer.contact')}
              </FooterLink>
            </ul>
          </div>
          
          {/* Social section */}
          <div>
            <h3 className="font-medium text-black dark:text-white mb-4">{t('footer.contact')}</h3>
            <div className="flex space-x-4">
              <SocialLink href="https://github.com/salazarsebas/bienstar" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Bienstar - {t('footer.slogan')}</p>
        </div>
      </div>
    </footer>
  );
}

// Helper component for footer links
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm">
        {children}
      </Link>
    </li>
  );
}

// Helper component for social links
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
    >
      {icon}
    </a>
  );
}
