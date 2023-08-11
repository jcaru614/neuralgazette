import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Layout, Loading } from '@/components';
import { ainnBot } from '@/public/images';
import {
  facebookIcon,
  twitterIcon,
  messageIcon,
  redditIcon,
  emailIcon,
  whatsappIcon,
} from '@/public/images';

interface NewsPost {
  id: string;
  title: string;
  headline: string;
  summary: string;
  article: string;
  image: string;
  createdAt: string;
}

interface PostPageProps {
  post: NewsPost | null;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  if (!post) {
    return <Loading />;
  }
  const shareUrl = `${process.env.BASE_URL}/news/${post.id}`;
  const shareText = `Check out this article on AI News Network: ${post.title}`;

  const paragraphs = post.article.split('\n').map((para) => para.trim());
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-[728px] w-full bg-white rounded-lg shadow-lg p-8">
          <div className="relative h-60 md:h-96">
            <Image src={post.image} alt="Article Image" layout="fill" />
          </div>
          <div className="flex items-center justify-center mb-4 mt-4">
            <h1 className="text-4xl font-bold text-abyss text-center">
              {post.title}
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              src={ainnBot}
              alt="AI News Network Logo"
              width={20}
              height={20}
            />
            <p className="text-sm text-neural-network">
              {`By AINN BOT | AI NEWS NETWORK: ${new Date(
                post.createdAt,
              ).toLocaleDateString()}`}
            </p>
          </div>

          {/* Share Links */}
          <div className="flex justify-center space-x-4 mt-4 mb-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={facebookIcon}
                alt="Facebook Icon"
                width={24}
                height={24}
              />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareText,
              )}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={twitterIcon}
                alt="Twitter Icon"
                width={24}
                height={24}
              />
            </a>

            <a
              href={`sms:?&body=${encodeURIComponent(
                shareText + ' ' + shareUrl,
              )}`}
            >
              <Image
                src={messageIcon}
                alt="Text Message Icon"
                width={24}
                height={24}
              />
            </a>
            <a
              href={`https://www.reddit.com/submit?url=${encodeURIComponent(
                shareUrl,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={redditIcon}
                alt="Reddit Icon"
                width={24}
                height={24}
              />
            </a>

            <a
              href={`whatsapp://send?text=${encodeURIComponent(
                shareText + ' ' + shareUrl,
              )}`}
            >
              <Image
                src={whatsappIcon}
                alt="WhatsApp Icon"
                width={24}
                height={24}
              />
            </a>

            <a
              href={`mailto:?subject=${encodeURIComponent(
                post.title,
              )}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
            >
              <Image src={emailIcon} alt="Email Icon" width={24} height={24} />
            </a>
          </div>

          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg mb-4">
              {paragraph}
            </p>
          ))}
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

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/newsArticles/${id}`,
    );
    if (response.ok) {
      post = await response.json();
      console.log('res ', post);
    } else {
      throw new Error('Failed to fetch post');
    }
  } catch (error) {
    console.error('Error retrieving post:', error);
  }

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
