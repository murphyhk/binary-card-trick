type ButtonProps = {
  label: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function Button({
  label,
  handleClick,
  className = "",
}: ButtonProps) {
  return (
    <div>
      <button onClick={handleClick} className={`btn btn-info ${className}`}>
        {label}
      </button>
    </div>
  );
}
