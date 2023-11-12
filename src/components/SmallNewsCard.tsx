import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import slugify from '@/utils/slugify';
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

const NewsCard: React.FC<SmallNewsCardProps> = ({ news }) => {
  return (
    <Link href={`/article/${slugify(news.title)}/${news.id}`}>
      <div className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-100 transition">
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
          <Image
            src={news.image}
            alt="Next Article Thumbnail"
            layout="responsive"
            width={80}
            height={80}
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-neural-teal mb-2">
            {news.title}
          </h3>
          <p className="text-gray-600">{news.summary.substring(0, 50)}...</p>
          <span className="text-sm text-gray-500">
            {format(parseISO(news.createdAt), 'MMMM d, yyyy')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
