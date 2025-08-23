import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Couches from "@/sections/Couches";
import Footer from "@/sections/Footer";




export default function Coaches() {
  return (
    <div>
      <Header />
       <PageBanner
        title="Meet Our Dance Instructors"
        backgroundImage="/about.jpg"
      />

      <Couches />
  <Footer />
    </div>
  );
}
