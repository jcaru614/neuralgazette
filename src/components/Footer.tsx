import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-terminal-blue to-terminal-green text-white py-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Neural Gazette</h3>
            <p className="mt-2">
              Decoding Truth, Disentangling Misinformation, Empowering Minds.
            </p>
          </div>
          <div className="md:w-1/3 text-center mb-4 md:mb-0">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              {/* <li>
                <Link href="/contact">Contact</Link>
              </li> */}
            </ul>
          </div>
          <div className="md:w-1/3 text-center md:text-right">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="mt-2">
              <a
                href="https://twitter.com/neuralgazette"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neural-teal-lighter mr-4"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com/neuralgazette"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neural-teal-lighter"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
