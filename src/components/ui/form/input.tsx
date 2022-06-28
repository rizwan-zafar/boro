import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import { useTranslation } from 'next-i18next';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  placeholder?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  from?:boolean;
}
const classes = {
  root: `py-2 px-4 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body rounded placeholder-[gray] min-h-12 transition duration-200 ease-in-out text-brand-dark focus:ring-0`,
  normal:
    'bg-gray-100 border-gray-300 focus:shadow focus:text-brand-light focus:border-brand',
  solid:
    'text-brand-dark border-border-two focus:border-2 focus:outline-none focus:border-brand h-11 md:h-12',
  outline: 'border-gray-300 focus:border-brand',
  shadow: 'focus:shadow',
};
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = 'block',
      label,
      name,
      error,
      placeholder,
      variant = 'normal',
      shadow = false,
      type = 'text',
      inputClassName,
      labelClassName,
      from,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === 'normal',
        [classes.solid]: variant === 'solid',
        [classes.outline]: variant === 'outline',
      },
      {
        [classes.shadow]: shadow,
      },
      inputClassName
    );
    const { t } = useTranslation();
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className={`block font-normal text-sm leading-none mb-3 cursor-pointer ${
              labelClassName || 'text-brand text-opacity-70'
            }`}
          >
            {t(label)}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          // @ts-ignore
          placeholder={t(placeholder)}
          className={rootClassName}
          autoComplete="off"
          spellCheck="false"
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
        {error && (
          <p className="my-2 text-13px text-brand-danger text-opacity-70">
            {t(error)}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
