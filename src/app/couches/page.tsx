import PageBanner from "@/components/PageBanner";
import Couches from "@/sections/Couches";




export default function Coaches() {
  return (
    <div>
       <PageBanner
        title="Meet Our Dance Instructors"
        backgroundImage="/about.jpg"
      />

      <Couches />
  
    </div>
  );
}
