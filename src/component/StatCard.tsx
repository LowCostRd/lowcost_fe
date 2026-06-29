import Icons from "../assets/Icons";
import type { StatCardProps } from "../type/analytics";

const StatCard = ({ icon, label, value, sub, change, highlight }: StatCardProps) => {
    const isPositive = change !== undefined && change >= 0;
  
    return (
      <div
        className={`rounded-[14px] px-5 py-8  flex flex-col gap-2 ${
          highlight
            ? "bg-[#5B0AFF] text-white relative overflow-hidden"
            : "bg-white"
        }`}
      >
        {highlight && (
          <div className="absolute right-0 top-1 ">
            {Icons.vibrationIcon}
          </div>
        )}
  
        {/* Label */}
        <div
          className={`flex items-center gap-2 text-[14px] font-medium ${
            highlight ? "text-white" : "text-[#6B7280]"
          }`}
        >
          <span className={highlight ? "text-white/80" : "text-[#7C3AED]"}>{icon}</span>
          {label}
        </div>
  
        {/* Value + change badge */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className={`text-[32px] font-semibold leading-none ${
              highlight ? "text-white" : "text-[#1F2937]"
            }`}
          >
            {value}
          </span>
          {change !== undefined && (
            <span
              className={`flex items-center gap-0.5 text-[12px] font-semibold ${
                isPositive ? "text-[#10B981]" : "text-[#EF4444]"
              }`}
            >
              {isPositive ? `+${change}%` : `${change}%`}
              {isPositive ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 8V2M5 2L2 5M5 2L8 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 2V8M5 8L2 5M5 8L8 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          )}
        </div>
  
        {/* Sub label */}
        <div className={`text-[12px] ${highlight ? "text-white" : "text-[#94A3B8]"}`}>
          {sub}
        </div>
      </div>
    );
  };


  export default StatCard;