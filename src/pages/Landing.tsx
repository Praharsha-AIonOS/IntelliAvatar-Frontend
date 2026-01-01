import LandingNavbar from "@/components/layout/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import PurposeSection from "@/components/landing/PurposeSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import KPISection from "@/components/landing/KPISection";
import CTASection from "@/components/landing/CTASection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <HeroSection />
        <PurposeSection />
        <FeaturesSection />
        <KPISection />
        <CTASection />
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">A</span>
              </div>
              <span className="font-display font-semibold text-foreground">AIonOS × IntelliAvatar</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AIonOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
