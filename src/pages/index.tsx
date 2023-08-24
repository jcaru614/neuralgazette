import { Layout } from '@/components';
import { useState } from 'react';
import prisma from '@/lib/prisma';
import { Loading, NewsCard, Button } from '@/components';
import { GetServerSideProps } from 'next';

interface News {
  id: string;
  title: string;
  headline: string;
  summary: string;
  article: string;
  image: string | null;
  category: any;
}

interface HomeProps {
  initialNews: News[];
}

export default function Home({ initialNews }: { initialNews: News[] }) {
  // const [news, setNews] = useState<News[]>(initialNews);
  // const [loading, setLoading] = useState(false);

  // const loadMore = async () => {
  //   if (loading) return;
  //   setLoading(true);
  //   try {
  //     const lastNewsId = news[news.length - 1]?.id || null;
  //     const response = await fetch(
  //       `/api/newsArticles/readMoreNews?lastNewsId=${lastNewsId}`,
  //     );

  //     if (!response.ok) {
  //       console.error('Fetch error:', response.statusText);
  //       return;
  //     }

  //     const newNews = await response.json();

  //     if (Array.isArray(newNews)) {
  //       setNews((prevNews) => [...prevNews, ...newNews]);
  //     } else {
  //       console.error('Invalid response data:', newNews);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching more news:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (initialNews.length === 0) {
  //   return <Loading isFullScreen={true} />;
  // }

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen md:p-4 lg:p-8">
        <h1>hello</h1>
        {/* <div className="max-w-screen-xl">
          <div className="mb-8 relative">
            <div className="flex items-center justify-center py-2">
              <h1 className="text-4xl font-bold text-terminal-blue">NEWS</h1>
            </div>
            <div className="w-full h-2 bg-gradient-to-r from-neural-teal to-neural-teal-lighter rounded"></div>
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
        </div> */}
      </main>
    </Layout>
  );
}

// export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
//   try {
//     const initialNews = await prisma.news.findMany({
//       where: {
//         approved: true,
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//       take: 5,
//     });

//     const serializableNews = initialNews.map((news) => ({
//       ...news,
//       createdAt: news.createdAt.toISOString(),
//     }));

//     return {
//       props: { initialNews: serializableNews },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         initialNews: [],
//       },
//     };
//   }
// };
