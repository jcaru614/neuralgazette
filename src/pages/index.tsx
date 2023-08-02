import Layout from '@/components/Layout';
import { GetStaticProps } from 'next';
import Button from '@/components/Button';

interface News {
  id: string;
  headline: string;
  summary: string;
  published: boolean;
}

interface HomeProps {
  news: News[];
}

export default function Home({ news }: HomeProps) {
  if (!news) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-16">
        <div>
          <h1 className="text-4xl font-bold text-deep-blue text-center mb-8 md:text-left">
            Neural News!!!!
          </h1>
          <Button onClick={handleGetTopNews} text="Get Top Headlines" />

          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white text-tungsten p-4 my-2 rounded-lg shadow-lg"
              >
                <h2 className="text-xl text-deep-blue font-semibold py-2 px-4 rounded">
                  {item.headline}
                </h2>
                <p className="mt-2 text-deep-blue py-2 px-4 rounded">
                  {item.summary}
                </p>
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
  const res = await fetch(
    `${process.env.BASE_URL}/api/newsArticles/getAllNews`,
  );
  const news = await res.json();
  console.log('news', news);
  return {
    props: { news },
    revalidate: 10,
  };
};

export const handleGetTopNews = async () => {
  const res = await fetch(`/api/newsArticles/getTopHeadlines`);
  const news = await res.json();
  console.log('Button clicked!', news);
};
