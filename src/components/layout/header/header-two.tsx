import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import HeaderMenu from '@components/layout/header/header-menu';
import LanguageSwitcher from '@components/ui/language-switcher';
import { useModalAction } from '@components/common/modal/modal.context';
import cn from 'classnames';
import Search from '@components/common/search';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

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
        'header-one w-full h-16 lg:h-20 z-30 sticky top-0 bg-brand',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="z-20 w-full h-16 transition duration-200 ease-in-out innerSticky body-font bg-brand lg:h-20">
        <Search className="top-bar-search lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1" />
        {/* End of Mobile search */}
        <Container className="flex items-center justify-between w-full h-full">
          <div className="flex shrink-0">
            <button
              aria-label="Menu"
              className="flex-col items-center justify-center hidden outline-none menuBtn ltr:mr-5 rtl:ml-5 lg:flex xl:hidden shrink-0 focus:outline-none"
              onClick={handleMobileMenu}
            >
              <MenuIcon />
            </button>

            <Logo className="-mt-1" />
          </div>

          <HeaderMenu
            data={site_header.menu}
            className="hidden xl:flex md:ltr:pl-6 md:rtl:pr-6 xl:ltr:pl-10 xl:rtl:pr-10"
          />
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
        </Container>
      </div>
    </header>
  );
};

export default Header;
