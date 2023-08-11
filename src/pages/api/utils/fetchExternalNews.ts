const fetchExternalNews = async (
  news_sources: string,
  text: string = '',
  earliest_publish_date: string = '',
) => {
  console.log(
    'fetchExternalNews Params ',
    news_sources,
    text,
    earliest_publish_date,
  );
  const url = `https://api.worldnewsapi.com/search-news?source-countries=us&language=en&news-sources=${news_sources}&text=${text}&earliest-publish-date=${earliest_publish_date}`;
  try {
    const response = await fetch(url, {
      headers: {
        'X-API-Key': process.env.NEWS_API_KEY ?? '',
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest politics headlines:', error);
    throw error;
  }
};

export default fetchExternalNews;
