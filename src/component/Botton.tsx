import "./styles/style.css";
interface ButtonProps {
  label: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  filled?: boolean; 
}

const Button = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  filled
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
     className={`btn btn--${variant} ${!filled ? "btn--unfilled" : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
