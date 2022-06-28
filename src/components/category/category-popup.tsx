import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import { useModalAction } from '@components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';

const CategoryPopup: React.FC = () => {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  return (
    <div className="relative flex flex-col w-full mx-auto overflow-hidden rounded-t bg-brand-light h-inherit">
      <CategoryDropdownSidebar className="w-full" />
      <div className="absolute bottom-0 w-full p-4 text-brand-light shadow-card shrink-0 bg-brand-light">
        <button
          onClick={closeModal}
          aria-label="Close Modal"
          className="w-full bg-fill-base tracking-[0.025em] rounded-md transition text-brand-dark duration-200 h-14 text-center font-semibold text-sm block hover:bg-brand hover:text-brand-light focus:outline-none"
        >
          {t('text-close')}
        </button>
      </div>
    </div>
  );
};

export default CategoryPopup;
