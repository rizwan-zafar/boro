import { Fragment } from 'react';
import ProductCard from '@components/product/product-cards/product-card';
import type { FC } from 'react';
import { useProductsQuery } from '@framework/product/get-all-products';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import SectionHeader from '@components/common/section-header';
import { useModalAction } from '@components/common/modal/modal.context';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';
interface ProductFeedProps {
  className?: string;
}
const RefinedAllProductFeed: FC<ProductFeedProps> = ({ className = '' }) => {
  const { t } = useTranslation('common');

  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: LIMITS.REFINED_PRODUCTS_LIMITS, ...query });

  const { openModal } = useModalAction();

  function handleCategoryPopup() {
    openModal('CATEGORY_VIEW');
  }

  return (
    <div className={cn(className)}>
      <div className="xl:hidden flex items-center justify-between pb-0.5 mb-4 lg:mb-5 xl:mb-6">
        <SectionHeader sectionHeading="All Products" className="mb-0" />
        <div
          className="transition-all text-brand -mt-1.5 font-semibold text-sm md:text-15px hover:text-brand-dark"
          role="button"
          onClick={handleCategoryPopup}
        >
          {t('text-categories')}
        </div>
      </div>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 md:gap-4 2xl:gap-5">
          {isLoading && !data?.pages?.length ? (
            Array.from({ length: LIMITS.REFINED_PRODUCTS_LIMITS }).map(
              (_, idx) => (
                <ProductCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              )
            )
          ) : (
            <>
              {data?.pages?.map((page: any, index) => {
                return (
                  <Fragment key={index}>
                    {page?.data
                      ?.slice(0, LIMITS.REFINED_PRODUCTS_LIMITS)
                      ?.map((product: Product) => (
                        <ProductCard
                          key={`product--key${product.id}`}
                          product={product}
                        />
                      ))}
                  </Fragment>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RefinedAllProductFeed;
