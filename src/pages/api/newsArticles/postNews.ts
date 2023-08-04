import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { fetchFromAI, fetchLatestHeadlines, fetchLinkData } from '../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const latesHeadlinesRight = await fetchLatestHeadlines('fox-news');
    const latesHeadlinesLeft = await fetchLatestHeadlines('cnn');
    console.log('headLines 111111', latesHeadlinesRight);
    console.log('headLines 222222', latesHeadlinesLeft);
    let articleLink = latesHeadlinesRight.articles[0].url;
    const articleBody = await fetchLinkData(articleLink);
    console.log('article body!!!!!!!!!!!!', articleBody);

    //     const articlePrompt = `
    //     AI, I want you to follow these instructions carefully to provide an unbiased news article response. First, find the most recent and trending matching news articles from each media company provided below.

    //     Media Companies: MSNBC, Fox News, Daily Wire, Vox.

    //     Next, use the information you can learn from those specific articles for each media company to craft a new unbiased and accurate news article.

    //     When composing your response, ensure you stay unbiased and refrain from mentioning or referencing the news media you learned from. Additionally, make sure the article is about one identical topic covered by the 4 news companies provided, not similar topics.

    //     The content must be free from any bias or favoritism towards any news source. Focus on combining the knowledge from each source and providing accurate and balanced information. The article must be between 350 and 1000 words and should only include the article text, without any additional elements like titles or references.

    //     Please ensure that your article contains relevant and coherent information, and it should be written in a clear and concise manner to convey the news effectively.

    //     At the end of the article leave a place to mention the initial articles you found and the name of each media company you used.
    // `;

    //     const { message: article } = await fetchFromAI(articlePrompt);
    //     console.log('***** Extracted article: *****', article, '******');

    //     const summaryPrompt = `
    //     AI, I want you to create an unbiased news summary based on this article provided here: ${article}. Return only a single summary between 50 to 200 words as your response`;
    //     const headlinePrompt = `
    //     AI, I want you to create an unbiased news headline based on this article provided here: ${article}. Return only a single headline between 10 to 100 words as your response`;
    //     const titlePrompt = `
    //     AI, I want you to create an unbiased news title based on this article provided here: ${article}. Return only a single title between 5 to 25 words as your response`;

    //     const { message: summary } = await fetchFromAI(summaryPrompt);
    //     console.log('***** Extracted headline: *****', summary, '******');
    //     const { message: headline } = await fetchFromAI(headlinePrompt);
    //     console.log('***** Extracted summary: *****', headline, '******');
    //     const { message: title } = await fetchFromAI(titlePrompt);
    //     console.log('***** Extracted title: *****', title, '******');

    //     await prisma.news.create({
    //       data: {
    //         title: removeHtmlTags(title),
    //         headline: removeHtmlTags(headline),
    //         summary: removeHtmlTags(summary),
    //         article: removeHtmlTags(article),
    //       },
    //     });

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
