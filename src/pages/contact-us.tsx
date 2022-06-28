import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import Map from '@components/ui/map';
import PageContactHeroSection from '@components/ui/page-contact-hero-section';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import ContactForm from '@components/common/form/contact-form';
import ContactSupport from '@components/contact/contact-support';
import ContactInformation from '@components/contact/contact-information';
import Seo from '@components/seo/seo';

export default function ContactUsPage() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="contact-us"
      />
      <PageContactHeroSection />
      <Container>
        <div className="max-w-[1420px] mx-auto mb-12 lg:mb-14 xl:mb-16">
          <div className="flex flex-wrap bg-brand-light w-full p-5 md:p-7 lg:p-10 xl:p-16 3xl:px-[70px] xl:py-12 shadow-contact rounded-md -mt-8 relative z-10">
            <div className="w-full md:w-[53%] xl:w-[60%] md:ltr:pr-8 md:rtl:pl-8 lg:ltr:pr-0 lg:rtl:pl-0 2xl:ltr:pr-24 2xl:rtl:pl-24 lg:mb-0 mb-8">
              <ContactSupport />
            </div>
            <div className="w-full md:w-[47%] xl:w-[40%] pb-0.5 lg:ltr:pl-12 lg:rtl:pr-12 pt-1.5">
              <ContactForm />
            </div>
          </div>
        </div>
        <ContactInformation />
      </Container>
      <div className="mt-12 md:mt-16 xl:mt-20 2xl:mt-24 bg-fill-two relative h-[420px]">
        <Map
          lat={1.295831}
          lng={103.76261}
          height={'420px'}
          zoom={15}
          showInfoWindow={true}
        />
      </div>
      <DownloadApps />
    </>
  );
}

ContactUsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
