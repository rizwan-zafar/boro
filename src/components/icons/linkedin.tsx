const LinkedInIcon: React.FC<React.SVGAttributes<{}>> = ({ ...rest }) => {
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
      <g clipPath="url(#clip0)">
        <path
          d="M32.9954 33.0002V32.9994H32.9999V26.3979C32.9999 23.1684 32.3047 20.6807 28.5292 20.6807C26.7142 20.6807 25.4962 21.6767 24.9989 22.6209H24.9464V20.9822H21.3667V32.9994H25.0942V27.0489C25.0942 25.4822 25.3912 23.9672 27.3314 23.9672C29.2432 23.9672 29.2717 25.7552 29.2717 27.1494V33.0002H32.9954Z"
          fill="#8693A4"
        />
        <path
          d="M15.2971 20.9827H19.0291V32.9999H15.2971V20.9827Z"
          fill="#8693A4"
        />
        <path
          d="M17.1615 15C15.9683 15 15 15.9683 15 17.1615C15 18.3548 15.9683 19.3433 17.1615 19.3433C18.3547 19.3433 19.323 18.3548 19.323 17.1615C19.3222 15.9683 18.354 15 17.1615 15V15Z"
          fill="#8693A4"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(15 15)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LinkedInIcon;
