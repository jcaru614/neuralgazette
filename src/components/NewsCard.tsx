import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@/components';
import Link from 'next/link';
import { slugify } from '@/utils';
import { getPublicImageUrl } from '@/utils';

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    headline: string;
    summary: string;
    image: string | null;
    category: any;
    originalBias?: any;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (news.image) {
        const filepath = 'photos/' + news.image;
        const url = await getPublicImageUrl(filepath);
        setImageUrl(url);
      }
    };

    fetchImageUrl();
  }, [news.image]);

  const titleSlug = slugify(news.title);
  const handleReadMoreClick = (e: any) => {
    e.preventDefault();
    router.push(`/article/${titleSlug}/${news.id}`);
  };

  const sanitizeString = (inputString: string) => {
    return inputString.replace(/['"]/g, '');
  };

  return (
    <div className="mb-2 text-neural-teal shadow-md block md:col-span-3 transition-shadow hover:shadow-lg active:shadow-lg md:flex relative p-1">
      <Link href={`/article/${titleSlug}/${news.id}`} passHref>
        <div className="md:flex md:flex-row md:space-x-2">
          {imageUrl && (
            <div className="md:w-1/3 relative">
              <div className="w-full mx-auto md:mx-0">
                <Image
                  src={imageUrl}
                  alt={`Image for ${news.title}`}
                  width={360}
                  height={240}
                  unoptimized
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </div>
          )}
          <div className="md:w-2/3 mb-8 p-2">
            <h2 className="md:text-xl sm:text-lg text-terminal-blue font-semibold block mb-4">
              {sanitizeString(news.headline)}
            </h2>
            <p className="md:text-lg sm:text-md text-terminal-blue rounded block">
              {news.summary}
            </p>
            {/* <h2 className="md:text-lg sm:text-md text-neural-teal font-semibold block">
              {news.originalBias}
            </h2> */}
          </div>
        </div>
        <Button
          text="Read More"
          onClick={handleReadMoreClick}
          className="absolute bottom-0 right-0 text-neural-teal rounded-tl hover:text-neural-purple font-semibold py-2 px-4"
        />
      </Link>
    </div>
  );
};

export default NewsCard;
