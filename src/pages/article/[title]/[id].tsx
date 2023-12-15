import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Layout, Loading, SmallNewsCard } from '@/components';
import { neuralGazetteBot } from '@/public/images';
import Head from 'next/head';
import {
  facebookIcon,
  twitterIcon,
  messageIcon,
  redditIcon,
  copyIcon,
  whatsappIcon,
  instagramIcon,
} from '@/public/images';
import { getPublicImageUrl, slugify } from '@/utils';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

interface NewsPost {
  id: string;
  title: string;
  headline: string;
  summary: string;
  article: string;
  image: string;
  photoCredit?: string;
  createdAt: string;
}

interface PostPageProps {
  post: NewsPost | null;
  nextPost: NewsPost | null;
  prevPost: NewsPost | null;
}

const PostPage: React.FC<PostPageProps> = ({ post, nextPost, prevPost }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  console.log('IMAGEURL!!!', imageUrl);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (post.image) {
        const filepath = post.image;
        const url = await getPublicImageUrl(filepath);
        setImageUrl(url);
      }
    };

    fetchImageUrl();
  }, [post.image]);

  const titleSlug = slugify(post.title);
  const shareUrl = `https://neuralgazette.com//article/${titleSlug}/${post.id}`;
  const shareText = `Check out this article on the neural gazette: ${post.title}`;

  const handleCopyLink = () => {
    const copyText = `${shareText}: ${shareUrl}`;
    navigator.clipboard.writeText(copyText);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  const paragraphs = post.article.split('\n').map((para) => para.trim());

  if (!post) {
    return <Loading isFullScreen={true} />;
  }
  return (
    <Layout>
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={post.image} />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen md:p-4 lg:p-8">
        <div className="flex items-center justify-center py-2 m-5">
          <h1 className="text-4xl font-bold text-neural-teal relative">
            <span className="before:h-1 before:w-10 before:bg-neural-teal before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-12" />
            News
            <span className="after:h-1 after:w-10 after:bg-neural-teal after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-12" />
          </h1>
        </div>
        <div className="max-w-3xl w-full bg-off-white rounded-lg shadow-md p-2">
          <h1 className="md:text-4xl sm:text-xl font-bold text-terminal-blue text-center">
            {post.title}
          </h1>
          <div className="flex items-center justify-center space-x-2 m-4">
            <Image
              src={neuralGazetteBot}
              alt="Neural Gazette Logo"
              width={20}
              height={20}
            />
            <p className="text-md text-neural-teal">
              {`The Neural Gazette | ${format(
                parseISO(post.createdAt),
                'MMMM d, yyyy',
              )}`}
            </p>
          </div>
          <div className="flex justify-center space-x-4 mt-4 mb-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl,
              )}&quote=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={facebookIcon}
                alt="Facebook Icon"
                width={28}
                height={28}
              />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareText,
              )}&url=${encodeURIComponent(shareUrl)}&hashtags=yourHashtagsHere`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={twitterIcon}
                alt="Twitter Icon"
                width={28}
                height={28}
              />
            </a>
            <a
              href={`https://www.instagram.com/?url=${encodeURIComponent(
                shareUrl,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={instagramIcon}
                alt="Instagram Icon"
                width={28}
                height={28}
              />
            </a>
            <a
              href={`sms:?&body=${encodeURIComponent(
                shareText + ' ' + shareUrl,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={messageIcon}
                alt="Text Message Icon"
                width={28}
                height={28}
              />
            </a>
            <a
              href={`https://www.reddit.com/submit?url=${encodeURIComponent(
                shareUrl,
              )}&title=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={redditIcon}
                alt="Reddit Icon"
                width={28}
                height={28}
              />
            </a>
            <a
              href={`whatsapp://send?text=${encodeURIComponent(
                shareText + ' ' + shareUrl,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={whatsappIcon}
                alt="WhatsApp Icon"
                width={28}
                height={28}
              />
            </a>

            <button onClick={handleCopyLink}>
              <Image src={copyIcon} alt="Copy Icon" width={28} height={28} />
            </button>
            {copySuccess && <p className="text-sm">Link copied</p>}
          </div>
          {imageUrl && (
            <div className="relative mb-4 mt-4">
              <Image
                src={imageUrl}
                alt="Article Image"
                unoptimized
                className="w-full"
                width={360}
                height={240}
              />
              {post.photoCredit && (
                <p className="text-sm text-gray-500 italic mt-2">
                  Photo source: {post.photoCredit}
                </p>
              )}
            </div>
          )}
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="md:text-lg sm:text-md mb-4 font-medium text-terminal-blue leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
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
  let post = null;
  let nextPost = null;
  let prevPost = null;

  try {
    // Fetch the current, before, and after articles
    const response = await fetch(
      `${process.env.NEXT_PRIVATE_BASE_URL}/api/newsArticlesAround/${id}`,
    );

    if (response.ok) {
      const { currentArticle, beforeArticles, afterArticles } =
        await response.json();

      post = currentArticle;
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
      post,
      nextPost,
      prevPost,
    },
  };
};

export default PostPage;
