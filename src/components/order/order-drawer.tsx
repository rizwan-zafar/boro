import { OrderDetailsContent } from './order-details-content';
import { formatAddress } from '@utils/format-address';
import Heading from '@components/ui/heading';
import { IoClose } from 'react-icons/io5';
import OrderStatus from './order-status';
import { useTranslation } from 'next-i18next';
import {
  DiscountPrice,
  DeliveryFee,
  TotalPrice,
  SubTotalPrice,
} from '@components/order/price';

import { useUI } from '@contexts/ui.context';

const OrderDrawer: React.FC = () => {
  const { t } = useTranslation('common');
  const { data, closeDrawer } = useUI();
  let { shipping_address } = data;

  return (
    <>
      {data !== '' && (
        <>
          <div className="block">
            <div className="relative flex items-center justify-between w-full border-b ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 border-border-base">
              <Heading variant="titleMedium">
                {t('text-order-details')}:
              </Heading>
              <button
                className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-6 lg:py-7 focus:outline-none text-brand-dark hover:opacity-60"
                onClick={closeDrawer}
                aria-label="close"
              >
                <IoClose />
              </button>
            </div>
            <div className="p-5 md:p-8">
              <div className="text-[14px] opacity-70 mb-3 text-brand-dark">
                {t('text-delivery-address')}
              </div>
              <div className="rounded border border-solid min-h-[90px] bg-fill-base p-4 border-border-two text-[12px] md:text-[14px]">
                <p className="text-brand-dark opacity-70">
                  {formatAddress(shipping_address)}
                </p>
              </div>
              <OrderStatus status={data?.status?.serial} />
              <div className="grid grid-cols-12 bg-fill-base py-3 rounded-[3px] text-brand-dark/70 text-[12px] md:text-[14px]">
                <div className="col-span-2"></div>
                <div className="col-span-5">Items Name</div>
                <div className="col-span-3 text-center md:ltr:text-left md:rtl:text-right">
                  Quantity
                </div>
                <div className="col-span-2">Price</div>
              </div>
              {data?.products?.map((item: any, index: string) => (
                <OrderDetailsContent key={index} item={item} />
              ))}
              <div className="mt-3 ltr:text-right rtl:text-left">
                <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
                  <div className="pb-1 mb-2 border-b border-border-base ltr:pl-20 rtl:pr-20">
                    <p className="flex justify-between mb-1">
                      <span className="ltr:mr-8 rtl:ml-8">Sub total: </span>
                      <span className="font-medium">
                        <SubTotalPrice items={data?.products} />
                      </span>
                    </p>
                    {typeof data?.discount === 'number' && (
                      <p className="flex justify-between mb-2">
                        <span className="ltr:mr-8 rtl:ml-8">Discount: </span>
                        <span className="font-medium">
                          <DiscountPrice discount={data?.discount} />
                        </span>
                      </p>
                    )}
                    {typeof data?.delivery_fee === 'number' && (
                      <p className="flex justify-between mb-2">
                        <span className="ltr:mr-8 rtl:ml-8">Delivery Fee:</span>
                        <span className="font-medium">
                          <DeliveryFee delivery={data?.delivery_fee} />
                        </span>
                      </p>
                    )}
                  </div>
                  <p className="flex justify-between mb-2 ltr:pl-20 rtl:pr-20">
                    <span className="ltr:mr-8 rtl:ml-8">Total Cost:</span>
                    <span className="font-medium">
                      <TotalPrice items={data} />
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-12 ltr:text-right rtl:text-left">
                <span className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-black font-medium bg-white rounded border border-solid border-[#DEE5EA] ltr:mr-4 rtl:ml-4 hover:bg-[#F35C5C] hover:text-white hover:border-[#F35C5C] transition-all capitalize">
                  Report order
                </span>
                <span
                  onClick={closeDrawer}
                  className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-white font-medium bg-[#F35C5C] rounded border border-solid border-[#F35C5C]  hover:bg-white hover:text-black hover:border-[#DEE5EA] transition-all capitalize"
                >
                  Cancel order
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDrawer;
