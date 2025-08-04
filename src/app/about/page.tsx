import PageBanner from "@/components/PageBanner";
import TwoImageBanner from "@/components/TwoImageBanner";
import AboutSection from "@/sections/AboutSection";
import DiscountSection from "@/sections/DiscountSection";
import StatsSection from "@/sections/StatsSection";
import Testemonial from "@/sections/Testemonial";



export default function About() {
  return (
    <div>
       <PageBanner
        title="About"
        subtitle="Welcome to the Nrityangan Dance Academy"
        backgroundImage="/about.webp"
      />
      <AboutSection />
      <TwoImageBanner />
      <DiscountSection />
      <StatsSection />
      <Testemonial />
    </div>
  );
}
