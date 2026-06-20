// import { useState } from "react";

// export type DateRange = { start: string; end: string };

// type ActiveField = "from" | "to";

// type DateRangeCalendarProps = {
//   /** Currently committed/draft range, e.g. { start: "2025-02-15", end: "2025-02-20" } */
//   value: DateRange | null;
//   /** Called whenever the user picks a day */
//   onChange: (range: DateRange) => void;
//   /** Which field ("from" | "to") is currently active/being edited */
//   activeField: ActiveField;
//   /** Called when the user clicks the From or To pill */
//   onActiveFieldChange: (field: ActiveField) => void;
// };

// const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// const MONTH_NAMES = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December",
// ];

// const formatDisplay = (iso: string) => {
//   if (!iso) return "";
//   const [y, m, d] = iso.split("-").map(Number);
//   const date = new Date(y, m - 1, d);
//   return `${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
// };

// const toISO = (date: Date) => {
//   const y = date.getFullYear();
//   const m = String(date.getMonth() + 1).padStart(2, "0");
//   const d = String(date.getDate()).padStart(2, "0");
//   return `${y}-${m}-${d}`;
// };

// const startOfDay = (date: Date) => {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d;
// };

// const ChevronLeft = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M15 18L9 12L15 6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const ChevronRight = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M9 6L15 12L9 18" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// /**
//  * Self-contained custom date-range calendar.
//  * Renders the From/To pills + a month grid beneath them.
//  * - Clicking From/To switches which field the next day-click fills.
//  * - Only past/current dates are selectable; future dates are disabled.
//  * - No native <input type="date">, so no browser calendar icon/UI.
//  */
// const DateRangeCalendar = ({
//   value,
//   onChange,
//   activeField,
//   onActiveFieldChange,
// }: DateRangeCalendarProps) => {
//   const today = startOfDay(new Date());
//   const [viewDate, setViewDate] = useState(() => {
//     const seed = value?.start || value?.end;
//     return seed ? new Date(seed) : new Date();
//   });

//   const start = value?.start || "";
//   const end = value?.end || "";

//   const goPrevMonth = () =>
//     setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
//   const goNextMonth = () =>
//     setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

//   const handlePillClick = (field: ActiveField) => {
//     onActiveFieldChange(field);
//   };

// const handleDayClick = (date: Date) => {
//   if (date > today) return;

//   const iso = toISO(date);

//   if (activeField === "from") {
//     if (iso === start) {
//       // Deselect — stay on "from"
//       onChange({ start: "", end });
//     } else {
//       // New date selected — move to "to"
//       const nextEnd = end && iso > end ? "" : end;
//       onChange({ start: iso, end: nextEnd });
//       onActiveFieldChange("to");
//     }
//   } else {
//     if (iso === end) {
//       // Deselect — stay on "to"
//       onChange({ start, end: "" });
//     } else {
//       if (start && iso < start) {
//         onChange({ start: iso, end: start });
//       } else {
//         onChange({ start, end: iso });
//       }
//     }
//   }
// };

//   // Build calendar grid (Mon-start, 6 rows x 7 cols, including leading/trailing days)
//   const year = viewDate.getFullYear();
//   const month = viewDate.getMonth();
//   const firstOfMonth = new Date(year, month, 1);
//   // 0=Sun..6=Sat -> convert to Mon-start index (0=Mon..6=Sun)
//   const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
//   const gridStart = new Date(year, month, 1 - firstWeekday);

//   const days: Date[] = Array.from({ length: 42 }, (_, i) => {
//     const d = new Date(gridStart);
//     d.setDate(gridStart.getDate() + i);
//     return d;
//   });

//   const isSameDay = (a: Date, b: string) => !!b && toISO(a) === b;
//   const isInRange = (d: Date) => {
//     if (!start || !end) return false;
//     const iso = toISO(d);
//     return iso > start && iso < end;
//   };

