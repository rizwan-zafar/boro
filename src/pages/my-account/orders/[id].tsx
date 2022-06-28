import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import OrderDetails from '@components/order/order-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

export default function OrderPage() {
  return (
    <AccountLayout>
      <OrderDetails className="p-0" />
    </AccountLayout>
  );
}

OrderPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
