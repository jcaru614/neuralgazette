import slugify from '@/utils/slugify';
import { format, parseISO } from 'date-fns';

function generateSiteMap(news) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://neuralgazette.com/</loc>
    <lastmod>2024-02-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://neuralgazette.com/about</loc>
    <lastmod>2024-02-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://neuralgazette.com/privacyPolicy</loc>
    <lastmod>2024-02-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://neuralgazette.com/termsAndConditions</loc>
    <lastmod>2024-02-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://neuralgazette.com/contactUs</loc>
    <lastmod>2024-02-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>

    <url>
    <loc>https://neuralgazette.com/category/politics</loc>
    <lastmod>2024-09-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://neuralgazette.com/category/world</loc>
    <lastmod>2024-09-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://neuralgazette.com/category/business_economy</loc>
    <lastmod>2024-09-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://neuralgazette.com/category/technology_science</loc>
    <lastmod>2024-09-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://neuralgazette.com/category/health_life</loc>
    <lastmod>2024-09-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
       ${news
         .map(({ id, title, updatedAt }) => {
           console.log('updated at ', updatedAt);
           const titleSlug = slugify(title);
           const articleUrl = `https://neuralgazette.com/article/${titleSlug}/${id}`;
           const parsedDate = parseISO(updatedAt);
           const formattedDate = format(parsedDate, 'yyyy-MM-dd');

           return `
         <url>
             <loc>${articleUrl}</loc>
             <lastmod>${formattedDate}</lastmod>
             <changefreq>weekly</changefreq>
             <priority>0.5</priority>
         </url>
       `;
         })
         .join('')}
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  try {
    const apiUrl = `${process.env.NEXT_PRIVATE_BASE_URL}/api/newsArticles/readNews`;
    console.log('Fetching news articles from:', apiUrl);
    const request = await fetch(apiUrl);
    const news = await request.json();
    console.log('News articles:', news);

    const sitemap = generateSiteMap(news);

    res.setHeader('Content-Type', 'text/xml');

    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return {
      props: {},
    };
  }
}

export default SiteMap;
