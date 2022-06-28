import Link from '@components/ui/link';
import React from 'react';

interface Props {
  href: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
}

const AuthMenu: React.FC<Props> = ({
  isAuthorized,
  href,
  btnProps,
  children,
}) => {
  return isAuthorized ? (
    <Link
      href={href}
      className="text-sm font-normal lg:text-15px text-white focus:outline-none ltr:ml-2 rtl:mr-2"
    >
      {children}
    </Link>
  ) : (
    <button
      className="text-sm font-normal lg:text-15px text-white focus:outline-none ltr:ml-2 rtl:mr-2"
      aria-label="Authentication"
      {...btnProps}
    />
  );
};

export default AuthMenu;
