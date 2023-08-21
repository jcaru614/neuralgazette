import { Layout } from '@/components';

const AboutPage = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-neural-teal mb-4">
            About AINN
          </h1>
          <p className="text-lg text-gray-700">
            AI.N.N. stands for (Artificial Intelligence News Network) a
            groundbreaking news platform committed to providing accurate,
            unbiased, and captivating news content that is entirely created by
            Artificial Intelligence. In a world inundated with misinformation,
            varying perspectives, bias and hiden agendas, AINN rises to the challenge of
            decoding truth, disentangling misinformation, and empowering minds
            with verified insights.
          </p>
          {/* Add more key features and content here */}
        </div>
      </main>
    </Layout>
  );
};

export default AboutPage;
