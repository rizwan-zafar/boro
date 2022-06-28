import BundleCard from '@components/cards/bundle-card';
import SectionHeader from '@components/common/section-header';
import cn from 'classnames';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import { ROUTES } from '@utils/routes';

interface Props {
  className?: string;
  data: any;
}

const breakpoints = {
  '1024': {
    slidesPerView: 3,
  },
  '640': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const BundleComboGrid: React.FC<Props> = ({
  className = 'mb-12 md:mb-14 xl:mb-16 2xl:mb-20 3xl:pb-2',
  data,
}) => {
  const { width } = useWindowSize();
  return (
    <div className={cn('heightFull', className)}>
      <div className="pt-0.5 pb-1.5">
        <SectionHeader
          sectionHeading="text-best-deal-with-money"
          sectionSubHeading="text-categories-grocery-items"
          headingPosition="center"
        />
        {width! < 1280 ? (
          <Carousel
            breakpoints={breakpoints}
            grid={{ rows: 3, fill: 'row' }}
            className="-mx-1.5 md:-mx-2"
            prevButtonClassName="ltr:-left-2 rtl:-right-2 lg:ltr:-left-2.5 lg:rtl:-right-2.5"
            nextButtonClassName="ltr:-right-2 rtl:-left-2 lg:ltr:-right-2.5 lg:rtl:-left-2.5"
            prevActivateId="bundle-combo-carousel-button-prev"
            nextActivateId="bundle-combo-carousel-button-next"
          >
            {data?.map((item: any) => (
              <SwiperSlide
                key={`card-bundle--key-${item.id}`}
                className="p-1.5 md:p-2"
              >
                <BundleCard
                  className="rounded-md shadow-category"
                  thumbnailClassName="w-28 sm:w-32 lg:w-36 3xl:w-[180px] px-2 py-3 2xl:px-4 2xl:py-3.5"
                  imgHeight={125}
                  imgWidth={150}
                  bundle={item}
                  href={`${ROUTES.BUNDLE}/${item.slug}`}
                />
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data?.map((item: any) => (
              <BundleCard
                className="rounded-md shadow-category"
                thumbnailClassName="w-32 2xl:w-36 3xl:w-[180px] px-2 py-3 2xl:px-4 2xl:py-3.5"
                imgHeight={125}
                imgWidth={150}
                key={`card-bundle--key-${item.id}`}
                bundle={item}
                href={`${ROUTES.BUNDLE}/${item.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BundleComboGrid;
