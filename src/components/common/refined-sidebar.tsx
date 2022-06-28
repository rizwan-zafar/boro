import cn from 'classnames';
import BannerCard from '@components/cards/banner-card';
import ProductFlashSellCard from '@components/product/product-cards/product-flash-sell-card';
import { homeRefinedBanner as banner } from '@framework/static/banner';
import { useFlashSellProductsQuery } from '@framework/product/get-all-flash-sell-products';
import { LIMITS } from '@framework/utils/limits';
import { useTranslation } from 'next-i18next';
interface Props {
  className?: string;
}

const RefinedSidebar: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation('common');
  const limit = LIMITS.POPULAR_PRODUCTS_TWO_LIMITS;
  const { data, isLoading, error } = useFlashSellProductsQuery({
    limit: limit,
  });
  return (
    <div
      className={cn(
        'h-full w-full xl:w-[350px] 2xl:w-96 shrink-0 md:ltr:pl-5 md:rtl:pr-5 lg:ltr:pl-6 lg:rtl:pr-6 xl:ltr:pl-7 xl:rtl:pr-7 space-y-6 lg:space-y-8',
        className
      )}
    >
      <div className="h-auto overflow-hidden border-2 border-yellow-200 rounded-md 3xl:h-full shadow-card">
        <h2 className="bg-yellow-200 text-center font-bold text-brand-dark font-manrope p-2.5 text-15px lg:text-base">
          {t('text-deals-of-the-week')}
        </h2>
        <ProductFlashSellCard
          product={data?.[0]!}
          date={Date.now() + 4000000 * 60}
        />
      </div>

      <BannerCard banner={banner} className="hidden md:flex" />
    </div>
  );
};

export default RefinedSidebar;
