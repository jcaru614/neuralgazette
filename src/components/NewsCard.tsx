import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Chip, ShareLinks } from '@/components';
import Link from 'next/link';
import { getPublicImageUrl, slugify, timeAgo } from '@/utils';
import { shareIcon } from '@/public/images';

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    headline: string;
    summary: string;
    photoPath: string | null;
    category: any;
    originalBias?: any;
    createdAt?: any;
  };
  index?: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, index }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (news.photoPath) {
        const filepath = news.photoPath;
        const url = await getPublicImageUrl(filepath);
        setImageUrl(url);
      }
    };

    fetchImageUrl();
  }, [news.photoPath]);

  const titleSlug = slugify(news.title);
  const shareUrl = `https://neuralgazette.com/article/${titleSlug}/${news.id}`;
  const shareText = `Check out this article on the neural gazette: ${news.title}`;

  const handleReadMoreClick = (e: any) => {
    e.preventDefault();
    router.push(`/article/${titleSlug}/${news.id}`);
  };

  const getHeadingElement = (level: number, text: string): React.ReactNode => {
    level += 1;
    const cappedLevel = level <= 6 ? level : 7;
    const Element = cappedLevel <= 6 ? `h${cappedLevel}` : 'p';

    return React.createElement(
      Element,
      {
        className: `md:text-xl sm:text-lg text-black font-semibold block mb-4`,
      },
      text,
    );
  };

  return (
    <>
      <article className="mb-2 text-neural-teal shadow-md block md:col-span-3 transition-shadow hover:shadow-lg active:shadow-lg md:flex relative p-1 bg-off-white rounded-md">
        <div className="md:flex md:flex-row md:space-x-2">
          {imageUrl ? (
            <div className="w-full mx-auto md:mx-0 md:w-1/3 relative sm:mb-4">
              <Image
                src={imageUrl}
                alt={`Image for ${news.title}`}
                width={360}
                height={240}
                className="w-full rounded-md"
                unoptimized
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full mx-auto md:mx-0 md:w-1/3 relative sm:mb-4"></div>
          )}
          <div className="md:w-2/3 flex flex-col justify-between">
            <div>
              {getHeadingElement(index, news.headline)}
              <p className="md:text-lg sm:text-md text-black rounded block mb-2">
                {news.summary}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 mb-2 items-center">
                <Chip text={news.category} styles="bg-neural-purple" />
                <Chip
                  text={timeAgo(news.createdAt)}
                  styles="bg-transparent text-neural-purple"
                />
              </div>
              <div className="flex gap-2 items-center">
                <ShareLinks shareUrl={shareUrl} shareText={shareText} modal />
                <Button
                  text="Read More"
                  onClick={handleReadMoreClick}
                  styles="rounded-full border border-neural-teal bg-transparent text-black hover:bg-neural-teal hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default NewsCard;
