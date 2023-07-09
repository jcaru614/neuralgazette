import Layout from '@/components/Layout';
import { GetStaticProps } from 'next';
import prisma from '@/lib/prisma';
import Button from '@/components/Button';

interface News {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

interface HomeProps {
  news: News[];
}

export default function Home({ news }: HomeProps) {
  console.log('posts!!!!!! ', news);
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <div>
          <h1 className="text-4xl font-bold text-neural-network">
            Neural News!!!!
          </h1>
          <div className="mt-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-deep-blue text-off-white p-4 my-2 rounded-lg shadow"
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-2">{item.content}</p>
                <Button
                  text="Read More"
                  href={`/newsPiece/${item.id}`}
                  link
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const news = await prisma.news.findMany();
  console.log('news', news);
  return {
    props: { news },
    revalidate: 10,
  };
};
