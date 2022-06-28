import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Text from '@components/ui/text';

interface ContactFormValues {
  instructionNote: string;
  default: boolean;
}

const DeliveryInstructions: React.FC<{ data?: any }> = ({ data }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      instructionNote: data || '',
      default: data || false,
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log(values, 'Delivery Note');
  }

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <TextArea
              variant="normal"
              inputClassName="focus:border-2 focus:outline-none focus:border-brand"
              label="forms:label-delivery-instructions-note"
              {...register('instructionNote')}
            />
          </div>
          <div className="mb-6">
            <input
              id="default-type"
              type="checkbox"
              className="w-5 h-5 transition duration-500 ease-in-out border border-gray-300 rounded cursor-pointer form-checkbox focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none focus:checked:bg-brand hover:checked:bg-brand checked:bg-brand"
              {...register('default', { required: 'Confirm the policy' })}
            />
            <label
              htmlFor="default-type"
              className="font-medium align-middle ltr:ml-3 rtl:mr-3 text-brand-dark text-15px"
            >
              {t('forms:label-leave-at-my-door')}
            </label>
            <Text className="ltr:ml-8 rtl:mr-8 pt-2.5" variant="small">
              {t('common:text-selecting-this-option')}
            </Text>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryInstructions;
