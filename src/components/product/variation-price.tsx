import usePrice from '@framework/product/use-price';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';

export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
}: any) {
  const { t } = useTranslation('common');
  const { price, basePrice, discount } = usePrice(
    selectedVariation && {
      amount: selectedVariation.sale_price
        ? selectedVariation.sale_price
        : selectedVariation.price,
      baseAmount: selectedVariation.price,
      currencyCode: 'USD',
    }
  );
  const { price: min_price } = usePrice({
    amount: minPrice,
    currencyCode: 'USD',
  });
  const { price: max_price } = usePrice({
    amount: maxPrice,
    currencyCode: 'USD',
  });
  return (
    <div className="flex items-center mt-5">
      <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
        {!isEmpty(selectedVariation)
          ? `${price}`
          : `${min_price} - ${max_price}`}
      </div>
      {discount && (
        <>
          <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark">
            {basePrice}
          </del>
          <span className="inline-block rounded font-bold text-xs md:text-sm text-brand-tree bg-opacity-20 bg-brand-tree uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
            {discount} {t('text-off')}
          </span>
        </>
      )}
    </div>
  );
}
