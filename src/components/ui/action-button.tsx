import { BsThreeDots } from 'react-icons/bs';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useUI } from '@contexts/ui.context';

const ActionsButton: React.FC<{ item?: any }> = ({ item }) => {
  const { openDrawer, setDrawerView } = useUI();

  function handleCartOpen(item: any) {
    setDrawerView('ORDER_DETAILS');
    return openDrawer(item);
  }

  return (
    <>
      <Popover className="relative actions_button_group">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${!open && 'text-opacity-90'}
                text-white group  px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <BsThreeDots
                style={{ color: 'rgba(140, 150, 159, 1)' }}
                size={20}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-[100%] ltr:right-0 rtl:left-0 2xl:ltr:right-auto 2xl:rtl:left-auto 2xl:ltr:left-0 2xl:rtl:right-0 z-10 bg-white shadow-dropDown rounded py-2">
                <div
                  className="text-[14px] whitespace-nowrap text-brand-dark py-2 px-5 hover:bg-[#F6F9FC] transition-all cursor-pointer"
                  onClick={() => handleCartOpen(item)}
                >
                  Order Details
                </div>
                <div className="text-[14px] whitespace-nowrap text-[#F35C5C] py-2 px-5 hover:bg-[#F6F9FC] transition-all cursor-pointer">
                  Cancel Order
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default ActionsButton;
