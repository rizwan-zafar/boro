interface AlertProps {
  message?: string;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ message, className }) => {
  return (
    <div
      className={`w-full h-full py-4 px-5 text-13px md:text-sm text-brand-danger font-semibold flex items-center justify-center border border-brand-danger/40 rounded ${className}`}
    >
      {message}
    </div>
  );
};

export default Alert;
