import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface ForgetPasswordType {
  email: string;
}
async function forgetPassword() {
  return {
    ok: true,
    message: 'Forget password Successful!',
  };
}
export const useForgetPasswordMutation = () => {
  return useMutation(() => forgetPassword(), {
    onSuccess: (_data) => {
      Cookies.remove('auth_token');
    },
    onError: (data) => {
      console.log(data, 'forget password error response');
    },
  });
};
