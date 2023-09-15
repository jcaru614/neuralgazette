const fetchExternalNews = async (url: string) => {
  const extractURL = `https://api.worldnewsapi.com/extract-news?analyze=true&url=${url}`;
  try {
    const response = await fetch(extractURL, {
      headers: {
        'X-API-Key': process.env.NEWS_API_KEY ?? '',
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest news sources', error);
    throw error;
  }
};

export default fetchExternalNews;
