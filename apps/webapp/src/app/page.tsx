"use client";

/**
 * Home page component for Bien Star
 * Assembles the main sections of the homepage
 */
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import StatsSection from "../components/StatsSection";
import GrowingTreeSection from "../components/GrowingTreeSection";
import ProofWallSection from "../components/ProofWallSection";
import VerifiedOrganizations from "../components/VerifiedOrganizations";
import TrustBadgesSection from "../components/TrustBadgesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PartnersSection from "../components/PartnersSection";
import FAQSection from "../components/FAQSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <HowItWorks />
      <StatsSection />
      <GrowingTreeSection />
      <ProofWallSection />
      <VerifiedOrganizations />
      <TrustBadgesSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
