'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  eyebrow?: string;
  title: string;
  desc: string;
  ctaText?: string;
  ctaHref?: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: 'Creek Sports Club',
    title: 'Padel & Tennis, Perfected.',
    desc: 'Premium courts, expert coaching, and a community that pushes you to play better—every session.',
    ctaText: 'Book a Court',
    ctaHref: '/login',
  },
  {
    eyebrow: 'Coaching Programs',
    title: 'Train Smarter. Win More.',
    desc: 'Structured programs for beginners to competitors. Build consistency, speed, and technique.',
    ctaText: 'Explore Coaching',
    ctaHref: '/login',
  },
  {
    eyebrow: 'Membership',
    title: 'Play More. Pay Less.',
    desc: 'Unlock exclusive benefits, priority slots, and member events tailored to your goals.',
    ctaText: 'View Plans',
    ctaHref: '/login',
  },
];

export default function TextHeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Autoplay (respects reduced motion)
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [paused, prefersReducedMotion]);

  const go = (dir: 'prev' | 'next' | number) => {
    setIndex((i) => {
      if (typeof dir === 'number') return dir;
      if (dir === 'prev') return (i - 1 + SLIDES.length) % SLIDES.length;
      return (i + 1) % SLIDES.length;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go('next');
      if (e.key === 'ArrowLeft') go('prev');
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      ref={containerRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="
        relative w-full overflow-hidden
        bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(59,130,246,0.15),transparent_60%)]
        dark:bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(59,130,246,0.12),transparent_60%)]
        bg-white dark:bg-gray-950
        border-b border-gray-200/60 dark:border-gray-800
        pt-28 md:pt-32 pb-16
      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Track (fade slider) */}
        <div className="relative h-[360px] md:h-[420px]">
          {SLIDES.map((s, i) => (
            <article
              key={i}
              role={i === index ? 'group' : undefined}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              className={`
                absolute inset-0 flex items-center
                transition-opacity duration-700 ease-out
                ${i === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
              `}
            >
              <div className="max-w-3xl">
                {s.eyebrow && (
                  <p className="text-xs tracking-[0.2em] uppercase font-semibold text-blue-700 dark:text-blue-400 mb-3">
                    {s.eyebrow}
                  </p>
                )}
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
                  {s.title}
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
                  {s.desc}
                </p>

                {s.ctaText && s.ctaHref && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={s.ctaHref}
                      className="
                        inline-flex items-center gap-2
                        rounded-full px-5 py-2.5 text-sm font-semibold
                        bg-gradient-to-r from-green-600 to-emerald-600
                        text-white shadow hover:opacity-90
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                        dark:focus:ring-offset-gray-950
                        transition
                      "
                    >
                      {s.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="
                        inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold
                        border border-gray-300 dark:border-gray-700
                        text-gray-900 dark:text-gray-100
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                        dark:focus:ring-offset-gray-950
                        transition
                      "
                    >
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between">
          {/* Left: Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide tabs">
            {SLIDES.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`slide-${i}`}
                  onClick={() => go(i)}
                  className={`
                    h-2.5 rounded-full transition-all
                    ${active ? 'w-8 bg-green-600 dark:bg-green-500' : 'w-2.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'}
                  `}
                  title={`Go to slide ${i + 1}`}
                />
              );
            })}
          </div>

          {/* Right: Prev/Play/Pause/Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => go('prev')}
              aria-label="Previous slide"
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play' : 'Pause'}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </button>
            <button
              onClick={() => go('next')}
              aria-label="Next slide"
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-24 mx-auto h-48 max-w-5xl blur-3xl
                   bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20
                   dark:from-green-400/15 dark:via-blue-500/15 dark:to-teal-400/15"
      />
    </section>
  );
}
