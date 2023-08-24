interface News {
    id: string;
    title: string;
    headline: string;
    summary: string;
    article: string;
    image: string | null;
    originalBias: string;
  }
  
  export function createAlternatingNewsArray(initialNews: News[]): News[] {
    const leftAlignedNews = initialNews.filter(
      (news) => news.originalBias === 'LEFT'
    );
    const rightAlignedNews = initialNews.filter(
      (news) => news.originalBias === 'RIGHT'
    );
    const alternatingNews = [];
  
    while (leftAlignedNews.length > 0 || rightAlignedNews.length > 0) {
      if (leftAlignedNews.length > 0) {
        alternatingNews.push(leftAlignedNews.shift()!);
      }
      if (rightAlignedNews.length > 0) {
        alternatingNews.push(rightAlignedNews.shift()!);
      }
    }
  
    return alternatingNews;
  }
  