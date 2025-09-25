export default function IntroSection() {
    return (
      <section className="py-16 px-4 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div>
            <div className="w-10 h-1 bg-pink-500 mb-4" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 leading-tight">
              Tennis is the<br />
              Answer…
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-black mb-4 uppercase">
              ...WHENEVER THE QUESTION IS YOUR GAME OR FITNESS!
            </h3>
            <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
              At Creek Sports Club, we believe tennis is more than just a sport—it's a lifestyle. Our courts are open to all ages and skill levels, providing a welcoming environment for both casual play and serious training. Whether you're looking to improve your game, stay active, or simply enjoy time with friends and family, our club offers top-notch facilities and experienced coaches to help you reach your goals.
            </p>
            <p className="text-pink-600 text-lg font-bold italic">— Creek Sports Club Team</p>
          </div>
  
          {/* Image */}
          <div className="w-full">
            <img src="/image1.jpeg" alt="Tennis Court" className="w-full h-auto object-contain" />
          </div>
        </div>
      </section>
    );
  }
