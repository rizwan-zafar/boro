import { Drawer } from '@components/common/drawer/drawer';
import FilterIcon from '@components/icons/filter-icon';
import Text from '@components/ui/text';
import { useUI } from '@contexts/ui.context';
import FilterSidebar from '@components/search/filter-sidebar';
import ListBox from '@components/ui/filter-list-box';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getDirection } from '@utils/get-direction';

const SearchTopBar = () => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        className="flex items-center px-4 py-2 text-sm font-semibold transition duration-200 ease-in-out border rounded-md lg:hidden text-brand-dark border-border-base focus:outline-none hover:border-brand hover:text-brand"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ltr:pl-2.5 rtl:pr-2.5">{t('text-filters')}</span>
      </button>
      <div className="flex items-center justify-end w-full lg:justify-between">
        <div className="shrink-0 text-brand-dark font-medium text-15px leading-4 md:ltr:mr-6 md:rtl:ml-6 hidden lg:block mt-0.5">
          2,683 {t('text-items-found')}
        </div>
        <ListBox
          options={[
            { name: 'text-lowest-price', value: 'lowest' },
            { name: 'text-highest-price', value: 'highest' },
            { name: 'text-new-arrival', value: 'new-arrival' },
            { name: 'text-most-order', value: 'most-order' },
          ]}
        />
      </div>
      <Drawer
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displayFilter}
        onClose={closeFilter}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
};

export default SearchTopBar;
