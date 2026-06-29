
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


import StatCard from "../../component/StatCard";
import PanelCard from "../../component/PanelCard";
import { CHART_LINES } from "../../type/analytics";
import CustomTooltip from "../../component/CustomTooltip";
import Icons from "../../assets/Icons";
import DateRangePicker from "../../component/DateRangePicker";

// ─── Chart config ─────────────────────────────────────────────────────────────

const chartDates = [
 "Jul 21","Jul 22","Jul 23","Jul 24","Jul 25","Jul 26","Jul 27",
  "Jul 28","Jul 29","Jul 30","Aug 01","Aug 02","Aug 03","Aug 04",
];

const chartData = chartDates.map((date) => ({
  date,
  patientCalls: 0,
  answered: 0,
  missed: 0,
  appointments: 0,
  transferred: 0,
  abandoned: 0,
  uniqueCall: 0,
  voicemail: 0,
}));

// ─── Tooltip types ────────────────────────────────────────────────────────────

interface CursorPoint {
  x: number;
  y: number;
}

interface DashedCursorProps {
  points?: CursorPoint[];
  height?: number;
}

// ─── Custom dashed cursor ─────────────────────────────────────────────────────
const DashedCursor = ({ points, height }: DashedCursorProps) => {
  if (!points?.length) return null;
  const { x } = points[0];
  return (
    <g>
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke="#7C3AED"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        opacity={0.6}
       
      />
    </g>
  );
};

// ─── Legend dot ───────────────────────────────────────────────────────────────
const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2 ml-2 py-5">
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-[12px] text-[#6B7280] font-normal">{label}</span>
  </div>
);

// ─── Detail row ───────────────────────────────────────────────────────────────
const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-center py-3">
    <span className="text-[13px] text-[#6B7280]">{label}</span>
    <span className="text-[13px] font-medium text-[#1F2937]">{value}</span>
  </div>
);

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

