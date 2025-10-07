'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/context/TranslationContext';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslations();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  
  // Auto-redirect after countdown
  useEffect(() => {
    if (countdown <= 0) {
      router.push('/');
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, router]);
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Image */}
        <div className="relative w-full h-64 mx-auto">
          <Image 
            src="/404/404.png" 
            alt="404 Error" 
            fill
            className="object-contain"
            priority
          />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground">
          {t('error.pageNotFound')}
        </h1>
        
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
          <p className="text-lg text-foreground mb-4">
            {t('error.underConstruction')}
          </p>
          <p className="text-muted-foreground mb-6">
            {t('error.stillDeveloping')}
          </p>
          
          <div className="text-sm text-muted-foreground mb-4">
            {t('error.redirecting')} <span className="font-bold text-primary">{countdown}</span> {t('error.seconds')}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              {t('error.goHome')}
            </Link>
            
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('error.goBack')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
