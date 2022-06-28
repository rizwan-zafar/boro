import StripePaymentForm from '@components/common/form/stripe-inline-form';
import { useCart } from '@contexts/cart/cart.context';
import { useTranslation } from 'next-i18next';
import React from 'react';

const StripeCheckoutInlineForm = () => {
  const { t } = useTranslation();
  const { total } = useCart();
  return (
    <StripePaymentForm item={{ price: total, buttonText: t('text-pay-now') }} />
  );
};

export default StripeCheckoutInlineForm;
