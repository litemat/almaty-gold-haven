import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CatalogSection from "@/components/CatalogSection";
import WhyUsSection from "@/components/WhyUsSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import FloatingContactBar from "@/components/FloatingContactBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CatalogSection />
        <WhyUsSection />
        <LocationSection />
      </main>
      <Footer />
      <FloatingContactBar />
    </div>
  );
};

export default Index;
