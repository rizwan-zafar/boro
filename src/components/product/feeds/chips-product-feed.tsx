import { useChipsProductsQuery } from '@framework/product/get-all-chips-products';
import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';

export default function ChipsProductFeed() {
  const { data, isLoading, error } = useChipsProductsQuery({
    limit: LIMITS.CHIPS_PRODUCTS_LIMITS,
  });
  return (
    <ProductsCarousel
      sectionHeading="text-chips-collection"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.CHIPS_PRODUCTS_LIMITS}
      uniqueKey="chips-product"
    />
  );
}
