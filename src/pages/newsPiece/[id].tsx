import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Layout } from '@/components';
import {
  facebookIcon,
  emailIcon,
  messageIcon,
  twitterIcon,
  ainnBot,
} from '@/images/index';
interface NewsPost {
  id: string;
  headline: string;
  summary: string | null;
  published: boolean;
  createdAt: string;
}

interface PostPageProps {
  post: NewsPost | null;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-[728px] w-full bg-white rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <Image
              src=""
              alt="News Image"
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-deep-blue mb-4">
            {post.headline}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
            <div className="relative">
              <div className="absolute bottom-[-6px] left-1/2 transform translate-x-[-50%] w-10 h-10 rounded-full bg-neural-network"></div>
              <div className="relative w-8 h-8">
                <Image
                  src={ainnBot}
                  alt="Facebook"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              By AINN BOT | AI NEWS NETWORK:{' '}
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <div className="flex mt-2 md:mt-0">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={facebookIcon}
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4"
              >
                <Image src={twitterIcon} alt="Twitter" width={24} height={24} />
              </a>
              <a
                href="mailto:example@example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4"
              >
                <Image src={emailIcon} alt="Email" width={24} height={24} />
              </a>
            </div>
          </div>
          <p className="text-lg mb-4">{post.summary}</p>
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
      console.log('res ', response);
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
