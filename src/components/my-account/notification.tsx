import { useState } from 'react';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import { useTranslation } from 'next-i18next';
import Switch from '@components/ui/switch';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';

const defaultValues = {};
const AccountDetails: React.FC = () => {
  const { t } = useTranslation('common');
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });
  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }
  return (
    <div className="flex flex-col w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading variant="titleLarge">
          {t('text-account-details-personal')}
        </Heading>
        <NotificationItem
          title="notification-one-title"
          description="notification-one-description"
        />
        <NotificationItem
          title="notification-two-title"
          description="notification-two-description"
        />

        <Heading variant="titleLarge" className="pt-6 xl:pt-12">
          {t('text-account-details-account')}
        </Heading>

        <div className="relative">
          <NotificationItem
            title="notification-three-title"
            description="notification-three-description"
          />
          <NotificationItem
            title="notification-four-title"
            description="notification-four-description"
          />
        </div>
        <div className="relative flex pt-3 ltr:ml-auto rtl:mr-auto sm:justify-end lg:pt-10">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="w-full h-12 mt-3 sm:w-auto"
            variant="formButton"
          >
            {t('button-save-changes')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;

interface NotificationItemProps {
  title: string;
  description: string;
}
const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
}) => {
  const [checked, setChecked] = useState(true);
  const { t } = useTranslation('common');
  return (
    <div className="relative flex pt-6 lg:pt-10">
      <div className="ltr:pr-2.5 rtl:pl-2.5">
        <Heading className="mb-1 font-medium">{t(title)}</Heading>
        <Text variant="small">{t(description)}</Text>
      </div>
      <div className="ltr:ml-auto rtl:mr-auto">
        <Switch checked={checked} onChange={setChecked} />
      </div>
    </div>
  );
};
