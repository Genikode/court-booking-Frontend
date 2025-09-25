'use client';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-10 px-4">
      {/* Address & Phone */}
      <div className="text-black text-lg font-semibold mb-4">
        Address:
        <span className="font-bold"> Near Diva Marquee, intellectual Village , Phase 7.  Bahria town Rawalpindi</span>
      </div>
      <div className="text-black text-xl font-bold mb-6">
        Phones:{' '}
        <span className="text-pink-600 tracking-wide">03335559111</span>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center items-center gap-6 mb-8">
        <a
          href="#"
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow hover:bg-green-600 hover:text-white transition"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="#"
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow hover:bg-green-600 hover:text-white transition"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="#"
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow hover:bg-green-600 hover:text-white transition"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="#"
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow hover:bg-green-600 hover:text-white transition"
        >
          <FaYoutube size={20} />
        </a>
      </div>

      {/* Copyright */}
    
    </footer>
  );
}
