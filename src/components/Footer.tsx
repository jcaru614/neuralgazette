import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  instagramOutlineIcon,
  twitterOutlineIcon,
  logo,
} from '@/public/images';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-terminal-blue to-terminal-green text-white py-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center text-center xs:text-left">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <Image
              src={logo}
              width={250}
              alt="Neural Gazette Logo"
              className="hover:scale-110 transform transition-transform cursor-pointer mx-auto xs:mx-0"
            />
            <h1 className="mt-2 p-2 text-off-white">
              Decoding Truth, Disentangling Misinformation, Empowering Minds.
            </h1>
            <p className="mt-2 p-2 text-off-white">
              © {new Date().getFullYear()} The Neural Gazette
            </p>
          </div>
          <div className="md:w-1/3 text-center mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-off-white">
              Quick Links
            </h2>
            <ul className="mt-2">
              <li>
                <Link
                  className="text-off-white hover:text-neural-teal"
                  href="/about"
                  title="About"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-off-white hover:text-neural-teal"
                  href="/privacyPolicy"
                  title="Privacy Policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-off-white hover:text-neural-teal"
                  href="/termsAndConditions"
                  title="Terms and Conditions"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="text-off-white hover:text-neural-teal"
                  href="/contactUs"
                  title="Contact Us"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:w-1/3 text-center md:text-right">
            <h2 className="text-off-white text-lg font-semibold">Follow Us</h2>
            <div className="mt-2 flex justify-center md:justify-end">
              <div>
                <Link
                  href="https://www.instagram.com/neuralgazette"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neural-teal-lighter"
                  title="@neuralgazette"
                >
                  <Image
                    src={instagramOutlineIcon}
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="mr-4">
                <Link
                  href="https://twitter.com/neuralgazette"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neural-teal-lighter"
                  title="@neuralgazette"
                >
                  <Image
                    src={twitterOutlineIcon}
                    alt="Twitter"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
