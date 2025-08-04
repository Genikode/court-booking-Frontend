'use client';

import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const testimonials = [
  {
    text: 'Though I’m just in the middle of my first fitness “semester”, I am officially excited about how re-energizing and revitalizing this whole workout thing is!',
    name: 'Alison Winnegrate',
    image: '/instructors/instructors1.jpeg',
  },
  {
    text: 'I am amazed at how quick are the first results are, all of which I sincerely attribute to my newly found love for these fitness workouts! I lost some weight and I feel amazing!',
    name: 'Joanne Stone',
    image: '/instructors/instructors2.jpeg',
  },
  {
    text: 'Though I’m just in the middle of my first fitness “semester”, I am officially excited about how re-energizing and revitalizing this whole workout thing is!',
    name: 'Virgil Cook',
    image: '/instructors/instructors3.jpeg',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-pink-500 text-3xl mb-2 relative before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-6 before:w-12 before:h-[3px] before:bg-pink-500"></h2>
        <h3 className="text-4xl font-extrabold mb-10">Testimonials</h3>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border p-6 relative shadow-sm rounded-md"
            >
              <FaQuoteLeft className="text-pink-500 text-2xl mb-4" />
              <p className="text-gray-600 text-left">{testimonial.text}</p>

              {/* Triangle */}
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[14px] border-l-transparent border-r-transparent border-t-pink-500 mx-auto mt-4"></div>

              {/* Avatar */}
              <div className="flex flex-col items-center mt-6">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full mb-2"
                />
                <p className="font-bold">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex justify-end mt-8 gap-2">
          <button className="w-10 h-10 flex items-center justify-center border rounded-sm hover:bg-pink-500 hover:text-white transition">
            <MdKeyboardArrowLeft size={24} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center border rounded-sm hover:bg-pink-500 hover:text-white transition">
            <MdKeyboardArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
