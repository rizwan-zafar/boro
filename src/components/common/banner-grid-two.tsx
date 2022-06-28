import BannerCard from '@components/cards/banner-card';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';

interface BannerProps {
  data: any;
  className?: string;
  girdClassName?: string;
}

const BannerGridTwo: React.FC<BannerProps> = ({
  data,
  className = 'mb-3 md:mb-4 lg:mb-5 xl:mb-6',
  girdClassName = '2xl:gap-5',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      {width! < 768 ? (
        <Carousel
          prevActivateId="banner-carousel-button-prev"
          nextActivateId="banner-carousel-button-next"
        >
          {data?.map((banner: any) => (
            <SwiperSlide key={`banner-key-${banner.id}`}>
              <BannerCard banner={banner} effectActive={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div
          className={`grid gap-4 grid-cols-1 sm:grid-cols-2 ${girdClassName}`}
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

export default BannerGridTwo;
