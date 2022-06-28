import Layout from '@components/layout/layout';
import { legalSetting } from '@settings/legal-setting';
import Heading from '@components/ui/heading';
import { Element } from 'react-scroll';
import { useTranslation } from 'next-i18next';

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}

export default function LegalPage() {
  const { t } = useTranslation('legal');
  return (
    <>
      <div className="lg:max-h-[575px] lg:overflow-scroll scrollbar">
        <Heading variant="titleLarge">
          {t('common:text-account-details-notice')}
        </Heading>
        <div className="pt-6">
          <div className="w-full">
            {legalSetting?.map((item) => (
              // @ts-ignore
              <Element
                key={item.title}
                id={makeTitleToDOMId(item.title)}
                className="mb-5 lg:mb-10"
              >
                <h2 className="text-base  md:text-[17px] 2xl:text-lg text-brand-dark font-medium mb-4">
                  {t(`${item.title}`)}
                </h2>
                <div
                  className="text-brand-dark opacity-70 text-sm leading-7 lg:text-14px lg:leading-loose"
                  dangerouslySetInnerHTML={{
                    __html: t(`${item.description}`),
                  }}
                />
              </Element>
            ))}
          </div>
          {/* End of content */}
        </div>
      </div>
    </>
  );
}

LegalPage.Layout = Layout;
