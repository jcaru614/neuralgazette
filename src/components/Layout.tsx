import { Navbar } from '@/components';
import Head from 'next/head';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="AINN - Decoding Truth, Disentangling Misinformation, Empowering Minds. AINN is an artificial intelligence news platform that provides users with accurate, unbiased, and engaging news."
        />
        <meta name="og:title" content="AINN - Artificial Intelligence News Network" />
        <meta
          name="og:description"
          content="AINN is a artificial intelligence news platform, delivering fast, concise news while countering the dangers of information overload and reliance on unreliable sources."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AINN - Artificial Intelligence News Network" />
        <meta
          name="twitter:description"
          content="Delivering true and unbiased information, tailored to users' interests, without reinforcing biases."
        />
      </Head>
      <Navbar />
      <div className="bg-off-white">{children}</div>
    </div>
  );
}
