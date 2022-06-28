import { useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { AiOutlinePlus } from 'react-icons/ai';
import { RadioGroup } from '@headlessui/react';
import { useModalAction } from '@components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';

const ContactBox: React.FC<{ items?: any }> = ({ items: { data } }) => {
  const { t } = useTranslation('common');
  let [contactData, setContactData] = useState(data);
  const { openModal } = useModalAction();

  function handlePopupView(item: any) {
    openModal('PHONE_NUMBER', item);
  }

  const removeItem = (id: any, title: string) => {
    var result = confirm(`Want to delete? ${title} Contact`);
    if (result) {
      let items = [...contactData];
      let array = items.filter((item: any) => item.id !== id);
      setContactData(array);
    }
  };
  const [selected, setSelected] = useState(data[0]);
  return (
    <>
      <div className="text-[15px] text-brand-dark ">
        <RadioGroup
          value={selected}
          onChange={setSelected}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 auto-rows-auto"
        >
          <RadioGroup.Label className="sr-only">
            {t('text-default')}
          </RadioGroup.Label>
          {contactData?.map((item: any, index: any) => (
            <RadioGroup.Option
              key={index}
              value={item}
              className={({ active, checked }) =>
                `${active ? 'border-brand' : 'border-border-base'}
                  ${checked ? 'border-brand' : 'border-border-base'}
                  border-2 relative focus:outline-none rounded p-5 block cursor-pointer min-h-[112px] h-full group address__box`
              }
            >
              <RadioGroup.Label as="h2" className="mb-2 font-semibold">
                {item?.title}
              </RadioGroup.Label>
              <RadioGroup.Description as="div" className="opacity-70">
                {item?.number}
              </RadioGroup.Description>
              <div className="absolute z-30 flex transition-all ltr:right-3 rtl:left-3 top-3 lg:opacity-0 address__actions">
                <button
                  onClick={() => handlePopupView(item)}
                  className="flex items-center justify-center w-6 h-6 text-base rounded-full bg-brand text-brand-light text-opacity-80"
                >
                  <TiPencil />
                </button>
                {/* <button
                  className="flex justify-center items-center bg-[#F35C5C] h-5 w-5 rounded-full"
                  onClick={() => removeItem(item?.id, item?.title)}
                >
                  <IoMdClose size={12} fill={'#fff'} />
                </button> */}
              </div>
            </RadioGroup.Option>
          ))}
          <button
            className="border-2 transition-all border-border-base rounded font-semibold p-5 px-10 cursor-pointer text-brand flex justify-start hover:border-brand items-center min-h-[112px] h-full"
            onClick={handlePopupView}
          >
            <AiOutlinePlus size={18} className="ltr:mr-2 rtl:ml-2" />
            {t('text-add-phone-number')}
          </button>
        </RadioGroup>
      </div>
    </>
  );
};

export default ContactBox;

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
