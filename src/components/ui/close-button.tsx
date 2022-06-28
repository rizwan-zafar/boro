import { IoClose } from 'react-icons/io5';
import cn from 'classnames';

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

interface CloseButtonProps {
  className?: string;
  onClick?: ButtonEvent;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close Button"
      className={cn(
        'fixed z-10 inline-flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 transition duration-200 text-brand-dark text-opacity-50 focus:outline-none  hover:text-opacity-100 top-0.5 md:top-2 lg:top-7 xl:top-10 ltr:right-0.5 rtl:left-0.5 md:ltr:right-2 md:rtl:left-0 lg:ltr:right-7 lg:rtl:left-7 xl:ltr:right-10 xl:rtl:left-10 bg-brand-light lg:bg-transparent rounded-full',
        className
      )}
    >
      <IoClose className="text-xl lg:text-2xl" />
    </button>
  );
};

export default CloseButton;
