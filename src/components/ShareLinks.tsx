// ShareButtons.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  facebookIcon,
  twitterIcon,
  messageIcon,
  redditIcon,
  copyIcon,
  whatsappIcon,
  instagramIcon,
  shareIcon,
  closeIcon,
} from '@/public/images';
import Button from './Button';

interface ShareButtonsProps {
  shareUrl: string;
  shareText: string;
  modal?: boolean;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  shareUrl,
  shareText,
  modal = false,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCopyLink = () => {
    const copyText = `${shareText}: ${shareUrl}`;
    navigator.clipboard.writeText(copyText);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  const handleOpenShareLinks = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseShareLinks = () => {
    setShowModal(false);
    document.body.style.overflow = '';
  };

  if (modal) {
    return (
      <>
        <Button
          text="Share"
          icon={shareIcon}
          onClick={handleOpenShareLinks}
          styles="rounded-full border border-neural-teal bg-transparent text-black hover:bg-neural-teal hover:text-white"
        />
        {showModal ? (
          <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-terminal-blue bg-opacity-50">
            <div className="modal-content bg-off-white p-4 rounded-lg">
              <p className="flex justify-center">Share Story</p>
              <div className="grid grid-cols-4 gap-8 mt-4 mb-4">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl,
                  )}&quote=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={facebookIcon}
                    alt="Facebook Icon"
                    width={38}
                    height={38}
                  />
                </Link>

                <Link
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    shareText,
                  )}&url=${encodeURIComponent(shareUrl)}&hashtags=yourHashtagsHere`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={twitterIcon}
                    alt="Twitter Icon"
                    width={38}
                    height={38}
                  />
                </Link>
                <Link
                  href={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={instagramIcon}
                    alt="Instagram Icon"
                    width={38}
                    height={38}
                  />
                </Link>
                <Link
                  href={`https://www.reddit.com/submit?url=${encodeURIComponent(
                    shareUrl,
                  )}&title=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={redditIcon}
                    alt="Reddit Icon"
                    width={38}
                    height={38}
                  />
                </Link>
                <Link
                  href={`whatsapp://send?text=${encodeURIComponent(
                    shareText + ' ' + shareUrl,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={whatsappIcon}
                    alt="WhatsApp Icon"
                    width={38}
                    height={38}
                  />
                </Link>
                <Link
                  href={`sms:?&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={messageIcon}
                    alt="Text Message Icon"
                    width={38}
                    height={38}
                  />
                </Link>
                <div className="min-w-0">
                  <Button
                    iconSize={38}
                    icon={copyIcon}
                    onClick={handleCopyLink}
                    styles={`bg-transparent hover:bg-transparent py-0 px-0 transition-all duration-300 ease-in-out
                    ${copySuccess && 'animate-pulse'}
                `}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  text="Close"
                  onClick={handleCloseShareLinks}
                  icon={closeIcon}
                  alt="Exit"
                  styles="rounded-full border border-neural-teal bg-transparent text-black hover:bg-neural-teal hover:text-white"
                />
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <div className="flex justify-center space-x-4">
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl,
        )}&quote=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={facebookIcon} alt="Facebook Icon" width={28} height={28} />
      </Link>

      <Link
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText,
        )}&url=${encodeURIComponent(shareUrl)}&hashtags=yourHashtagsHere`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={twitterIcon} alt="Twitter Icon" width={28} height={28} />
      </Link>
      <Link
        href={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={instagramIcon}
          alt="Instagram Icon"
          width={28}
          height={28}
        />
      </Link>
      <Link
        href={`https://www.reddit.com/submit?url=${encodeURIComponent(
          shareUrl,
        )}&title=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={redditIcon} alt="Reddit Icon" width={28} height={28} />
      </Link>
      <Link
        href={`whatsapp://send?text=${encodeURIComponent(
          shareText + ' ' + shareUrl,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={whatsappIcon} alt="WhatsApp Icon" width={28} height={28} />
      </Link>
      <Link
        href={`sms:?&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={messageIcon}
          alt="Text Message Icon"
          width={28}
          height={28}
        />
      </Link>

      <button type="button" onClick={handleCopyLink}>
        <Image src={copyIcon} alt="Copy Icon" width={28} height={28} />
      </button>
      {copySuccess && <p className="text-sm">Link copied</p>}
    </div>
  );
};

export default ShareButtons;
