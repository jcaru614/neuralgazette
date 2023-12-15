import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPublicImageUrl, slugify } from '@/utils';
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
  search?: boolean;
}

const SmallNewsCard: React.FC<SmallNewsCardProps> = ({ news, search }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (news.image) {
        const filepath = 'photos/' + news.image;
        setImageUrl(await getPublicImageUrl(filepath));
      }
    };

    fetchImageUrl();
  }, [news.image]);

  const linkProps = search
    ? {
        href: `/article/${slugify(news.title)}/${news.id}`,
        className:
          'block p-1 border-b border-gray-300 hover:bg-gray-100 hover:underline',
      }
    : { href: `/article/${slugify(news.title)}/${news.id}`, className: 'm-2' };

  return (
    <Link {...linkProps}>
      <div
        className={`flex p-2 ${
          search
            ? 'sm:max-w-sm'
            : 'md:max-w-xl border border-gray-300 rounded-md hover:bg-gray-100 transition '
        }`}
      >
        {imageUrl && (
          <div
            className={`w-${
              search ? '16 h-16' : '20'
            } overflow-hidden rounded-md`}
          >
            <Image
              src={imageUrl}
              alt={search ? 'Search news Thumbnail' : 'Next Article Thumbnail'}
              layout="responsive"
              width={search ? 64 : 80}
              height={search ? 64 : 80}
            />
          </div>
        )}
        <div className="ml-4 flex flex-col">
          <h3 className="md:text-md sm:text-xs font-semibold text-neural-teal">
            {news.title}
          </h3>
          {search && (
            <span className="text-xs text-gray-500">
              {news.createdAt &&
                format(parseISO(news.createdAt), 'MMMM d, yyyy')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SmallNewsCard;
