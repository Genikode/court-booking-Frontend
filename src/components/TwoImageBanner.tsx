'use client';

import Image from 'next/image';
import React from 'react';

const TwoImageBanner = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[400px] md:h-[600px] w-full">
          <Image
            src={"/about1.jpg"}
            alt="Left dancer"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative h-[400px] md:h-[600px] w-full">
          <Image
            src={"/about3.jpg"}
            alt="Right dancer"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default TwoImageBanner;
