import { NextSeo } from 'next-seo';

const SEO = ({title, description, url}) => (
    <NextSeo
      title={title}
      description={description}
      // canonical="https://www.canonical.ie/"
      openGraph={{
        url: {url},
        title: {title},
        description: {description},
        locale: 'en_EN',
        images: [
          {
            url: '/og.webp',
            width: 800,
            height: 600,
            alt: 'Jays Library',
          }
        ],
        site_name: 'https://jayslibrary.netlify.app/',
      }}
      twitter={{
        handle: '@JayMGurav',
        site: 'https://jayslibrary.netlify.app/',
        cardType: 'summary',
      }}
    />
);

export default SEO;
