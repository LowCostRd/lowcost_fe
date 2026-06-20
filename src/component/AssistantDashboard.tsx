// import { useEffect, useRef, useState, useMemo } from "react";
// import AssistantsView from "./AssistantsView";
// import TeamsView from "./TeamsView";
// import Icons from "../assets/Icons";

// import { useUIStore } from "../store/UseUIStore";
// import CreateAssistantModal from "./CreateAssistantModal";
// import { useAgentStore } from "../store/AssistantStore";

// const SPECIALTIES = [
//   "General Practice",
//   "Dental",
//   "Optometry",
//   "Pediatrics",
//   "Pharmacy",
//   "Mental Health",
//   "Dermatology",
//   "OB/GYN",
//   "Orthopedics",
// ];

// type DateRange = { start: string; end: string };

// const ChevronSmall = ({ active }: { active: boolean }) => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 17 17"
//     fill="none"
//     className={`transition-transform ${active ? "rotate-180" : ""}`}
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M14.1106 6.37495L9.49229 10.9933C8.94688 11.5387 8.05438 11.5387 7.50896 10.9933L2.89063 6.37495"
//       stroke={active ? "#5B0AFF" : "#6B7280"}
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const AssistantDashboard = () => {
//   const { assistantActiveTab, setAssistantActiveTab } = useUIStore();
//   const [showCreateMenu, setShowCreateMenu] = useState(false);
//   const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);

//   const [showFilterMenu, setShowFilterMenu] = useState(false);
//   const [activeFilterTab, setActiveFilterTab] = useState<"date" | "specialty" | null>(null);
//   const filterMenuRef = useRef<HTMLDivElement | null>(null);

//   // Committed filters (actually applied to the list)
//   const [appliedSpecialties, setAppliedSpecialties] = useState<string[]>([]);
//   const [appliedDateRange, setAppliedDateRange] = useState<DateRange | null>(null);

//   // Draft filters (only committed on "Apply")
//   const [draftSpecialties, setDraftSpecialties] = useState<string[]>([]);
//   const [draftDateRange, setDraftDateRange] = useState<DateRange | null>(null);

//   const hasDraftSelection =
//     draftSpecialties.length > 0 ||
//     (draftDateRange !== null && (draftDateRange.start !== "" || draftDateRange.end !== ""));

//   const [searchQuery, setSearchQuery] = useState("");
//   const { agents, isLoadingAgents, fetchAgents } = useAgentStore();
//   const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // instantly filter what's already on screen
//   const displayedAgents = useMemo(() => {
//     const q = searchQuery.trim().toLowerCase();
//     return agents.filter((a) => {
//       const matchesQuery =
//         !q ||
//         a.name.toLowerCase().includes(q) ||
//         a.specialty.toLowerCase().includes(q);

//       const matchesSpecialty =
//         appliedSpecialties.length === 0 ||
//         appliedSpecialties.includes(a.specialty);

//       // Assumes agent has a createdAt/date field — adjust the key to match your data
//       const matchesDate = (() => {
//         if (!appliedDateRange || (!appliedDateRange.start && !appliedDateRange.end)) return true;
//         const created = new Date(a.created_at).getTime();
//         const afterStart = appliedDateRange.start
//           ? created >= new Date(appliedDateRange.start).getTime()
//           : true;
//         const beforeEnd = appliedDateRange.end
//           ? created <= new Date(appliedDateRange.end).getTime()
//           : true;
//         return afterStart && beforeEnd;
//       })();

//       return matchesQuery && matchesSpecialty && matchesDate;
//     });
//   }, [agents, searchQuery, appliedSpecialties, appliedDateRange]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value); // updates displayedAgents instantly via useMemo

//     if (debounceRef.current) clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(() => {
//       fetchAgents({ search: value }); // syncs with server in the background
//     }, 400);
//   };

//   useEffect(() => {
//     return () => {
//       if (debounceRef.current) clearTimeout(debounceRef.current);
//     };
//   }, []);

//   // Close filter menu on outside click — discard any unsaved draft changes
//   useEffect(() => {
//     if (!showFilterMenu) return;

//     const handleClickOutside = (e: MouseEvent) => {
//       if (filterMenuRef.current && !filterMenuRef.current.contains(e.target as Node)) {
//         setShowFilterMenu(false);
//         setActiveFilterTab(null);
//         setDraftSpecialties(appliedSpecialties); // revert unsaved changes
//         setDraftDateRange(appliedDateRange);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showFilterMenu, appliedSpecialties, appliedDateRange]);

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     if (debounceRef.current) clearTimeout(debounceRef.current);
//     fetchAgents({ search: "" });
//   };

//   const openFilterMenu = () => {
//     setDraftSpecialties(appliedSpecialties); // seed draft with last-applied state
//     setDraftDateRange(appliedDateRange);
//     setShowFilterMenu((s) => !s);
//   };

//   const toggleSpecialty = (specialty: string) => {
//     setDraftSpecialties((prev) =>
//       prev.includes(specialty)
//         ? prev.filter((s) => s !== specialty)
//         : [...prev, specialty]
//     );
//   };

//   const handleCancelFilters = () => {
//     setDraftSpecialties(appliedSpecialties); // discard unsaved changes
//     setDraftDateRange(appliedDateRange);
//     setShowFilterMenu(false);
//     setActiveFilterTab(null);
//   };

//   const handleApplyFilters = () => {
//     setAppliedSpecialties(draftSpecialties);
//     setAppliedDateRange(draftDateRange);
//     fetchAgents({
//       search: searchQuery,
//    //   specialties: draftSpecialties,
//     //  dateFrom: draftDateRange?.start || undefined,
//    //   dateTo: draftDateRange?.end || undefined,
//     });
//     setShowFilterMenu(false);
//     setActiveFilterTab(null);
//   };

//   return (
//     <div className="min-h-screen  bg-[#F8F8F8] font-sans p-6">
//       <div className="bg-white min-h-screen rounded-[20px] p-6  mx-auto relative">
//         {/* ── Header row ── */}
//         <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
//           {/* Tabs */}
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setAssistantActiveTab("assistants")}
//               className={`px-9 py-3 rounded-full font-medium text-[14px] cursor-pointer transition-all ${
//                 assistantActiveTab === "assistants"
//                   ? "bg-[#F2EBFF] text-[#5B0AFF] border-[#5B0AFF] border"
//                   : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
//               }`}
//             >
//               Assistants
//             </button>
//             <button
//               onClick={() => setAssistantActiveTab("teams")}
//               className={`px-9 py-3 rounded-full font-medium text-[14px] cursor-pointer transition-all ${
//                 assistantActiveTab === "teams"
//                   ? "bg-[#F2EBFF] text-[#5B0AFF] border-[#5B0AFF] border"
//                   : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
//               }`}
//             >
//               Teams
//             </button>
//           </div>

