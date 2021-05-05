const title =
  'JaysLibrary';
const description = 'JaysLibrary is the collection of books';

const SEO = {
  title,
  description,
  canonical: 'https://JaysLibrary.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://JaysLibrary.vercel.app/',
    title,
    description,
    images: [
      {
        url: 'https://JaysLibrary.vercel.app/og.png',
        alt: title,
        width: 500,
        height: 500
      }
    ]
  }
};

export default SEO;