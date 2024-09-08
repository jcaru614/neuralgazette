import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { hamburgerIcon, logo } from '@/public/images';
import { Button, SearchBar } from '@/components';

const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const navLinks = [
    { href: '/category/politics', text: 'Politics' },
    { href: '/category/world', text: 'World' },
    { href: '/category/business_economy', text: 'Business & Economy' },
    { href: '/category/technology_science', text: 'Technology & Science' },
    { href: '/category/health_life', text: 'Health & Life' },
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
            <p className="text-center mt-2 text-neural-teal text-sm">
              Decoding Truth, Disentangling Misinformation, Empowering Minds.
            </p>
          </Link>
        </div>
        <Button
          styles="inline-flex p-3 hover:bg-neural-teal rounded lg:hidden text-white mr-auto hover:text-white outline-none"
          imageStyles="mr-0"
          onClick={handleClick}
          type="button"
          icon={hamburgerIcon}
          alt="hamburger menu"
        />
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:m-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <SearchBar className="lg:hidden" />

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

            <SearchBar className="lg:inline-flex lg:flex lg:w-auto sm:hidden" />
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
