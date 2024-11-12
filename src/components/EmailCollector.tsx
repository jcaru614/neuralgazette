import React, { useState } from 'react';

const EmailCollector: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Collecting Email:', email);

    const response = await fetch('api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    //    NewsletterSender();
  };

  return (
    <div className="flex justify-end flex-wrap bg-gradient-to-r from-terminal-blue to-terminal-green p-2 top-0">
      <div className="m-2">
        <p className="text-white">Subscribe to our Newsletter</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailCollector;
