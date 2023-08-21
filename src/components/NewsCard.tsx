import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    headline: string;
    summary: string;
    image: string | null;
  };
  latestFlag?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, latestFlag = false }) => {
  return (
    <Link
      key={news.id}
      href={`/article/${news.id}`}
      className="bg-white text-neural-teal p-4 rounded-lg shadow-lg block md:col-span-3 transition-shadow hover:shadow-md active:shadow-lg md:flex m-5"
    >
      <div  className="md:flex md:flex-row md:space-x-4">
        <div className="md:w-1/3 relative">
          {news.image && (
            <Image
              src={news.image}
              alt={`Image for ${news.title}`}
              width={360}
              height={240}
              layout="responsive"
              className="rounded-md w-full max-w-[360px] max-h-[240px]"
            />
          )}
          {latestFlag ? (
          <div className="absolute top-0 left-0 bg-gradient-to-r from-neural-purple to-neural-purple-lighter text-white py-1 px-4 rounded-full m-2">
          <p className="text-sm font-semibold">LATEST STORY</p>
        </div>
          ) : null}

          <h2 className="text-lg text-terminal-blue font-semibold py-2 px-4 rounded block mt-4">
            {news.headline}
          </h2>
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-terminal-blue px-4 rounded block">
            {news.summary}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
