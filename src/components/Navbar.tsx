import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Button from '@/components/Button';


const Navbar = () => {
  return (
    <header className="bg-deep-blue text-off-white py-4 px-8">
      <nav className="flex justify-between items-center">
        {/* Logo and Home Link */}
        <div className="flex items-center space-x-4 ml-4">
          {' '}
          {/* Added ml-4 for margin-left */}
          <Link href="/" className="text-off-white font-bold text-xl">
            <Logo />
          </Link>
          <ul className="flex space-x-4 items-center">
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
        {/* Search bar and Login button */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-4 py-2"
          />
          <Button
            text="Log In"
            onClick={() => {
              // Handle login functionality here
            }}
            className="bg-neural-network hover:bg-tungsten text-white px-4 py-2 rounded-md transition-colors duration-300" // Added hover styles for the button
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
