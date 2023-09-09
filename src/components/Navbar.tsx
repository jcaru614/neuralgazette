import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { logo } from '@/public/images';

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const navLinks = [
    { href: '/category/POLITICS', text: 'Politics' },
    { href: '/category/SPORTS', text: 'Sports' },
    { href: '/category/TECHNOLOGY', text: 'Technology' },
    { href: '/category/ENTERTAINMENT', text: 'Entertainment' },
    { href: '/category/HEALTH', text: 'Health' },
    { href: '/category/SCIENCE', text: 'Science' },
    { href: '/category/BUSINESS', text: 'Business' },
    { href: '/category/WORLD', text: 'World' },
    { href: '/category/ECONOMY', text: 'Economy' },
    { href: '/category/LIFESTYLE', text: 'Lifestyle' },
  ];

  return (
    <>
      <nav className="flex items-center flex-wrap bg-gradient-to-r from-terminal-blue to-terminal-green p-4 sticky top-0 z-10">
        <div className="w-full flex justify-center m-2">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src={logo}
              width={250}
              objectFit="contain"
              alt="Your Name"
              className="hover:scale-110 transform transition-transform cursor-pointer"
            />
            <h1 className="text-center mt-2 text-neural-teal-lighter text-xs">
              Decoding Truth, Disentangling Misinformation, Empowering Minds.
            </h1>
          </Link>
        </div>
        <button
          className="inline-flex p-3 hover:bg-neural-teal rounded lg:hidden text-white mr-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:m-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white text-sm font-bold items-center justify-center hover:bg-neural-teal hover:text-white "
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
