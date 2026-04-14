import "./styles/style.css";
interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const Button = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant}`}
    >
      {label}
    </button>
  );
};

export default Button;
