import React, { useState } from 'react';
import { Layout } from '@/components';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    subject: '',
    text: '',
  });

  const [status, setStatus] = useState({
    message: '',
    type: 'idle', // 'idle' | 'success' | 'error'
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
      <div className="container mx-auto p-8 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold">
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
            />
          </div>
          <div className="mb-4">
            <label htmlFor="from" className="block text-gray-700 font-bold">
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
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 font-bold">
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
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700 font-bold">
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
