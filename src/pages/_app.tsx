import { AppProps } from 'next/app';
import '@/styles/global.css';
import  GoogleAnalytics  from '@/lib/GoogleAnalytics';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
