import { useState } from "react";
import icons from "../assets/Icons";
import "./styles/input.css"

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  error?: string;
  hint?: string;
  required?: boolean;
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  hint,
  required,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}

      <div
        className={`input-container ${error ? "input-container--error" : ""}`}
      >
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input-field"
        />
        {type === "password" && (
          <span
            className="input-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? icons.closeEye : icons.closeEye}
          </span>
        )}
      </div>

      {error && <p className="input-error">{error}</p>}
      {hint && !error && <p className="input-hint">{hint}</p>}
    </div>
  );
};

export default Input;
