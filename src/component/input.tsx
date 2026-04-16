import { useState } from "react";
import icons from "../assets/Icons";
import "./styles/input.css";
import type { InputProps } from "../type/general";


const passwordRules = [
  { label: "One lowercase letter (e.g. a)", test: (p: string) => /[a-z]/.test(p) },
  { label: "One uppercase letter (e.g. A)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number (e.g. 7)",           test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character",         test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  { label: "Minimum 8 characters",          test: (p: string) => p.length >= 8 },
];

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
  const [isFocused, setIsFocused] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const currentValue = value ?? "";
  const showPopover = showStrength && type === "password" && isFocused && currentValue.length > 0;

  return (
    <div className="input-wrapper" style={{ position: "relative" }}>
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
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="input-field"
        />
        {type === "password" && (
          <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? icons.openEye : icons.closeEye}
          </span>
        )}
      </div>

      {/* Password requirements popover */}
      {showPopover && (
        <div className="password-popover">
          <p className="popover-title">Password must include</p>
          <ul className="popover-rules">
            {passwordRules.map((rule) => {
              const passed = rule.test(currentValue);
              return (
                <li key={rule.label} className="popover-rule">
                  <span className="popover-rule-label">{rule.label}</span>
                  <span className={`popover-rule-icon ${passed ? "passed" : "failed"}`}>
                    {passed ? "✓" : "✕"}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="popover-arrow" />
        </div>
      )}

      {error && <p className="input-error">{error}</p>}
      {hint && !error && <p className="input-hint">{hint}</p>}
    </div>
  );
};

export default Input;