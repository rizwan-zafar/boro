import cn from 'classnames';
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { ImSpinner2 } from 'react-icons/im';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'border' | 'formButton';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'primary',
    children,
    active,
    loading = false,
    disabled = false,
    ...rest
  } = props;

  const rootClassName = cn(
    'group text-[13px] md:text-sm lg:text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none',
    {
      'h-12 md:h-14 bg-brand text-brand-light tracking-widest px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90':
        variant === 'primary',
      'h-12 md:h-14 bg-brand-light text-brand-dark border border-border-four tracking-widest px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4':
        variant === 'border',
      'h-11 md:h-[50px] bg-brand text-brand-light font-manrope px-5 lg:px-6 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90 focus:bg-opacity-70':
        variant === 'formButton',
      'cursor-not-allowed hover:cursor-not-allowed bg-opacity-50 hover:bg-opacity-50':
        disabled,
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={rootClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
      {loading && (
        <ImSpinner2 className="w-5 h-5 animate-spin ltr:-mr-1 rtl:-ml-1 ltr:ml-3 rtl:mr-3 " />
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
