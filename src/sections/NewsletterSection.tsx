'use client';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}`);
      setEmail('');
    }
  };

  return (
    <section className="bg-green-600 text-white py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-10">
          Get the Best Dance Tips <br className="hidden md:block" />
          and Tricks!
        </h2>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Please enter your email"
            className="w-full md:w-96 px-4 py-3 text-pink-600 bg-white placeholder-pink-400 rounded-none border-b-2 border-white focus:outline-none focus:ring-2 focus:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-none hover:bg-white hover:text-pink-600 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
