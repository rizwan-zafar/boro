import { useTranslation } from 'next-i18next';
import { Attachment } from '@framework/types';

interface HeroSectionProps {
  backgroundThumbnail?: Attachment;
  heroDescription?: string;
  heroTitle?: string;
}

const BundleHeroSection: React.FC<HeroSectionProps> = ({
  backgroundThumbnail = '/assets/images/bundle/attachment/fruits-juice.png',
  heroTitle = 'text-fruits-juice-item',
  heroDescription = 'text-fruits-juice-description',
}) => {
  const { t } = useTranslation('common');
  return (
    <div
      className="flex justify-center xl:min-h-[350px] py-16 md:py-20 w-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${backgroundThumbnail})`,
      }}
    >
      <div className="max-w-[540px] flex flex-col items-center justify-center relative mx-auto text-center xl:mb-8 px-5">
        <h2 className="text-2xl lg:text-3xl 2xl:text-[40px] 2xl:leading-[1.3em] font-bold text-brand-dark font-manrope mb-2.5 lg:mb-3.5">
          {t(heroTitle)}
        </h2>
        <p className="text-15px lg:text-base 2xl:text-[17px] leading-7 lg:leading-8 text-brand-dark text-opacity-70">
          {t(heroDescription)}
        </p>
      </div>
    </div>
  );
};

export default BundleHeroSection;
