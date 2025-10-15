"use client";
import ComplianceHero from "@/components/landing/ComplianceHero";
import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/landing/Navbar";
import StatsSection from "@/components/landing/StatsSection";

export default function Home() {
  return (
    <main className="relative">
      {/* Background Image - Fixed height for navbar and hero section only */}
      <div className="absolute top-0 left-0 right-0 h-[75vh] bg-[url('/BG-image.svg')] bg-no-repeat bg-left-top bg-cover -z-10 opacity-98" />

      <div className="relative z-10">
        <div className="min-h-[75vh]">
          <Navbar />
          <HeroSection />
        </div>
        <ComplianceHero />
        <StatsSection />
      </div>
    </main>
  );
}
