import React from 'react';
import Logo from '@/components/Logo';

const Navbar = () => {
  return (
    <header className="bg-deep-blue text-off-white py-4 px-8">
      <nav>
        <ul className="flex justify-between items-center">
          <li>
            <a href="#" className="text-off-white font-bold text-xl">
              <Logo />
            </a>
          </li>
          <li>
            <ul className="flex space-x-4 items-center">
              <li>
                <a
                  href="#"
                  className="hover:text-tungsten transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-tungsten transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-tungsten transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
