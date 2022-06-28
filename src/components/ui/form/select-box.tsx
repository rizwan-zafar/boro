import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiOutlineSelector, HiCheck } from 'react-icons/hi';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
type Option = {
  name: string;
  value: string;
};

export default function ListBox({ options }: { options: Option[] }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;
  const currentSelectedItem = query?.sort_by
    ? options.find((o) => o.value === query.sort_by)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);
  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);
  function handleItemClick(values: Option) {
    setSelectedItem(values);
    const { sort_by, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(values.value !== options[0].value
            ? { sort_by: values.value }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 z-10 min-w-[180px]">
          <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ltr:pl-3 rtl:pr-3 ltr:pr-10 rtl:pl-10 ltr:text-left rtl:text-right bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer">
            <span className="block truncate">{t(selectedItem.name)}</span>
            <span className="absolute inset-y-0 flex items-center pointer-events-none ltr:right-0 rtl:left-0 ltr:pr-2 rtl:pl-2">
              <HiOutlineSelector
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute w-full py-1 mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {options?.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-gray-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {t(option.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-amber-600' : ''}
                                check-icon absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3`}
                        >
                          <HiCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
