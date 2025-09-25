import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import TwoImageBanner from "@/components/TwoImageBanner";
import AboutSection from "@/sections/AboutSection";
import DiscountSection from "@/sections/DiscountSection";
import Footer from "@/sections/Footer";
import StatsSection from "@/sections/StatsSection";
import Testemonial from "@/sections/Testemonial";



export default function About() {
  return (
    <div>
      <Header />
       <PageBanner
        title="About"
        subtitle="Learn More About Us"
        backgroundImage="/image4.jpeg"
      />
      <AboutSection />
      <TwoImageBanner />
      <DiscountSection />
      <StatsSection />
      <Testemonial />
      <Footer />
    </div>
  );
}
