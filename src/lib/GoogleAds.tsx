import Script from 'next/script';

const GoogleAds = ({ GOOGLE_ADS_CLIENT_ID }) => {
  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADS_CLIENT_ID}`}
      />
    </>
  );
};

export default GoogleAds;
