import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@/components';
import Link from 'next/link';
import slugify from '@/utils/slugify';

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    headline: string;
    summary: string;
    image: string | null;
    category: any;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const router = useRouter();

  const titleSlug = slugify(news.title);
  const handleReadMoreClick = () => {
    router.push(`/article/${titleSlug}/${news.id}`);
  };

  return (
    <div className="mb-2 text-neural-teal shadow-md block md:col-span-3 transition-shadow hover:shadow-md active:shadow-lg md:flex relative">
      <Link href={`/article/${titleSlug}/${news.id}`} passHref target="_blank">
        <div className="md:flex md:flex-row md:space-x-2">
          <div className="md:w-1/3 relative">
            {news.image && (
              <div className="w-full mx-auto md:mx-0 p-2">
                <Image
                  src={news.image}
                  alt={`Image for ${news.title}`}
                  width={360}
                  height={240}
                  layout="responsive"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-2">
              <h2 className="text-lg text-terminal-blue font-semibold block">
                {news.headline}
              </h2>
            </div>
          </div>
          <div className="md:w-2/3 mb-8 p-2">
            <p className="text-lg text-terminal-blue rounded block">
              {news.summary}
            </p>
          </div>
        </div>

        <Button
          text="Read More"
          onClick={handleReadMoreClick}
          className="absolute bottom-0 right-0 text-neural-teal rounded-tl hover:text-neural-teal text-terminal-green font-semibold py-2 px-4"
        />
      </Link>
    </div>
  );
};

export default NewsCard;