//           {/* Search + filter + create */}
//           <div className="flex items-center gap-3  mr-12 ">
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
//                 {Icons.search}
//               </span>
//               <input
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 type="text"
//                 placeholder="Search"
//                 className="w-95 h-15 pl-11 pr-24 rounded-lg border border-[#E5E7EB] text-[14px] text-[#1F2937] placeholder-[#6B7280] outline-none focus:border-[#5B0AFF]"
//               />

//               <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
//                 {searchQuery && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={handleClearSearch}
//                       className="text-[#6B7280] hover:text-[#1F2937] transition-colors cursor-pointer flex items-center justify-center"
//                       aria-label="Clear search"
//                     >
//                       {Icons.searchCancel}
//                     </button>
//                     <span className="block h-5 w-px bg-[#D1D5DB]" />
//                   </>
//                 )}

//                 <div className="relative" ref={filterMenuRef}>
//                   <button
//                     onClick={openFilterMenu}
//                     className={`p-2.5 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
//                       showFilterMenu || appliedSpecialties.length > 0 || appliedDateRange
//                         ? "bg-[#FAF8FF] text-[#5B0AFF]"
//                         : "text-[#6B7280] hover:bg-[#FAF8FF]"
//                     }`}
//                   >
//                     {Icons.filter}
//                   </button>

//                   {(appliedSpecialties.length > 0 || appliedDateRange) && (
//                     <span className="absolute -top-1 -right-1 text-[10px] font-semibold bg-[#5B0AFF] text-white rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
//                       {appliedSpecialties.length + (appliedDateRange ? 1 : 0)}
//                     </span>
//                   )}

