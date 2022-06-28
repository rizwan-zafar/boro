import cn from 'classnames';
import React, { InputHTMLAttributes, useState } from 'react';
import { Eye } from '@components/icons/eye-icon';
import { EyeOff } from '@components/icons/eye-off-icon';
import { useTranslation } from 'next-i18next';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label: string;
  name: string;
  shadow?: boolean;
  error: string | undefined;
}
const classes = {
  root: 'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body rounded-md placeholder-[#B3B3B3] transition duration-200 ease-in-out text-brand-dark border-border-two focus:border-2 focus:outline-none focus:ring-0 focus:border-brand h-11 md:h-12',
};
const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = 'block',
      inputClassName,
      label,
      name,
      error,
      shadow = false,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    const { t } = useTranslation();
    const rootClassName = cn(classes.root, inputClassName);
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className="block mb-3 text-sm font-normal leading-none cursor-pointer text-brand-dark opacity-70"
          >
            {t(label)}
          </label>
        )}
        <div className="relative">
          <input
            id={name}
            name={name}
            type={show ? 'text' : 'password'}
            ref={ref}
            className={rootClassName}
            autoComplete="off"
            spellCheck="false"
            {...rest}
          />
          <label
            htmlFor={name}
            className="absolute -mt-2 cursor-pointer ltr:right-4 rtl:left-4 top-5 text-brand-dark text-opacity-30"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="w-6 h-6" />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </label>
        </div>
        {error && (
          <p className="my-2 text-13px text-brand-danger text-opacity-70">
            {t(error)}
          </p>
        )}
      </div>
    );
  }
);

export default PasswordInput;

PasswordInput.displayName = 'PasswordInput';
