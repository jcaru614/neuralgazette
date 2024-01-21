import React from 'react';
import Layout from '@/components/Layout';
import Head from 'next/head';

const SEO = {
  title: `Neural Gazette | Privacy Policy`,
  description: `Learn about Neural Gazette's commitment to your privacy. Explore our privacy policy to understand how we handle your data on our unbiased AI news platform.`,
  image:
    'https://neuralgazette.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56ecb661.png&w=640&q=75',
  url: 'https://neuralgazette.com/privacyPolicy',
};

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Head>
        <title>{SEO.title}</title>
        <link rel="canonical" href={SEO.url} />
        <meta name="description" content={SEO.description} />

        <meta property="og:type" content="home page" />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:image" content={SEO.image} />
        <meta property="og:url" content={SEO.url} />

        <meta name="twitter:title" content={SEO.title} />
        <meta name="twitter:description" content={SEO.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content={SEO.title} />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-24">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold text-neural-teal mb-4">
            Privacy Policy
          </h2>
          <p className="text-lg text-gray">Last Updated: 09/08/2023</p>

          <h2 className="text-2xl font-semibold mt-6">Introduction</h2>
          <p className="text-lg text-gray">
            Welcome to Neural Gazette ("we," "our," or "us"). We are committed
            to protecting your privacy and ensuring the security of your
            personal information. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your personal information when you
            visit our website, https://neuralgazette.com. By accessing or using
            our website, you consent to the practices described in this Privacy
            Policy. Please take a moment to read this Privacy Policy carefully.
            If you do not agree with the terms of this Privacy Policy, please do
            not use our website.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            Information We Collect
          </h2>

          <h3 className="text-xl font-semibold mt-4">
            1. Personal Information
          </h3>
          <p className="text-lg text-gray">
            We may collect the following types of personal information when you
            use our website:
          </p>
          <ul className="list-disc pl-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Contact information</li>
            <li>Any other information you provide to us voluntarily</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">2. Usage Information</h3>
          <p className="text-lg text-gray">
            We may also collect non-personal information about how you use our
            website, including:
          </p>
          <ul className="list-disc pl-6">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Pages visited</li>
            <li>Date and time of your visit</li>
            <li>Referring website</li>
            <li>Other analytical data</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">
            How We Use Your Information
          </h2>
          <p className="text-lg text-gray">
            We may use your information for the following purposes:
          </p>
          <ul className="list-disc pl-6">
            <li>To provide and maintain our website</li>
            <li>To personalize your experience on our website</li>
            <li>To send you promotional emails (if you have opted in)</li>
            <li>To respond to your inquiries and requests</li>
            <li>To analyze and improve our website's performance</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">
            Disclosure of Your Information
          </h2>
          <p className="text-lg text-gray">
            We may disclose your personal information to third parties only in
            the following circumstances:
          </p>
          <ul className="list-disc pl-6">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>
              To service providers and partners who assist us in operating our
              website
            </li>
            <li>
              In connection with a merger, acquisition, or sale of all or a
              portion of our assets
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">
            Your Rights and Choices
          </h2>
          <ul className="list-disc pl-6">
            <li>
              You have the right to access, correct, or delete your personal
              information.
            </li>
            <li>
              You may opt out of receiving promotional emails at any time.
            </li>
            <li>You can disable cookies in your browser settings.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">Security</h2>
          <p className="text-lg text-gray">
            We take reasonable measures to protect your personal information
            from unauthorized access, use, or disclosure. However, no data
            transmission over the internet or electronic storage can be
            guaranteed to be 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            Changes to This Privacy Policy
          </h2>
          <p className="text-lg text-gray">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. The updated Privacy Policy will be posted on
            this page with the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
          <p className="text-lg text-gray">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy, please contact us at neuralgazette@gmail.com.
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default PrivacyPolicy;
