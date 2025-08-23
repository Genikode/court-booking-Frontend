import BookNow from "@/components/BookNow";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import ClientsSection from "@/sections/ClientsSection";
import Couches from "@/sections/Couches";
import Footer from "@/sections/Footer";
import StatsSection from "@/sections/StatsSection";



export default function BookNows() {
  return (
    <div>
      <Header />
       <PageBanner
        title="Why customers choose us"
        subtitle="We have made a huge effort to keep site owner away from things with confusing names like PHP, functions, classes, CSS and other geeks stuff."
        backgroundImage="/banner2.jpg"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">Book Your Court</h2>
      <BookNow />
      </div>
      <StatsSection />
      <Footer />
    </div>
  );
}
