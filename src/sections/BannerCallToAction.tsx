'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function BannerCallToAction() {
  return (
    <section className="relative h-[500px] w-full">
      {/* Background Image */}
      <Image
        src="/image4.jpeg"
        alt="Tennis Court"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <p className="text-white text-sm md:text-base font-semibold tracking-widest uppercase mb-2">
            Ready to play or improve?
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Discover the perfect tennis court<br className="hidden md:block" /> for your game!
          </h2>
        
        </div>
      </div>
    </section>
  );
}
