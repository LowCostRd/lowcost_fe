
const Checkbox = ({ checked, locked }: { checked: boolean; locked?: boolean }) => {
  const activeBg = locked
    ? "bg-[#EF4444] border-[#EF4444]"
    : "bg-[#5B0AFF] border-[#5B0AFF]";
  return (
    <div
      className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-150 ${
        checked ? activeBg : "border-[#94A3B8] "
      }`}
    >
      {checked && (
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
          <path
            d="M1 4l3 3L10 1"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default Checkbox;