//                   {showFilterMenu && (
//                     <div className="absolute right-0 mt-5 w-130 bg-[#FFFFFF] rounded-2xl border border-[#F3F4F6] shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-20">
//                       {/* Filter tabs */}
//                       <div className="flex items-center mb-10 gap-3 px-6 py-6">
//                         <span className="text-[#6B7280] text-[12px] whitespace-nowrap">
//                           Filter by:
//                         </span>

//                         <button
//                           onClick={() =>
//                             setActiveFilterTab((t) => (t === "date" ? null : "date"))
//                           }
//                           className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-[13px] font-medium transition-colors cursor-pointer ${
//                             activeFilterTab === "date"
//                               ? "border-[#5B0AFF] text-[#5B0AFF]"
//                               : "border-[#E5E7EB] text-[#1F2937] hover:border-[#D1D5DB]"
//                           }`}
//                         >
//                           Date
//                           <ChevronSmall active={activeFilterTab === "date"} />
//                         </button>

//                         <button
//                           onClick={() =>
//                             setActiveFilterTab((t) => (t === "specialty" ? null : "specialty"))
//                           }
//                           className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-[13px] font-medium transition-colors cursor-pointer ${
//                             activeFilterTab === "specialty"
//                               ? "border-[#5B0AFF] text-[#5B0AFF]"
//                               : "border-[#E5E7EB] text-[#1F2937] hover:border-[#D1D5DB]"
//                           }`}
//                         >
//                           Specialty
//                           {draftSpecialties.length > 0 && (
//                             <span className="text-[10px] font-semibold bg-[#5B0AFF] text-white rounded-full w-4 h-4 flex items-center justify-center">
//                               {draftSpecialties.length}
//                             </span>
//                           )}
//                           <ChevronSmall active={activeFilterTab === "specialty"} />
//                         </button>
//                       </div>

//                       {/* Date range pickers */}
//                       {activeFilterTab === "date" && (
//                         <div className="px-6 pb-6 -mt-10">
//                           <div className="flex items-center gap-4">
//                             <fieldset className="flex-1 rounded-xl border border-[#E5E7EB] px-4 pt-0 pb-2.5">
//                               <legend className="px-1.5 ml-2 text-[12px] text-[#9CA3AF]">
//                                 From
//                               </legend>
//                               <input
//                                 type="date"
//                                 value={draftDateRange?.start ?? ""}
//                                 onChange={(e) =>
//                                   setDraftDateRange((prev) => ({
//                                     start: e.target.value,
//                                     end: prev?.end ?? "",
//                                   }))
//                                 }
//                                 className="w-40 bg-transparent text-[13px] font-medium text-[#374151] outline-none cursor-pointer scheme-light"
//                               />
//                             </fieldset>

//                             <span className="text-[#9CA3AF] text-[18px] mb-2.5">—</span>

//                             <fieldset className="flex-1 rounded-xl border border-[#E5E7EB] px-4 pt-0 pb-2.5">
//                               <legend className="px-1.5 ml-2 text-[12px] text-[#9CA3AF]">
//                                 To
//                               </legend>
//                               <input
//                                 type="date"
//                                 value={draftDateRange?.end ?? ""}
//                                 onChange={(e) =>
//                                   setDraftDateRange((prev) => ({
//                                     start: prev?.start ?? "",
//                                     end: e.target.value,
//                                   }))
//                                 }
//                                 className="w-40 bg-transparent text-[13px] font-medium text-[#374151] outline-none cursor-pointer scheme-light"
//                               />
//                             </fieldset>
//                           </div>
//                         </div>
//                       )}

//                       {/* Specialty pill grid */}
//                       {activeFilterTab === "specialty" && (
//                         <div className="px-6 pb-6 -mt-10">
//                           <div className="flex flex-wrap gap-3">
//                             {SPECIALTIES.map((specialty) => {
//                               const isSelected = draftSpecialties.includes(specialty);
//                               return (
//                                 <button
//                                   key={specialty}
//                                   onClick={() => toggleSpecialty(specialty)}
//                                   className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
//                                     isSelected
//                                       ? "bg-[#F2EBFF] text-[#5B0AFF]"
//                                       : "bg-[#F5F5F5] text-[#4B5563] hover:bg-[#EFEFEF]"
//                                   }`}
//                                 >
//                                   {specialty}
//                                 </button>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       )}

