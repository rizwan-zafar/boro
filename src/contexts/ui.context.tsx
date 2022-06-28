import React from 'react';
import { getToken } from '@framework/utils/get-token';
import { CartProvider } from './cart/cart.context';
import { ModalProvider } from '@components/common/modal/modal.context';

export interface State {
  isAuthorized: boolean;
  displaySidebar: boolean;
  displayFilter: boolean;
  displayCart: boolean;
  displaySearch: boolean;
  displayMobileSearch: boolean;
  displayDrawer: boolean;
  drawerView: string | null;
  toastText: string;
  isStickyheader: boolean;
  data?: any;
}

const initialState = {
  isAuthorized: getToken() ? true : false,
  displaySidebar: false,
  displayFilter: false,
  displayCart: false,
  displaySearch: false,
  displayMobileSearch: false,
  displayDrawer: false,
  drawerView: null,
  toastText: '',
  isStickyheader: false,
  data: null,
};

type Action =
  | {
      type: 'SET_AUTHORIZED';
    }
  | {
      type: 'SET_UNAUTHORIZED';
    }
  | {
      type: 'OPEN_SIDEBAR';
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_SHOP';
    }
  | {
      type: 'CLOSE_SHOP';
    }
  | {
      type: 'OPEN_CART';
    }
  | {
      type: 'CLOSE_CART';
    }
  | {
      type: 'OPEN_SEARCH';
    }
  | {
      type: 'CLOSE_SEARCH';
    }
  | {
      type: 'OPEN_MOBILE_SEARCH';
    }
  | {
      type: 'CLOSE_MOBILE_SEARCH';
    }
  | {
      type: 'SET_TOAST_TEXT';
      text: ToastText;
    }
  | {
      type: 'OPEN_FILTER';
    }
  | {
      type: 'CLOSE_FILTER';
    }
  | {
      type: 'OPEN_DRAWER';
      data: null;
    }
  | {
      type: 'CLOSE_DRAWER';
    }
  | {
      type: 'SET_DRAWER_VIEW';
      view: DRAWER_VIEWS;
    }
  | {
      type: 'SET_USER_AVATAR';
      value: string;
    }
  | {
      type: 'ENABLE_STICKY_HEADER';
    }
  | {
      type: 'DISABLE_STICKY_HEADER';
    };

type DRAWER_VIEWS = 'CART_SIDEBAR' | 'MOBILE_MENU' | 'ORDER_DETAILS';
type ToastText = string;

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_AUTHORIZED': {
      return {
        ...state,
        isAuthorized: true,
      };
    }
    case 'SET_UNAUTHORIZED': {
      return {
        ...state,
        isAuthorized: false,
      };
    }
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
        drawerView: null,
      };
    }
    case 'OPEN_SHOP': {
      return {
        ...state,
        displayShop: true,
      };
    }
    case 'CLOSE_SHOP': {
      return {
        ...state,
        displayShop: false,
        drawerView: null,
      };
    }
    case 'OPEN_CART': {
      return {
        ...state,
        displayCart: true,
      };
    }
    case 'CLOSE_CART': {
      return {
        ...state,
        displayCart: false,
      };
    }
    case 'OPEN_SEARCH': {
      return {
        ...state,
        displaySearch: true,
      };
    }
    case 'CLOSE_SEARCH': {
      return {
        ...state,
        displaySearch: false,
      };
    }
    case 'OPEN_MOBILE_SEARCH': {
      return {
        ...state,
        displayMobileSearch: true,
      };
    }
    case 'CLOSE_MOBILE_SEARCH': {
      return {
        ...state,
        displayMobileSearch: false,
      };
    }
    case 'OPEN_FILTER': {
      return {
        ...state,
        displayFilter: true,
      };
    }
    case 'CLOSE_FILTER': {
      return {
        ...state,
        displayFilter: false,
      };
    }
    case 'OPEN_DRAWER': {
      return {
        ...state,
        displayDrawer: true,
        displaySidebar: false,
        data: action.data,
      };
    }
    case 'CLOSE_DRAWER': {
      return {
        ...state,
        displayDrawer: false,
      };
    }
    case 'SET_DRAWER_VIEW': {
      return {
        ...state,
        drawerView: action.view,
      };
    }
    case 'SET_TOAST_TEXT': {
      return {
        ...state,
        toastText: action.text,
      };
    }
    case 'SET_USER_AVATAR': {
      return {
        ...state,
        userAvatar: action.value,
      };
    }
    case 'ENABLE_STICKY_HEADER': {
      return {
        ...state,
        isStickyheader: true,
      };
    }
    case 'DISABLE_STICKY_HEADER': {
      return {
        ...state,
        isStickyheader: false,
      };
    }
  }
}

export const UIProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const authorize = () => dispatch({ type: 'SET_AUTHORIZED' });
  const unauthorize = () => dispatch({ type: 'SET_UNAUTHORIZED' });
  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });
  const openShop = () => dispatch({ type: 'OPEN_SHOP' });
  const closeShop = () => dispatch({ type: 'CLOSE_SHOP' });
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_SIDEBAR' })
      : dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const toggleCart = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_CART' })
      : dispatch({ type: 'OPEN_CART' });
  const closeCartIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_CART' });

  const openFilter = () => dispatch({ type: 'OPEN_FILTER' });
  const closeFilter = () => dispatch({ type: 'CLOSE_FILTER' });

  const openSearch = () => dispatch({ type: 'OPEN_SEARCH' });
  const closeSearch = () => dispatch({ type: 'CLOSE_SEARCH' });
  const openMobileSearch = () => dispatch({ type: 'OPEN_MOBILE_SEARCH' });
  const closeMobileSearch = () => dispatch({ type: 'CLOSE_MOBILE_SEARCH' });
  const toggleMobileSearch = () =>
    state.displayMobileSearch
      ? dispatch({ type: 'CLOSE_MOBILE_SEARCH' })
      : dispatch({ type: 'OPEN_MOBILE_SEARCH' });
  const openDrawer = (data?: any) => dispatch({ type: 'OPEN_DRAWER', data });
  const closeDrawer = () => dispatch({ type: 'CLOSE_DRAWER' });

  const setUserAvatar = (_value: string) =>
    dispatch({ type: 'SET_USER_AVATAR', value: _value });

  const setDrawerView = (view: DRAWER_VIEWS) =>
    dispatch({ type: 'SET_DRAWER_VIEW', view });
  const enableStickyHeader = () => dispatch({ type: 'ENABLE_STICKY_HEADER' });
  const disableStickyHeader = () => dispatch({ type: 'DISABLE_STICKY_HEADER' });

  const value = React.useMemo(
    () => ({
      ...state,
      authorize,
      unauthorize,
      openSidebar,
      closeSidebar,
      openShop,
      closeShop,
      toggleSidebar,
      closeSidebarIfPresent,
      openCart,
      closeCart,
      toggleCart,
      closeCartIfPresent,
      openFilter,
      closeFilter,
      openDrawer,
      closeDrawer,
      openSearch,
      closeSearch,
      openMobileSearch,
      closeMobileSearch,
      toggleMobileSearch,
      setDrawerView,
      setUserAvatar,
      enableStickyHeader,
      disableStickyHeader,
    }),
    [state]
  );
  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: React.FC = ({ children }) => (
  <CartProvider>
    <UIProvider>
      <ModalProvider>{children}</ModalProvider>
    </UIProvider>
  </CartProvider>
);
