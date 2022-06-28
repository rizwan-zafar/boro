import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/router';
import ShopSidebar from '@components/shops/shop-sidebar';
import { useTranslation } from 'react-i18next';

interface Props {
  data: any;
}

const ShopSidebarDrawer: React.FC<Props> = ({ data }) => {
  const { closeShop } = useUI();
  const { t } = useTranslation('common');
  const router = useRouter();
  const dir = getDirection(router.locale);
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full border-b border-border-base flex justify-between items-center relative ltr:pr-5 rtl:pl-5 md:ltr:pr-7 md:rtl:pl-7 shrink-0 py-0.5">
        <button
          className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity text-brand-dark md:px-5 lg:py-8 focus:outline-none hover:opacity-60"
          onClick={closeShop}
          aria-label="close"
        >
          {dir === 'rtl' ? (
            <IoArrowForward className="text-black" />
          ) : (
            <IoArrowBack className="text-black" />
          )}
        </button>
        <h2 className="w-full m-0 text-xl font-bold text-center md:text-2xl text-brand-dark ltr:pr-6 rtl:pl-6">
          {t('text-details')}
        </h2>
      </div>

      <Scrollbar className="flex-grow mb-auto shop-sidebar-scrollbar">
        <ShopSidebar data={data} />
      </Scrollbar>
    </div>
  );
};

export default ShopSidebarDrawer;
