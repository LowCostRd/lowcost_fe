import { useState, useRef, useEffect } from "react";
import "./styles/select.css"

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
  placeholder = "Select an option",
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
    <div ref={ref} className="relative w-full flex flex-col gap-2">
      {/* Label */}
      {label && (
        <label className="text-[14px] font-semibold text-[#1F2937]">
          {label} {required && <span className="text-[#1F2937]">*</span>}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-16 px-6 flex items-center justify-between rounded-xl border text-[14px] bg-white cursor-pointer transition
          ${
            open
              ? "border-[#7C3AED]"
              : error
              ? "border-[#CA2044]"
              : "border-[#94A3B8]"
          }
          text-[#1F2937]`}
      >
        <span className={selected ? "text-[#1F2937]" : "text-[#9CA3AF]"}>
          {selected ? selected.label : placeholder}
        </span>

        <svg
          className={`w-5 h-5 text-[#9498B8] transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
          
          <div className="max-h-85 overflow-y-auto scroll-smooth custom-scrollbar">
            
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[14px] text-[#9CA3AF]">
                {label || "Select an option"}
              </p>
            </div>

            {/* Options */}
            {options.map((opt, i) => (
              <div key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-5 py-4 text-left text-[14px] transition
                    ${
                      value === opt.value
                        ? "bg-[#EDE9FE] text-[#7C3AED] font-medium"
                        : "text-[#1F2937] hover:bg-gray-50"
                    }`}
                >
                  {opt.label}
                </button>

                {/* Full-width divider */}
                {i < options.length - 1 && (
                  <hr className="border-gray-100 w-full" />
                )}
              </div>
            ))}

            <div className="pb-2" />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-[12px] text-[#CA2044] font-medium mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;