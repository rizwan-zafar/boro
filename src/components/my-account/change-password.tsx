import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import {
  useChangePasswordMutation,
  ChangePasswordInputType,
} from '@framework/customer/use-change-password';

const defaultValues = {
  oldPassword: '',
  newPassword: '',
};

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const { mutate: changePassword, isLoading } = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    defaultValues,
  });
  function onSubmit(input: ChangePasswordInputType) {
    changePassword(input);
  }
  return (
    <>
      <Heading variant="titleLarge">
        {t('common:text-account-details-password')}
      </Heading>
      <div className="w-full flex  h-full lg:w-10/12 2xl:w-9/12 flex-col mt-6 lg:mt-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto flex flex-col justify-center "
        >
          <div className="flex flex-col space-y-5 lg:space-y-7">
            <PasswordInput
              label={t('forms:label-old-password')}
              error={errors.oldPassword?.message}
              {...register('oldPassword', {
                required: `${t('forms:password-old-required')}`,
              })}
            />
            <PasswordInput
              label={t('forms:label-new-password')}
              error={errors.newPassword?.message}
              {...register('newPassword', {
                required: `${t('forms:password-new-required')}`,
              })}
            />

            <div className="relative mt-3">
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                variant="formButton"
                className="w-full sm:w-auto"
              >
                {t('common:text-change-password')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
