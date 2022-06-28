import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { FaChevronDown } from 'react-icons/fa';
import LocationIcon from '@components/icons/location-icon';
import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';

interface DeliveryProps {
  className?: string;
}
const Delivery: React.FC<DeliveryProps> = ({ className }) => {
  const { t } = useTranslation('common');
  const { isAuthorized } = useUI();
  const { openModal } = useModalAction();
  function handleDeliveryView() {
    !isAuthorized ? openModal('LOGIN_VIEW') : openModal('DELIVERY_VIEW');
  }

  return (
    <div className={cn('delivery-address', className)}>
      <button
        className="inline-flex items-center text-15px text-brand-dark tracking-[0.1px]"
        onClick={handleDeliveryView}
      >
        <LocationIcon />
        <span className="ltr:pl-1.5 lg:rtl:pr-1.5 text-white">{t('text-delivery')}:</span>
        <span className="font-semibold text-white relative top-[1px] ltr:pl-1 rtl:pr-1">
          {!isAuthorized ? t('text-address') : t('text-home-address')}
        </span>
        <span className="ltr:pl-1.5 lg:rtl:pr-1.5">
          <FaChevronDown className="text-xs text-white text-opacity-90" />
        </span>
      </button>
    </div>
  );
};

export default Delivery;
