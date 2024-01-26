/* eslint-disable no-unused-vars */
import { StaticImageData } from 'next/image';
import React from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  text?: string;
  icon?: StaticImageData;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  alt?: string;
  iconSize?: number;
  styles?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  disabled,
  type,
  iconSize = 20,
  styles,
}) => {
  return (
    <button
      className={twMerge(
        `whitespace-nowrap text-sm font-semibold flex items-center py-2 px-2 rounded text-white bg-terminal-blue hover:bg-neural-teal`,
        styles,
      )}
      onClick={onClick}
      disabled={disabled}
      type={type ? type : 'button'}
    >
      {icon && (
        <Image
          src={icon}
          alt={text || 'icon'}
          width={iconSize}
          height={iconSize}
          className="mr-2"
        />
      )}
      {text}
    </button>
  );
};

export default Button;
