import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { logo } from '@/public/images';
import { SearchBar } from '@/components';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const windowDimensions = useWindowDimensions();

  const navLinks = [
    { href: '/category/politics', text: 'Politics' },
    { href: '/category/world', text: 'World' },
    { href: '/category/policy', text: 'Policy' },
    { href: '/category/business', text: 'Business' },
    { href: '/category/economy', text: 'Economy' },
    { href: '/category/technology', text: 'Technology' },
    { href: '/category/health', text: 'Health' },
    { href: '/category/science', text: 'Science' },
    { href: '/about', text: 'About' },
  ];

  return (
    <>
      <nav className="flex items-center flex-wrap bg-gradient-to-r from-terminal-blue to-terminal-green p-4 sticky top-0 z-10">
        <div className="w-full flex justify-center m-2">
          <Link
            href="/"
            className="flex flex-col items-center"
            title="Neural Gazette Home"
          >
            <Image
              src={logo}
              width={250}
              alt="The Neural Gazette"
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
          type="button"
        >
          <svg
            role="presentation"
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
            {windowDimensions.width < 1024 ? (
              <>
                <SearchBar />
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    title={link.text}
                    className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white text-sm font-bold items-center justify-center hover:bg-neural-purple hover:text-white "
                  >
                    <p className="text-off-white">{link.text}</p>
                  </Link>
                ))}
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    title={link.text}
                    className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white text-sm font-bold items-center justify-center hover:bg-neural-purple hover:text-white "
                  >
                    <p className="text-off-white">{link.text}</p>
                  </Link>
                ))}
                <SearchBar />
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
