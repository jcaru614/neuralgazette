import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/images/logo.png';

const Navbar = () => {
  return (
    <header className="bg-abyss text-white py-4 px-8 h-[80px]">
      <nav className="container mx-auto flex justify-between items-center h-full">
        <div className="flex items-center">
          <Link href="/" className="text-white font-bold text-2xl">
            <Image
              src={logo}
              width={125}
              objectFit="contain"
              alt="Your Name"
              className="hover:scale-110 transform transition-transform cursor-pointer"
            />
          </Link>
        </div>
        <ul className="flex space-x-6 items-center mt-2">
          <li>
            <Link
              href="/"
              className="text-white text-lg hover:text-neural-network transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-lg hover:text-neural-network transition-colors duration-300"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
