const getWindowDimensions = () => {
  const hasWindow = typeof window !== 'undefined';

  if (!hasWindow) {
    return { width: null, height: null };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return { width, height };
};


export default getWindowDimensions;
