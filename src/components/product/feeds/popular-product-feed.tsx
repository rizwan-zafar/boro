import type { FC } from 'react';
import { usePopularProductsQuery } from '@framework/product/get-all-popular-products';
import ProductsGridBlock from '@components/product/products-grid-block';
import { LIMITS } from '@framework/utils/limits';

interface ProductFeedProps {
  className?: string;
}

const PopularProductFeed: FC<ProductFeedProps> = ({ className }) => {
  const limit = LIMITS.POPULAR_PRODUCTS_LIMITS;
  const { data, isLoading, error } = usePopularProductsQuery({
    limit: limit,
  });
  return (
    <ProductsGridBlock
      sectionHeading="text-popular-product"
      sectionSubHeading="text-fresh-grocery-items"
      className={className}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={limit}
      uniqueKey="popular-product"
    />
  );
};

export default PopularProductFeed;
