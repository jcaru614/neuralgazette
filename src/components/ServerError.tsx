import Link from 'next/link';
import Layout from './Layout';

const ServerErrorPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray">
        <h1 className="text-4xl font-semibold text-red-500 mb-4">
          Server Error
        </h1>
        <p className="text-xl text-gray mb-8">
          Sorry, something went wrong on our end. Please try again later.
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Go Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default ServerErrorPage;
