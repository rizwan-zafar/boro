import BannerCard from '@components/cards/banner-card';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';

interface BannerProps {
  data: any;
  grid?: number;
  className?: string;
}

const breakpoints = {
  '560': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const BannerGrid: React.FC<BannerProps> = ({
  data,
  grid = 3,
  className = 'mb-3 xl:mb-6',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      {width! < 1280 ? (
        <Carousel
          breakpoints={breakpoints}
          prevActivateId="bundle-carousel-button-prev"
          nextActivateId="bundle-carousel-button-next"
        >
          {data?.map((banner: any) => (
            <SwiperSlide key={`bundle-key-${banner.id}`}>
              <BannerCard banner={banner} effectActive={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div
          className={`grid gap-4 2xl:gap-5 grid-cols-1 sm:grid-cols-${grid}`}
        >
          {data?.map((banner: any) => (
            <BannerCard
              key={`banner--key${banner.id}`}
              banner={banner}
              effectActive={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerGrid;
