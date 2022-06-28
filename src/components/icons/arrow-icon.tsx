import cn from 'classnames';
const ArrowIcon = ({
  className = '',
  color = 'currentColor',
  width = '50',
  height = '50',
}) => {
  return (
    <svg
      className={cn(className)}
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="24"
        fill="white"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M13.4762 23.9716H34.3756L26.3729 16.4878C25.9538 16.0959 25.9376 15.4448 26.3367 15.0334C26.7354 14.6225 27.3985 14.606 27.8181 14.9979L36.9575 23.5452C37.353 23.934 37.5714 24.4504 37.5714 25.0001C37.5714 25.5494 37.353 26.0662 36.9392 26.472L27.8176 35.0018C27.6148 35.1916 27.355 35.2857 27.0952 35.2857C26.8187 35.2857 26.5421 35.1788 26.3362 34.9664C25.9371 34.5549 25.9533 33.9044 26.3724 33.5125L34.4086 26.0287H13.4762C12.8979 26.0287 12.4286 25.5679 12.4286 25.0001C12.4286 24.4324 12.8979 23.9716 13.4762 23.9716Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
    </svg>
  );
};

export default ArrowIcon;
