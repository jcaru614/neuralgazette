import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { instagramIcon, twitterIcon, logo } from '@/public/images';

const Footer = () => {
  const whiteIconStyle = {
    filter: 'brightness(0) invert(1)',
  };

  return (
    <footer className="bg-gradient-to-r from-terminal-blue to-terminal-green text-white py-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center text-center xs:text-left">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <Image
              src={logo}
              width={250}
              objectFit="contain"
              alt="Your Name"
              className="hover:scale-110 transform transition-transform cursor-pointer mx-auto xs:mx-0"
            />
            <p className="mt-2 p-2">
              Decoding Truth, Disentangling Misinformation, Empowering Minds.
            </p>
          </div>
          <div className="md:w-1/3 text-center mb-4 md:mb-0">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2">
              <li>
                <Link className="hover:text-neural-teal" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-neural-teal" href="/privacyPolicy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-neural-teal"
                  href="/termsAndConditions"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link className="hover:text-neural-teal" href="/contactUs">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:w-1/3 text-center md:text-right">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="mt-2 flex justify-center md:justify-end">
              <div className="mr-4">
                <a
                  href="https://twitter.com/neuralgazette"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neural-teal-lighter"
                >
                  <Image
                    src={twitterIcon}
                    alt="Twitter"
                    width={24}
                    height={24}
                    style={whiteIconStyle}
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/neuralgazette"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neural-teal-lighter"
                >
                  <Image
                    src={instagramIcon}
                    alt="Instagram"
                    width={24}
                    height={24}
                    style={whiteIconStyle}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
