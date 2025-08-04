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

export default function Home() {
  return (
    <div>
      <BannerSlider />
      <IntroSection />
      <ClassSection />
      <BannerCallToAction />
      <Post />
    <StatsBanner/>
  
    </div>
  );
}
