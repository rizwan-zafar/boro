import Layout from '@components/layout/layout';
import PaymentBox from '@components/payment/payment-content';
import { usePaymentQuery } from '@framework/payment/payment';

export default function Payment() {
  let { data, isLoading } = usePaymentQuery();
  return (
    <div className="pt-4">
      {!isLoading ? <PaymentBox items={data} /> : <div>Loading...</div>}
    </div>
  );
}

Payment.Layout = Layout;
