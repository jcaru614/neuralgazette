export const titlePrompt = (articleMessage: string) => `
AI, I want you to create an unbiased news title based on this article provided here:

\`\`\`
${articleMessage}
\`\`\`

Return only a single title without quotation marks, asterisks or any thing else, I just want the title with no more than 120 characters in your response.
`;

export const headlinePrompt = (articleMessage: string) => `
AI, I want you to create an unbiased news headline based on this article provided here:

\`\`\`
${articleMessage}
\`\`\`

Return only a single headline without quotation marks, asterisks or any thing else, I just want the headline with no more than 150 characters in your response.
`;

export const summaryPrompt = (articleMessage: string) => `
AI, I want you to create an unbiased news summary based on this article provided here:

\`\`\`
${articleMessage}
\`\`\`

Return only a single summary without quotation marks, asterisks or any thing else, I just want the summary with no more than 450 characters in your response.
`;

export const categoryPrompt = (articleMessage: string) => `
Read this article and await instructions:

\`\`\`
${articleMessage}
\`\`\`

Instructions: Based on the article you just read, choose one and only one category from the list below. Do not use any other category names.

Categories:
1. POLITICS
2. WORLD
3. BUSINESS
4. ECONOMY
5. TECHNOLOGY
6. SCIENCE
7. HEALTH
8. LIFE

In your response, provide the name of your chosen category exactly as it appears in the list above. Do not include any additional text or explanations.

Example response: POLITICS

Remember, you can only choose from the categories listed above.
`;

export const combineArticlesPrompt = (
  article1Content: string,
  article2Content: string,
) => `
  AI, I want you to combine the two articles below into one coherent, unbiased article:

  Article 1:
  \`\`\`
  ${article1Content}
  \`\`\`

  Article 2:
  \`\`\`
  ${article2Content}
  \`\`\`

  Follow each of the steps below:
  1. Ensure neutrality by avoiding biased language towards any side, party, or individual, maintaining a centrist perspective.
  2. Refrain from criticizing or praising Republicans, Democrats, or any political figure, including Trump and Biden. If you cannot decide, then err on leaning towards the right and never lean towards the left.
  3. Do not advocate for left-wing ideologies like gun control, diversity and inclusion, or climate change as that is biased and may make us look like a liberal site.
  4. Your job is to be neutral and centrist, and if in doubt, lean slightly right-wing.
  5. Each paragraph should be clearly separated to ensure readability.
  6. **Important**: Place all quotes on a new line and ensure they are separated from other content with line breaks before and after the quote. Do not combine quotes with explanations or other text in the same line or paragraph.

  Please combine the articles into one that maintains neutrality and accuracy, and ensure the final output is ready for publication.
`;

