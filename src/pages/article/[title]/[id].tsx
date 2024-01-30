import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Chip, Layout, Loading, ShareLinks, SmallNewsCard } from '@/components';
import { neuralGazetteBot } from '@/public/images';
import Head from 'next/head';
import Link from 'next/link';
import { getPublicImageUrl, slugify } from '@/utils';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

interface NewsPost {
  id: string;
  title: string;
  headline: string;
  summary: string;
  article: string;
  photoPath: string;
  photoCredit?: string;
  createdAt: string;
  category: string;
}

interface PostPageProps {
  news: NewsPost | null;
  nextPost: NewsPost | null;
  prevPost: NewsPost | null;
}

const PostPage: React.FC<PostPageProps> = ({ news, nextPost, prevPost }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        if (news.photoPath) {
          const filepath = news.photoPath;
          const url = await getPublicImageUrl(filepath);
          setImageUrl(url);
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    fetchImageUrl();
  }, [news.photoPath]);

  const titleSlug = slugify(news.title);
  const shareUrl = `https://neuralgazette.com/article/${titleSlug}/${news.id}`;
  const shareText = `Check out this article on the neural gazette: ${news.title}`;

  const formatArticle = (text: string) => {
    const paragraphs = text.split('\n').map((para) => para.trim());

    const formattedText = paragraphs
      .map((paragraph, index) => {
        if (/^\s*"/.test(paragraph)) {
          return `
            <div class="flex items-start ml-8">
              <p class="text-sm text-gray font-italic relative">
                ${paragraph}
                <span
                  role="presentation"
                  class="after:h-full after:w-1 after:bg-neural-purple after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-4"
                />
              </p>
            </div>`;
        }

        if (/^\d+\./.test(paragraph)) {
          return `<strong key=${index}>${paragraph}</strong>`;
        }

        return `<p key=${index} style="margin-bottom: 1em;">${paragraph}</p>`;
      })
      .join('\n');

    return formattedText;
  };

  if (!news) {
    return <Loading isFullScreen={true} />;
  }
  return (
    <Layout>
      <Head>
        <title>{news.title} | The Neural Gazette</title>
        <link
          rel="canonical"
          href={`https://neuralgazette.com/article/${titleSlug}/${news.id}`}
        />
        <meta name="description" content={news.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.summary} />
        <meta
          property="og:image"
          content={
            imageUrl
              ? imageUrl
              : 'https://neuralgazette.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56ecb661.png&w=640&q=75'
          }
        />
        <meta
          property="og:url"
          content={`https://neuralgazette.com/article/${titleSlug}/${news.id}`}
        />
        <meta
          name="twitter:card"
          content={
            imageUrl
              ? imageUrl
              : 'https://neuralgazette.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56ecb661.png&w=640&q=75'
          }
        />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={news.summary} />
        <meta name="twitter:image:alt" content={news.title} />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen md:p-4 lg:p-8">
        <Link href="#main-content" className="sr-only sr-only-focusable">
          Skip to main content
        </Link>
        <div className="flex items-center justify-center py-2 m-5">
          <section>
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
          </section>
        </div>

        <div className="max-w-3xl w-full bg-off-white rounded-lg shadow-md p-2">
          <section>
            <Chip text={news.category} />

            <h1 className="md:text-4xl sm:text-xl font-bold text-terminal-blue text-center mt-2">
              {news.title}
            </h1>
          </section>
          <div className="flex items-center justify-center space-x-2 m-4">
            <Image
              src={neuralGazetteBot}
              alt="Neural Gazette Logo"
              width={20}
              height={20}
            />
            <p className="text-lg text-neural-teal">
              {`The Neural Gazette | ${format(
                parseISO(news.createdAt),
                'MMMM d, yyyy',
              )}`}
            </p>
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <ShareLinks shareUrl={shareUrl} shareText={shareText} />
          </div>
          {imageUrl && (
            <div className="relative mb-4 mt-4">
              <Image
                src={imageUrl}
                alt={news.title}
                className="w-full"
                width={360}
                height={240}
                unoptimized
                loading="lazy"
              />
              {news?.photoCredit && (
                <p className="text-md text-gray italic mt-2">
                  Photo source: {news.photoCredit}
                </p>
              )}
            </div>
          )}
          <article id="main-content" tabIndex={-1}>
            <div
              className="md:text-lg sm:text-md mb-4 font-medium text-black leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatArticle(news.article),
              }}
            />
          </article>
        </div>
        <div className="w-full max-w-4xl h-1 mt-10 bg-gradient-to-r from-neural-teal to-neural-teal-lighter rounded"></div>

        <div className="m-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-terminal-blue">
            More Articles
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-stretch">
            {nextPost && <SmallNewsCard news={nextPost} />}
            {prevPost && <SmallNewsCard news={prevPost} />}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({
  params,
}) => {
  const { id }: any = params;
  let news = null;
  let nextPost = null;
  let prevPost = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PRIVATE_BASE_URL}/api/newsArticlesAround/${id}`,
    );

    if (response.ok) {
      const { currentArticle, beforeArticles, afterArticles } =
        await response.json();

      news = currentArticle;
      prevPost = beforeArticles.length > 0 ? beforeArticles[0] : null;
      nextPost = afterArticles.length > 0 ? afterArticles[0] : null;
    } else {
      throw new Error('Failed to fetch articles around the current article');
    }
  } catch (error) {
    console.error('Error retrieving post:', error);
  }

  return {
    props: {
      news,
      nextPost,
      prevPost,
    },
  };
};

export default PostPage;
