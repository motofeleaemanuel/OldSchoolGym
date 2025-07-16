import AboutUsSection from "@/components/AboutUsSection";
import { AnnouncementsSection } from "@/components/AnnouncementsSection";
import { ContactSection } from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutUsSection />
      <PricingSection />
      <AnnouncementsSection />
      <ContactSection />
    </main>
  );
}
