import WishlistProductCard from '@components/product/wishlist-product-card';
import type { FC } from 'react';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';
interface ProductWishlistProps {
  element?: any;
  className?: string;
}
const ProductWishlistGrid: FC<ProductWishlistProps> = ({
  element,
  className = '',
}) => {
  const limit = 35;
  const { data, isLoading, error } = useWishlistProductsQuery({
    limit: limit,
  });
  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="flex flex-col">
          {isLoading && !data?.length
            ? Array.from({ length: 35 }).map((_, idx) => (
                <ProductCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              ))
            : data?.map((product: any) => (
                <WishlistProductCard
                  key={`product--key${product.id}`}
                  product={product}
                />
              ))}
        </div>
      )}
    </div>
  );
};
export default ProductWishlistGrid;
