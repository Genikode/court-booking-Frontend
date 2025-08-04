'use client';
import Image from 'next/image';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export default function PageBanner({ title, subtitle, backgroundImage }: PageBannerProps) {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Page banner"
        fill
     className="object-cover object-top brightness-[.45]"
        priority
      />
      <div className="relative z-10 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
