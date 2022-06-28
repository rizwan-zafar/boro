import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useMutation } from 'react-query';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function logout() {
  return {
    ok: true,
    message: 'Logout Successful!',
  };
}
export const useLogoutMutation = () => {
  const { unauthorize } = useUI();
  return useMutation(() => logout(), {
    onSuccess: (_data) => {
      Cookies.remove('auth_token');
      unauthorize();
      Router.push('/');
    },
    onError: (data) => {
      console.log(data, 'logout error response');
    },
  });
};
