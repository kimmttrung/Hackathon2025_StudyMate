import Header from "@/components/common/Header";
import HeroSection from "@/components/common/HeroSection";
import ChallengesSection from "./ChallengesSection";
import SolutionsSection from "./SolutionsSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";


const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] font-[Inter]">
      <Header />
      <HeroSection />
      <ChallengesSection />
      <SolutionsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}

export default HomePage;
