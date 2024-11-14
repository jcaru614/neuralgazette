import React, { useState } from 'react';

const EmailCollector: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

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

    // After successful submission:
    setShowSuccess(true);
    setEmail(''); // Clear the input

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="flex justify-end flex-wrap bg-gradient-to-r from-terminal-blue to-terminal-green p-0 top-0">
      <div className="flex items-center m-2">
        <p className="text-neural-teal text-sm mr-2">
          Subscribe to our Newsletter:
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex items-center text-sm gap-1"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-1 rounded-full"
            required
          />
          <button
            type="submit"
            className="text-sm text-neural-blue bg-neural-teal px-4 py-1 rounded-full hover:bg-blue-700"
          >
            Submit
          </button>
          {showSuccess && (
            <span className="ml-2 text-green-400 text-sm animate-fade-in">
              ✓ Successfully subscribed!
            </span>
          )}
        </form>
      </div>
    </div>
  );
};
export default EmailCollector;
