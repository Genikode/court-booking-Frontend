'use client';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center py-12 px-6 transition-colors duration-300">
      {/* Address & Phone */}
      <div className="text-black dark:text-gray-200 text-lg font-semibold mb-4">
        Address:{' '}
        <span className="font-bold">
          Near Diva Marquee, Intellectual Village, Phase 7, Bahria Town Rawalpindi
        </span>
      </div>
      <div className="text-black dark:text-gray-200 text-xl font-bold mb-6">
        Phones:{' '}
        <span className="text-pink-600 dark:text-pink-400 tracking-wide">
          0333 5559111
        </span>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center items-center gap-6 mb-8">
        <a
          href="#"
          aria-label="Facebook"
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow 
                     hover:bg-[#1877F2] hover:text-white transition-colors"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="#"
          aria-label="Twitter"
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow 
                     hover:bg-[#1DA1F2] hover:text-white transition-colors"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow 
                     hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#962fbf] hover:text-white transition-all"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="#"
          aria-label="YouTube"
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow 
                     hover:bg-[#FF0000] hover:text-white transition-colors"
        >
          <FaYoutube size={20} />
        </a>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 my-6 w-3/4 mx-auto" />

      {/* Copyright */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Creek Sports Club. All rights reserved.
      </p>
    </footer>
  );
}
