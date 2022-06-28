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
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const { isAuthorized, displayMobileSearch } = useUI();
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-four w-full sticky top-0 z-30',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="innerSticky body-font absolute w-full h-[64px] lg:h-auto z-20 transition duration-200 ease-in-out flex items-center bg-gradient-to-b from-white to-transparent lg:pt-1.5 xl:pb-1.5">
        <Search className="top-bar-search lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1" />
        {/* End of Mobile search */}
        <Container className="flex items-center justify-between w-full h-full lg:justify-center">
          <Logo className="-mt-1" />

          <HeaderMenu
            data={site_header.menu}
            className="hidden lg:flex md:ltr:pl-6 md:rtl:pr-6 xl:ltr:pl-10 xl:rtl:pr-10"
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
