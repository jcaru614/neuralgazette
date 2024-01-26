import React from 'react';
import { twMerge } from 'tailwind-merge';

interface NewsCardProps {
  text: string;
  styles?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ text, styles }) => {
  return (
    <div
      className={twMerge(
        'max-h-6 bg-neural-purple text-white text-sm p-1 rounded-md inline-flex items-center justify-center',
        styles,
      )}
    >
      {text}
    </div>
  );
};

export default NewsCard;
