
import { useState, useRef, useEffect } from "react";
import "./styles/select.css"

interface SelectOption {
  label: string;
  value: string ;
  flag?: string;        
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  required = false,
  className = "",
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
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
    <div ref={ref} className={`relative w-full flex flex-col gap-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-[14px] font-semibold text-[#1F2937] ">
          {label} {required && <span className="text-[#1F2937]">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-16 px-5 flex items-center justify-between rounded-lg border text-[14px] bg-white cursor-pointer transition
          ${open ? "border-[#7C3AED]" : error ? "border-[#CA2044] bg-[#FFF1F4]" : "border-[#94A3B8]"}
          text-[#1F2937]`}
      >
        <span className="flex items-center gap-2">
          {selectedOption?.flag && (
            <img
              src={selectedOption.flag}
              alt={selectedOption.label}
              className="w-10 h-10 object-contain"
            />
          )}
          <span className={selectedOption ? "text-[#1F2937]" : "text-[#9498B8]"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

          <svg
          className={`w-7 h-7 text-[#9498B8] transition-transform ${open ? "rotate-180" : ""}`}
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
        <div className="absolute z-50 top-full mt-1 w-full bg-white border border-[#E5E7EB] rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[14px] text-[#9CA3AF]">
                {label || "Select an option"}
              </p>
            </div>

            {/* Options */}
            {options.map((opt, index) => (
            
              <div  key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-5 py-4 text-left text-[14px] flex items-center gap-3 transition
                    ${
                      value === opt.value
                        ? "bg-[#F3EDFF] text-[#5B0AFF] font-medium"
                        : "text-[#1F2937] hover:bg-[#F3EDFF]"
                    }`}
                >
                  {opt.flag && (
                    <img
                      src={opt.flag}
                      alt={opt.label}
                      className="w-10 h-10 object-contain"
                    />
                  )}
                  <span>{opt.label}</span>
                </button>

                {/* Divider between options (except last) */}
                {index < options.length - 1 && (
                  <hr className="border-gray-100 w-full" />
                )}
              </div>
            ))}

            <div className="pb-3" />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-[13px] text-[#CA2044] mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;