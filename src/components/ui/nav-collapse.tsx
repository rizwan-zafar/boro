import cn from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { FaChevronDown } from 'react-icons/fa';

type CollapseProps = {
  title?: any;
  content?: any;
};

export const NavCollapse: React.FC<CollapseProps> = ({ title, content }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full px-3">
      <div className="w-full mx-auto mb-4 ">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-3 bg-white rounded shadow-category md:py-4">
                <h2
                  className={cn(
                    'flex items-center cursor-pointer text-sm lg:text-base text-brand-dark font-medium  '
                  )}
                >
                  <span className="opacity-50 text-brand-dark">
                    {title.icon}
                  </span>
                  <span className="ltr:pl-3 rtl:pr-3">{t(title.name)}</span>
                </h2>
                <FaChevronDown
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-4 h-4 2xl:w-5 2xl:h-5 text-brand-dark opacity-70`}
                />
              </Disclosure.Button>

              <Transition
                show={open}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-5 opacity-0"
                enterTo="transform scale-10 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-5 opacity-0"
              >
                {open && (
                  <div>
                    <Disclosure.Panel
                      static
                      className="mt-4 bg-white rounded shadow-category"
                    >
                      <div className="px-5 pt-3 pb-4 leading-7 2xl:pb-7 2xl:px-6 font-14px text-brand-dark opacity-70">
                        {content}
                      </div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
