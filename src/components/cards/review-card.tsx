import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import StarIcon from '@components/icons/star-icon';

interface ReviewProps {
  item: any;
  className?: string;
}

const ReviewCard: FC<ReviewProps> = ({ item, className = '' }) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={`border-b border-border-base last:border-0 pb-6 mb-6 last:mb-0 ${className}`}
    >
      <div className="flex -mx-0.5 mb-3.5">
        {[...Array(5)].map((_, idx) => (
          <StarIcon
            key={idx}
            color={idx < item.rating ? '#F3B81F' : '#DFE6ED'}
            className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
          />
        ))}
      </div>
      <Heading className="mb-1.5">{item.title}</Heading>
      <Text className="xl:leading-[2em]">{item.description}</Text>
      <div className="pt-2 text-sm text-brand-dark text-opacity-80">
        {t('text-by')}
        <span className="inline-block ltr:ml-[3px] rtl:mr-[3px] font-semibold">
          {item.author}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
