import Layout from '@/components/Layout';
import { GetStaticProps } from 'next';
import Button from '@/components/Button';
import prisma from '@/lib/prisma';

interface News {
  id: string;
  title: string;
  headline: string;
  summary: string;
  article: string;
  published: boolean;
}

interface HomeProps {
  news: News[];
}

export default function Home({ news }: HomeProps) {
  if (!news) {
    return <div>Loading...</div>;
  }

  const handleGetTopNews = async () => {
    const res = await fetch(`/api/newsArticles/postNews`);
    const news = await res.json();
    console.log('Button clicked!', news);
  };

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-16">
        <div>
          <h1 className="text-4xl font-bold text-deep-blue text-center mb-8 md:text-left">
            Neural News
          </h1>
          <Button onClick={handleGetTopNews} text="Get Top Headlines" />

          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4">
            {news.slice(0, 1).map((item) => (
              <a
                key={item.id}
                href={`/newsPiece/${item.id}`}
                className="bg-white text-tungsten p-4 my-2 rounded-lg shadow-lg block md:col-span-3 transition-shadow hover:shadow-md active:shadow-lg"
              >
                <h2 className="text-xl text-deep-blue font-semibold py-2 px-4 rounded">
                  {item.title}
                </h2>
                <p className="mt-2 text-deep-blue py-2 px-4 rounded">
                  {item.summary}
                </p>
                <p className="text-red-500 font-semibold text-center my-2">
                  BREAKING NEWS!
                </p>
              </a>
            ))}
            {news.slice(1).map((item) => (
              <a
                key={item.id}
                href={`/newsPiece/${item.id}`}
                className="bg-white text-tungsten p-4 my-2 rounded-lg shadow-lg block transition-shadow hover:shadow-md active:shadow-lg"
              >
                <h2 className="text-xl text-deep-blue font-semibold py-2 px-4 rounded">
                  {item.title}
                </h2>
                <p className="mt-2 text-deep-blue py-2 px-4 rounded">
                  {item.summary}
                </p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // cannot call api directly from get static props, can only call db method.
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    const newsWithSerializedDate = news.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(), //Convert the createdAt date to a string representation
    }));
    return {
      props: { news: newsWithSerializedDate },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        news: [],
      },
      revalidate: 10,
    };
  }
};
