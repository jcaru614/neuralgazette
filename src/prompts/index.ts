export * from './unbiasedNewsArticlePrompt';

export const titlePrompt = (articleMessage: any) => `
AI, I want you to create an unbiased news title based on this article provided here: ${articleMessage}. Return only a single title with out quotes with no more than 120 characters your response`;
export const headlinePrompt = (articleMessage: any) => `
AI, I want you to create an unbiased news headline based on this article provided here: ${articleMessage}. Return only a single headline with out quotes with no more than 200 characters your response`;
export const summaryPrompt = (articleMessage: any) => `
AI, I want you to create an unbiased news summary based on this article provided here: ${articleMessage}. Return only a single summary with out quotes with no more than 500 characters your response`;
export const categoryPrompt = (articleMessage: any) => `
Read this article and await instructions: "${articleMessage}"

Instructions: Based on the article you just read choose only one of the provided categories POLITICS, SPORTS, TECHNOLOGY, ENTERTAINMENT, HEALTH, SCIENCE, BUSINESS, WORLD.

In your response provide only one category from the choices with no other text. Do NOT choose or make up any category that I have not provided to you.
`;

