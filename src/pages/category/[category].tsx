import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { NewsCard, Loading, Button, ServerError } from '@/components';
import useSWR from 'swr';
import { useState } from 'react';
import { fetcher } from '@/utils';
import Head from 'next/head';

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const SEO = {
    title: `Neural Gazette | ${category} News`,
    description: `An Unbiased AI news platform that' decoding truth and empowering minds. Stay informed with Neural Gazette's accurate AI written news.`,
    image:
      'https://neuralgazette.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56ecb661.png&w=640&q=75',
    url: `https://neuralgazette.com/category${category}`,
  };

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

    try {
      const moreNews = await fetcher(
        `/api/newsArticles/readMoreNewsByCategory?lastNewsId=${lastNewsId}&category=${category}`,
      );

      if (Array.isArray(moreNews)) {
        mutate([...news, ...moreNews], false);
      } else {
        console.error('Invalid response data for more news:', moreNews);
      }
    } catch (error) {
      console.error('Error fetching more news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <ServerError />;
  }
  if (!news) {
    return <Loading isFullScreen={true} />;
  }
  return (
    <Layout>
      <Head>
        <title>{SEO.title}</title>
        <link rel="canonical" href={SEO.url} />
        <meta name="description" content={SEO.description} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:image" content={SEO.image} />
        <meta property="og:url" content={SEO.url} />

        <meta name="twitter:card" content={SEO.image} />
        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen md:p-4 lg:p-8">
        <div className="max-w-screen-xl">
          <div className="mb-8 relative">
            <div className="flex items-center justify-center py-2">
              <h1 className="text-4xl font-bold text-terminal-blue">
                {(category as string)?.toUpperCase()}
              </h1>
            </div>
            <div className="w-full h-2 bg-gradient-to-r from-neural-teal to-neural-teal-lighter rounded"></div>
          </div>
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4">
            {news.length > 0 ? (
              news.map((item) => <NewsCard key={item.id} news={item} />)
            ) : (
              <div className="mb-2 block md:col-span-3 md:flex relative p-1 items-center justify-center">
                <h1 className="text-2xl font-bold text-terminal-blue text-center">
                  Sorry there is no news for {category as string} right now,
                  please try again later.
                </h1>
              </div>
            )}
          </div>
          {news.length > 0 ? (
            <div className="flex justify-center items-center space-x-4 m-4">
              {loading ? (
                <Loading />
              ) : (
                <Button text="Load More" onClick={loadMore} />
              )}
            </div>
          ) : null}
        </div>
      </main>
    </Layout>
  );
};

export default CategoryPage;
