import { CHART_LINES, type CustomTooltipProps } from "../type/analytics";
import FormatTooltipDate from "./FormatTooltipDate";

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    const hasData = payload.some((p) => p.value > 0);
    if (!hasData) return null;
  
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg p-3 min-w-47.5">
        <p className="text-[12px] font-semibold text-[#374151] mb-2">
          {label ? FormatTooltipDate(label) : ""}
        </p>
        {CHART_LINES.map(({ key, label: name, color }) => {
          const entry = payload.find((p) => p.dataKey === key);
          if (!entry || entry.value === 0) return null;
          return (
            <div key={key} className="flex items-center justify-between gap-4 py-0.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="text-[12px] text-[#6B7280]">{name}</span>
              </div>
              <span className="text-[12px] font-semibold text-[#111827]">{entry.value}</span>
            </div>
          );
        })}
      </div>
    );
  };

  export default CustomTooltip;