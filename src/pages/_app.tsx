import { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/global.css';
import GoogleAnalytics from '@/lib/GoogleAnalytics';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Neural Gazette - Decoding Truth, Disentangling Misinformation, Empowering Minds. Neural Gazette is an artificial intelligence news platform that provides users with accurate, unbiased, and engaging news."
        />
        <meta
          name="og:title"
          content="Neural Gazette - Artificial Intelligence Written News"
        />
        <meta
          name="og:description"
          content="Neural Gazette is a artificial intelligence news platform, delivering fast, concise news while countering the dangers of information overload and reliance on unreliable sources."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Neural Gazette - Artificial Intelligence Written News"
        />
        <meta
          name="twitter:description"
          content="Delivering true and unbiased information, tailored to users' interests, without reinforcing biases."
        />
      </Head>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
