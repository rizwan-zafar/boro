import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useModalState } from '@components/common/modal/modal.context';

interface ContactFormValues {
  title: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  street_address: string;
  default: boolean;
}

const AddAddressForm: React.FC = () => {
  const { data } = useModalState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      title: data || data?.title ? data?.title : '',
      country: data || data?.address?.country ? data?.address?.country : '',
      city: data || data?.address?.city ? data?.address?.city : '',
      state: data || data?.address?.state ? data?.address?.state : '',
      zip: data || data?.address?.zip ? data?.address?.zip : '',
      street_address:
        data || data?.address?.street_address
          ? data?.address?.street_address
          : '',
      default: data || data?.default ? data?.default : '',
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log(values, 'Add Address');
  }

  return (
    <div className="w-full md:w-[508px] mx-auto p-5 sm:p-8 bg-white rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Title"
            {...register('title', { required: 'Title Required' })}
            error={errors.title?.message}
          />
        </div>
        <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-7">
          <Input
            variant="solid"
            label="Country"
            {...register('country', { required: 'Country Required' })}
            error={errors.country?.message}
          />
          <Input
            variant="solid"
            label="City"
            {...register('city', { required: 'City Required' })}
            error={errors.city?.message}
          />
          <Input
            variant="solid"
            label="State"
            {...register('state', { required: 'State Required' })}
            error={errors.state?.message}
          />
          <Input
            variant="solid"
            label="ZIP"
            {...register('zip', { required: 'ZIP Required' })}
            error={errors.zip?.message}
          />
        </div>
        <div className="mb-6">
          <TextArea
            variant="normal"
            inputClassName="focus:border-2 focus:outline-none focus:border-brand"
            label="Street Address"
            {...register('street_address')}
          />
        </div>
        <div className="mb-6">
          <input
            id="default-type"
            type="checkbox"
            className="w-5 h-5 transition duration-500 ease-in-out border border-gray-300 rounded cursor-pointer form-checkbox focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none focus:checked:bg-brand hover:checked:bg-brand checked:bg-brand"
            {...register('default', { required: 'Default type Required' })}
          />
          <label
            htmlFor="default-type"
            className="align-middle ltr:ml-3 rtl:mr-3"
          >
            Set Default Address
          </label>
        </div>
        <Button className="h-11 md:h-12 w-full mt-1.5" type="submit">
          Save Address
        </Button>
      </form>
    </div>
  );
};

export default AddAddressForm;
