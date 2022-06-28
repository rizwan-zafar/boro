import { NextSeo, NextSeoProps } from 'next-seo';

interface SeoProps extends NextSeoProps {
  path: string;
}

const Seo = ({ title, description, path }: SeoProps) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${path}`,
        title,
        description,
        images: [
          {
            url: '/assets/images/og-image-01.png',
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
          },
          {
            url: '/assets/images/og-image-02.png',
            width: 900,
            height: 800,
            alt: 'Og Image Alt Second',
          },
        ],
      }}
    />
  );
};

export default Seo;
