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
  console.log('router ', category);

  const categoryDetails = {
    politics:
      "Unravel the complexities of political landscapes, analyzing government actions, societal impact, and the ongoing debates shaping our nation's course.",
    world:
      'Embark on a global journey, exploring diverse cultures, geopolitical events, and understanding the interconnectedness of our world.',
    policy:
      'Navigate the intricacies of policies that mold our society. From identifying challenges to proposing solutions, delve into the ideas that shape our collective future.',
    business:
      'Decode the language of commerce, examining market dynamics, corporate strategies, and the economic forces influencing businesses worldwide.',
    economy:
      'Explore the intricate web of economic forces, from fiscal policies to market trends, and gain insights into the dynamics that drive financial ecosystems.',
    technology:
      'Journey through the ever-evolving tech realm, exploring innovations, societal impacts, and the ethical debates surrounding technological advancements.',
    health:
      'Stay informed about the intricacies of health, from breakthrough medical discoveries to public health policies, and the ongoing debates shaping healthcare.',
    science:
      'Embark on a scientific exploration, delving into groundbreaking discoveries, ongoing research, and the debates shaping our understanding of the natural world.',
  };

  const subtext = categoryDetails[category as string];

  const SEO = {
    title: `Neural Gazette | ${category} News`,
    description: `Explore the latest news in the ${category} category on Neural Gazette. ${subtext}`,
    image:
      'https://neuralgazette.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56ecb661.png&w=640&q=75',
    url: `https://neuralgazette.com/category/${category}`,
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

        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content={SEO.title} />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen sm:p-2 md:p-4 lg:p-8">
        <div className="max-w-screen-xl">
          <div className="mb-8 relative">
            <section>
              <div className="flex flex-col items-center justify-center py-2">
                <h1 className="uppercase text-4xl font-bold text-neural-teal relative">
                  <span
                    role="presentation"
                    className="before:h-1 before:w-10 before:bg-neural-teal before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-12"
                  />
                  {category as string}
                  <span
                    role="presentation"
                    className="after:h-1 after:w-10 after:bg-neural-teal after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-12"
                  />
                </h1>
                <h2 className="text-xl text-gray font-bold mt-2 mb-2 text-center max-w-screen-md mx-auto">
                  {subtext}
                </h2>
              </div>
            </section>
            <div
              role="presentation"
              className="w-full h-1 bg-gradient-to-r from-neural-teal to-neural-teal-lighter rounded"
            ></div>
          </div>
          <section>
            <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4">
              {news.length > 0 ? (
                news.map((item) => <NewsCard key={item.id} news={item} />)
              ) : (
                <div className="mb-2 block md:col-span-3 md:flex relative p-1 items-center justify-center">
                  <h2 className="text-2xl font-bold text-terminal-blue text-center">
                    Sorry there is no news for {category as string} right now,
                    please try again later.
                  </h2>
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
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default CategoryPage;
