interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  return <div className={`border-t border-border-base ${className}`} />;
};

export default Divider;
