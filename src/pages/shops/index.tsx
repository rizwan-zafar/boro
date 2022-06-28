import Layout from '@components/layout/layout';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ShopsPageContent from '@components/shops/shops-page-content';
import DownloadApps from '@components/common/download-apps';
import PageHeroSection from '@components/ui/page-hero-section';
import Seo from '@components/seo/seo';
import { fetchShops } from '@framework/shop/get-shops';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

export default function ShopsPage() {
  return (
    <>
      <Seo
        title="Shops"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="shops"
      />
      <PageHeroSection
        heroTitle="text-shop-page"
        backgroundThumbnail="/assets/images/about-us/6.jpg"
        mobileBackgroundThumbnail="/assets/images/about-us/6.jpg"
        variant="white"
      />
      <ShopsPageContent />
      <DownloadApps />
    </>
  );
}

ShopsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.SHOPS, { limit: 6 }],
    fetchShops
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
