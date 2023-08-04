const fetchLatestHeadlines = async (source: string) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=${source}`,
      {
        headers: {
          'X-API-Key': process.env.NEWS_API_KEY ?? '',
        },
      },
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest politics headlines:', error);
    throw error;
  }
};

export default fetchLatestHeadlines;
