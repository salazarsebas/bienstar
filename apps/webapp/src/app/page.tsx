"use client";

/**
 * Home page component for Bien Star crowdfunding platform
 * Assembles the main sections of the homepage
 */
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import FeaturedProjects from "../components/FeaturedProjects";
import GrowingTreeSection from "../components/GrowingTreeSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <GrowingTreeSection />
      <FeaturedProjects />
    </>
  );
}
