import { Layout } from '@/components';
import { GetStaticProps } from 'next';
import prisma from '@/lib/prisma';
import { Loading } from '@/components';
import Image from 'next/image';
interface News {
  id: string;
  title: string;
  headline: string;
  summary: string;
  article: string;
  image: string;
}

interface HomeProps {
  news: News[];
}

export default function Home({ news }: HomeProps) {
  if (!news) {
    return <Loading />;
  }
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-16">
        <div className="max-w-screen-xl">
          <div className="mb-8">
            <div className="flex items-center justify-center border-b border-abyss py-2">
              <h1 className="text-4xl font-bold text-abyss">Neural News</h1>
            </div>
          </div>
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4">
            {news.slice(0, 1).map((item) => (
              <a
                key={item.id}
                href={`/newsPiece/${item.id}`}
                className="bg-white text-neural-network p-4 rounded-lg shadow-lg block md:col-span-3 transition-shadow hover:shadow-md active:shadow-lg md:flex m-5"
              >
                <div className="md:flex md:flex-row md:space-x-4">
                  <div className="md:w-1/3 relative">
                    <Image
                      src={item.image}
                      alt={`Image for ${item.title}`}
                      width={360}
                      height={240}
                      layout="responsive" 
                      className="rounded-md w-full max-w-[360px] max-h-[240px]"
                    />
                    <div className="absolute top-0 left-0 bg-neural-network text-white py-1 px-4 rounded-full m-2">
                      <p className="text-sm font-semibold">LATEST STORY</p>
                    </div>
                    <h2 className="text-xl text-abyss font-semibold py-2 px-4 rounded block mt-4">
                      {item.headline}
                    </h2>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-abyss py-2 px-4 rounded">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4">
            {news.slice(1).map((item) => (
              <a
                key={item.id}
                href={`/newsPiece/${item.id}`}
                className="bg-white text-neural-network p-4 rounded-lg shadow-lg block md:col-span-3 transition-shadow hover:shadow-md active:shadow-lg md:flex m-5"
              >
                <div className="md:flex md:flex-row md:space-x-4">
                  <div className="md:w-1/3">
                    <Image
                      src={item.image}
                      alt={`Image for ${item.title}`}
                      width={360}
                      height={240}
                      layout="responsive" 
                      className="rounded-md w-full max-w-[360px] max-h-[240px]"
                    />
                    <h2 className="text-xl text-abyss font-semibold py-2 px-4 rounded block mt-4">
                      {item.headline}
                    </h2>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-abyss py-2 px-4 rounded">
                      {item.summary}
                    </p>
                  </div>
                </div>
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
