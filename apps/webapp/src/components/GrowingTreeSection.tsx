"use client";

/**
 * GrowingTreeSection component
 * Shows a progression of tree growth with Bitcoin contributions
 * Uses GSAP for smooth animations and scroll-triggered effects
 */
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from '../context/TranslationContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GrowingTreeSection() {
  const { t } = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Register ScrollTrigger plugin
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);
  
  // Initialize animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create a timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 10%",
        scrub: 2, // Slower scrub for smoother transitions
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate each step as it comes into view
    stepsRef.current.forEach((step) => {
      if (!step) return;
      
      // Create a separate timeline for each step
      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 70%",
          end: "bottom 50%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Animate the step content
      stepTl.fromTo(step.querySelector('.step-image'), 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        0
      );
      
      stepTl.fromTo(step.querySelector('.step-content'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        0.2
      );
    });
    
    // Create a more dramatic title animation
    if (textRef.current) {
      // Title animation
      const titleElement = textRef.current.querySelector('h2');
      const underlineElement = textRef.current.querySelector('div.h-1');
      const subtitleElement = textRef.current.querySelector('p');
      
      if (titleElement && underlineElement && subtitleElement) {
        // Title slide in from bottom with fade
        tl.fromTo(titleElement, 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          0
        );
        
        // Underline grow animation
        tl.fromTo(underlineElement,
          { width: 0, opacity: 0 },
          { width: 160, opacity: 1, duration: 0.8, ease: "power2.inOut" },
          0.3
        );
        
        // Add subtle animation to the subtitle
        tl.fromTo(subtitleElement,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0.5
        );
      }
    }
    
    timelineRef.current = tl;
    
    return () => {
      // Clean up
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-32 my-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" ref={textRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2">
            {t('home.growing.title') || 'Every Contribution Grows Impact'}
          </h2>

          <br />
          
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto block">
            {t('home.growing.subtitle') || 'Watch as your Bitcoin donations transform from seeds to a flourishing ecosystem of change.'}
          </p>
        </div>

        <br />
        
        {/* Steps with images */}
        <div className="space-y-24 mt-16">
          {/* Step 1 */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            ref={(el) => {
              stepsRef.current[0] = el;
              return undefined;
            }}
          >
            <div className="step-image md:order-1">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/growing-with-bitcoin/1.png"
                  alt="Tree growth stage 1"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
            <div className="step-content md:order-2">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white text-2xl mb-3">
                    {t('home.growing.step1.title') || 'Plant the Seed'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {t('home.growing.step1.description') || 'Your first Bitcoin donation plants the seed of change, beginning a journey of transformation.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            ref={(el) => {
              stepsRef.current[1] = el;
              return undefined;
            }}
          >
            <div className="step-content md:order-1">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white text-2xl mb-3">
                    {t('home.growing.step2.title') || 'First Sprouts'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {t('home.growing.step2.description') || 'Watch as your contribution takes root, bringing the first signs of positive change to communities in need.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="step-image md:order-2">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/growing-with-bitcoin/2.png"
                  alt="Tree growth stage 2"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            ref={(el) => {
              stepsRef.current[2] = el;
              return undefined;
            }}
          >
            <div className="step-image md:order-1">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/growing-with-bitcoin/3.png"
                  alt="Tree growth stage 3"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
            <div className="step-content md:order-2">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white text-2xl mb-3">
                    {t('home.growing.step3.title') || 'Growing Stronger'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {t('home.growing.step3.description') || 'As more contributions join, our collective impact grows stronger, weathering challenges together.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            ref={(el) => {
              stepsRef.current[3] = el;
              return undefined;
            }}
          >
            <div className="step-content md:order-1">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white text-2xl mb-3">
                    {t('home.growing.step4.title') || 'Blossoming Impact'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {t('home.growing.step4.description') || 'Your sustained support allows projects to blossom, creating visible change and inspiring others to join.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="step-image md:order-2">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/growing-with-bitcoin/4.png"
                  alt="Tree growth stage 4"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
          
          {/* Step 5 */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            ref={(el) => {
              stepsRef.current[4] = el;
              return undefined;
            }}
          >
            <div className="step-image md:order-1">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src="/growing-with-bitcoin/5.png"
                  alt="Tree growth stage 5"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
            <div className="step-content md:order-2">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xl">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white text-2xl mb-3">
                    {t('home.growing.step5.title') || 'Flourishing Ecosystem'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {t('home.growing.step5.description') || 'Together we create a flourishing ecosystem of positive impact, transforming communities and lives for generations to come.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