// ─── Fix: removed x+20 offset, use textAnchor="middle" to align with cursor ──
const CustomTick = ({ x = 0, y = 0, payload }: CustomTickProps) => (
  <text
    x={x}
    y={y + 10}

    fill="#9CA3AF"
    fontSize={11}
    textAnchor="middle"
  >
    {payload?.value}
  </text>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const CallAnalyticsPage = () => {


  return (
    <div className="min-h-screen bg-[#F8F8F8] p-6">
      <div className="bg-white min-h-screen rounded-[20px] p-6 mx-auto relative">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[20px] font-semibold text-[#212123]">Call Analytics</h1>
          <DateRangePicker
  onApply={({ start, end }) => {
    // hook up your data fetching here when ready
    console.log("Applied range:", start, end);
  }}
/>
        </div>

        <div className="min-h-screen bg-[#F7F6F9] rounded-[20px] p-6">
          {/* Stat cards — row 1 */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            <StatCard icon={Icons.totalCallIcon}      label="Total Calls"         value={0}    sub="Compared to yesterday"   highlight />
            <StatCard icon={Icons.callAnsweredIcon}   label="Calls Answered"      value={0}    sub="Successfully handled"    />
            <StatCard icon={Icons.appointedCallIcon}  label="Appointments Booked" value={0}    sub="Booked today"            />
            <StatCard icon={Icons.missedCallIcon}     label="Missed Calls"        value={0}    sub="Calls not answered"      />
            <StatCard icon={Icons.transferredCallIcon} label="Transferred Calls"  value={0}    sub="To staff members"        />
          </div>

          {/* Stat cards — row 2 */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <StatCard icon={Icons.questionCallIcon}    label="Questions Resolved"   value={0}     sub="Without transfer"  />
            <StatCard icon={Icons.uniqueCallIcon}      label="Unique Patients"      value={0}     sub="Called today"      />
            <StatCard icon={Icons.prescriptionCallIcon} label="Prescription Refills" value={0}    sub="Processed today"   />
            <StatCard icon={Icons.avgIcon}             label="Avg. Call Duration"   value="0m 0s" sub="Per call"          />
            <div />
          </div>

          {/* Chart */}
          <div className="bg-white rounded-[14px] p-6 mb-6 outline-none">
            <h2 className="text-[20px] font-medium text-[#1F2937] mb-4">Call Summary Chart</h2>
            <div className="flex flex-wrap gap-4 mb-5">
              {CHART_LINES.map(({ key, label, color }) => (
                <LegendDot key={key} color={color} label={label} />
              ))}
            </div>


            <ResponsiveContainer width="100%" height={290}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="4 9" stroke="#E5E7EB" vertical={false} />

                <XAxis
                  dataKey="date"
                  tick={<CustomTick />}
                  axisLine={false}
                  tickLine={false}
                  height={25}
                  interval={0}
                />

                <YAxis
                  ticks={[0, 2, 4, 6, 8, 10]}
                  tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={<DashedCursor />}
                />

                {CHART_LINES.map(({ key, color }) => (
                  <Line
                    key={key}
                    type="basis"
                    dataKey={key}
                    strokeDasharray="5 4"
                    stroke="#94A3B8"
                    dot={false}
                    strokeWidth={1.8}
                    activeDot={{ r: 5, fill: color, strokeWidth: 0 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom panels */}
          <div className="grid grid-cols-4 gap-4">

            {/* Call Performance */}
            <PanelCard icon={Icons.callClockIcon} title="Call Performance" badge={0}>
              <DetailRow label="Answered" value={0} />
              <DetailRow label="Missed"   value={0} />
              <DetailRow label="Success"  value="0%" />
              <hr className="border-[#F0F0F0] my-2" />
              <p className="text-[13px] font-semibold text-[#111827] pt-3 pb-1">Times</p>
              <DetailRow label="Total"   value="0h 0m" />
              <DetailRow label="Average" value="0m 0s" />
              <DetailRow label="Maximum" value="0m 0s" />
              <DetailRow label="Minimum" value="0m 0s" />
            </PanelCard>

            {/* Appointments */}
            <PanelCard icon={Icons.calenderCallIcon} title="Appointments">
              <DetailRow label="Booked"  value={0} />
              <DetailRow label="Success" value="-" />
              <DetailRow label="Peak"    value="-" />
              <hr className="border-[#F0F0F0] my-2" />
              <p className="text-[13px] font-semibold text-[#111827] pt-3 pb-1">Times</p>
              <DetailRow label="Total"   value="0h 0m" />
              <DetailRow label="Average" value="0m 0s" />
              <DetailRow label="Maximum" value="0m 0s" />
              <DetailRow label="Minimum" value="0m 0s" />
            </PanelCard>

            {/* Transfers */}
            <PanelCard icon={Icons.transferIcon} title="Transfers">
              <DetailRow label="Total"     value={0} />
              <DetailRow label="To staff"  value={0} />
              <DetailRow label="Voicemail" value={0} />
              <hr className="border-[#F0F0F0] my-2" />
              <p className="text-[13px] font-semibold text-[#111827] pt-3 pb-1">Reasons</p>
              <DetailRow label="Complex"   value="-" />
              <DetailRow label="Billing"   value="-" />
              <DetailRow label="Emergency" value="-" />
              <DetailRow label="Other"     value="-" />
            </PanelCard>

            {/* Quality */}
            <PanelCard icon={Icons.qualityIcon} title="Quality">
              <DetailRow label="Rating"   value="-"  />
              <DetailRow label="Positive"  value="-"  />
              <div className="mt-14.5"></div>
              <hr className="border-[#F0F0F0] my-2" />
              <p className="text-[13px] font-semibold text-[#111827] pt-3 pb-1">Outcomes</p>
              <DetailRow label="Booked"    value="-"  />
              <DetailRow label="Answered" value="-"  />
              <DetailRow label="Transfer" value="-"  />
              <DetailRow label="Callback"  value="-"  />
            </PanelCard>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CallAnalyticsPage;