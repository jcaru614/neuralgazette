import React, { useState } from 'react';
import { Layout } from '@/components';
import Head from 'next/head';

const SEO = {
  title: `Neural Gazette | Contact Us`,
  description: `Get in touch with Neural Gazette - Your source for unbiased AI news. Reach out to us for inquiries, feedback, or collaboration opportunities.`,
  image:
    'https://neuralgazette.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56ecb661.png&w=640&q=75',
  url: 'https://neuralgazette.com/contactUs',
};

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    subject: '',
    text: '',
  });

  const [status, setStatus] = useState({
    message: '',
    type: 'idle',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(process.env.NG_API_KEY);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact/contactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle a successful submission
        setStatus({ message: 'Email sent successfully', type: 'success' });
        setFormData({
          name: '',
          from: '',
          subject: '',
          text: '',
        });
      } else {
        // Handle the case when the email sending fails.
        setStatus({ message: 'Failed to send email', type: 'error' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({ message: 'Error sending email', type: 'error' });
    }
  };

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
      <div className="container mx-auto p-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        {status.type === 'success' && (
          <div className="bg-gradient-to-r from-neural-teal to-neural-teal-lighter text-white px-4 py-3 mb-4 rounded">
            {status.message}
          </div>
        )}
        {status.type === 'error' && (
          <div className="bg-gradient-to-r from-network-error to-network-error-lighter text-white px-4 py-3 mb-4 rounded">
            {status.message}
          </div>
        )}
        <form onSubmit={handleSubmit} role="form">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray font-bold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
              aria-label="Your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="from" className="block text-gray font-bold">
              Email:
            </label>
            <input
              type="email"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
              aria-label="Your Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray font-bold">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
              aria-label="Your Subject"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray font-bold">
              Message:
            </label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows={4}
              className="border rounded px-3 py-2 w-full"
              required
              aria-label="Your Message"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-neural-teal hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ContactUs;
