import { NextApiRequest, NextApiResponse } from 'next';
import { parseStringPromise } from 'xml2js';
import OpenAI from 'openai';
import { JSDOM } from 'jsdom';

const sources = {
  foxnews: ['https://feeds.foxnews.com/foxnews/latest'],
  msnbc: ['https://www.msnbc.com/feeds/latest'],
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pullLatestHeadlines = async () => {
  const headlines = { foxnews: [], msnbc: [] };
  const fetchAndParseXML = async (url: string, side: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch from ${url}, status: ${response.status}`,
        );
      }

      const data = await response.text();
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

  await fetchAllHeadlines(sources.foxnews, 'foxnews');
  await fetchAllHeadlines(sources.msnbc, 'msnbc');

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

const fetchArticleContent = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch from ${url}, status: ${response.status}`,
      );
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const content = dom.window.document.querySelector('article')?.textContent;
    return content || null;
  } catch (error) {
    console.error(`Error fetching article content from ${url}:`, error.message);
    return null;
  }
};

export const findSimilarStoriesCore = async () => {
  const headlines = await pullLatestHeadlines();
  console.log('headlines ', headlines);
  const { foxnews, msnbc } = headlines;
  const groups = [];
  let highestSimilarityGroup = null;
  let highestSimilarity = 0;
  const threshold = 0.8;

  const foxnewsEmbeddings = await Promise.all(
    foxnews.map(({ title }) => getEmbedding(title)),
  );
  const msnbcEmbeddings = await Promise.all(
    msnbc.map(({ title }) => getEmbedding(title)),
  );

  for (let i = 0; i < foxnewsEmbeddings.length; i++) {
    for (let j = 0; j < msnbcEmbeddings.length; j++) {
      const similarity = cosineSimilarity(
        foxnewsEmbeddings[i],
        msnbcEmbeddings[j],
      );
      if (similarity > threshold) {
        const foxnewsContent = await fetchArticleContent(foxnews[i].link);
        const msnbcContent = await fetchArticleContent(msnbc[j].link);

        const group = {
          foxnews: {
            title: foxnews[i].title,
            link: foxnews[i].link,
            content: foxnewsContent,
          },
          msnbc: {
            title: msnbc[j].title,
            link: msnbc[j].link,
            content: msnbcContent,
          },
          similarity,
        };
        groups.push(group);

        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          highestSimilarityGroup = group;
        }
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
