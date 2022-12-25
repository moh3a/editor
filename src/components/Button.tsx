interface ButtonProps {
  title: string;
  onClick: () => void;
}
const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <button
      className="m-1 font-mono font-bold -skew-x-12 px-3 py-1 bg-sky-600 text-white"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default Button;
