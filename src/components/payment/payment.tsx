import { usePaymentQuery } from '@framework/payment/payment';
import PaymentBox from './payment-content';
import { useTranslation } from 'next-i18next';

const PaymentPage: React.FC = () => {
  const { t } = useTranslation('common');
  let { data, isLoading } = usePaymentQuery();
  return !isLoading ? (
    <div className="w-full max-w-[1300px] mx-auto">
      <div className="flex flex-wrap">
        <div className="lg:w-[35%] w-full"></div>
        <div className="lg:w-[65%] w-full">
          <div className="p-4 md:px-12 md:py-10 border border-solid border-border-base rounded">
            <h2 className="font-semibold text-xl text-brand-dark mb-4">
              {t('text-delivery-payment')}
            </h2>
            <PaymentBox items={data} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default PaymentPage;
