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
    photoPath: string | null;
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
      if (news.photoPath) {
        const filepath = news.photoPath;
        setImageUrl(await getPublicImageUrl(filepath));
      }
    };

    fetchImageUrl();
  }, [news.photoPath]);

  const linkProps = search
    ? {
        href: `/article/${slugify(news.title)}/${news.id}`,
      }
    : { href: `/article/${slugify(news.title)}/${news.id}`, className: 'm-2' };

  return (
    <Link {...linkProps}>
      <div
        className={`border-b border-gray bg-off-white flex p-2 ${
          search
            ? 'sm:max-w-sm'
            : 'md:max-w-xl border border-gray rounded-md transition'
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
              width={search ? 64 : 80}
              height={search ? 64 : 80}
              unoptimized
              loading="lazy"
            />
          </div>
        )}
        <div className="ml-4 flex flex-col">
          <h3 className="md:text-md sm:text-xs font-semibold text-neural-teal">
            {news.title}
          </h3>

          <span className="text-xs text-gray">
            {news.createdAt && format(parseISO(news.createdAt), 'MMMM d, yyyy')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SmallNewsCard;
