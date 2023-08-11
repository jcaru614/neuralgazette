import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  link?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  link,
  href,
  target,
  rel,
  className, 
}) => {
  return link ? (
    <Link
      href={href || '#'}
      className={`text-neural-network hover:text-neural-network ${className}`}
      target={target}
      rel={rel}
    >
      {text}
    </Link>
  ) : (
    <button
      className={`bg-abyss hover:bg-neural-network text-white font-semibold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
