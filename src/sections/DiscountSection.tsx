'use client';

import React from 'react';

const DiscountSection = () => {
  return (
    <section className="bg-[#ff2c6d] py-20 px-4 text-white text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative inline-block">
          <span className="block h-[2px] w-10 bg-white mx-auto mb-4"></span>
          Get a 20% OFF Courtesy Discount This Year!
        </h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-lg font-light">
          <p>
            There’s no other time, like the summer for starting to get your dancing
            moves on! With the summer weather allowing for a more upbeat and open-minded
            attitude and mood, just as well as with the weather being fitter for
            outdoor and indoor Classes, chime in!
          </p>
          <p>
            We&apos;ll be glad to offer you a complimentary 25% one-time discount for
            absolutely any kind of a dancing Class of your choice! Let&apos;s start the
            rumba bonanza this summer!
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
