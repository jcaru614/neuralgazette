import { useState } from 'react';

export default function sendNewsletter() {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sendNewsletter = async () => {
    setSending(true);
    try {
      const response = await fetch('/api/newsletter/newsletterFactory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setSending(false);
    }
  };
}