import { useMutation } from 'react-query';

export interface ChangeEmailInputType {
  newEmail: string;
  oldEmail: string;
}
async function changeEmail(input: ChangeEmailInputType) {
  return input;
}
export const useChangeEmailMutation = () => {
  return useMutation((input: ChangeEmailInputType) => changeEmail(input), {
    onSuccess: (data) => {
      console.log(data, 'ChangeEmail success response');
    },
    onError: (data) => {
      console.log(data, 'ChangeEmail error response');
    },
  });
};
