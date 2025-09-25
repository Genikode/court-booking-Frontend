'use client';
import { useState } from 'react';
import {
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCoachDropdownOpen, setIsCoachDropdownOpen] = useState(false);

  return (
    <header className="text-sm bg-white z-50 relative">
      {/* Nav */}
      <nav className="flex justify-between items-center px-4 md:px-2 py-4">
        {/* Left side: Logo + Menu */}
        <div className="flex items-center gap-4">
          <img src="/logo1.png" alt="Creek Sports Club Logo" className="h-20 w-20 ml-4" />
          <ul className="hidden md:flex gap-14 font-mono font-bold text-[18px] uppercase text-red-700 ml-20 relative">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li
              className="relative"
              onMouseEnter={() => setIsCoachDropdownOpen(true)}
              onMouseLeave={() => setIsCoachDropdownOpen(false)}>
              <button className="cursor-pointer uppercase">Court</button>
              {isCoachDropdownOpen && (
                <ul className="absolute left-0 top-full bg-white shadow-lg py-2 px-4 w-40 z-50 rounded">
                  <li><Link href="/james" className="block py-2 hover:text-red-700">Gulshan Court</Link></li>
                </ul>
              )}
            </li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right side: Sign In + Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-red-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-800 transition hidden md:block"
          >
            Sign In
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <FaTimes className="text-red-700" /> : <FaBars className="text-red-700" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-lg absolute top-full left-0 w-full z-40">
          <ul className="flex flex-col gap-4 text-red-700 font-mono font-bold text-[18px] uppercase">
            <li>
              <Link 
                href="/login" 
                className="bg-red-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-800 transition text-center"
              >
                Sign In
              </Link>
            </li>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li>
              <details className="cursor-pointer">
                <summary>Court</summary>
                <ul className="pl-4 mt-2 space-y-2 text-sm">
                  <li><Link href="/james" className="block py-2 hover:text-[#183d5a]">Gulshan Court</Link></li>
                </ul>
              </details>
            </li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
