import BundleGrid from '@components/bundle/bundle-grid';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import { homeTwoHeroBanner as heroBanner } from '@framework/static/banner';
import { homeTwoBanner as banner } from '@framework/static/banner';
import BannerCard from '@components/cards/banner-card';
import HeroSliderBlock from '@components/hero/hero-slider-block';
import { Element } from 'react-scroll';
import { GetStaticProps } from 'next';
import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import { bundleDataTwo as bundle } from '@framework/static/bundle';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchProducts } from '@framework/product/get-all-products';
import { fetchCategories } from '@framework/category/get-all-categories';
import { LIMITS } from '@framework/utils/limits';

export default function Home() {
  return (
    <>
      <Seo
        title="Vintage"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="vintage"
      />
      <HeroSliderBlock
        heroBanner={heroBanner}
        contentClassName="pb-24 xl:pb-32 pt-16 xl:pt-24"
      />
      <Container>
        <BundleGrid data={bundle} />
        <Element name="grid" className="flex mb-16 pb-2.5">
          <CategoryDropdownSidebar className="shrink-0 ltr:pr-8 rtl:pl-8 hidden lg:block w-80 xl:w-[370px] lg:sticky lg:top-20" />
          <AllProductFeed
            className="w-full"
            element={<BannerCard banner={banner} className="py-5" />}
          />
        </Element>
      </Container>
      <DownloadApps />
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
    [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS }],
    fetchProducts
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