//                       <hr className="border-[#F3F4F6]" />

//                       <div className="flex items-center justify-end gap-3 px-6 py-5">
//                         <button
//                           onClick={handleCancelFilters}
//                           className="px-6 py-3 rounded-xl border border-[#E5E7EB] text-[#1F2937] font-medium text-[12px] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleApplyFilters}
//                           disabled={!hasDraftSelection}
//                           className={`px-6 py-3 rounded-xl text-white font-medium text-[12px] transition-colors cursor-pointer ${
//                             hasDraftSelection
//                               ? "bg-[#5B0AFF] hover:bg-[#4A08D4]"
//                               : "bg-[#9B6AFF] hover:bg-[#6D28D9]"
//                           }`}
//                         >
//                           Apply
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setShowCreateMenu((s) => !s)}
//                 className="h-15 px-6 rounded-lg bg-[#5B0AFF] text-white font-semibold text-[15px] flex items-center gap-2 hover:bg-[#4A08D4] active:scale-[0.99] cursor-pointer transition-all"
//               >
//                 Create
//                 <span className={`transition-transform ${showCreateMenu ? "" : "rotate-180"}`}>
//                   {Icons.chevron}
//                 </span>
//               </button>

//               {showCreateMenu && (
//                 <>
//                   {/* Click-outside backdrop */}
//                   <div className="fixed inset-0 z-10" onClick={() => setShowCreateMenu(false)} />

//                   <div className="absolute right-0 mt-2 w-110 bg-white rounded-2xl border border-[#F3F4F6] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-20">
//                     <button
//                       className="w-full text-left flex items-start gap-3 px-5 py-4 bg-[#F3ECFF] cursor-pointer transition-colors"
//                       onClick={() => {
//                         setShowCreateMenu(true);
//                         setShowSpecialtyModal(true);
//                       }}
//                     >
//                       <span className="text-[#5B0AFF] mt-0.5">{Icons.person}</span>
//                       <span>
//                         <span className="block text-[#7029FF] font-medium text-[14px] mb-0.5">
//                           New Assistant
//                         </span>
//                         <span className="block text-[#7029FF] font-normal text-[13px] leading-snug opacity-80">
//                           Build one dedicated AI assistant for a specific role.
//                         </span>
//                       </span>
//                     </button>

