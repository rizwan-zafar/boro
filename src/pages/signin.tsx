import Layout from '@components/layout/layout';
import LoginForm from '@components/auth/login-form';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';

export default function SignInPage() {
  return (
    <>
      <Seo
        title="Sign In"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="signin"
      />
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-12 sm:py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <LoginForm
            isPopup={false}
            className="border rounded-lg border-border-base"
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

SignInPage.Layout = Layout;

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
