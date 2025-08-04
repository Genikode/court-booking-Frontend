'use client';
import Image from 'next/image';

const coaches = [
  {
    name: 'Martha Summers',
    title: 'Instructor',
    image: '/coach-1.jpg',
    description:
      'I initially took on CrossFit trainings after a spending a lifetime in professional athletics. The fact that I loved sports so much contributed a lot to my decision.'
  },
  {
    name: 'Lora Prinston',
    title: 'Owner/Instructor',
    image: '/coach-2.jpg',
    description:
      '12 Years ago I lost 80lbs with the help of a personal coach and it completely changed my way of life. Since then, it’s been my mission to sway other people do CrossFit too.'
  },
  {
    name: 'Gareth Brooke',
    title: 'Instructor',
    image: '/coach-3.jpg',
    description:
      'Growing up, I’ve always been involved in sports, fitness and athleticism in general. It got a whole new meaning for me as in 2007 I had an injury while serving in Iraq'
  }
];

export default function CoachSection() {
  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <div className="mb-12">
          <div className="w-10 h-1 bg-pink-600 mx-auto mb-2"></div>
          <h2 className="text-4xl font-bold text-black">Our Coaches</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center transition hover:shadow-md"
            >
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-black">{coach.name}</h3>
              <p className="text-pink-600 font-semibold text-sm mb-4">{coach.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{coach.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
