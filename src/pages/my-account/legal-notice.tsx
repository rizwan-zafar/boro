import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Legal from '@components/my-account/notice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';

export default function LegalNotice() {
  return (
    <>
      <Seo
        title="Legal Notice"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="legal-notice"
      />
      <AccountLayout>
        <Legal />
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
        'legal',
        'footer',
      ])),
    },
  };
};
