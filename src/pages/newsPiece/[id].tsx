import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';
import { Layout } from '@/components';

interface NewsPost {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
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
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <div className="bg-deep-blue text-off-white py-4 px-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg mb-4">{post.content}</p>
          {post.published ? (
            <p className="text-green-500">Published</p>
          ) : (
            <p className="text-red-500">Not published</p>
          )}
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
      `${process.env.BASE_URL}/api/getNewsArticle/${id}`,
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
