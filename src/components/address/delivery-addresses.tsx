import { useAddressQuery } from '@framework/address/address';
import AddressGrid from '@components/address/address-grid';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import { useTranslation } from 'next-i18next';

const DeliveryAddresses: React.FC = () => {
  const { t } = useTranslation('common');
  let { data, isLoading } = useAddressQuery();
  const { closeModal } = useModalAction();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-[820px] text-brand-light p-10 border border-border-base rounded-md relative">
      <CloseButton onClick={closeModal} />
      <div className="w-full">
        <Heading variant="title" className="mb-8 -mt-1.5">
          {t('text-delivery-address')}
        </Heading>
        <AddressGrid address={data?.data} />
      </div>
    </div>
  );
};

export default DeliveryAddresses;
