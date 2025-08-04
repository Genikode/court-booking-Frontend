'use client';

import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const ClientBanner = () => {
  return (
    <section className="bg-[#fd2e69] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-start gap-10">
        {/* Profile Image */}
        <div className="w-48 h-48 relative rounded-full overflow-hidden shadow-lg">
          <Image
            src="/coach-1.jpg" // ⬅️ Replace with actual image path
            alt="Martha Summers"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div>
          <div className="w-10 h-1 bg-white mb-3"></div>
          <h2 className="text-5xl font-extrabold mb-2">Martha Summers</h2>
          <p className="text-lg mb-4">Instructor</p>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-[#fd2e69] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-[#fd2e69] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center border border-white rounded-full hover:bg-white hover:text-[#fd2e69] transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientBanner;
