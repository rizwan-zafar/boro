import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import cn from 'classnames';
import Layout from '@components/layout/layout';
import { useTranslation } from 'next-i18next';

const deliveryTip = ['$5', '$10', '$15', '$20', '$25'];

export default function DeliveryTips() {
  const { t } = useTranslation('common');
  const [deliveryTips, setDeliveryTips] = useState(deliveryTip[0]);

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <RadioGroup value={deliveryTips} onChange={setDeliveryTips}>
          <RadioGroup.Label className="sr-only">
            {t('text-delivery-tip')}
          </RadioGroup.Label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {deliveryTip.map((tips) => (
              <RadioGroup.Option
                key={tips}
                value={tips}
                className={({ active, checked }) =>
                  cn(
                    'relative rounded-lg px-5 py-4 cursor-pointer focus:outline-none',
                    checked ? 'bg-brand text-white' : 'bg-gray-100'
                  )
                }
              >
                {({ active, checked }) => (
                  <div className="text-center">
                    <RadioGroup.Label
                      as="p"
                      className={`text-base font-semibold  ${
                        checked ? 'text-brand-light' : 'text-brand-dark'
                      }`}
                    >
                      {tips}
                    </RadioGroup.Label>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        {/* End of date schedule */}
      </div>
    </div>
  );
}

DeliveryTips.Layout = Layout;
