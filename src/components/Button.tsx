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
  disabled?: boolean; // Add the disabled prop
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  link,
  href,
  target,
  rel,
  className,
  disabled
}) => {
  return link ? (
    <Link
      href={href || '#'}
      className={`text-neural-teal hover:text-neural-teal ${className}`}
      target={target}
      rel={rel}
    >
      {text}
    </Link>
  ) : (
    <button
      className={`bg-terminal-blue hover:bg-neural-teal text-white font-semibold py-2 px-4 rounded ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
