import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import PlusIcon from '@components/icons/plus-icon';
import { useCart } from '@contexts/cart/cart.context';
// import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { t } = useTranslation('common');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        <PlusIcon width={iconSize} height={iconSize} opacity="1" />
      </button>
    );
  }
  return <AddToCart data={data} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const { name, image, unit, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'USD',
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: 'USD',
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: 'USD',
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      onClick={handlePopupView}
      title={name}
    >
      <div className="relative shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || 'Product Image'}
            width={230}
            height={200}
            quality={100}
            className="object-cover bg-fill-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('text-on-sale')}
            </span>
          )}
          <div className="block product-count-button-position">
            <RenderPopupOrAddToCart data={product} />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <div className="mb-1 lg:mb-1.5 -mx-1">
          <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="mx-1 text-sm text-brand-dark text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
        <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
          {name}
        </h2>
        <div className="mt-auto text-13px sm:text-sm">{unit}</div>
      </div>
    </article>
  );
};

export default ProductCard;
