import { useState, useRef, useEffect } from "react";


const PRACTITIONER_OPTIONS = [
  "1-5 Practitioners",
  "6-15 Practitioners",
  "16-50 Practitioners",
  "51-100 Practitioners",
  "100+ Practitioners",
];

const PractitionerDropdown = ({
  value,
  onChange,
  hasError = false,
}: {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-16 px-8 flex items-center justify-between rounded-xl border text-[14px] font-normal bg-white cursor-pointer transition
          ${
            open
              ? "border-[#7C3AED]"
              : hasError
              ? "border-[#CA2044] "
              : "border-[#94A3B8]"
          }
          text-[#1F2937]`}
      >
        <span className={value ? "text-[#1F2937]" : "text-[#1F2937]"}>
          {value || "Select a range"}
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

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
          <div className="px-5 py-4">
            <p className="text-[14px] text-[#9CA3AF]">Select your role</p>
          </div>

          {PRACTITIONER_OPTIONS.map((option, i) => (
            <div key={option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full px-5 py-4 text-left text-[14px] font-normal cursor-pointer transition
                  ${
                    value === option
                      ? "bg-[#EDE9FE] text-[#7C3AED] font-medium"
                      : "text-[#1F2937] hover:bg-gray-50"
                  }`}
              >
                {option}
              </button>
              {i < PRACTITIONER_OPTIONS.length - 1 && (
                <hr className="border-gray-100 " />
              )}
            </div>
          ))}

          <div className="pb-2" />
        </div>
      )}
    </div>
  );
};

export default PractitionerDropdown;