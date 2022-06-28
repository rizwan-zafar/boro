import { useRouter } from 'next/router';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';

function SidebarMenuItem({ className, item, depth = 0 }: any) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const active = router?.query?.category;
  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      const { pathname, query } = router;
      const { type, ...rest } = query;
      router.push(
        {
          pathname,
          query: { ...rest, category: slug },
        },
        undefined,
        {
          scroll: false,
        }
      );
      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
    );
  }

  return (
    <>
      <li
        onClick={onClick}
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm md:text-15px hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
        } ${isOpen ? 'bg-fill-base' : 'text-brand-dark text-opacity-70'}`}
      >
        <button
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark'
          )}
        >
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || t('text-category-thumbnail')}
                width={40}
                height={40}
              />
            </div>
          )}
          <span className="text-brand-dark group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
            {name}
          </span>
          <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <li>
          <ul
            key="content"
            className="py-3 text-xs border-t border-border-base"
          >
            {items?.map((currentItem) => {
              const childDepth = depth + 1;
              return (
                <SidebarMenuItem
                  key={`${currentItem.name}${currentItem.slug}`}
                  item={currentItem}
                  depth={childDepth}
                  className={cn(
                    'text-sm ltr:pl-14 rtl:pr-14 py-2.5 ltr:pr-4 rtl:pl-4'
                  )}
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function SidebarMenu({ items, className }: any) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item} />
      ))}
    </ul>
  );
}

export default SidebarMenu;
