import { Navbar } from '@/components';
import Head from 'next/head';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content="AINN" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar />
      <div className="bg-off-white">{children}</div>
    </div>
  );
}
