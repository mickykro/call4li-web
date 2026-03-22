import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Call4li - פורלי",
    "url": (import.meta as any).env.VITE_DOMAIN_URL || "https://call4li.com",
    "description": "פורלי — עוזרת אישית חכמה שמטפלת בשיחות שלא נענו דרך WhatsApp."
  };

  return (
    <div className="min-h-screen bg-deep-space text-text-primary" dir="rtl">
      <SEO 
        title="Call4li — פורלי | העוזרת האישית החכמה לעסק שלך"
        description="פורלי — עוזרת אישית חכמה שמטפלת בשיחות שלא נענו דרך WhatsApp. אוטומטית, חכמה, ובשלוש שפות."
        canonicalUrl={(import.meta as any).env.VITE_DOMAIN_URL || "https://call4li.com"}
        schema={schema}
      />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
}
