import { AppProps } from 'next/app';
import '@/styles/global.css';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '@/lib/gtag';
import Head from 'next/head';
import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }: AppProps) {
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

  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Error pushing Google Ads:', e);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1503512220337546"
          crossOrigin="anonymous"
          onError={(e) => {
            console.error('Script failed to load', e);
          }}
        ></script>
      </Head>

      <GoogleAnalytics GA_TRACKING_ID={gtag.GA_TRACKING_ID} />
      <SpeedInsights />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
