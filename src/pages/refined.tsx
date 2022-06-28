import Layout from '@components/layout/layout-six';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { refinedSixHeroBanner as heroBanner } from '@framework/static/banner';
import { Element } from 'react-scroll';
import { GetStaticProps } from 'next';
import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchProducts } from '@framework/product/get-all-products';
import { fetchCategories } from '@framework/category/get-all-categories';
import { LIMITS } from '@framework/utils/limits';
import RefinedSidebar from '@components/common/refined-sidebar';
import DownloadAppsTwo from '@components/common/download-apps-two';
import RefinedAllProductFeed from '@components/product/feeds/refined-all-products-feed';
import HeroCarouselBlock from '@components/hero/hero-carousel-block';

export default function Home() {
  return (
    <>
      <Seo
        title="Refined"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="refined"
      />

      <Container>
        <HeroCarouselBlock heroBanner={heroBanner} />
        <Element name="grid" className="flex flex-col mb-16 md:flex-row">
          <CategoryDropdownSidebar className="shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-10 xl:rtl:pl-10 hidden xl:block w-[350px] 2xl:w-96 lg:sticky lg:top-20" />
          <RefinedAllProductFeed className="w-full xl:ltr:-ml-3 xl:rtl:-mr-3 3xl:ltr:-ml-1 3xl:rtl:-mr-1 3xl:ltr:pr-2 3xl:rtl:pl-2" />
          <RefinedSidebar className="w-full md:w-[300px] lg:w-[350px] mt-10 md:mt-0 md:sticky md:top-16 lg:top-20" />
        </Element>
      </Container>
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
