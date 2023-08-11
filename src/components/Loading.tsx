import Layout from './Layout';

const Loading = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-opacity-25"></div>
      </div>
    </Layout>
  );
};

export default Loading;
