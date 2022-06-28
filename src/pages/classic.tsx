import CollectionGrid from '@components/common/collection-grid';
import Seo from '@components/seo/seo';
import FeatureGrid from '@components/common/featured-grid';
import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';
import FreshVegetablesProductFeed from '@components/product/feeds/fresh-vegetables-product-feed';
import CookiesProductFeed from '@components/product/feeds/cookies-product-feed';
import PopcornJerkyProductFeed from '@components/product/feeds/popcorn-jerky-product-feed';
import ChipsProductFeed from '@components/product/feeds/chips-product-feed';
import BannerGridTwo from '@components/common/banner-grid-two';
import { bannerGridTwo as banners } from '@framework/static/banner';
import { GetStaticProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchBestSellerProducts } from '@framework/product/get-all-best-seller-products';
import { fetchFreshVegetablesProducts } from '@framework/product/get-all-fresh-vegetables-products';
import { fetchChipsProducts } from '@framework/product/get-all-chips-products';
import { fetchCookiesProducts } from '@framework/product/get-all-cookies-products';
import { fetchPopcornJerkyProducts } from '@framework/product/get-all-popcorn-jerky-products';
import { LIMITS } from '@framework/utils/limits';

export default function Home() {
  return (
    <>
      <Seo
        title="Classic"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="classic"
      />
      <Container>
        <BannerGridTwo
          data={banners}
          className="my-3 md:my-4 lg:mt-0 lg:mb-5 xl:mb-6"
        />
        <FeatureGrid />
      </Container>
      <BestSellerProductFeed />
      <FreshVegetablesProductFeed />
      <ChipsProductFeed />
      <CollectionGrid className="mb-12 lg:mb-14 xl:mb-16" />
      <CookiesProductFeed />
      <PopcornJerkyProductFeed />
      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.BEST_SELLER_PRODUCTS,
      { limit: LIMITS.BEST_SELLER_PRODUCTS_LIMITS },
    ],
    fetchBestSellerProducts
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.FRESH_VEGETABLES_PRODUCTS,
      { limit: LIMITS.FRESH_VEGETABLES_PRODUCTS_LIMITS },
    ],
    fetchFreshVegetablesProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CHIPS_PRODUCTS, { limit: LIMITS.CHIPS_PRODUCTS_LIMITS }],
    fetchChipsProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.COOKIES_PRODUCTS, { limit: LIMITS.COOKIES_PRODUCTS_LIMITS }],
    fetchCookiesProducts
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.POPCORN_JERKY_PRODUCTS,
      { limit: LIMITS.POPCORN_JERKY_PRODUCTS_LIMITS },
    ],
    fetchPopcornJerkyProducts
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
