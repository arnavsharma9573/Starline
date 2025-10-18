import ComplianceHero from "@/components/landing/ComplianceHero";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import StarlineDemoSection from "@/components/landing/StarlineDemoSection";
import StatsSection from "@/components/landing/StatsSection";
import WhoStarLineIsFor from "@/components/landing/Working";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-[75vh] bg-[url('/BG-image.svg')] bg-no-repeat bg-left-top bg-cover -z-10 opacity-98" />
      <div className="relative z-10">
        <div className="min-h-[70vh] md:min-h-[60vh]">
          <HeroSection />
        </div>
        <ComplianceHero />
        <StatsSection />
        <HowItWorks />
        <WhoStarLineIsFor />
        <StarlineDemoSection />
      </div>
    </>
  );
}
