"use client";
import { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "What is Mexican 1969?",
    answer:
      "Inspired by the vibrant energy of Mexico’s golden era of sports. A 'Mexican 1969 padel court' refers to the very first padel court ever built, which was created in Acapulco, Mexico in 1969 by Enrique Corcuera, a Mexican businessman, on his property, essentially a small enclosed court with walls where the game of padel originated.",
  },
  {
    question: "What does Creek Sports Club offer?",
    answer:
      "Creek Sports Club offers state-of-the-art padel courts, coaching programs, in-house cafe, community events, and a thriving network of padel enthusiasts.",
  },
  {
    question: "What's the difference between a single & a double court?",
    answer:
      "A single padel court is designed for solo or one-on-one training, while a double court allows four players to play in pairs, emphasizing teamwork and strategy.",
  },
];

export default function PadelIntroSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-20 max-w-7xl mx-auto text-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <h5 className="text-sm tracking-widest text-blue-900 dark:text-blue-400 uppercase font-semibold">
        Tennis Lesson
      </h5>
      <h2 className="text-4xl text-black dark:text-white font-bold my-4">
        THE FASTEST GROWING PADEL TENNIS CLUB
      </h2>
      <p className="text-base text-blue-900 dark:text-gray-300 max-w-2xl mx-auto mb-10 font-semibold">
        Experience the energy at{" "}
        <span className="font-bold">Creek Sports Club</span>, where a vibrant
        community, top-notch facilities, and exciting programs make us the
        go-to destination for tennis and padel enthusiasts. Join the movement
        today!
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-50 dark:bg-gray-800/60 p-6 rounded-lg shadow-md">
        {/* Left Image */}
        <div>
          <Image
            src="/image6.jpeg"
            alt="Padel rackets"
            width={600}
            height={400}
            className="rounded-lg shadow-lg dark:shadow-gray-900"
          />
        </div>

        {/* Right Accordion */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 dark:border-gray-600"
            >
              <button
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                className={`w-full text-left py-3 px-4 font-semibold flex justify-between items-center rounded-md transition-colors duration-200 ${
                  index === openIndex
                    ? "bg-green-600 text-white shadow-md"
                    : "text-blue-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {faq.question}
                <span className="text-xl">
                  {index === openIndex ? "▴" : "▾"}
                </span>
              </button>
              {index === openIndex && (
                <p className="p-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-white dark:bg-gray-800 rounded-b-md transition-colors duration-200">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
