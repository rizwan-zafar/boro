const FacebookIcon: React.FC<React.SVGAttributes<{}>> = ({ ...rest }) => {
  return (
    <svg
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect
        x="1"
        y="1"
        width="45"
        height="45"
        rx="22.5"
        fill="white"
        stroke="#E2E8F0"
      />
      <path
        d="M34 24C34 18.4766 29.5234 14 24 14C18.4766 14 14 18.4766 14 24C14 29.5234 18.4766 34 24 34C24.0586 34 24.1172 34 24.1758 33.9961V26.2148H22.0273V23.7109H24.1758V21.8672C24.1758 19.7305 25.4805 18.5664 27.3867 18.5664C28.3008 18.5664 29.0859 18.6328 29.3125 18.6641V20.8984H28C26.9648 20.8984 26.7617 21.3906 26.7617 22.1133V23.707H29.2422L28.918 26.2109H26.7617V33.6133C30.9414 32.4141 34 28.5664 34 24V24Z"
        fill="#8693A4"
      />
    </svg>
  );
};

export default FacebookIcon;
