import { Layout } from '@/components';

const AboutPage = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-neural-teal mb-4">
            About The Neural Gazette
          </h1>
          <p className="text-lg text-gray-700">
            The The Neural Gazette is a groundbreaking news platform committed to
            providing accurate, unbiased, and captivating news content that is
            entirely created by Artificial Intelligence. In a world inundated
            with misinformation, varying perspectives, bias and hiden agendas,
            Neural Gazette rises to the challenge of decoding truth,
            disentangling misinformation, and empowering minds with verified
            insights.
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default AboutPage;
