import { useState, useRef, useEffect } from "react";
import "./styles/input.css";

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="input-wrapper" ref={ref}>
      {label && (
        <label className="input-label">
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}

      <div
        className={`input-container ${error ? "input-container--error" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className={`input-field ${!selected ? "input-placeholder" : ""}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`select-arrow ${open ? "select-arrow--open" : ""}`}>
          ▾
        </span>
      </div>

      {open && (
        <ul className="select-dropdown">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`select-option ${opt.value === value ? "select-option--active" : ""}`}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

export default Select;
