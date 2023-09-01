export * from './unbiasedNewsArticlePrompt';

export const titlePrompt = (articleMessage: any) => `
AI, I want you to create an unbiased news title based on this article provided here: ${articleMessage}. Return only a single title with out quotes with no more than 120 characters your response`;
export const headlinePrompt = (articleMessage: any) => `
AI, I want you to create an unbiased news headline based on this article provided here: ${articleMessage}. Return only a single headline with out quotes with no more than 150 characters your response`;
export const summaryPrompt = (articleMessage: any) => `
AI, I want you to create an unbiased news summary based on this article provided here: ${articleMessage}. Return only a single summary with out quotes with no more than 450 characters your response`;

export const categoryPrompt = (articleMessage: any) => `
Read this article and await instructions: "${articleMessage}"

Instructions: Based on the article you just read, choose one and only one category from the list below. Do not use any other category names.

Categories:
1. POLITICS
2. SPORTS
3. TECHNOLOGY
4. ENTERTAINMENT
5. HEALTH
6. SCIENCE
7. BUSINESS
8. WORLD
9. ECONOMY
10. LIFESTYLE

In your response, provide the name of your chosen category exactly as it appears in the list above. Do not include any additional text or explanations.

Example response: POLITICS

Remember, you can only choose from the categories listed above.
`;
