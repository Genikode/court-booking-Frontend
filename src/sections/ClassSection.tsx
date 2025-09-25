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
    <section className="py-20 px-4 text-center max-w-6xl mx-auto bg-white">
      <h5 className="text-sm text-blue-900 tracking-widest font-semibold uppercase mb-2">
        Programs
      </h5>
      <h2 className="text-4xl text-red-700 font-bold mb-4">WHAT WE OFFER!</h2>
      <p className="text-gray-700 max-w-xl mx-auto mb-8">
        At <span className="font-bold">Creek Sports Club</span>, we offer a vibrant and inclusive padel experience designed to cater to
        players of all levels and interests. Our programs include:
      </p>
  

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        {programs.map((program) => (
          <div key={program.id} className="relative group h-80 overflow-hidden rounded-xl shadow-lg" >
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end text-left text-white">
              <span className="text-xl font-bold mb-1">{program.title}</span>
              <p className="text-sm mb-2">{program.description}</p>
             
            </div>
            <div className="absolute top-2 left-2 z-20 text-white text-2xl font-bold opacity-70">
              {program.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}