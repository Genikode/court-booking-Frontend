'use client';
import Link from 'next/link';

export default function ScheduleCallToAction() {
  return (
    <section className="bg-black text-white py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="mb-4">
          <div className="w-10 h-1 bg-pink-600 mx-auto mb-2"></div>
          <p className="text-sm md:text-base font-semibold uppercase tracking-wide text-gray-200">
            Discover the schedule…
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-6xl font-extrabold leading-tight mb-8">
          … That Will Fit Your <br className="hidden md:block" />
          Energy Rhythm!
        </h2>

        {/* Button */}
        <Link
          href="#classes"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-all"
        >
          VIEW THE CLASSES
        </Link>
      </div>
    </section>
  );
}
