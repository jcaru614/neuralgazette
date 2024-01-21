import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: any;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  disabled,
  type,
}) => {
  return (
    <button
      className={
        className
          ? className
          : `bg-terminal-blue hover:bg-neural-teal text-white font-semibold py-2 px-4 rounded`
      }
      onClick={onClick}
      disabled={disabled}
      type={type ? type : 'button'}
    >
      {text}
    </button>
  );
};

export default Button;
