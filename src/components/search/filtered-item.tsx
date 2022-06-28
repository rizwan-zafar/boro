import { useRouter } from 'next/router';
import { IoClose } from 'react-icons/io5';
import isEmpty from 'lodash/isEmpty';

interface Props {
  itemKey: string;
  itemValue: string;
}

export const FilteredItem = ({ itemKey, itemValue }: Props) => {
  const router = useRouter();
  const { pathname, query } = router;

  function handleClose() {
    const currentItem = (query[itemKey]! as string)
      .split(',')
      .filter((i) => i !== itemValue);
    delete query[itemKey];
    router.push({
      pathname,
      query: {
        ...query,
        ...(!isEmpty(currentItem) ? { [itemKey]: currentItem.join(',') } : {}),
      },
    });
  }
  return (
    <div
      className="group flex shrink-0 m-1 items-center border border-border-base rounded-lg text-13px px-2.5 py-1.5 capitalize text-brand-dark cursor-pointer transition duration-200 ease-in-out hover:border-brand"
      onClick={handleClose}
    >
      {itemValue}
      <IoClose className="text-sm text-body ltr:ml-2 rtl:mr-2 shrink-0 ltr:-mr-0.5 rtl:-ml-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
    </div>
  );
};
