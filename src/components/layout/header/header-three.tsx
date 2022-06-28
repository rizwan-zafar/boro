import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site-settings';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import HeaderMenu from '@components/layout/header/header-menu';
import LanguageSwitcher from '@components/ui/language-switcher';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import useOnClickOutside from '@utils/use-click-outside';
import { useModalAction } from '@components/common/modal/modal.context';
import Search from '@components/common/search';
import SearchIcon from '@components/icons/search-icon';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const {
    openSidebar,
    displaySearch,
    openSearch,
    closeSearch,
    isAuthorized,
    displayMobileSearch,
  } = useUI();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;
  useOnClickOutside(siteSearchRef, () => closeSearch());
  addActiveScroll(siteHeaderRef, 10);
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
        'header-three sticky-header w-full h-16 lg:h-20 sticky lg:relative top-0 z-20',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="absolute z-30 w-screen transition duration-200 ease-in-out innerSticky lg:fixed lg:w-full body-font bg-brand-light">
        <Search className="top-bar-search lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1" />
        {/* End of Mobile search */}
        <Container
          className={cn(
            'top-bar h-16 lg:h-20 flex items-center justify-between py-3',
            displayMobileSearch && 'active-mobile-search'
          )}
        >
          <div className="flex items-center">
            <button
              aria-label="Menu"
              className="flex-col items-center justify-center hidden outline-none menuBtn ltr:mr-5 rtl:ml-5 lg:flex 2xl:hidden shrink-0 focus:outline-none"
              onClick={handleMobileMenu}
            >
              <MenuIcon />
            </button>

            <Logo className="-mt-1 logo" />
            {/* End of logo */}

            <HeaderMenu
              className="hidden 2xl:flex ltr:pl-10 rtl:pr-10 3xl:w-auto 2xl:mr-auto"
              data={site_header.menu}
            />
          </div>
          {/* End of menu */}
          {displaySearch && (
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-4 sticky-search">
              <Search
                ref={siteSearchRef}
                className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
              />
            </div>
          )}
          {/* End of conditional search  */}

          <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
            <button
              type="button"
              onClick={() => openSearch()}
              title="Search toggle"
              className="items-center justify-center hidden w-8 h-full py-2 transition duration-200 ease-in-out outline-none lg:flex hover:text-heading focus:outline-none"
            >
              <SearchIcon className="w-[22px] h-[22px] text-brand-dark text-opacity-40 ltr:-ml-2 rtl:-mr-2" />
            </button>
            {/* End of search handler btn */}
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
          {/* End of auth & lang */}
        </Container>
        {/* End of top part */}
      </div>
    </header>
  );
};

export default Header;
