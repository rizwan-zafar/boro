import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Link from '@components/ui/link';

interface Props {
  className?: string;
  data: {
    widgetTitle?: string;
    lists: {
      id: string;
      path?: string;
      title: string;
      icon?: any;
    }[];
  };
}

const WidgetLink: React.FC<Props> = ({ className, data }) => {
  const { widgetTitle, lists } = data;
  const { t } = useTranslation('footer');
  return (
    <div className={`${className}`}>
      <Heading variant="mediumHeading" className="mb-4 sm:mb-5 lg:mb-6 pb-0.5">
        {t(`${widgetTitle}`)}
      </Heading>
      <ul className="flex flex-col space-y-3 text-sm lg:text-15px">
        {lists.map((list) => (
          <li
            key={`widget-list--key${list.id}`}
            className="flex items-baseline"
          >
            {list.icon && (
              <span className="ltr:mr-3 rtl:ml-3 relative top-0.5 lg:top-1  text-sm lg:text-base">
                {list.icon}
              </span>
            )}

            <Link
              href={list.path ? list.path : '#!'}
              className="transition-colors duration-200 hover:opacity-80 text-white"
            >
              {t(`${list.title}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetLink;
