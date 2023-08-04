import cheerio from 'cheerio';

const fetchLinkData = async (link: string) => {
  try {
    const response = await fetch(link);
    const html = await response.text();

    // Create a Cheerio object from the HTML.
    const $ = cheerio.load(html);

    // Get the text content of the specific script tag.
    const scriptContent = $('script[type="application/ld+json"]').html();

    let articleBody = '';
    if (scriptContent) {
      try {
        const jsonData = JSON.parse(scriptContent);
        if (jsonData && jsonData.articleBody) {
          articleBody = jsonData.articleBody;
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }

    return articleBody;
  } catch (error) {
    console.error('Error fetching and processing link data:', error);
  }
};

export default fetchLinkData;