//                     <button className="w-full text-left flex items-start gap-3 px-5 py-4 bg-white cursor-not-allowed">
//                       <span className="text-[#1F2937] mt-0.5">{Icons.team}</span>
//                       <span>
//                         <span className="flex items-center gap-2 mb-0.5">
//                           <span className="text-[#212123] font-medium text-[15px]">
//                             Assistant Team
//                           </span>
//                           <span className="text-[10px] font-medium text-[#FC8541] bg-[#FFEFE8] rounded-full px-2 py-0.5">
//                             Coming Soon
//                           </span>
//                         </span>
//                         <span className="block text-[#585859] font-normal text-[13px] leading-snug">
//                           Group multiple assistants to work together across workflows.
//                         </span>
//                       </span>
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {showSpecialtyModal && (
//           <CreateAssistantModal onClose={() => setShowSpecialtyModal(false)} />
//         )}

//         {/* ── Content ── */}
//         {assistantActiveTab === "assistants" ? (
//           <AssistantsView
//             agents={displayedAgents}
//             isLoading={isLoadingAgents}
//             searchQuery={searchQuery}
//           />
//         ) : (
//           <TeamsView />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AssistantDashboard;


import { useEffect, useRef, useState, useMemo } from "react";
import AssistantsView from "./AssistantsView";
import TeamsView from "./TeamsView";
import Icons from "../assets/Icons";

import { useUIStore } from "../store/UseUIStore";
import CreateAssistantModal from "./CreateAssistantModal";
import { useAgentStore } from "../store/AssistantStore";
import DateRangeCalendar, { type DateRange } from "./DateRangeCalendar";

const SPECIALTIES = [
  "General Practice",
  "Dental",
  "Optometry",
  "Pediatrics",
  "Pharmacy",
  "Mental Health",
  "Dermatology",
  "OB/GYN",
  "Orthopedics",
];

const ChevronSmall = ({ active }: { active: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 17 17"
    fill="none"
    className={`transition-transform ${active ? "rotate-180" : ""}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.1106 6.37495L9.49229 10.9933C8.94688 11.5387 8.05438 11.5387 7.50896 10.9933L2.89063 6.37495"
      stroke={active ? "#5B0AFF" : "#6B7280"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AssistantDashboard = () => {
  const { assistantActiveTab, setAssistantActiveTab } = useUIStore();
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<"date" | "specialty" | null>(null);
  const filterMenuRef = useRef<HTMLDivElement | null>(null);

  // Which side of the date range ("from" | "to") the next calendar click fills
  const [activeDateField, setActiveDateField] = useState<"from" | "to">("from");

  // Committed filters (actually applied to the list)
  const [appliedSpecialties, setAppliedSpecialties] = useState<string[]>([]);
  const [appliedDateRange, setAppliedDateRange] = useState<DateRange | null>(null);

  // Draft filters (only committed on "Apply")
  const [draftSpecialties, setDraftSpecialties] = useState<string[]>([]);
  const [draftDateRange, setDraftDateRange] = useState<DateRange | null>(null);

  const hasDraftSelection =
    draftSpecialties.length > 0 ||
    (draftDateRange !== null && (draftDateRange.start !== "" || draftDateRange.end !== ""));

  const [searchQuery, setSearchQuery] = useState("");
  const { agents, isLoadingAgents, fetchAgents } = useAgentStore();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // instantly filter what's already on screen
  const displayedAgents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return agents.filter((a) => {
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.specialty.toLowerCase().includes(q);

      const matchesSpecialty =
        appliedSpecialties.length === 0 ||
        appliedSpecialties.includes(a.specialty);

      // Assumes agent has a createdAt/date field — adjust the key to match your data
      const matchesDate = (() => {
        if (!appliedDateRange || (!appliedDateRange.start && !appliedDateRange.end)) return true;
        const created = new Date(a.created_at).getTime();
        const afterStart = appliedDateRange.start
          ? created >= new Date(appliedDateRange.start).getTime()
          : true;
        const beforeEnd = appliedDateRange.end
          ? created <= new Date(appliedDateRange.end).getTime()
          : true;
        return afterStart && beforeEnd;
      })();

      return matchesQuery && matchesSpecialty && matchesDate;
    });
  }, [agents, searchQuery, appliedSpecialties, appliedDateRange]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value); // updates displayedAgents instantly via useMemo

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchAgents({ search: value }); // syncs with server in the background
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Close filter menu on outside click — discard any unsaved draft changes
  useEffect(() => {
    if (!showFilterMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target as Node)) {
        setShowFilterMenu(false);
        setActiveFilterTab(null);
        setDraftSpecialties(appliedSpecialties); // revert unsaved changes
        setDraftDateRange(appliedDateRange);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilterMenu, appliedSpecialties, appliedDateRange]);

  const handleClearSearch = () => {
    setSearchQuery("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    fetchAgents({ search: "" });
  };

  const openFilterMenu = () => {
    setDraftSpecialties(appliedSpecialties); // seed draft with last-applied state
    setDraftDateRange(appliedDateRange);
    setActiveDateField("from");
    setShowFilterMenu((s) => !s);
  };

  const toggleSpecialty = (specialty: string) => {
    setDraftSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleCancelFilters = () => {
    setDraftSpecialties(appliedSpecialties); // discard unsaved changes
    setDraftDateRange(appliedDateRange);
    setShowFilterMenu(false);
    setActiveFilterTab(null);
  };

  const handleApplyFilters = () => {
    setAppliedSpecialties(draftSpecialties);
    setAppliedDateRange(draftDateRange);
    fetchAgents({
      search: searchQuery,
   //   specialties: draftSpecialties,
    //  dateFrom: draftDateRange?.start || undefined,
   //   dateTo: draftDateRange?.end || undefined,
    });
    setShowFilterMenu(false);
    setActiveFilterTab(null);
  };

  return (
    <div className="min-h-screen  bg-[#F8F8F8] font-sans p-6">
      <div className="bg-white min-h-screen rounded-[20px] p-6  mx-auto relative">
        {/* ── Header row ── */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          {/* Tabs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAssistantActiveTab("assistants")}
              className={`px-9 py-3 rounded-full font-medium text-[14px] cursor-pointer transition-all ${
                assistantActiveTab === "assistants"
                  ? "bg-[#F2EBFF] text-[#5B0AFF] border-[#5B0AFF] border"
                  : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
              }`}
            >
              Assistants
            </button>
            <button
              onClick={() => setAssistantActiveTab("teams")}
              className={`px-9 py-3 rounded-full font-medium text-[14px] cursor-pointer transition-all ${
                assistantActiveTab === "teams"
                  ? "bg-[#F2EBFF] text-[#5B0AFF] border-[#5B0AFF] border"
                  : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]"
              }`}
            >
              Teams
            </button>
          </div>

          {/* Search + filter + create */}
          <div className="flex items-center gap-3  mr-12 ">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                {Icons.search}
              </span>
              <input
                value={searchQuery}
                onChange={handleSearch}
                type="text"
                placeholder="Search"
                className="w-95 h-15 pl-11 pr-24 rounded-lg border border-[#E5E7EB] text-[14px] text-[#1F2937] placeholder-[#6B7280] outline-none focus:border-[#5B0AFF]"
              />

              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                {searchQuery && (
                  <>
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="text-[#6B7280] hover:text-[#1F2937] transition-colors cursor-pointer flex items-center justify-center"
                      aria-label="Clear search"
                    >
                      {Icons.searchCancel}
                    </button>
                    <span className="block h-5 w-px bg-[#D1D5DB]" />
                  </>
                )}

                <div className="relative" ref={filterMenuRef}>
                  <button
                    onClick={openFilterMenu}
                    className={`p-2.5 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                      showFilterMenu || appliedSpecialties.length > 0 || appliedDateRange
                        ? "bg-[#FAF8FF] text-[#5B0AFF]"
                        : "text-[#6B7280] hover:bg-[#FAF8FF]"
                    }`}
                  >
                    {Icons.filter}
                  </button>

                  {(appliedSpecialties.length > 0 || appliedDateRange) && (
                    <span className="absolute -top-1 -right-1 text-[10px] font-semibold bg-[#5B0AFF] text-white rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
                      {appliedSpecialties.length + (appliedDateRange ? 1 : 0)}
                    </span>
                  )}

                  {showFilterMenu && (
                    <div className="absolute right-0 mt-5 w-130 bg-[#FFFFFF] rounded-2xl border border-[#F3F4F6] shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-20">
                      {/* Filter tabs */}
                      <div className="flex items-center mb-10 gap-3 px-6 py-6">
                        <span className="text-[#6B7280] text-[12px] whitespace-nowrap">
                          Filter by:
                        </span>

                        <button
                          onClick={() =>
                            setActiveFilterTab((t) => (t === "date" ? null : "date"))
                          }
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-[13px] font-medium transition-colors cursor-pointer ${
                            activeFilterTab === "date"
                              ? "border-[#5B0AFF] text-[#5B0AFF]"
                              : "border-[#E5E7EB] text-[#1F2937] hover:border-[#D1D5DB]"
                          }`}
                        >
                          Date
                          <ChevronSmall active={activeFilterTab === "date"} />
                        </button>

                        <button
                          onClick={() =>
                            setActiveFilterTab((t) => (t === "specialty" ? null : "specialty"))
                          }
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-[13px] font-medium transition-colors cursor-pointer ${
                            activeFilterTab === "specialty"
                              ? "border-[#5B0AFF] text-[#5B0AFF]"
                              : "border-[#E5E7EB] text-[#1F2937] hover:border-[#D1D5DB]"
                          }`}
                        >
                          Specialty
                          {draftSpecialties.length > 0 && (
                            <span className="text-[10px] font-semibold bg-[#5B0AFF] text-white rounded-full w-4 h-4 flex items-center justify-center">
                              {draftSpecialties.length}
                            </span>
                          )}
                          <ChevronSmall active={activeFilterTab === "specialty"} />
                        </button>
                      </div>

                      {/* Custom date range calendar (From/To pills + month grid beneath) */}
                      {activeFilterTab === "date" && (
                        <div className="-mt-10">
                          <DateRangeCalendar
                            value={draftDateRange}
                            onChange={setDraftDateRange}
                            activeField={activeDateField}
                            onActiveFieldChange={setActiveDateField}
                          />
                        </div>
                      )}

                      {/* Specialty pill grid */}
                      {activeFilterTab === "specialty" && (
                        <div className="px-6 pb-6 -mt-10">
                          <div className="flex flex-wrap gap-3">
                            {SPECIALTIES.map((specialty) => {
                              const isSelected = draftSpecialties.includes(specialty);
                              return (
                                <button
                                  key={specialty}
                                  onClick={() => toggleSpecialty(specialty)}
                                  className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                                    isSelected
                                      ? "bg-[#F2EBFF] text-[#5B0AFF]"
                                      : "bg-[#F5F5F5] text-[#4B5563] hover:bg-[#EFEFEF]"
                                  }`}
                                >
                                  {specialty}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <hr className="border-[#F3F4F6]" />

                      <div className="flex items-center justify-end gap-3 px-6 py-5">
                        <button
                          onClick={handleCancelFilters}
                          className="px-6 py-3 rounded-xl border border-[#E5E7EB] text-[#1F2937] font-medium text-[12px] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleApplyFilters}
                          disabled={!hasDraftSelection}
                          className={`px-6 py-3 rounded-xl text-white font-medium text-[12px] transition-colors cursor-pointer ${
                            hasDraftSelection
                              ? "bg-[#5B0AFF] hover:bg-[#4A08D4]"
                              : "bg-[#9B6AFF] hover:bg-[#6D28D9]"
                          }`}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowCreateMenu((s) => !s)}
                className="h-15 px-6 rounded-lg bg-[#5B0AFF] text-white font-semibold text-[15px] flex items-center gap-2 hover:bg-[#4A08D4] active:scale-[0.99] cursor-pointer transition-all"
              >
                Create
                <span className={`transition-transform ${showCreateMenu ? "" : "rotate-180"}`}>
                  {Icons.chevron}
                </span>
              </button>

              {showCreateMenu && (
                <>
                  {/* Click-outside backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setShowCreateMenu(false)} />

                  <div className="absolute right-0 mt-2 w-110 bg-white rounded-2xl border border-[#F3F4F6] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-20">
                    <button
                      className="w-full text-left flex items-start gap-3 px-5 py-4 bg-[#F3ECFF] cursor-pointer transition-colors"
                      onClick={() => {
                        setShowCreateMenu(true);
                        setShowSpecialtyModal(true);
                      }}
                    >
                      <span className="text-[#5B0AFF] mt-0.5">{Icons.person}</span>
                      <span>
                        <span className="block text-[#7029FF] font-medium text-[14px] mb-0.5">
                          New Assistant
                        </span>
                        <span className="block text-[#7029FF] font-normal text-[13px] leading-snug opacity-80">
                          Build one dedicated AI assistant for a specific role.
                        </span>
                      </span>
                    </button>

                    <button className="w-full text-left flex items-start gap-3 px-5 py-4 bg-white cursor-not-allowed">
                      <span className="text-[#1F2937] mt-0.5">{Icons.team}</span>
                      <span>
                        <span className="flex items-center gap-2 mb-0.5">
                          <span className="text-[#212123] font-medium text-[15px]">
                            Assistant Team
                          </span>
                          <span className="text-[10px] font-medium text-[#FC8541] bg-[#FFEFE8] rounded-full px-2 py-0.5">
                            Coming Soon
                          </span>
                        </span>
                        <span className="block text-[#585859] font-normal text-[13px] leading-snug">
                          Group multiple assistants to work together across workflows.
                        </span>
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {showSpecialtyModal && (
          <CreateAssistantModal onClose={() => setShowSpecialtyModal(false)} />
        )}

        {/* ── Content ── */}
        {assistantActiveTab === "assistants" ? (
          <AssistantsView
            agents={displayedAgents}
            isLoading={isLoadingAgents}
            searchQuery={searchQuery}
          />
        ) : (
          <TeamsView />
        )}
      </div>
    </div>
  );
};

export default AssistantDashboard;