import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import Heading from '@components/ui/heading';
import PageHeroSection from '@components/ui/page-hero-section';
import { privacyPolicy } from '@settings/privacy-settings';
import { Link, Element } from 'react-scroll';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import Seo from '@components/seo/seo';

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}

export default function PrivacyPage() {
  const { t } = useTranslation('privacy');
  return (
    <>
      <Seo
        title="Privacy"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="privacy"
      />
      <PageHeroSection heroTitle="text-page-privacy-policy" />
      <div className="py-12 lg:py-16 2xl:py-20 xl:px-16 2xl:px-24 3xl:px-36">
        <Container>
          <div className="flex flex-col md:flex-row">
            <nav className="hidden mb-8 sm:block md:w-72 xl:w-3/12 2xl:mb-0 lg:-mt-2">
              <ol className="sticky z-10 md:top-16 lg:top-20">
                {privacyPolicy?.map((item, index) => (
                  <li key={index}>
                    <Link
                      spy={true}
                      offset={-120}
                      smooth={true}
                      duration={200}
                      to={makeTitleToDOMId(t(item.title))}
                      activeClass="text-brand font-medium borderColor relative ltr:pl-3 rtl:pr-3"
                      className="block py-3 text-sm font-medium transition-all cursor-pointer lg:text-15px text-brand-dark"
                    >
                      {t(item.title)}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            {/* End of section scroll spy menu */}

            <div className="md:w-9/12 md:ltr:pl-8 md:rtl:pr-8">
              {privacyPolicy?.map((item) => (
                // @ts-ignore
                <Element
                  key={item.title}
                  id={makeTitleToDOMId(t(item.title))}
                  className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
                >
                  <Heading className="mb-4 lg:mb-6 font-body" variant="title">
                    {t(item.title)}
                  </Heading>
                  <div
                    className="space-y-5 text-sm leading-7 text-brand-muted lg:text-15px"
                    dangerouslySetInnerHTML={{
                      __html: t(item.description),
                    }}
                  />
                </Element>
              ))}
            </div>
            {/* End of content */}
          </div>
        </Container>
      </div>
      <DownloadApps />
    </>
  );
}

PrivacyPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'privacy',
        'footer',
      ])),
    },
  };
};
