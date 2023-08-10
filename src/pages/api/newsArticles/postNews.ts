import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { fetchFromAI, fetchLatestHeadlines, fetchLinkData } from '../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { articles: latesHeadlinesLeft } = await fetchLatestHeadlines(
      // 'the-washington-times',
      'cnn',
    );
    const { articles: latesHeadlinesRight } = await fetchLatestHeadlines(
      // 'the-washington-post',
      'fox-news',
    );
    const titlesOnlyLeft = latesHeadlinesLeft
      .map((item: any) => item.title)
      .join('\n');
    const titlesOnlyRight = latesHeadlinesRight
      .map((item: any) => item.title)
      .join('\n');

    const matchingTitleIndexPrompt = `
    Please analyze the titles at the end of this prompt from both a left-leaning and a right-leaning news organization. Your goal is to find a pair of titles that are about the exact same subject. 
    
    Your task:
    1. Retrieve and return the index of each matching title in their respective arrays at the very beginning of the response as such: leftIndex[index], rightIndex[index].
    2. Provide both matching titles.
    3. Offer a brief explanation of why these titles are about the same topic, despite potential differences in perspective.
    
    Keep in mind that left-leaning and right-leaning news organizations may present different viewpoints on the same topic. Your aim is to identify underlying similarities or common themes in the titles.
    
    You have access to the provided arrays of articles from left-leaning and right-leaning news sources.
    
    Once you find a matching pair of titles, return the following:
    - Left-Leaning News Index: leftIndex[index]
    - Right-Leaning News Index: rightIndex[index]
    - The matching title from the left-leaning news
    - The matching title from the right-leaning news
    - A brief explanation of why these titles are about the same topic.
    
    If no matches are found, return "false" to indicate that there are no titles with the same topic between the two sources.
    Do not return a match of the same duplicate article from either side; wait until you reach the second array of titles to find the match.
    
    Left Leaning News Titles:
    ${titlesOnlyLeft}
    
    Right Leaning News Titles:
    ${titlesOnlyRight}
    `;

    console.log(matchingTitleIndexPrompt);

    console.log('prompt', matchingTitleIndexPrompt);
    const response = await fetchFromAI(matchingTitleIndexPrompt);

    console.log('AI RESPONSE', response);
    const leftIndex = parseInt(
      response.message.match(/Left-Leaning News Index: (\d+)/)[1],
    );
    const rightIndex = parseInt(
      response.message.match(/Right-Leaning News Index: (\d+)/)[1],
    );

    console.log('Left-Leaning News Index:', leftIndex);
    console.log('Right-Leaning News Index:', rightIndex);

    const matchingLeftArticle = latesHeadlinesLeft[leftIndex];
    const matchingRightArticle = latesHeadlinesRight[rightIndex];

    console.log('Matching Title from Left-Leaning News:', matchingLeftArticle);
    console.log(
      'Matching Title from Right-Leaning News:',
      matchingRightArticle,
    );

    

    // const summaryPrompt = `
    //     AI, I want you to create an unbiased news summary based on this article provided here: ${article}. Return only a single summary between 50 to 200 words as your response`;
    // const headlinePrompt = `
    //     AI, I want you to create an unbiased news headline based on this article provided here: ${article}. Return only a single headline between 10 to 100 words as your response`;
    // const titlePrompt = `
    //     AI, I want you to create an unbiased news title based on this article provided here: ${article}. Return only a single title between 5 to 25 words as your response`;

    // const { message: summary } = await fetchFromAI(summaryPrompt);
    // console.log('***** AI Generated headline: *****', summary, '******');
    // const { message: headline } = await fetchFromAI(headlinePrompt);
    // console.log('***** AI Generated summary: *****', headline, '******');
    // const { message: title } = await fetchFromAI(titlePrompt);
    // console.log('***** AI Generated title: *****', title, '******');

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
