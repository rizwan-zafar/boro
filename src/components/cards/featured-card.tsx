import Heading from '@components/ui/heading';
import Link from '@components/ui/link';
import cn from 'classnames';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { IoCaretForward } from 'react-icons/io5';

interface ItemProps {
  icon: JSX.Element;
  title: string;
  href: LinkProps['href'];
  bgColor: string;
}

interface Props {
  className?: string;
  item: ItemProps;
}

const FeaturedCard: React.FC<Props> = ({ item, className }) => {
  const { t } = useTranslation('common');
  const { icon, title, href, bgColor } = item;
  return (
    <Link href={href}>
      <div
        className={cn('group p-5 xl:p-6 3xl:p-7 flex items-center', className)}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex shrink-0 items-center justify-center bg-brand-light rounded-full w-[65px] md:w-[70px] xl:w-20 3xl:w-[90px] h-[65px] md:h-[70px] xl:h-20 3xl:h-[90px] shadow-featured">
          {icon}
        </div>
        <div className="ltr:pl-4 rtl:pr-4 md:ltr:pl-5 md:rtl:pr-5 lg:ltr:pl-4 lg:rtl:pr-4 3xl:ltr:pl-6 3xl:rtl:pr-6">
          <Heading variant="title" className="mb-2 md:mb-3 -mt-0.5">
            {t(title)}
          </Heading>
          <div className="uppercase text-xs xl:text-13px font-manrope font-semibold tracking-[0.6px] flex items-center text-brand-dark text-opacity-60 transition duration-200 ease-in-out group-hover:text-opacity-100">
            {t('text-learn-more')}
            <IoCaretForward className="text-sm xl:text-base transition duration-200 ease-in-out ltr:ml-1 rtl:mr-1 lg:ltr:ml-1.5 lg:rtl:mr-1.5 opacity-60 ltr:group-hover:ml-1.5 rtl:group-hover:mr-1.5 lg:ltr:group-hover:ml-2 lg:rtl:group-hover:mr-2" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
