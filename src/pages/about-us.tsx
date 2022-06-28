import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import { aboutSetting } from '@settings/about-setting';
import Image from '@components/ui/image';
import Seo from '@components/seo/seo';

const backgroundThumbnail = '/assets/images/about-us.jpg';
const aboutUs1 = '/assets/images/about-us/1.jpeg';
const aboutUs2 = '/assets/images/about-us/2.jpeg';
const aboutUs3 = '/assets/images/about-us/3.jpeg';
const aboutUs4 = '/assets/images/about-us/4.jpeg';
const aboutUs5 = '/assets/images/about-us/5.jpeg';
const aboutUs6 = '/assets/images/about-us/6.jpg';

export default function TermsPage() {
  const { t } = useTranslation('about');
  return (
    <>
      <Seo
        title="About Us"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="about-us"
      />
      {/* End of seo */}
      <div
        className="flex justify-center h-[250px] lg:h-96 2xl:h-[500px] w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundThumbnail})`,
        }}
      ></div>
      <div className="py-8 lg:py-16 2xl:py-20">
        <Container>
          <div className="flex flex-col w-full mx-auto max-w-[1200px]">
            <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
              {t(aboutSetting.titleOne)}
            </h2>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionOne),
              }}
            />

            <div className="grid grid-cols-2 gap-4 my-8 lg:my-14">
              <Image
                src={aboutUs1}
                alt={t('text-map')}
                className="ltr:mr-5 rtl:ml-5"
                width={576}
                height={390}
              />
              <Image
                src={aboutUs2}
                alt={t('text-map')}
                className=""
                width={576}
                height={390}
              />
            </div>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionTwo),
              }}
            />
            <div className="flex flex-col grid-cols-3 gap-4 my-8 lg:my-14 sm:grid">
              <Image
                src={aboutUs3}
                alt={t('text-map')}
                className="ltr:mr-4 rtl:ml-4"
                width={379}
                height={262}
              />
              <Image
                src={aboutUs4}
                alt={t('text-map')}
                className="ltr:mr-4 rtl:ml-4"
                width={379}
                height={262}
              />
              <Image
                src={aboutUs5}
                alt={t('text-map')}
                className=""
                width={379}
                height={262}
              />
            </div>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionThree),
              }}
            />
            <div className="flex mt-8 mb-6 lg:mt-14 lg:mb-10">
              <Image
                src={aboutUs6}
                alt={t('text-map')}
                className="ltr:mr-4 rtl:ml-4"
                height={400}
                width={1200}
              />
            </div>
            <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
              {t(aboutSetting.titleTwo)}
            </h2>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionFour),
              }}
            />
            <p className="text-brand-dark font-medium text-base lg:text-lg leading-7 2xl:text-[20px] lg:leading-loose lg:mt-4 mb-3.5">
              {t(aboutSetting.titleThree)} &nbsp;
              <a href="mailto:press@borobazar.com">press@borobazar.com</a>.
            </p>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                __html: t(aboutSetting.descriptionFive),
              }}
            />
          </div>
        </Container>
      </div>

      <DownloadApps />
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'about',
        'footer',
      ])),
    },
  };
};
