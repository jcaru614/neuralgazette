import React from 'react';
import { Layout } from '@/components';

const AboutPage = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-neural-teal">
            About The Neural Gazette
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Welcome to The Neural Gazette, your trusted source for fast,
            concise, and unbiased news, all powered by Artificial Intelligence
            (AI). We are an AI news network committed to providing you with
            accurate and engaging news content.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            At The Neural Gazette, we leverage the cutting-edge technology of AI
            to revolutionize the way you consume news. Our AI algorithms collect
            and analyze a vast array of news articles to generate unbiased news
            articles tailored just for you.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            In today's fast-paced world, we understand the need for quick and
            reliable information. That's why we present news in the form of
            short paragraphs or two-liners, making it easy for you to stay
            informed without being overwhelmed.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Information overload and reliance on unreliable sources can be
            dangerous. However, we believe that AI is the solution. Neural
            Gazette uses AI technology to deliver true and unbiased information,
            countering the pitfalls of misinformation and biased reporting.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            We understand that everyone's interests are unique. That's why our
            app displays news stories with out reinforcing biases. Each post is
            a short paragraph providing accurate information, and if you desire
            more in-depth coverage, you can easily access the full articles.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Join us on this transformative journey to access news that is not
            only fast but also reliable and unbiased. The Neural Gazette is your
            trusted companion for staying informed in today's dynamic world.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Thank you for being a part of The Neural Gazette community.
            Together, we can navigate the complex world of news and emerge
            better informed, empowered, and inspired.
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default AboutPage;
