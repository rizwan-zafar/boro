import { useMutation } from 'react-query';

export interface ChangePasswordInputType {
  newPassword: string;
  oldPassword: string;
}
async function changePassword(input: ChangePasswordInputType) {
  return input;
}
export const useChangePasswordMutation = () => {
  return useMutation(
    (input: ChangePasswordInputType) => changePassword(input),
    {
      onSuccess: (data) => {
        console.log(data, 'ChangePassword success response');
      },
      onError: (data) => {
        console.log(data, 'ChangePassword error response');
      },
    }
  );
};
