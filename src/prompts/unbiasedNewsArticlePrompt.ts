export const unbiasedNewsArticlePrompt = (article: any) => {
  return `
    Read this article and await instructions: "${article}"

    Instructions: I want you to write an unbiased article based on the article you just read.
    
    Your article should aim to present a balanced view of the subject, providing readers with a comprehensive understanding of the situation and allowing them to form their own opinions.

    The length of the article should be no more then 2500 characters.

    Return only the unbiased article do not prefix anything to it.

`;
};
