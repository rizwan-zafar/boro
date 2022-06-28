import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import Logo from '@components/ui/logo';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';

type FormValues = {
  email: string;
};

const defaultValues = {
  email: '',
};

const ForgetPasswordForm = () => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }

  const onSubmit = (values: FormValues) => {
    console.log(values, 'token');
  };

  return (
    <div className="w-full px-5 py-6 mx-auto rounded-lg sm:p-8 bg-brand-light sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="mt-3 mb-8 text-sm md:text-base text-body sm:mt-4 sm:mb-10">
          {t('common:forgot-password-helper')}
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          label={t('forms:label-email')}
          type="email"
          variant="solid"
          className="mb-4"
          {...register('email', {
            required: `${t('forms:email-required')}`,
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t('forms:email-error'),
            },
          })}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          variant="formButton"
          className="w-full mt-0 h-11 md:h-12"
        >
          {t('common:text-reset-password')}
        </Button>
      </form>
      <div className="relative flex flex-col items-center justify-center mt-8 mb-6 text-sm text-heading sm:mt-10 sm:mb-7">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-brand-light">
          {t('common:text-or')}
        </span>
      </div>
      <div className="text-sm text-center sm:text-15px text-brand-muted">
        {t('common:text-back-to')}{' '}
        <button
          type="button"
          className="font-medium underline text-brand-dark hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {t('common:text-login')}
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
