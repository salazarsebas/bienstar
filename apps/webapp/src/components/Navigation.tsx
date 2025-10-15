"use client";

/**
 * Navigation component for the Bien Star application
 * Provides links to main sections and language switcher
 */
import React from 'react';
import Link from 'next/link';
import { useTranslations } from '../context/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Home, FolderOpen, PlusCircle, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';
import { motion } from "framer-motion";
// import { useTheme } from "next-themes";

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  iconColor: string
}

export default function Navigation() {
  const { t } = useTranslations();
  // Uncomment when needed
  // const { theme } = useTheme();
  // const isDarkTheme = theme === "dark";
  
  const menuItems: MenuItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: t('nav.home'),
      href: "/",
      gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      iconColor: "text-blue-500",
    },
    {
      icon: <FolderOpen className="h-5 w-5" />,
      label: t('nav.projects'),
      href: "/projects",
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
      iconColor: "text-orange-500",
    },
    {
      icon: <PlusCircle className="h-5 w-5" />,
      label: t('nav.create'),
      href: "/create",
      gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "text-green-500",
    },
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: t('nav.dashboard'),
      href: "/dashboard",
      gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
      iconColor: "text-red-500",
    },
  ];
  
  const itemVariants = {
    initial: { rotateX: 0, opacity: 1 },
    hover: { rotateX: -90, opacity: 0 },
  };
  
  const backVariants = {
    initial: { rotateX: 90, opacity: 0 },
    hover: { rotateX: 0, opacity: 1 },
  };
  
  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { opacity: 1, scale: 2 }
  };
  
  const navGlowVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 }
  };
  
  const sharedTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    duration: 0.5,
  };
  
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Reference for the mobile menu
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const mobileButtonRef = React.useRef<HTMLButtonElement>(null);
  
  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);
  
  // Close mobile menu on window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);
  
  // Prevent layout shifts by using useEffect for initial render
  React.useEffect(() => {
    // Initialize any client-side only functionality here
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg flex items-center px-4 sm:px-6 py-8 transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.png" alt="Bien Star" width={40} height={40} className="object-contain" />
          </Link>
        </div>
        
        <div className="hidden md:flex justify-center flex-1 px-4">
          <motion.nav
            className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden w-auto"
            initial="initial"
            whileHover="hover"
          >
            <motion.div
              className="absolute -inset-2 bg-gradient-radial from-transparent via-blue-400/25 via-30% via-purple-400/25 via-60% via-red-400/25 via-90% to-transparent rounded-3xl z-0 pointer-events-none"
              variants={navGlowVariants}
            />
            <ul className="flex items-center gap-2 relative z-10">
              {menuItems.map((item) => (
                <motion.li key={item.label} className="relative">
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      variants={glowVariants}
                      style={{
                        background: item.gradient,
                        opacity: 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.a
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors rounded-xl"
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                    >
                      <span className={`transition-colors duration-300 group-hover:${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                    <motion.a
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors rounded-xl"
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                    >
                      <span className={`transition-colors duration-300 group-hover:${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </div>
        
        <div className="flex items-center gap-3 min-w-[120px] justify-end">
          <div className="p-1 rounded-full bg-background/80 backdrop-blur-sm shadow-sm border border-border/40 transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <LanguageSwitcher />
          </div>
          <button 
            ref={mobileButtonRef}
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        ref={mobileMenuRef}
        className={`absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border/10 shadow-lg transition-all duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'} z-40`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background/80 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className={`${item.iconColor} transition-colors duration-300`}>
                    {item.icon}
                  </span>
                  <span className="text-foreground">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
