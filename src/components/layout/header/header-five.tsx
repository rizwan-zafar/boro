import { useRef, useState } from 'react';
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
import Search from '@components/common/search';
import LanguageSwitcher from '@components/ui/language-switcher';
import UserIcon from '@components/icons/user-icon';
import SearchIcon from '@components/icons/search-icon';
import { useModalAction } from '@components/common/modal/modal.context';
import useOnClickOutside from '@utils/use-click-outside';
import { FiMenu } from 'react-icons/fi';
import Delivery from '@components/layout/header/delivery';
import CategoryDropdownMenu from '@components/category/category-dropdown-menu';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const {
    displaySearch,
    displayMobileSearch,
    openSearch,
    closeSearch,
    isAuthorized,
  } = useUI();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;
  const [categoryMenu, setCategoryMenu] = useState(Boolean(false));
  addActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }

  function handleCategoryMenu() {
    setCategoryMenu(!categoryMenu);
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-five sticky-header sticky -top-[1px] z-20 lg:relative w-full h-16 lg:h-auto',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="z-20 w-screen transition-all duration-200 ease-in-out innerSticky lg:w-full body-font bg-brand-light">
        <Search
          searchId="mobile-search"
          className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1"
        />
        {/* End of Mobile search */}
        <Container className="flex items-center justify-between h-16 py-3 border-b top-bar lg:h-auto border-border-base">
          <div className="relative shrink-0 lg:hidden">
            <button
              className="border border-border-base rounded-md focus:outline-none shrink-0 text-sm lg:text-15px font-medium text-brand-dark px-2.5 md:px-3 lg:px-[18px] py-2 md:py-2.5 lg:py-3 flex items-center transition-all hover:border-border-four"
              onClick={handleCategoryMenu}
            >
              <FiMenu className="text-xl lg:text-2xl" />
              <span className="hidden md:inline-flex ltr:ml-2.5 rtl:mr-2.5">
                {t('text-all-categories')}
              </span>
            </button>
            {categoryMenu && (
              <CategoryDropdownMenu className="mt-3 md:mt-2.5" />
            )}
          </div>
          {/* End of Category */}

          <Logo className="logo -mt-1.5 md:-mt-1 md:mx-auto ltr:pl-3 rtl:pr-3 md:ltr:pl-0 md:rtl:pr-0 lg:mx-0" />
          {/* End of logo */}

          <Search
            searchId="top-bar-search"
            className="hidden lg:flex lg:max-w-[650px] 2xl:max-w-[800px] lg:mx-8"
            variant="fill"
          />
          {/* End of search */}

          <div className="ltr:ml-auto rtl:mr-auto md:ltr:ml-0 md:rtl:mr-0">
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
          {/* End of auth & lang */}
        </Container>
        {/* End of top part */}

        <div className="hidden navbar lg:block bg-brand-light">
          <Container className="h-20 flex justify-between items-center py-2.5">
            <Logo className="w-0 transition-all duration-200 ease-in-out opacity-0 navbar-logo" />
            {/* End of logo */}
            <div className="relative categories-header-button ltr:mr-8 rtl:ml-8 shrink-0">
              <button
                className="border border-border-base rounded-md focus:outline-none shrink-0 text-15px font-medium text-brand-dark px-[18px] py-3 flex items-center transition-all hover:border-border-four"
                onClick={handleCategoryMenu}
              >
                <FiMenu className="text-2xl ltr:mr-3 rtl:ml-3" />
                {t('text-all-categories')}
              </button>
              {categoryMenu && <CategoryDropdownMenu />}
            </div>

            <HeaderMenu
              data={site_header.menu}
              className="flex transition-all duration-200 ease-in-out"
            />
            {/* End of main menu */}

            {displaySearch && (
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-4 sticky-search">
                <Search
                  ref={siteSearchRef}
                  className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                />
              </div>
            )}
            {/* End of conditional search  */}

            <div className="flex items-center ltr:ml-auto rtl:mr-auto shrink-0">
              <Delivery />
              <div className="flex items-center w-0 py-4 overflow-hidden transition-all duration-200 ease-in-out opacity-0 navbar-right">
                <button
                  type="button"
                  aria-label="Search Toggle"
                  onClick={() => openSearch()}
                  title="Search toggle"
                  className="flex items-center justify-center w-12 h-full transition duration-200 ease-in-out outline-none ltr:mr-6 rtl:ml-6 md:w-14 hover:text-heading focus:outline-none"
                >
                  <SearchIcon className="w-[22px] h-[22px] text-brand-dark text-opacity-40" />
                </button>
                {/* End of search handler btn */}

                <CartButton />
                {/* End of cart btn */}

                <div className="flex items-center shrink-0 ltr:ml-7 rtl:mr-7">
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
                {/* End of auth */}
              </div>
            </div>
          </Container>
        </div>
        {/* End of menu part */}
      </div>
    </header>
  );
};

export default Header;
