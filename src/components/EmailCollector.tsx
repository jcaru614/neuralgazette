import React, { useState, useEffect } from 'react';

const EmailCollector: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasDismissed = localStorage.getItem('emailPopupDismissed');
    const hasSubscribed = localStorage.getItem('emailSubscribed');
    if (!hasDismissed && !hasSubscribed) {
      setTimeout(() => setShowPopup(true), 5000);
    }
  }, []);
  // localStorage.clear();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setShowError(false);
    console.log('Collecting Email:', email);

    try {
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

      setShowSuccess(true);
      setEmail('');
      localStorage.setItem('emailSubscribed', 'true');

      setTimeout(() => {
        setShowSuccess(false);
        setShowPopup(false);
      }, 5000);
    } catch (error) {
      console.error('Subscription error:', error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('emailPopupDismissed', 'true');
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-neural-teal">
            Subscribe to our Newsletter
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-full"
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="text-sm text-white bg-neural-teal px-4 py-2 rounded-full hover:bg-neural-teal-dark"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {showSuccess && (
            <span className="text-green-400 text-sm animate-fade-in">
              ✓ Successfully subscribed!
            </span>
          )}
          {showError && (
            <span className="text-red-400 text-sm animate-fade-in">
              ✗ Subscription failed. Please try again.
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailCollector;
