import cheerio from 'cheerio';

const cleanUpContent = (html: string): string => {
  const $ = cheerio.load(html);
  // Remove unwanted tags like scripts, styles, iframes, noscripts, and ads
  $(
    'script, style, iframe, noscript, [class*="ad"], .newsletter, .promo',
  ).remove();

  // Extract the main content, focusing on common article containers
  let content = $('article, .article-body, .post-content, .story-body').text();

  // Replace common artifacts in content
  content = content
    .replace(/\\n/g, ' ') // Replace escaped newlines with a space
    .replace(/\\t/g, ' ') // Replace escaped tabs with a space
    .replace(/\\"/g, '"') // Replace escaped double quotes with actual quotes
    .replace(/\\'/g, "'") // Replace escaped single quotes with actual single quotes
    .replace(/\\/g, '') // Remove any remaining backslashes
    .replace(/\s\s+/g, ' ') // Replace multiple spaces with a single space
    .replace(/^\s+|\s+$/g, '') // Trim leading and trailing whitespace
    .replace(/(\s+")/g, '"') // Correct misplaced quotation marks
    .replace(/"\s+/g, '"'); // Correct misplaced quotation marks

  return content;
};

export default cleanUpContent;
