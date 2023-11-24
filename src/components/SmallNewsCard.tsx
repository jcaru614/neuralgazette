import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '@/utils';
import { format, parseISO } from 'date-fns';

interface SmallNewsCardProps {
  news: {
    id: string;
    title: string;
    headline: string;
    summary: string;
    image: string | null;
    category?: any;
    originalBias?: any;
    createdAt?: string;
  };
}

const SmallNewsCard: React.FC<SmallNewsCardProps> = ({ news }) => {
  return (
    <Link href={`/article/${slugify(news.title)}/${news.id}`} className="m-2">
      <div className="flex p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition sm:max-w-sm md:max-w-xl">
        {news.image && (
          <div className="w-20 overflow-hidden rounded-md">
            <Image
              src={news.image}
              alt="Next Article Thumbnail"
              layout="responsive"
              width={80}
              height={80}
            />
          </div>
        )}
        <div className="ml-4 flex flex-col">
          <h3 className="md:text-md sm:text-xs font-semibold text-neural-teal">
            {news.title}
          </h3>
          {/* <p className="text-gray-600 md:text-sm sm:text-xs">
            {news.summary.substring(0, 50)}...
          </p> */}
          <span className="text-sm text-gray-500">
            {format(parseISO(news.createdAt), 'MMMM d, yyyy')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SmallNewsCard;
