import { useOrdersQuery } from '@framework/order/get-all-orders';
import OrderTable from '@components/order/order-table';

export default function OrderLists() {
  const { data, isLoading } = useOrdersQuery({});
  return !isLoading ? (
    <div className="w-full max-w-[1300px] mx-auto">
      <div className="flex flex-wrap">
        <div className="lg:w-[35%] w-full"></div>
        <div className="lg:w-[65%] w-full">
          <div className="p-4 md:px-12 md:py-8 border border-solid border-border-base rounded">
            <OrderTable orders={data?.data} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading....</div>
  );
}