//   return (
//     <div className="w-full select-none">
//       {/* From / To pills */}
//       <div className="flex items-center gap-4 px-6 pt-2 pb-5">
//         <fieldset
//           onClick={() => handlePillClick("from")}
//           className={`flex-1 rounded-xl border px-4 pt-0 pb-2.5 cursor-pointer transition-colors ${
//             activeField === "from"
//               ? "border-[#5B0AFF]"
//               : "border-[#E5E7EB] hover:border-[#D1D5DB]"
//           }`}
//         >
//           <legend className="px-1.5 ml-2 text-[12px] text-[#9CA3AF]">From</legend>
//           <span
//             className={`block text-[14px] font-medium ${
//               start ? "text-[#5B0AFF]" : "text-[#9CA3AF] font-normal"
//             }`}
//           >
//             {start ? formatDisplay(start) : "Select date"}
//           </span>
//         </fieldset>

//         <span className="text-[#9CA3AF] text-[18px] mb-2.5">—</span>

//         <fieldset
//           onClick={() => handlePillClick("to")}
//           className={`flex-1 rounded-xl border px-4 pt-0 pb-2.5 cursor-pointer transition-colors ${
//             activeField === "to"
//               ? "border-[#5B0AFF]"
//               : "border-[#E5E7EB] hover:border-[#D1D5DB]"
//           }`}
//         >
//           <legend className="px-1.5 ml-2 text-[12px] text-[#9CA3AF]">To</legend>
//           <span
//             className={`block text-[14px] font-medium ${
//               end ? "text-[#5B0AFF]" : "text-[#9CA3AF] font-normal"
//             }`}
//           >
//             {end ? formatDisplay(end) : "Select date"}
//           </span>
//         </fieldset>
//       </div>

//       {/* Calendar panel beneath the pills */}
//       <div className="px-6 pb-2">
//         {/* Month header */}
//         <div className="flex items-center justify-evenly mb-5">
//           <button
//             type="button"
//             onClick={goPrevMonth}
//             className="p-1.5 rounded-lg hover:bg-[#F3F4F6] cursor-pointer transition-colors"
//             aria-label="Previous month"
//           >
//             <ChevronLeft />
//           </button>
//           <span className="text-[15px] font-semibold text-[#1F2937]">
//             {MONTH_NAMES[month]} {year}
//           </span>
//           <button
//             type="button"
//             onClick={goNextMonth}
//             className="p-1.5 rounded-lg hover:bg-[#F3F4F6] cursor-pointer transition-colors"
//             aria-label="Next month"
//           >
//             <ChevronRight />
//           </button>
//         </div>

//         {/* Weekday row */}
//         <div className="grid grid-cols-7 mb-2">
//           {WEEKDAYS.map((wd) => (
//             <span
//               key={wd}
//               className="text-[12px] font-medium text-[#1F2937] text-center py-1"
//             >
//               {wd}
//             </span>
//           ))}
//         </div>

//         {/* Day grid */}
//         <div className="grid grid-cols-7 gap-y-3">
//           {days.map((d, i) => {
//             const inCurrentMonth = d.getMonth() === month;
//             const isFuture = d > today;
//             const isStart = isSameDay(d, start);
//             const isEnd = isSameDay(d, end);
//             const ranged = isInRange(d);
//             const isToday = toISO(d) === toISO(today);

//             const disabled = isFuture;

//             return (
//               <div key={i} className="flex items-center justify-center relative">
//                 {/* range background strip */}
//                 {ranged && (
//                   <span className="absolute inset-y-0 left-0 right-0 bg-[#F2EBFF] -z-10" />
//                 )}
//                 {(isStart && end) && (
//                   <span className="absolute inset-y-0 left-1/2 right-0 bg-[#F2EBFF] -z-10" />
//                 )}
//                 {(isEnd && start) && (
//                   <span className="absolute inset-y-0 right-1/2 left-0 bg-[#F2EBFF] -z-10" />
//                 )}

//                 <button
//                   type="button"
//                   disabled={disabled}
//                   onClick={() => handleDayClick(d)}
//                   className={`w-9 h-9 rounded-full text-[14px] flex items-center justify-center transition-colors
//                     ${disabled ? "text-[#606671] cursor-not-allowed" : "cursor-pointer"}
//                     ${!disabled && !inCurrentMonth ? "text-[#C4C7CC]" : ""}
//                     ${!disabled && inCurrentMonth && !isStart && !isEnd ? "text-[#1F2937] hover:bg-[#F3F4F6]" : ""}
//                     ${(isStart || isEnd) && !disabled ? "bg-[#5B0AFF] text-white font-semibold" : ""}
//                     ${isToday && !isStart && !isEnd && !disabled ? "border border-[#5B0AFF] text-[#5B0AFF] font-semibold" : ""}
//                   `}
//                 >
//                   {d.getDate()}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DateRangeCalendar;


