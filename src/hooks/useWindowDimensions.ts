import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  const hasWindow = typeof window !== 'undefined';

  if (!hasWindow) {
    return { width: null, height: null };
  }

  return { width: window.innerWidth, height: window.innerHeight };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return windowDimensions;
};

export default useWindowDimensions;
