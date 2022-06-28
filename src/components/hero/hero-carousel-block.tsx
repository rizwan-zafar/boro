import BannerCard from '@components/cards/banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';

interface Props {
  heroBanner?: any;
  className?: string;
}

const HeroCarouselBlock: React.FC<Props> = ({
  heroBanner,
  className = 'mt-5 mb-8 xl:mb-10',
}) => {
  return (
    <div className={`${className}`}>
      <Carousel
        autoplay={false}
        prevActivateId="hero-carousel-button-prev"
        nextActivateId="hero-carousel-button-next"
      >
        {heroBanner?.map((banner: any) => (
          <SwiperSlide key={`banner--key-${banner.id}`}>
            <BannerCard
              banner={banner}
              className="overflow-hidden rounded-md"
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarouselBlock;
