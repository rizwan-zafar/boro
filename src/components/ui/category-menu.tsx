import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import { IoIosArrowForward } from 'react-icons/io';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';

function SidebarMenuItem({ className, item, depth = 0 }: any) {
  const { t } = useTranslation('common');
  const { name, children: items, icon } = item;
  return (
    <>
      <li
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm hover:text-brand px-3.5 2xl:px-4 py-2.5 border-b border-border-base last:border-b-0'
        }`}
      >
        <Link
          href={ROUTES.SEARCH}
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none focus:ring-0 focus:text-brand-dark'
          )}
        >
          {icon && (
            <div className="inline-flex w-8 shrink-0 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || t('text-category-thumbnail')}
                width={25}
                height={25}
              />
            </div>
          )}
          <span className="capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
            {name}
          </span>
          {items && (
            <span className="hidden ltr:ml-auto rtl:mr-auto md:inline-flex">
              <IoIosArrowForward className="text-15px text-brand-dark text-opacity-40" />
            </span>
          )}
        </Link>
        {Array.isArray(items) ? (
          <div className="absolute top-0 z-10 invisible hidden w-full h-full border rounded-md opacity-0 md:block left-full bg-brand-light border-border-base">
            <ul key="content" className="text-xs py-1.5">
              {items?.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <SidebarMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn(
                      'text-sm px-3 py-3 ltr:pr-3 rtl:pl-3 text-brand-muted hover:text-brand border-b border-border-base last:border-b-0 mb-0.5'
                    )}
                  />
                );
              })}
            </ul>
          </div>
        ) : null}
      </li>
    </>
  );
}

function SidebarMenu({ items, className }: any) {
  return (
    <ul
      className={cn(
        'w-64 md:w-72 h-430px bg-brand-light border border-border-base rounded-md category-dropdown-menu pt-1.5',
        className
      )}
    >
      {items?.map((item: any) => (
        <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item} />
      ))}
    </ul>
  );
}

export default SidebarMenu;
