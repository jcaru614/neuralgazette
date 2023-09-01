export const unbiasedNewsArticlePrompt = (article: any) => {
  return `
  Please read this article and await further instructions:

  "${article}"
  
  Instructions:
  I want you to write an unbiased article based solely on the content of the provided article. Your article should aim to present a balanced view of the subject, offering readers a comprehensive understanding of the situation and enabling them to form their own opinions.
  
  Avoid taking a stance against or in favor of any element in the original article. The goal is to maintain a neutral tone and convey only factual information.

  Make sure to not copy the article and truely make it unique and free of copy. 
  
  The article you write should not exceed 2,500 characters in length.
  
  Return only the unbiased article without any additional text or preamble.
`;
};
