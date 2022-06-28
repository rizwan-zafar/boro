import { useTranslation } from 'next-i18next';
import SearchIcon from '@components/icons/search-icon';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const HeroSearchBox = () => {
  const { t } = useTranslation('forms');
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    router.push(`/search?q=${searchTerm}`);
  }
  return (
    <form
      className="relative flex w-full mt-6 rounded-md"
      noValidate
      role="search"
      onSubmit={onSubmit}
    >
      <label htmlFor="hero-search" className="flex flex-1 items-center py-0.5">
        <input
          id="hero-search"
          className="w-full text-sm transition-all duration-200 rounded-md outline-none placeholder:text-brand-dark/50 text-brand-dark/80 h-14 md:h-16 ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 text-brand-light lg:text-base shadow-heroSearch focus:ring-2 focus:ring-brand"
          placeholder={t('placeholder-search')}
          aria-label="Search"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>

      <button
        type="submit"
        title="Search"
        className="absolute top-0 flex items-center justify-center h-full transition duration-200 ease-in-out outline-none ltr:right-0 rtl:left-0 w-14 md:w-16 hover:text-heading focus:outline-none"
      >
        <SearchIcon className="w-5 h-5 text-brand-dark text-opacity-40" />
      </button>
    </form>
  );
};

export default HeroSearchBox;
