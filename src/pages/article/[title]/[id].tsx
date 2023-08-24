import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Layout, Loading } from '@/components';
import { neuralGazetteBot } from '@/public/images';
import {
  facebookIcon,
  twitterIcon,
  messageIcon,
  redditIcon,
  emailIcon,
  whatsappIcon,
} from '@/public/images';
import slugify from '@/utils/slugify';

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
    return <Loading isFullScreen={true} />;
  }
  const titleSlug = slugify(post.title);
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/article/${titleSlug}/${post.id}`;
  const shareText = `Check out this article on AI News Network: ${post.title}`;

  const paragraphs = post.article.split('\n').map((para) => para.trim());
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen md:p-4 lg:p-8">
        <div className="flex items-center justify-center py-2 m-5">
          <h1 className="text-4xl font-bold text-neural-teal relative">
            <span className="before:h-1 before:w-10 before:bg-neural-teal before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-12" />
            News
            <span className="after:h-1 after:w-10 after:bg-neural-teal after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-12" />
          </h1>
        </div>
        <div className="max-w-[728px] w-full bg-off-white rounded-lg shadow-md p-2">
          <h1 className="text-4xl font-bold text-terminal-blue text-center">
            {post.title}
          </h1>
          <div className="relative mb-4 mt-4">
            <Image
              src={post.image}
              alt="Article Image"
              layout="responsive"
              className="w-full"
              width={360}
              height={240}
            />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              src={neuralGazetteBot}
              alt="Neural Gazette Logo"
              width={20}
              height={20}
            />
            <p className="text-sm text-neural-teal">
              {`By Neural Gazette BOT | The Neural Gazette: ${new Date(
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
            <p
              key={index}
              className="text-xl mb-4 font-medium text-terminal-blue leading-relaxed"
            >
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
      `${process.env.NEXT_PRIVATE_BASE_URL}/api/newsArticles/${id}`,
    );
    if (response.ok) {
      post = await response.json();
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
