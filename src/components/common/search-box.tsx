import React from 'react';
import { useTranslation } from 'next-i18next';
import SearchIcon from '@components/icons/search-icon';
import CloseIcon from '@components/icons/close-icon';
import cn from 'classnames';

type SearchProps = {
  className?: string;
  searchId?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  onClear: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  variant?: 'border' | 'fill';
};

const SearchBox = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      searchId = 'search',
      variant = 'border',
      value,
      onSubmit,
      onClear,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const { t } = useTranslation('forms');
    return (
      <form
        className="relative flex w-full rounded-md"
        noValidate
        role="search"
        onSubmit={onSubmit}
      >
        <label htmlFor={searchId} className="flex flex-1 items-center py-0.5">
          <input
            id={searchId}
            className={cn(
              'text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50',
              {
                'border border-border-base': variant === 'border',
                'bg-fill-one': variant === 'fill',
              }
            )}
            placeholder={t('placeholder-search')}
            aria-label={searchId}
            autoComplete="off"
            value={value}
            onFocus={onFocus}
            ref={ref}
            {...rest}
          />
        </label>
        {value ? (
          <button
            type="button"
            onClick={onClear}
            title="Clear search"
            className="absolute top-0 flex items-center justify-center h-full transition duration-200 ease-in-out outline-none ltr:right-0 rtl:left-0 w-14 md:w-16 hover:text-heading focus:outline-none"
          >
            <CloseIcon className="w-[17px] h-[17px] text-brand-dark text-opacity-40" />
          </button>
        ) : (
          <span className="absolute top-0 flex items-center justify-center h-full w-14 md:w-16 ltr:right-0 rtl:left-0 shrink-0 focus:outline-none">
            <SearchIcon className="w-5 h-5 text-brand-dark text-opacity-40" />
          </span>
        )}
      </form>
    );
  }
);

export default SearchBox;

SearchBox.displayName = 'SearchBox';
