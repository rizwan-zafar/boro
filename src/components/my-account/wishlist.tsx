import Layout from '@components/layout/layout';

import ProductWishlistGrid from '@components/product/wishlist-product';

export default function Wishlist() {
  return (
    <div className="flex flex-col pt-8 2xl:pt-12">
      <ProductWishlistGrid />
    </div>
  );
}

Wishlist.Layout = Layout;
