import { NextApiRequest, NextApiResponse } from 'next';
import { parseStringPromise } from 'xml2js';
import OpenAI from 'openai';
import axios from 'axios';

const sources = {
  // rightNews: ['https://feeds.foxnews.com/foxnews/latest'],
  rightNews: ['https://www.washingtonexaminer.com/section/news/feed/'],
  // rightNews: ['https://thedispatch.com/feed/'],
  // rightNews: ['https://nypost.com/feed/'],
  // leftNews: ['https://www.msnbc.com/feeds/latest'],
  leftNews: ['https://feeds.npr.org/1001/rss.xml'],
  // leftNews: ['https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'],
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pullLatestHeadlines = async () => {
  const headlines = { rightNews: [], leftNews: [] };

  const fetchAndParseXML = async (url: string, side: string) => {
    try {
      const response = await axios.get(url);

      const data = await response.data;
      const result = await parseStringPromise(data);

      result.rss.channel[0].item.forEach((item: any) => {
        const title = item.title[0];
        const link = item.link[0];
        headlines[side].push({ title, link });
      });
    } catch (error) {
      console.error(`Error fetching/parsing XML from ${url}:`, error.message);
    }
  };

  const fetchAllHeadlines = async (urls: string[], side: string) => {
    for (const url of urls) {
      await fetchAndParseXML(url, side);
    }
  };

  await fetchAllHeadlines(sources.rightNews, 'rightNews');
  await fetchAllHeadlines(sources.leftNews, 'leftNews');

  return headlines;
};

const getEmbedding = async (text: string) => {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
};

const cosineSimilarity = (vecA: number[], vecB: number[]) => {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (normA * normB);
};

const fetchArticleContent = async (url: string) => {
  const apiUrl = 'https://api.worldnewsapi.com/extract-news';
  const apiKey = process.env.WORLD_NEWS_API_KEY;

  try {
    const response = await axios.get(apiUrl, {
      params: { url },
      headers: {
        'x-api-key': apiKey,
      },
    });

    // Assuming the API response structure, you can access the relevant data here
    console.log(response.data.text);

    return response.data.text; // Adjust based on the actual response structure
  } catch (error) {
    console.error('There was a problem with the axios request:', error.message);
    return null;
  }
};

export const findSimilarStoriesCore = async () => {
  console.log(
    `[INFO] ${new Date().toISOString()} - findSimilarStories started`,
  );
  const headlines = await pullLatestHeadlines();

  const { rightNews, leftNews } = headlines;
  let highestSimilarityGroup = null;
  let highestSimilarity = 0;
  const threshold = 0.8;

  const rightNewsEmbeddings = await Promise.all(
    rightNews.map(({ title }) => getEmbedding(title)),
  );
  const leftNewsEmbeddings = await Promise.all(
    leftNews.map(({ title }) => getEmbedding(title)),
  );

  for (let i = 0; i < rightNewsEmbeddings.length; i++) {
    for (let j = 0; j < leftNewsEmbeddings.length; j++) {
      const similarity = cosineSimilarity(
        rightNewsEmbeddings[i],
        leftNewsEmbeddings[j],
      );

      if (similarity > threshold && similarity > highestSimilarity) {
        highestSimilarity = similarity;
        highestSimilarityGroup = {
          rightNews: {
            title: rightNews[i].title,
            link: rightNews[i].link,
            content: await fetchArticleContent(rightNews[i].link),
          },
          leftNews: {
            title: leftNews[j].title,
            link: leftNews[j].link,
            content: await fetchArticleContent(leftNews[j].link),
          },
          similarity,
        };
      }
    }
  }

  return highestSimilarityGroup ? [highestSimilarityGroup] : [];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const similarStories = await findSimilarStoriesCore();
    res.status(200).json({ success: true, similarStories });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export default handler;
