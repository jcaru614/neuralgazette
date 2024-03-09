import React from 'react';
import { Layout } from '@/components';
import Head from 'next/head';
import { synthesisPhoto } from '@/public/images';
import Image from 'next/image';


const SEO = {
  title: `Neural Gazette | About Us`,
  description: `Discover the story behind Neural Gazette, an unbiased AI news platform. Learn about our mission, values, and the team driving accurate AI-written news.`,
  image:
    'https://neuralgazette.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56ecb661.png&w=640&q=75',
  url: 'https://neuralgazette.com/about',
};

const About = () => {
  return (
    <Layout>
      <Head>
        <title>{SEO.title}</title>
        <link rel="canonical" href={SEO.url} />
        <meta name="description" content={SEO.description} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:image" content={SEO.image} />
        <meta property="og:url" content={SEO.url} />

        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content={SEO.title} />

      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen sm:p-2 md:p-4 lg:p-8">
        <div className="max-w-3xl">
          
          <h1 className="text-6xl font-bold text-neural-teal mb-6">
            About The Neural Gazette
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neural-teal mb-2">
              Our Mission
            </h2>
            <p className="text-lg text-gray">
              Welcome to The Neural Gazette, your trusted source for fast,
              concise, and unbiased news, all powered by Artificial Intelligence
              (AI). We are an AI news network committed to providing you with
              accurate and engaging news content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neural-teal mb-2">
              AI at the Core
            </h2>
            <p className="text-lg text-gray">
              At The Neural Gazette, we leverage the cutting-edge technology of
              AI to revolutionize the way you consume news. Our AI algorithms
              collect and analyze a vast amount of news articles across the
              political spectrum to generate new unbiased and factual news
              articles without an agenda.
            </p>
          </section>

          <div className="flex justify-center">
            <Image
              src={synthesisPhoto}
              width={900} // Adjust the width to your desired size
              height={900} // Adjust the height to your desired size
              alt="The Neural Gazette"
              className=" mb-8"
            />
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neural-teal mb-2">
              Quick and Reliable Information
            </h2>
            <p className="text-lg text-gray">
              In today's fast-paced world, we understand the need for quick and
              reliable information. That's why we present news so that each post
              is a short summary and title, and if you desire more in-depth
              coverage, you can easily access the full article by clicking the
              post.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neural-teal mb-2">
              Mitigating Biases and Risks
            </h2>
            <p className="text-lg text-gray">
              Relying solely on ideologically biased sources poses inherent
              risks. While such sources may convey accurate information in many
              instances, the issue arises from the selective omission or
              complete absence of certain details. This information gap is where
              challenges emerge. Herein lies the value of AI as a solution.
              Neural Gazette harnesses AI technology to provide genuinely
              unbiased and comprehensive information, mitigating the risks
              associated with misinformation and biased reporting.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neural-teal mb-2">
              Displaying Diverse Perspectives
            </h2>
            <p className="text-lg text-gray">
              Neural Gazette displays news stories without reinforcing biases by
              showing all current events regardless of which side so that you
              can overcome your blind side.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neural-teal mb-2">
              Join Us on the Journey
            </h2>
            <p className="text-lg text-gray">
              Join us on this transformative journey to access news that is not
              only fast but also reliable and unbiased. The Neural Gazette is
              your trusted companion for staying informed in today's dynamic
              world.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neural-teal mb-2">
              Thank You for Being a Part of Our Community
            </h2>
            <p className="text-lg text-gray">
              Thank you for being a part of The Neural Gazette community.
              Together, we can navigate the complex world of news and emerge
              better informed, empowered, and inspired.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default About;
