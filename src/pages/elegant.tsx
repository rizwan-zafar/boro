import Layout from '@components/layout/layout-five';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadAppsTwo from '@components/common/download-apps-two';
import BundleGrid from '@components/bundle/bundle-grid-two';
import CollectionGrid from '@components/common/collection-grid';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import { bundleDataThree as bundle } from '@framework/static/bundle';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchBestSellerGroceryProducts } from '@framework/product/get-all-best-seller-grocery-products';
import { fetchPopularProducts } from '@framework/product/get-all-popular-products';
import { LIMITS } from '@framework/utils/limits';
import BannerGridTwo from '@components/common/banner-grid-two';
import BannerHeroGrid from '@components/common/banner-hero-grid';
import { bannersGridHero as bannersHero } from '@framework/static/banner';
import { elegantBannerGrid as banners } from '@framework/static/banner';
import FeatureCarousel from '@components/common/featured-carousel';
import PopularProductWithBestDeals from '@components/product/popular-product-with-best-deals';

export default function Home() {
  return (
    <>
      <Seo
        title="Elegant"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/elegant"
      />

      <Container>
        <BannerHeroGrid
          data={bannersHero}
          className="my-3 md:my-4 lg:mt-0 lg:mb-5 xl:mb-6"
        />
        <FeatureCarousel />
        <BestSellerGroceryProductFeed className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20" />
        <BundleGrid
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          data={bundle}
        />
        <PopularProductWithBestDeals />
        <BannerGridTwo
          data={banners}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          girdClassName="xl:gap-5 3xl:gap-7"
        />
      </Container>

      <CollectionGrid
        headingPosition="center"
        className="pb-1 lg:pb-0 mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
      />
      <DownloadAppsTwo />
    </>
  );
}

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
    [
      API_ENDPOINTS.POPULAR_PRODUCTS,
      { limit: LIMITS.POPULAR_PRODUCTS_TWO_LIMITS },
    ],
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
