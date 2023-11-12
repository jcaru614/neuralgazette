/* eslint-disable @next/next/no-script-component-in-head */
import { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/global.css';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '@/lib/gtag';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {

  console.log(
    'process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID ',
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID,
  );

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const globalSeo = {
    title: 'Neural Gazette - Artificial Intelligence Written News',
    description:
      'Decoding Truth, Disentangling Misinformation, Empowering Minds. Neural Gazette is an artificial intelligence news platform that provides users with accurate, unbiased, and engaging news.',
    ogTitle: 'Neural Gazette - Artificial Intelligence Written News',
    ogDescription:
      'Decoding Truth, Disentangling Misinformation, Empowering Minds. Neural Gazette is an artificial intelligence news platform that provides users with accurate, unbiased, and engaging news.',
    ogImage:
      'https://neuralgazette.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56ecb661.png&w=640&q=75',
  };

  return (
    <>
      {/* Head section for global SEO meta tags */}
      <Head>
        <Script
          id="Adsense-id"
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
          async
          crossOrigin="anonymous"
          strategy="afterInteractive"
          onError={(e) => {
            console.error('Script failed to load', e);
          }}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        {/* Title */}
        <title>{globalSeo.title}</title>

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Description meta tag */}
        <meta name="description" content={globalSeo.description} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={globalSeo.ogTitle} />
        <meta property="og:description" content={globalSeo.ogDescription} />
        <meta property="og:image" content={globalSeo.ogImage} />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content={globalSeo.ogImage} />
        <meta name="twitter:title" content={globalSeo.ogTitle} />
        <meta name="twitter:description" content={globalSeo.ogDescription} />

      </Head>
      <GoogleAnalytics GA_TRACKING_ID={gtag.GA_TRACKING_ID} />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
