import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const { site_header } = siteSettings;
  const { t } = useTranslation('common');
  const options = site_header.languageMenu;
  const router = useRouter();
  const { asPath, locale } = router;
  const currentSelectedItem = locale
    ? options.find((o) => o.value === locale)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

  function handleItemClick(values: any) {
    setSelectedItem(values);
    router.push(asPath, undefined, {
      locale: values.value,
    });
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative z-10 lg:top-[1px]">
          <Listbox.Button className="relative w-full py-2 rounded-lg cursor-pointer text-brand-dark ltr:pl-3 rtl:pr-3 ltr:pr-5 rtl:pl-5 ltr:text-left rtl:text-right focus:outline-none">
            <span className="flex items-center text-sm truncate lg:text-15px">
              <span className="w-5 h-5 overflow-hidden rounded-full ltr:mr-2 rtl:ml-2 shrink-0">
                {selectedItem.icon}
              </span>
              <span className="leading-5 pb-0.5 text-white">{t(selectedItem.name)}</span>
            </span>
            <span className="absolute inset-y-0 flex items-center pointer-events-none ltr:right-0 rtl:left-0">
              <FaChevronDown
                className="w-3 h-3.5 text-white"
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
              className="absolute ltr:right-0 rtl:left-0  lg:ltr:left-0 lg:rtl:right-0 w-full py-1 mt-1 overflow-auto bg-brand-light rounded-md shadow-dropDown max-h-60 focus:outline-none text-sm min-w-[150px]"
            >
              {options?.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `${
                      active
                        ? 'text-brand-dark bg-fill-dropdown-hover'
                        : 'bg-brand-light'
                    }
												cursor-pointer relative py-2 px-3`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span className="flex items-center">
                      <span className="w-[22px] h-4">{option.icon}</span>
                      <span
                        className={`${
                          selected ? 'font-medium ' : 'font-normal'
                        } block truncate ltr:ml-1.5 rtl:mr-1.5 text-sm pb-0.5`}
                      >
                        {t(option.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && 'text-amber-600'}
                                 absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3`}
                        />
                      ) : null}
                    </span>
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
