import { useRouter } from 'next/router';
import prisma from '@/lib/prisma';
import Layout from '@/components/Layout';
import { GetServerSideProps } from 'next';
import { NewsCard, Loading, Button } from '@/components';
import { useState } from 'react';

interface News {
  id: string;
  title: string;
  headline: string;
  summary: string;
  article: string;
  image: any;
}

interface CategoryPageProps {
  initialNews: News[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  initialNews,
}: {
  initialNews: News[];
}) => {
  const router = useRouter();
  const { category } = router.query;

  const [news, setNews] = useState<News[]>(initialNews);
  const [loading, setLoading] = useState(false);

  if (!initialNews) {
    return <Loading isFullScreen={true} />;
  }

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const lastNewsId = news[news.length - 1]?.id;
      const response = await fetch(
        `/api/newsArticles/getMoreNews?lastNewsId=${lastNewsId}`,
      );

      if (!response.ok) {
        console.error('Fetch error:', response.statusText);
        return;
      }

      const newNews = await response.json();
      console.log('newNews ', newNews);

      if (Array.isArray(newNews)) {
        setNews((prevNews) => [...prevNews, ...newNews]);
      } else {
        console.error('Invalid response data:', newNews);
      }
    } catch (error) {
      console.error('Error fetching more news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-16">
        <div className="max-w-screen-xl">
          <div className="mb-8 relative">
            <div className="flex items-center justify-center py-2">
              <h1 className="text-4xl font-bold text-terminal-blue">
                {category}
              </h1>
            </div>
            <div className="absolute left-0 w-2 h-16 bg-gradient-to-t from-neural-teal to-neural-teal-lighter transform rotate-180 rounded-tr-md rounded-tl-md"></div>
            <div className="absolute right-0 w-2 h-16 bg-gradient-to-t from-neural-teal to-neural-teal-lighter rounded-br-md rounded-bl-md"></div>
            <div className="w-full h-2 bg-gradient-to-r from-neural-teal to-neural-teal-lighter"></div>
          </div>
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
          <div className="flex justify-center items-center space-x-4 mt-4">
            {loading ? (
              <Loading />
            ) : (
              <Button text="Load More" onClick={loadMore} />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async (
  context,
) => {
  const { category } = context.params as { category: any };

  const initialNews = await prisma.news.findMany({
    where: {
      approved: true,
      category: {
        equals: category,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  const serializableNews = initialNews.map((news) => ({
    ...news,
    createdAt: news.createdAt.toISOString(), // Convert Date to ISO string
  }));

  return {
    props: { initialNews: serializableNews },
  };
};

export default CategoryPage;
