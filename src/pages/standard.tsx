import BannerGrid from '@components/common/banner-grid';
import Layout from '@components/layout/layout-two';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import CategoryGridListBlock from '@components/common/category-grid-list-block';
import BundleGrid from '@components/bundle/bundle-grid';
import { bannerGridThree as banners } from '@framework/static/banner';
import { homeThreeHeroBanner as heroBanner } from '@framework/static/banner';
import CollectionGrid from '@components/common/collection-grid';
import HeroBannerCard from '@components/hero/hero-banner-card';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import { bundleDataTwo as bundle } from '@framework/static/bundle';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchBestSellerGroceryProducts } from '@framework/product/get-all-best-seller-grocery-products';
import { fetchPopularProducts } from '@framework/product/get-all-popular-products';
import { LIMITS } from '@framework/utils/limits';

export default function Home() {
  return (
    <>
      <Seo
        title="Standard"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="standard"
      />
      <HeroBannerCard
        banner={heroBanner}
        className="min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[550px] 2xl:min-h-[650px] py-20 py:pt-24 mb-5"
      />
      <Container>
        <BundleGrid
          data={bundle}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
        />
        <CategoryGridListBlock />
        <BestSellerGroceryProductFeed />
        <BannerGrid
          data={banners}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
        />
        <PopularProductFeed />
      </Container>
      <CollectionGrid
        headingPosition="center"
        className="mb-12 pb-1 lg:pb-0 lg:mb-14 xl:mb-16 2xl:pt-4"
      />
      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS,
      { limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS },
    ],
    fetchBestSellerGroceryProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.POPULAR_PRODUCTS, { limit: LIMITS.POPULAR_PRODUCTS_LIMITS }],
    fetchPopularProducts
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
