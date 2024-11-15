import { EmailCollector, Layout } from '@/components';
import { useState } from 'react';
import { Loading, NewsCard, Button, ServerError } from '@/components';
import { fetcher } from '@/utils';
import useSWR from 'swr';
import Head from 'next/head';

const SEO = {
  title: `Neural Gazette | Unbiased News written with AI from sources compiled across the political spectrum`,
  description: `An Unbiased AI news platform that's decoding truth and empowering minds. Stay informed with Neural Gazette's accurate AI written news.`,
  image:
    'https://neuralgazette.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56ecb661.png&w=640&q=75',
  url: 'https://neuralgazette.com/',
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const {
    data: news,
    error,
    mutate,
  } = useSWR(`/api/newsArticles/readNews?take=${10}`, fetcher);
  console.log(
    'process.env.WORLD_NEWS_API_KEY ',
    process.env.WORLD_NEWS_API_KEY,
  );
  const loadMore = async () => {
    if (!news) return;
    setLoading(true);
    const lastNewsId = news[news.length - 1]?.id;

    try {
      const moreNews = await fetcher(
        `/api/newsArticles/readMoreNews?lastNewsId=${lastNewsId}`,
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'About',
                  item: `${SEO.url}/about`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Politics',
                  item: `${SEO.url}/politics`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'World',
                  item: `${SEO.url}/world`,
                },
              ],
            }),
          }}
        />
      </Head>

      <EmailCollector></EmailCollector>

      <main className="flex flex-col items-center justify-center min-h-screen sm:p-2 md:p-4 lg:p-8">
        <div className="max-w-screen-xl bg-off-white">
          <div className="mb-8 relative">
            <section>
              <div className="flex items-center justify-center py-2">
                <p className="text-4xl font-bold text-neural-teal relative">
                  <span
                    role="presentation"
                    className="before:h-1 before:w-10 before:bg-neural-teal before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-12"
                  />
                  NEWS
                  <span
                    role="presentation"
                    className="after:h-1 after:w-10 after:bg-neural-teal after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-12"
                  />
                </p>
              </div>
            </section>
            <div
              role="presentation"
              className="w-full h-1 bg-neural-teal to-neural-teal rounded"
            ></div>
          </div>
          <section>
            <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4">
              {news.length > 0 ? (
                news.map((item, index) => (
                  <NewsCard key={item.id} news={item} index={index} />
                ))
              ) : (
                <div className="mb-2 block md:col-span-3 md:flex relative p-1 items-center justify-center">
                  <h2 className="text-2xl font-bold text-black text-center">
                    Sorry there is news right now, please try again later.
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
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-1503512220337546"
            data-ad-slot="6507407839"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </main>
    </Layout>
  );
}
