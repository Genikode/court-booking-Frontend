import Image from "next/image";
import BannerSlider from "@/sections/Banner";
import IntroSection from "@/sections/IntroSection";
import ClassSection from "@/sections/ClassSection";
import BannerCallToAction from "@/sections/BannerCallToAction";
import Couches from "@/sections/Couches";
import Post from "@/sections/Post";
import ScheduleCallToAction from "@/sections/ScheduleCallToAction";
import NewsletterSection from "@/sections/NewsletterSection";
import StatsBanner from "@/sections/StatsSection";
import Header from "@/components/Header";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <div>
          <Header />
      <BannerSlider />
      <IntroSection />
      <ClassSection />
      <BannerCallToAction />
      <Post />
    <StatsBanner/>
       <Footer />
    </div>
  );
}
