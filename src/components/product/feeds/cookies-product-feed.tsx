import { useCookiesProductsQuery } from '@framework/product/get-all-cookies-products';
import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';

export default function CookiesProductFeed() {
  const { data, isLoading, error } = useCookiesProductsQuery({
    limit: LIMITS.COOKIES_PRODUCTS_LIMITS,
  });
  return (
    <ProductsCarousel
      sectionHeading="text-cookies-cakes"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.COOKIES_PRODUCTS_LIMITS}
      uniqueKey="cookies-cakes"
    />
  );
}
