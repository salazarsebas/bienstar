"use client";

/**
 * Home page component for Bien Star crowdfunding platform
 * Assembles the main sections of the homepage
 */
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import FeaturedProjects from "../components/FeaturedProjects";
import GrowingTreeSection from "../components/GrowingTreeSection";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PartnersSection from "../components/PartnersSection";
import TrustBadgesSection from "../components/TrustBadgesSection";
import FAQSection from "../components/FAQSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <HowItWorks />
      <StatsSection />
      <GrowingTreeSection />
      <FeaturedProjects />
      <TrustBadgesSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
