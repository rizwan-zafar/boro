import React from 'react';
import { CheckBox } from '@components/ui/form/checkbox';
import { useDietaryQuery } from '@framework/dietary/get-all-dietary';
import { useRouter } from 'next/router';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Disclosure } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';

export const DietaryFilter = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;
  const { data, isLoading, error } = useDietaryQuery({
    limit: 10,
  });
  const selectedDietary = React.useMemo(
    () => (query?.dietary ? (query.dietary as string).split(',') : []),
    [query?.dietary]
  );
  const [formState, setFormState] = React.useState<string[]>(selectedDietary);
  React.useEffect(() => {
    setFormState(selectedDietary);
  }, [selectedDietary]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    setFormState(currentFormState);
    const { dietary, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { dietary: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }
  const items = data?.dietary?.data;

  return (
    <div className="block">
      <Heading className="mb-5 -mt-1">{t('text-dietary-needs')}</Heading>
      <div className="flex flex-col p-5 border rounded-md border-border-base">
        {items?.slice(0, 3)?.map((item: any) => (
          <CheckBox
            key={`${item.name}-key-${item.id}`}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={formState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
          />
        ))}
        {items!.length > 3 && (
          <div className="w-full">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Panel className="pt-4 pb-2">
                    {items?.slice(3, items.length).map((item: any) => (
                      <CheckBox
                        key={`${item.name}-key-${item.id}`}
                        label={item.name}
                        name={item.name.toLowerCase()}
                        checked={formState.includes(item.slug)}
                        value={item.slug}
                        onChange={handleItemClick}
                      />
                    ))}
                  </Disclosure.Panel>
                  <Disclosure.Button className="flex justify-center items-center w-full px-4 pt-3.5 pb-1 text-sm font-medium text-center text-brand focus:outline-none">
                    {open ? (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          {t('text-see-less')}
                        </span>
                        <IoIosArrowUp className="text-brand-dark text-opacity-60 text-15px" />
                      </>
                    ) : (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          {t('text-see-more')}
                        </span>
                        <IoIosArrowDown className="text-brand-dark text-opacity-60 text-15px" />
                      </>
                    )}
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
          </div>
        )}
      </div>
    </div>
  );
};
