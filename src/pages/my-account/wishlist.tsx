import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Wishlist from '@components/my-account/wishlist';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';

export default function LegalNotice() {
  const { t } = useTranslation();
  return (
    <>
      <Seo
        title="Wishlist"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/wishlist"
      />
      <AccountLayout>
        <h2 className="text-base md:text-lg xl:text-[20px] font-semibold text-brand-dark  lg:pt-0">
          {t('common:text-account-wishlist')}
        </h2>
        <Wishlist />
      </AccountLayout>
    </>
  );
}

LegalNotice.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
