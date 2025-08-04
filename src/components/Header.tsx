'use client';
import { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaSearch,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCoachDropdownOpen, setIsCoachDropdownOpen] = useState(false);

  return (
    <header className="border-b text-sm bg-white z-50 relative">
      {/* Top Bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-4 border-b" >
        <Link href="/">
        <img src="/logo.jpeg" alt="Nrityangan Logo" className="h-10" />
        </Link>

        <div className="flex gap-8 text-gray-600">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-pink-500" />
            <div>
              <strong>Address:</strong><br />
              4578 Marmora Road, Glasgow, D04 89GR
            </div>
          </div>

          <div className="flex items-center gap-2 border-l pl-6">
            <FaPhoneAlt className="text-pink-500" />
            <div>
              <strong>Let’s talk:</strong><br />
              <a href="tel:8001230045" className="text-blue-600">(800) 123-0045</a>, 
              <a href="tel:8001230046" className="text-blue-600"> (800) 123-0046</a>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l pl-6">
            <FaClock className="text-pink-500" />
            <div>
              <strong>We are open:</strong><br />
              Mn–Fr: 10 am–8 pm
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex justify-between items-center px-4 md:px-6 py-4">
        {/* Logo for mobile */}
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Nrityangan Logo" className="h-8 md:hidden" />
          
          <ul className="hidden md:flex gap-6 font-semibold uppercase text-black relative">
              <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li
              className="relative"
              onMouseEnter={() => setIsCoachDropdownOpen(true)}
              onMouseLeave={() => setIsCoachDropdownOpen(false)}
            >
              <button className="cursor-pointer uppercase">Court</button>
              {isCoachDropdownOpen && (
                <ul className="absolute left-0 top-full bg-white shadow-lg py-2 px-4 w-40 z-50 rounded">
                  <li><Link href="/james" className="block py-2 hover:text-pink-500">Gulshan Court</Link></li>
                </ul>
              )}
            </li>
            <li><Link href="/booknow">Book Now</Link></li>
            <li><Link href="/contact">Contacts</Link></li>
          </ul>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <FaSearch className="text-pink-500 cursor-pointer hidden md:block" />
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <FaTimes className="text-pink-500" /> : <FaBars className="text-pink-500" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-lg absolute top-full left-0 w-full z-40">
          <ul className="flex flex-col gap-4 text-black font-semibold uppercase">
              <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li>
              <details className="cursor-pointer">
                <summary>Court</summary>
                <ul className="pl-4 mt-2 space-y-2 text-sm">
               <li><Link href="/james" className="block py-2 hover:text-pink-500">Gulshan Court</Link></li>
                </ul>
              </details>
            </li>
         <li><Link href="/booknow">Book Now</Link></li>
            <li><Link href="/contact">Contacts</Link></li>
          </ul>

          {/* Contact Info */}
          <div className="mt-6 text-gray-600 space-y-4">
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-pink-500 mt-1" />
              <div>
                <strong>Address:</strong><br />
                4578 Marmora Road, Glasgow, D04 89GR
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FaPhoneAlt className="text-pink-500 mt-1" />
              <div>
                <strong>Let’s talk:</strong><br />
                <a href="tel:8001230045" className="text-blue-600">(800) 123-0045</a><br />
                <a href="tel:8001230046" className="text-blue-600">(800) 123-0046</a>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FaClock className="text-pink-500 mt-1" />
              <div>
                <strong>We are open:</strong><br />
                Mn–Fr: 10 am–8 pm
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
