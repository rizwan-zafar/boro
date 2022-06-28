import { useAddressQuery } from '@framework/address/address';
import AddressGrid from '@components/address/address-grid';

const AddressPage: React.FC = () => {
  let { data, isLoading } = useAddressQuery();
  return !isLoading ? (
    <AddressGrid address={data?.data} />
  ) : (
    <div>Loading...</div>
  );
};

export default AddressPage;
