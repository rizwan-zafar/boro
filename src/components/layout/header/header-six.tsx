import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import LanguageSwitcher from '@components/ui/language-switcher';
import { useModalAction } from '@components/common/modal/modal.context';
import cn from 'classnames';
import Search from '@components/common/search';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const Header: React.FC = () => {
  const { openSidebar, isAuthorized, displayMobileSearch } = useUI();
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-one w-full h-16 lg:h-20 z-30 sticky -top-0.5',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="z-20 w-full h-16 transition duration-200 ease-in-out border-b bg-brand-light innerSticky body-font text-brand-muted lg:h-20 border-border-base">
        <Search className="top-bar-search lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1" />
        {/* End of Mobile search */}
        <Container className="flex items-center justify-between w-full h-full lg:justify-center">
          <button
            aria-label="Menu"
            className="flex-col items-center justify-center hidden outline-none menuBtn ltr:mr-5 rtl:ml-5 lg:flex shrink-0 focus:outline-none"
            onClick={handleMobileMenu}
          >
            <MenuIcon />
          </button>
          <Logo className="-mt-1" />

          <Search
            searchId="top-bar-search"
            className="hidden lg:flex lg:max-w-[650px] 2xl:max-w-[700px] ltr:ml-7 rtl:mr-7 ltr:mr-4 rtl:ml-4 xl:ltr:ml-auto xl:rtl:mr-auto"
            variant="fill"
          />
          {/* End of search */}
          <div className="ltr:ml-auto rtl:mr-auto">
            <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
              <div className="xl:mx-3.5 mx-2.5">
                <LanguageSwitcher />
              </div>
              <CartButton className="hidden lg:flex xl:mx-3.5 mx-2.5" />
              <div className="items-center hidden lg:flex shrink-0 xl:mx-3.5 mx-2.5">
                <UserIcon className="text-brand-dark text-opacity-40" />
                <AuthMenu
                  isAuthorized={isAuthorized}
                  href={ROUTES.ACCOUNT}
                  btnProps={{
                    children: t('text-sign-in'),
                    onClick: handleLogin,
                  }}
                >
                  {t('text-account')}
                </AuthMenu>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
