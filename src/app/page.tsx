import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyGrorSection } from "@/components/WhyGrorSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TechStackSection } from "@/components/TechStackSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";

export default function Home() {
  return (
    <main className="pt-[96px] bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.14),_transparent_28%),var(--bg-primary)] text-slate-900 selection:bg-violet-200 selection:text-slate-950">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyGrorSection />
      <ProcessSection />
      <CaseStudiesSection />
      <TechStackSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
