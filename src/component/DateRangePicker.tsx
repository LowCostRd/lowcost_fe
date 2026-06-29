import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type QuickRangeDays =
  | 0
  | -1
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "thisYear"
  | "lastYear"
  | "allTime";

interface QuickRange {
  label: string;
  days: QuickRangeDays;
}

interface DateRange {
  start: string;
  end: string;
}

interface MonthCalendarProps {
  year: number;
  month: number;
  hoverDate: Date | null;
  activeField: "from" | "to";
  start: string;
  end: string;
  onDayClick: (date: Date) => void;
  onDayHover: (date: Date) => void;
}

interface DateRangePickerProps {
  onApply: (range: DateRange) => void;
}

interface CalendarCell {
  date: Date;
  outside: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const QUICK_RANGES: QuickRange[] = [
  { label: "Today",      days: 0          },
  { label: "Yesterday",  days: -1         },
  { label: "This week",  days: "thisWeek"  },
  { label: "Last week",  days: "lastWeek"  },
  { label: "This month", days: "thisMonth" },
  { label: "Last month", days: "lastMonth" },
  { label: "This year",  days: "thisYear"  },
  { label: "Last year",  days: "lastYear"  },
  { label: "All time",   days: "allTime"   },
];

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  );
}

function isBetween(d: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const s = start < end ? start : end;
  const e = start < end ? end   : start;
  return d > s && d < e;
}

function formatLabel(start: Date | null, end: Date | null): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  if (!start) return fmt(new Date());
  if (!end || isSameDay(start, end)) return fmt(start);
  return `${fmt(start)} — ${fmt(end)}`;
}

function getMonthDays(year: number, month: number): CalendarCell[] {
  const firstDay = new Date(year, month, 1);
  let offset = firstDay.getDay() - 1;
  if (offset < 0) offset = 6;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: CalendarCell[] = [];
  for (let i = 0; i < offset; i++) {
    const d = new Date(year, month, 1 - offset + i);
    cells.push({ date: d, outside: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ date: new Date(year, month, i), outside: false });
  }
  let day = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, day++), outside: true });
  }
  return cells;
}

function resolveQuickRange(days: QuickRangeDays): { start: Date; end: Date } {
  const today = startOfDay(new Date());
  if (days === 0) return { start: today, end: today };
  if (days === -1) {
    const y = new Date(today);
    y.setDate(y.getDate() - 1);
    return { start: y, end: y };
  }
  if (days === "thisWeek") {
    const s = new Date(today);
    let offset = today.getDay() - 1;
    if (offset < 0) offset = 6;
    s.setDate(today.getDate() - offset);
    return { start: s, end: today };
  }
  if (days === "lastWeek") {
    const s = new Date(today);
    let offset = today.getDay() - 1;
    if (offset < 0) offset = 6;
    s.setDate(today.getDate() - offset - 7);
    const e = new Date(s);
    e.setDate(s.getDate() + 6);
    return { start: s, end: e };
  }
  if (days === "thisMonth") {
    const s = new Date(today.getFullYear(), today.getMonth(), 1);
    return { start: s, end: today };
  }
  if (days === "lastMonth") {
    const s = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const e = new Date(today.getFullYear(), today.getMonth(), 0);
    return { start: s, end: e };
  }
  if (days === "thisYear") {
    const s = new Date(today.getFullYear(), 0, 1);
    return { start: s, end: today };
  }
  if (days === "lastYear") {
    const s = new Date(today.getFullYear() - 1, 0, 1);
    const e = new Date(today.getFullYear() - 1, 11, 31);
    return { start: s, end: e };
  }
  // "allTime"
  const s = new Date(2000, 0, 1);
  return { start: s, end: today };
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return startOfDay(new Date(y, m - 1, d));
}

// ─── Single month calendar ────────────────────────────────────────────────────

