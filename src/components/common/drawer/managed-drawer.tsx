import dynamic from 'next/dynamic';
import { useUI } from '@contexts/ui.context';
import { Drawer } from '@components/common/drawer/drawer';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
const Cart = dynamic(() => import('@components/cart/cart'));
const OrderDetails = dynamic(() => import('@components/order/order-drawer'));

const ManagedDrawer = () => {
  const { displayDrawer, closeDrawer, drawerView } = useUI();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { right: 0 } : { left: 0 };

  return (
    <Drawer
      open={displayDrawer}
      placement={dir === 'rtl' ? 'left' : 'right'}
      onClose={closeDrawer}
      handler={false}
      showMask={true}
      level={null}
      contentWrapperStyle={contentWrapperCSS}
    >
      {drawerView === 'CART_SIDEBAR' && <Cart />}
      {drawerView === 'ORDER_DETAILS' && <OrderDetails />}
    </Drawer>
  );
};

export default ManagedDrawer;
