import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ManifestsSection } from "@/components/ManifestsSection";
import { AttacksSection } from "@/components/AttacksSection";
import { SecurityToolsSection } from "@/components/SecurityToolsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scanline">
      <Navigation />
      <main>
        <HeroSection />
        <ManifestsSection />
        <AttacksSection />
        <SecurityToolsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
