import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

const Navbar = () => {
  return (
    <header className="bg-deep-blue text-off-white py-4 px-8">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-4 ml-4">
          <Link href="/" className="text-off-white font-bold text-xl">
            <Logo />
          </Link>
          <ul className="flex space-x-4 items-center mt-2">
            <li>
              <Link
                href="/"
                className="hover:text-tungsten transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-tungsten transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-tungsten transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
