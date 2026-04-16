interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger"| "grey";
  disabled?: boolean;
  icon?: React.ReactNode; // 👈 add this
}
const Button = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  icon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant}`}
    >
      {icon && <div className="btn__icon"><figure className="img-box">{icon}</figure></div>}
      <span className="btn__label">{label}</span>
    </button>
  );
};
export default Button;