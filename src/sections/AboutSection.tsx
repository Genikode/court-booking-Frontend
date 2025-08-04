"use client";
import Image from 'next/image';
import { useState } from 'react';

const tabs = [
  {
    label: 'History',
    content:
      'Established in 2024, Court X is the newest and fastest-growing padel and tennis community in Pakistan. Our mission is to create a modern, inclusive, and innovative space where players of all skill levels can learn, train, and connect. With a focus on sportsmanship, growth, and community spirit, we’re redefining the game experience through state-of-the-art facilities and expert coaching.',
  },
  {
    label: 'Mission',
    content:
      'Our mission is to empower athletes of all levels through expert coaching, innovative programming, and a strong community. We’re committed to creating opportunities for growth both on and off the court.',
  },
  {
    label: 'Value',
    content:
      'At Court X, we value inclusivity, excellence, and the spirit of competition. We believe in fostering a safe and respectful environment where players can thrive.',
  },
];

export default function OurStory() {
  const [activeTab, setActiveTab] = useState('History');

  const activeContent = tabs.find((tab) => tab.label === activeTab)?.content;

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h5 className="text-sm text-blue-900 tracking-widest font-semibold uppercase mb-2 text-center">
        Our Story
      </h5>
      <h2 className="text-4xl text-red-700 font-bold text-center mb-6">
        THE FASTEST GROWING TENNIS CLUB
      </h2>
      <p className="text-center text-gray-800 max-w-3xl mx-auto mb-4">
        <strong>Court X</strong> is revolutionizing the padel and tennis experience with world-class facilities, expert
        coaching, and a thriving community. With Pakistan’s first single court, a double court, and the iconic
        <strong> Mexican 1969</strong> design, we offer unmatched opportunities for players of all levels to learn, train, and
        connect.
        <br />
        Join the movement today!
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <p className="text-gray-700">
            We take pride in offering professional coaching, versatile programs, and modern amenities that ensure an
            unforgettable padel experience. Join a community that values sportsmanship, skill development, and the joy of
            the game. <strong>At Court X</strong>, we’re more than just a club; we’re a movement.
          </p>
          <p className="text-gray-700">
            Come and be part of <strong>Court X</strong>, where passion meets performance and every player has a place to grow,
            connect, and compete.
          </p>

          <div className="border border-blue-900 rounded-md">
            <div className="flex space-x-4 border-b border-blue-900 bg-white">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 py-2 text-sm font-semibold ${
                    activeTab === tab.label ? 'text-red-700' : 'text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-4 text-gray-800 text-sm leading-relaxed bg-white">{activeContent}</div>
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg">
          <Image
            src="/banner1.jpg"
            alt="Tennis Net"
            width={600}
            height={400}
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}
