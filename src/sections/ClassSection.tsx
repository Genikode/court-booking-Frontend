import Image from 'next/image';

const programs = [
  {
    id: '01',
    image: '/image2.jpeg',
    title: 'OPEN COURT',
    description:
      'Focus on your game with one-on-one training or casual solo practice. Ideal for honing skills, improving techniques, and enjoying personal playtime.',
    link: '#',
  },
  {
    id: '02',
    image: '/image3.jpeg',
    title: 'SEMI COVERED COURT',
    description:
      'Team up and compete in thrilling doubles matches. Perfect for socializing, enhancing teamwork, and engaging in dynamic, fast-paced games.',
    link: '#',
  },
];

export default function WhatWeOffer() {
  return (
    <section className="py-20 px-4 text-center max-w-6xl mx-auto bg-white dark:bg-gray-900 transition-colors duration-300">
      <h5 className="text-sm text-blue-900 dark:text-blue-400 tracking-widest font-semibold uppercase mb-2">
        Programs
      </h5>
      <h2 className="text-4xl text-black dark:text-white font-bold mb-4">
        WHAT WE OFFER!
      </h2>
      <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-8">
        At <span className="font-bold">Creek Sports Club</span>, we offer a vibrant and inclusive padel experience designed to cater to
        players of all levels and interests. Our programs include:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        {programs.map((program) => (
          <div
            key={program.id}
            className="relative group h-80 overflow-hidden rounded-xl shadow-lg bg-gray-800/70 dark:bg-gray-800"
          >
            {/* Background image */}
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay content */}
            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end text-left bg-black/40 dark:bg-black/50 text-white transition-colors">
              <span className="text-xl font-bold mb-1">{program.title}</span>
              <p className="text-sm mb-2">{program.description}</p>
            </div>

            {/* ID badge */}
            <div className="absolute top-2 left-2 z-20 text-white text-2xl font-bold opacity-70">
              {program.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