import { useState } from "react";

export type DateRange = { start: string; end: string };

type ActiveField = "from" | "to";

type DateRangeCalendarProps = {
  /** Currently committed/draft range, e.g. { start: "2025-02-15", end: "2025-02-20" } */
  value: DateRange | null;
  /** Called whenever the user picks a day */
  onChange: (range: DateRange) => void;
  /** Which field ("from" | "to") is currently active/being edited */
  activeField: ActiveField;
  /** Called when the user clicks the From or To pill */
  onActiveFieldChange: (field: ActiveField) => void;
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const formatDisplay = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
};

const toISO = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Self-contained custom date-range calendar.
 * Renders the From/To pills + a month grid beneath them.
 *
 * Interaction rules:
 * - Clicking a date while "from" is empty → selects it, stays on "from"
 * - Clicking a second (different) date while "from" already has a value →
 *     if after start: sets it as "to" and moves focus to "to"
 *     if before start: replaces start, clears end, stays on "from"
 * - Clicking the already-selected "from" date → deselects it, stays on "from"
 * - While "to" is empty → clicking a date selects it (swaps if before start)
 * - While "to" already has a value → clicking does nothing; user must deselect first
 * - Clicking the already-selected "to" date → deselects it, stays on "to"
 */
const DateRangeCalendar = ({
  value,
  onChange,
  activeField,
  onActiveFieldChange,
}: DateRangeCalendarProps) => {
  const today = startOfDay(new Date());
  const [viewDate, setViewDate] = useState(() => {
    const seed = value?.start || value?.end;
    return seed ? new Date(seed) : new Date();
  });

  const start = value?.start || "";
  const end = value?.end || "";

  const goPrevMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNextMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const handlePillClick = (field: ActiveField) => {
    onActiveFieldChange(field);
  };

  const handleDayClick = (date: Date) => {
    if (date > today) return;

    const iso = toISO(date);

    if (activeField === "from") {
      if (iso === start) {
        // Deselect current "from" date — preserve end, stay on "from"
        onChange({ start: "", end });
      } else if (!start) {
        // Nothing selected yet — select it, stay on "from"
        onChange({ start: iso, end });
      } else if (!end) {
        // "from" filled but "to" empty — treat this click as picking "to"
        if (iso > start) {
          onChange({ start, end: iso });
          onActiveFieldChange("to");
        } else {
          // Clicked before start — replace start, stay on "from"
          onChange({ start: iso, end: "" });
        }
      }
      // Both start AND end already set: only the start button is clickable
      // (everything else is locked via fromFieldLocked), so no else branch needed.
    } else {
      // activeField === "to"
      if (iso === end) {
        // Deselect current "to" date — stay on "to"
        onChange({ start, end: "" });
      } else if (!end) {
        // Nothing selected yet — select it
        if (start && iso < start) {
          // Clicked before start — swap them
          onChange({ start: iso, end: start });
        } else {
          onChange({ start, end: iso });
        }
      }
      // "to" already has a value → do nothing; user must deselect first
    }
  };

  // Build calendar grid (Mon-start, 6 rows x 7 cols, including leading/trailing days)
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  // 0=Sun..6=Sat -> convert to Mon-start index (0=Mon..6=Sun)
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(year, month, 1 - firstWeekday);

  const days: Date[] = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });

  const isSameDay = (a: Date, b: string) => !!b && toISO(a) === b;
  const isInRange = (d: Date) => {
    if (!start || !end) return false;
    const iso = toISO(d);
    return iso > start && iso < end;
  };

  return (
    <div className="w-full select-none">
      {/* From / To pills */}
      <div className="flex items-center gap-4 px-6 pt-2 pb-5">
        <fieldset
          onClick={() => handlePillClick("from")}
          className={`flex-1 rounded-xl border px-4 pt-0 pb-2.5 cursor-pointer transition-colors ${
            activeField === "from"
              ? "border-[#5B0AFF]"
              : "border-[#E5E7EB] hover:border-[#D1D5DB]"
          }`}
        >
          <legend className="px-1.5 ml-2 text-[12px] text-[#9CA3AF]">From</legend>
          <span
            className={`block text-[14px] font-medium ${
              start ? "text-[#5B0AFF]" : "text-[#9CA3AF] font-normal"
            }`}
          >
            {start ? formatDisplay(start) : "Select date"}
          </span>
        </fieldset>

        <span className="text-[#9CA3AF] text-[18px] mb-2.5">—</span>

        <fieldset
          onClick={() => handlePillClick("to")}
          className={`flex-1 rounded-xl border px-4 pt-0 pb-2.5 cursor-pointer transition-colors ${
            activeField === "to"
              ? "border-[#5B0AFF]"
              : "border-[#E5E7EB] hover:border-[#D1D5DB]"
          }`}
        >
          <legend className="px-1.5 ml-2 text-[12px] text-[#9CA3AF]">To</legend>
          <span
            className={`block text-[14px] font-medium ${
              end ? "text-[#5B0AFF]" : "text-[#9CA3AF] font-normal"
            }`}
          >
            {end ? formatDisplay(end) : "Select date"}
          </span>
        </fieldset>
      </div>

      {/* Calendar panel beneath the pills */}
      <div className="px-6 pb-2">
        {/* Month header */}
        <div className="flex items-center justify-evenly mb-5">
          <button
            type="button"
            onClick={goPrevMonth}
            className="p-1.5 rounded-lg hover:bg-[#F3F4F6] cursor-pointer transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft />
          </button>
          <span className="text-[15px] font-semibold text-[#1F2937]">
            {MONTH_NAMES[month]} {year}
          </span>
          <button
            type="button"
            onClick={goNextMonth}
            className="p-1.5 rounded-lg hover:bg-[#F3F4F6] cursor-pointer transition-colors"
            aria-label="Next month"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Weekday row */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((wd) => (
            <span
              key={wd}
              className="text-[12px] font-medium text-[#1F2937] text-center py-1"
            >
              {wd}
            </span>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-y-3">
          {days.map((d, i) => {
            const inCurrentMonth = d.getMonth() === month;
            const isFuture = d > today;
            const isStart = isSameDay(d, start);
            const isEnd = isSameDay(d, end);
            const ranged = isInRange(d);
            const isToday = toISO(d) === toISO(today);

            // Unclickable when: future date, OR in "from" mode with both dates set
            // and this isn't the start (must deselect start first), OR in "to" mode
            // with end set and this isn't the end (must deselect end first).
            // Never disable the actual selected endpoint — those must stay clickable
            // so the user can deselect them.
            const fromFieldLocked = activeField === "from" && !!start && !!end && !isStart;
            const toFieldLocked   = activeField === "to"   && !!end   && !isEnd;
            const disabled = isFuture || fromFieldLocked || toFieldLocked;

            // Selected endpoints always show the purple circle, regardless of
            // whether other dates are locked — keeps start visible when focus
            // moves to "to", and keeps end visible when focus moves back to "from".
            const isSelected = isStart || isEnd;

            return (
              <div key={i} className="flex items-center justify-center relative">
                {/* range background strip */}
                {ranged && (
                  <span className="absolute inset-y-0 left-0 right-0 bg-[#F2EBFF] -z-10" />
                )}
                {(isStart && end) && (
                  <span className="absolute inset-y-0 left-1/2 right-0 bg-[#F2EBFF] -z-10" />
                )}
                {(isEnd && start) && (
                  <span className="absolute inset-y-0 right-1/2 left-0 bg-[#F2EBFF] -z-10" />
                )}

                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => handleDayClick(d)}
                  className={`w-9 h-9 rounded-full text-[14px] flex items-center justify-center transition-colors
                    ${disabled && !isSelected ? "text-[#606671] cursor-not-allowed" : ""}
                    ${!isSelected && !disabled && !inCurrentMonth ? "text-[#C4C7CC]" : ""}
                    ${!isSelected && !disabled && inCurrentMonth ? "text-[#1F2937] hover:bg-[#F3F4F6]" : ""}
                    ${isSelected ? "bg-[#5B0AFF] text-white font-semibold cursor-pointer" : ""}
                    ${isToday && !isSelected && !disabled ? "border border-[#5B0AFF] text-[#5B0AFF] font-semibold" : ""}
                  `}
                >
                  {d.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DateRangeCalendar;