function MonthCalendar({
  year,
  month,
  hoverDate,
  activeField,
  start,
  end,
  onDayClick,
  onDayHover,
}: MonthCalendarProps) {
  const cells = getMonthDays(year, month);
  const today = startOfDay(new Date());

  const previewEnd = !end && start && hoverDate ? hoverDate : null;
  const rangeEnd   = end ? fromISO(end) : previewEnd;
  const rangeStart = start ? fromISO(start) : null;

  return (
    <div style={{ width: 260 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 4 }}>
        {DAYS.map((d) => (
          <div
            key={d}
            style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", fontWeight: 500, padding: "4px 0" }}
          >
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", rowGap: 2 }}>
        {cells.map(({ date, outside }, i) => {
          const col        = i % 7;
          const isFirstCol = col === 0;
          const isLastCol  = col === 6;
          const iso        = toISO(date);
          const isStart    = !!start && iso === start;
          const isEnd      = !!end   && iso === end;
          const inRange    = rangeStart && rangeEnd ? isBetween(date, rangeStart, rangeEnd) : false;
          const isToday    = isSameDay(date, today);
          const isFuture   = date > today;

          const fromLocked = activeField === "from" && !!start && !!end && !isStart;
          const toLocked   = activeField === "to"   && !!end   && !isEnd;
          const disabled   = outside || isFuture || fromLocked || toLocked;

          let bg: string           = "transparent";
          let color: string        = outside ? "#D1D5DB" : "#1F2937";
          let fontWeight: number   = 400;
          let borderRadius: string = "50%";

          if (isStart || isEnd) {
            bg = "#5B0AFF";
            color = "#fff";
            fontWeight = 600;
          } else if (inRange) {
            bg = "#EDE9FE";
            color = "#1F2937";
            borderRadius = "0";
          }

          const showTodayDot = isToday && !isStart && !isEnd && !inRange && !disabled;

          return (
            <div
              key={i}
              onClick={() => !disabled && onDayClick(date)}
              onMouseEnter={() => !outside && !isFuture && onDayHover(date)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 34,
                cursor: disabled ? "default" : "pointer",
              }}
            >
              {(inRange || (isStart && end && !isEnd) || (isEnd && start && !isStart)) && (
                <span
                  style={{
                    position: "absolute",
                    top: 1,
                    bottom: 1,
                    left: isStart && !isEnd ? "50%" : 0,
                    right: isEnd && !isStart ? "50%" : 0,
                    background: "#EDE9FE",
                    borderRadius: inRange && isFirstCol
                      ? "8px 0 0 8px"
                      : inRange && isLastCol
                      ? "0 8px 8px 0"
                      : 0,
                    zIndex: 0,
                  }}
                />
              )}
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius,
                  background: bg,
                  color: disabled && !isStart && !isEnd ? "#C4C7CC" : color,
                  fontSize: 13,
                  fontWeight,
                  transition: "background 0.1s",
                }}
              >
                {date.getDate()}
              </span>
              {showTodayDot && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#5B0AFF",
                    zIndex: 2,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DateRangePicker({ onApply }: DateRangePickerProps) {
  const today = new Date();

  const [leftYear,   setLeftYear]   = useState<number>(today.getFullYear());
  const [leftMonth,  setLeftMonth]  = useState<number>(today.getMonth() > 0 ? today.getMonth() - 1 : 0);
  const [rightYear,  setRightYear]  = useState<number>(today.getFullYear());
  const [rightMonth, setRightMonth] = useState<number>(today.getMonth());

  const [start,       setStart]       = useState<string>("");
  const [end,         setEnd]         = useState<string>("");
  const [activeField, setActiveField] = useState<"from" | "to">("from");
  const [hoverDate,   setHoverDate]   = useState<Date | null>(null);
  const [activeQuick, setActiveQuick] = useState<string | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleDayClick(date: Date): void {
    const iso = toISO(date);

    if (activeField === "from") {
      if (iso === start) {
        setStart("");
        setActiveField("from");
        setActiveQuick(null);
      } else if (!start) {
        setStart(iso);
        setActiveQuick(null);
      } else if (!end) {
        if (iso > start) {
          setEnd(iso);
          setActiveField("to");
        } else {
          setStart(iso);
        }
        setActiveQuick(null);
      }
    } else {
      if (iso === end) {
        setEnd("");
        setActiveQuick(null);
      } else if (!end) {
        if (iso === start) {
          setStart("");
          setActiveField("from");
          setActiveQuick(null);
        } else if (start && iso < start) {
          setEnd(start);
          setStart(iso);
          setActiveQuick(null);
        } else {
          setEnd(iso);
          setActiveQuick(null);
        }
      }
    }
  }

  function handleQuickRange(qr: QuickRange): void {
    const { start: s, end: e } = resolveQuickRange(qr.days);
    setStart(toISO(s));
    setEnd(toISO(e));
    setActiveField("from");
    setHoverDate(null);
    setActiveQuick(qr.label);

    const shortRanges = ["Today", "Yesterday", "This week", "Last week", "This month", "Last month"];
    if (shortRanges.includes(qr.label)) {
      const now  = new Date();
      const curM = now.getMonth();
      const curY = now.getFullYear();
      if (qr.label === "Last month") {
        const leftM = curM === 0 ? 11 : curM - 1;
        const leftY = curM === 0 ? curY - 1 : curY;
        setLeftYear(leftY);
        setLeftMonth(leftM);
        setRightYear(curY);
        setRightMonth(curM);
      } else {
        setLeftYear(curY);
        setLeftMonth(curM);
        setRightYear(curM === 11 ? curY + 1 : curY);
        setRightMonth(curM === 11 ? 0 : curM + 1);
      }
    } else {
      setLeftYear(s.getFullYear());
      setLeftMonth(s.getMonth());
      setRightYear(e.getFullYear());
      setRightMonth(e.getMonth());
    }
  }

  function handleReset(): void {
    setStart("");
    setEnd("");
    setActiveField("from");
    setHoverDate(null);
    setActiveQuick(null);
  }

  function handleApply(): void {
    if (start && onApply) onApply({ start, end: end || start });
    setOpen(false);
  }

  function prevMonth(): void {
    if (leftMonth === 0) { setLeftMonth(11); setLeftYear((y) => y - 1); }
    else setLeftMonth((m) => m - 1);
    if (rightMonth === 0) { setRightMonth(11); setRightYear((y) => y - 1); }
    else setRightMonth((m) => m - 1);
  }

  function nextMonth(): void {
    if (leftMonth === 11) { setLeftMonth(0); setLeftYear((y) => y + 1); }
    else setLeftMonth((m) => m + 1);
    if (rightMonth === 11) { setRightMonth(0); setRightYear((y) => y + 1); }
    else setRightMonth((m) => m + 1);
  }

  const displayLabel = formatLabel(
    start ? fromISO(start) : null,
    end   ? fromISO(end)   : null,
  );

  const fmtInput = (iso: string): string =>
    iso
      ? fromISO(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "";

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", fontFamily: "Inter, sans-serif" }}>

      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
          padding: "14px 16px",
          fontSize: 12,
          color: "#1F2937",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6B7280" strokeWidth={1.8}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {displayLabel}
        </span>
        <svg
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#6B7280"
          strokeWidth={2}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            zIndex: 999,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 8px 40px rgba(91, 10, 255, 0.12)",
            display: "flex",
            overflow: "hidden",
            minWidth: 680,
          }}
        >
          {/* Quick ranges sidebar */}
          <div style={{ borderRight: "1px solid #F3F4F6", padding: "16px 0", minWidth: 130 }}>
            {QUICK_RANGES.map((qr) => (
              <button
                key={qr.label}
                onClick={() => handleQuickRange(qr)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: activeQuick === qr.label ? "#F5F3FF" : "transparent",
                  color: activeQuick === qr.label ? "#5B0AFF" : "#374151",
                  fontWeight: activeQuick === qr.label ? 600 : 400,
                  border: "none",
                  padding: "9px 20px",
                  fontSize: 13,
                  cursor: "pointer",
                  borderRadius: 0,
                }}
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Calendars + footer */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 0 }}>
            <div style={{ display: "flex", gap: 0, alignItems: "stretch", flex: 1 }}>

              {/* Left calendar */}
              <div style={{ flex: 1, padding: "20px 24px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <button onClick={prevMonth} style={navBtnStyle}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6B7280" strokeWidth={2}>
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1F2937" }}>
                    {MONTHS[leftMonth]} {leftYear}
                  </span>
                  <div style={{ width: 28 }} />
                </div>
                <MonthCalendar
                  year={leftYear} month={leftMonth}
                  hoverDate={hoverDate} activeField={activeField}
                  start={start} end={end}
                  onDayClick={handleDayClick} onDayHover={setHoverDate}
                />
              </div>

              <div style={{ width: 1, background: "#F3F4F6", alignSelf: "stretch", margin: 0 }} />

              {/* Right calendar */}
              <div style={{ flex: 1, padding: "20px 24px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 28 }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1F2937" }}>
                    {MONTHS[rightMonth]} {rightYear}
                  </span>
                  <button onClick={nextMonth} style={navBtnStyle}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6B7280" strokeWidth={2}>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
                <MonthCalendar
                  year={rightYear} month={rightMonth}
                  hoverDate={hoverDate} activeField={activeField}
                  start={start} end={end}
                  onDayClick={handleDayClick} onDayHover={setHoverDate}
                />
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 0,
                padding: "16px 24px",
                borderTop: "1px solid #F3F4F6",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                <div
                  onClick={() => setActiveField("from")}
                  style={{
                    ...inputStyle,
                    borderColor: activeField === "from" ? "#5B0AFF" : "#E5E7EB",
                    color: start ? (activeField === "from" ? "#5B0AFF" : "#1F2937") : "#9CA3AF",
                    cursor: "pointer",
                    fontWeight: activeField === "from" ? 600 : 400,
                  }}
                >
                  {fmtInput(start) || "Start date"}
                </div>
                <span style={{ color: "#9CA3AF", fontSize: 14 }}>—</span>
                <div
                  onClick={() => setActiveField("to")}
                  style={{
                    ...inputStyle,
                    borderColor: activeField === "to" ? "#5B0AFF" : "#E5E7EB",
                    color: end ? (activeField === "to" ? "#5B0AFF" : "#1F2937") : "#9CA3AF",
                    cursor: "pointer",
                    fontWeight: activeField === "to" ? 600 : 400,
                  }}
                >
                  {fmtInput(end) || "End date"}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={handleReset} style={resetBtnStyle}>Reset</button>
                <button onClick={handleApply} style={applyBtnStyle}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Micro styles ─────────────────────────────────────────────────────────────

const navBtnStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  borderRadius: 6,
};

const inputStyle: React.CSSProperties = {
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: 12,
  color: "#1F2937",
  minWidth: 110,
};

const resetBtnStyle: React.CSSProperties = {
  border: "1px solid #E5E7EB",
  background: "#fff",
  borderRadius: 8,
  padding: "9px 18px",
  fontSize: 13,
  color: "#374151",
  cursor: "pointer",
  fontWeight: 500,
};

const applyBtnStyle: React.CSSProperties = {
  background: "#5B0AFF",
  border: "none",
  borderRadius: 8,
  padding: "9px 22px",
  fontSize: 13,
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};