import { useEffect, useRef, useState, useMemo } from "react";
import AssistantsView from "./AssistantsView";
import TeamsView from "./TeamsView";
import Icons from "../assets/Icons";

import { useUIStore } from "../store/UseUIStore";
import CreateAssistantModal from "./CreateAssistantModal";
import { useAgentStore } from "../store/AssistantStore";
import DateRangeCalendar, { type DateRange } from "./DateRangeCalendar";
import type { AgentListFilters } from "../type/assistant";

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

// Agent.created_at / updated_at can come back as a plain ISO string OR as a
// Mongo extended-JSON wrapper { $date: string }. This normalizes either shape
// into a value `new Date()` can safely accept.
const toDateValue = (value: string | { $date: string } | null | undefined): string | number => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.$date;
};

// Maps current UI filter state -> AgentListFilters, the exact shape
// fetchAgents()/the backend route expects:
//   { name?, specialty?, search?, date_from?, date_to? }
//
// specialty is sent as a single comma-separated string (e.g. "Dental,Pediatrics");
// the backend route splits on "," before querying.
const buildFilterParams = (
  search: string,
  specialties: string[],
  dateRange: DateRange | null
): AgentListFilters => {
  const filters: AgentListFilters = {};

  if (search) filters.search = search;
  if (specialties.length > 0) filters.specialty = specialties.join(",");
  if (dateRange?.start) filters.date_from = dateRange.start;
  if (dateRange?.end) filters.date_to = dateRange.end;

  return filters;
};

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
  const [isSearchPending, setIsSearchPending] = useState(false);

  // instantly filter what's already on screen (covers the gap while the
  // debounced server request for search text is still in flight; specialty/date
  // are server-applied immediately on Apply, so this just mirrors that too)
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

        const matchesDate = (() => {
          if (!appliedDateRange || (!appliedDateRange.start && !appliedDateRange.end)) return true;
          const created = new Date(toDateValue(a.created_at)).getTime();
          
          const afterStart = appliedDateRange.start
            ? created >= new Date(appliedDateRange.start).getTime()
            : true;
            
          const beforeEnd = appliedDateRange.end
            ? created <= new Date(appliedDateRange.end + "T23:59:59.999").getTime()
            : true;
            
          return afterStart && beforeEnd;
        })();

      return matchesQuery && matchesSpecialty && matchesDate;
    });
  }, [agents, searchQuery, appliedSpecialties, appliedDateRange]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) setIsSearchPending(true); // show skeleton immediately
  
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      await fetchAgents(buildFilterParams(value, appliedSpecialties, appliedDateRange));
      setIsSearchPending(false); // fetch done — now safe to show results or empty state
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
    setIsSearchPending(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    fetchAgents(buildFilterParams("", appliedSpecialties, appliedDateRange));
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
    // Clear both draft AND applied filters
    setDraftSpecialties([]);
    setDraftDateRange(null);
    setAppliedSpecialties([]);
    setAppliedDateRange(null);
    setShowFilterMenu(false);
    setActiveFilterTab(null);
  
    // Refetch with no filters
    fetchAgents(buildFilterParams(searchQuery, [], null));
  };

  const handleApplyFilters = () => {
    setAppliedSpecialties(draftSpecialties);
    setAppliedDateRange(draftDateRange);
    fetchAgents(buildFilterParams(searchQuery, draftSpecialties, draftDateRange));
    setShowFilterMenu(false);
    setActiveFilterTab(null);
  };

  return (
    <div className="min-h-screen  bg-[#F8F8F8]  p-6">
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
                    <div className="absolute -right-6 mt-5 w-130 bg-[#FFFFFF] rounded-2xl border border-[#F3F4F6] shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-20">
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
        isLoading={isLoadingAgents || isSearchPending}
        searchQuery={searchQuery}
        hasActiveFilters={appliedSpecialties.length > 0 || !!appliedDateRange}
      />
        ) : (
          <TeamsView />
        )}
      </div>
    </div>
  );
};

export default AssistantDashboard;