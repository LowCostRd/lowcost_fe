
import { useState } from "react";
import icons from "../assets/Icons";
import "./styles/input.css";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  error?: string;
  hint?: string;
  required?: boolean;
  showStrength?: boolean; 
}

type StrengthLevel = "weak" | "good" | "strong";

const getPasswordStrength = (pwd: string): StrengthLevel | null => {
  if (!pwd) return null;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
  const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

  if (pwd.length < 6 || score <= 1) return "weak";
  if (pwd.length < 10 || score <= 2) return "good";
  return "strong";
};

const strengthConfig = {
  weak:   { label: "Weak",   color: "#CA2044", segments: 1 },
  good:   { label: "Good",   color: "#A16207", segments: 2 },
  strong: { label: "Strong", color: "#29996A", segments: 3 },
};

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  hint,
  required,
  showStrength = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const currentValue = value !== undefined ? value : internalValue;
  const strength =
    showStrength && type === "password"
      ? getPasswordStrength(currentValue)
      : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}

      <div className={`input-container ${error ? "input-container--error" : ""}`}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          className="input-field"
        />
        {type === "password" && (
          <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? icons.openEye : icons.closeEye}
          </span>
        )}
      </div>

      {/* Password strength bar */}
      {strength && (
        <div className="password-strength">
          <div className="strength-segments">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="strength-segment"
                style={{
                  backgroundColor:
                    i < strengthConfig[strength].segments
                      ? strengthConfig[strength].color
                      : "#E5E7EB",
                }}
              />
            ))}
          </div>
          <span
            className="strength-label"
            style={{ color: strengthConfig[strength].color }}
          >
            {strengthConfig[strength].label}
          </span>
        </div>
      )}

      {error && <p className="input-error">{error}</p>}
      {hint && !error && <p className="input-hint">{hint}</p>}
    </div>
  );
};

export default Input;
