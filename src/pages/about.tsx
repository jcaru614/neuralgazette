import { Layout } from '@/components';

const AboutPage = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-neural-network mb-4">
            About AINN
          </h1>
          <p className="text-lg text-gray-700">
            AINN (Artificial Intelligence News Network) is an innovative and
            advanced news platform powered by state-of-the-art AI technology.
            Our mission is to revolutionize the way people consume news by
            providing accurate, unbiased, and personalized news content tailored
            to each individual users interests.
          </p>
          {/* Add more key features and content here */}
        </div>
      </main>
    </Layout>
  );
};

export default AboutPage;
