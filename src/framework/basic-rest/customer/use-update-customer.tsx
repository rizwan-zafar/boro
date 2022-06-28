import { useMutation } from 'react-query';

export interface UpdateUserType {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  shareProfileData: boolean;
  setAdsPerformance: boolean;
}
async function updateUser(input: UpdateUserType) {
  return input;
}
export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUserType) => updateUser(input), {
    onSuccess: (data) => {
      console.log(data, 'UpdateUser success response');
    },
    onError: (data) => {
      console.log(data, 'UpdateUser error response');
    },
  });
};
