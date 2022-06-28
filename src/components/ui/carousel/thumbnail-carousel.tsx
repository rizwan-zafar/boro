import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@components/ui/carousel/slider';
import Image from '@components/ui/image';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/router';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Props {
  gallery: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  '0': {
    slidesPerView: 4,
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = 'xl:w-[480px] 2xl:w-[650px]',
  galleryClassName = 'xl:w-28 2xl:w-[130px]',
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { locale } = useRouter();
  const dir = getDirection(locale);

  return (
    <div className="w-full xl:flex xl:flex-row-reverse">
      <div
        className={cn(
          'w-full xl:ltr:ml-5 xl:rtl:mr-5 mb-2.5 md:mb-3 border border-border-base overflow-hidden rounded-md relative',
          thumbnailClassName
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-gallery-${item.id}`}
              className="flex items-center justify-center"
            >
              <Image
                src={item?.original ?? productGalleryPlaceholder}
                alt={`Product gallery ${item.id}`}
                width={650}
                height={590}
                className="rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <div
            ref={prevRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </div>
          <div
            ref={nextRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={`shrink-0 ${galleryClassName}`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={0}
          watchSlidesProgress={true}
          freeMode={true}
          observer={true}
          observeParents={true}
          breakpoints={galleryCarouselBreakpoints}
        >
          {gallery?.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.id}`}
              className="flex items-center justify-center overflow-hidden transition border rounded cursor-pointer border-border-base hover:opacity-75"
            >
              <Image
                src={item?.thumbnail ?? productGalleryPlaceholder}
                alt={`Product thumb gallery ${item.id}`}
                width={170}
                height={170}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
