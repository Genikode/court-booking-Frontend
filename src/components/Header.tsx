'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white/90 dark:bg-transparent backdrop-blur-md shadow-sm transition-colors">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-10 py-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
         <Image
                src="/logo2.png"
                alt="Creek Sports Club Logo"
                width={65}
                height={65}
                className="rounded block dark:hidden"
              />
        
              {/* Dark mode logo */}
              <Image
                src="/logo3.png"
                alt="Creek Sports Club Logo Dark"
                width={85}
                height={85}
                className="rounded hidden dark:block"
              />

          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-12 font-semibold uppercase text-[15px] tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="relative text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200"
              >
                {link.name}
                {/* Active underline effect */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 dark:bg-green-400 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Sign In */}
          <Link
            href="/login"
            className="hidden md:block px-5 py-2 rounded-full bg-green-600 text-white font-semibold shadow-md hover:bg-red-700 transition"
          >
            Sign In
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-green-700 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md border-t border-gray-200 dark:border-gray-700 transition-colors">
          <ul className="flex flex-col gap-4 px-6 py-6 font-semibold uppercase text-green-700 dark:text-green-400">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-red-700 dark:hover:bg-red-500 transition"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
