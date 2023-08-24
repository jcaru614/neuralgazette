import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { NewsCard, Loading, Button } from '@/components';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;
  const [loading, setLoading] = useState(false);
  const {
    data: news,
    error,
    mutate,
  } = useSWR(
    `/api/newsArticles/readNewsByCategory?category=${category}`,
    fetcher,
  );

  const loadMore = async () => {
    if (!news) return;
    setLoading(true);
    const lastNewsId = news[news.length - 1]?.id;

    const moreNews = await fetcher(
      `/api/newsArticles/readMoreNewsByCategory?lastNewsId=${lastNewsId}&category=${category}`,
    );

    if (Array.isArray(moreNews)) {
      // Append the new news articles to the existing list
      mutate([...news, ...moreNews], false);
      setLoading(false);
    }
  };

  if (!news) {
    return <Loading isFullScreen={true} />;
  }

  if (error) {
    console.error('Error fetching news:', error);
  }
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen md:p-4 lg:p-8">
        <div className="max-w-screen-xl">
          <div className="mb-8 relative">
            <div className="flex items-center justify-center py-2">
              <h1 className="text-4xl font-bold text-terminal-blue">
                {category}
              </h1>
            </div>
            <div className="w-full h-2 bg-gradient-to-r from-neural-teal to-neural-teal-lighter rounded"></div>
          </div>
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4">
            {news?.map((item) => <NewsCard key={item.id} news={item} />)}
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

export default CategoryPage;
