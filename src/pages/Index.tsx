import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { IntelligenceSection, OperationsSection, PartnershipSection, SystemSection, WorkflowSection } from "@/components/PuntoVivoSections";

const Index = () => {
  const location = useLocation();

  // Handle hash navigation from other pages
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - 80;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ScrollReveal>
          <SystemSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <OperationsSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <IntelligenceSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <WorkflowSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <PartnershipSection />
        </ScrollReveal>
      </main>
      <ScrollReveal delay={100}>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
