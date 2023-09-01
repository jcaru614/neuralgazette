const fetchExternalNews = async (
  newsSources: string,
  text: string = '',
  earliestPublishDate: string = '',
) => {
  const url = `https://api.worldnewsapi.com/search-news?source-countries=us&language=en&news-sources=${newsSources}&text=${text}&earliest-publish-date=${earliestPublishDate}`;
  try {
    const response = await fetch(url, {
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
