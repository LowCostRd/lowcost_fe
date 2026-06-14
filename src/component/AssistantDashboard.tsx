import { useState } from "react";
import AssistantsView from "./AssistantsView";
import TeamsView from "./TeamsView";
import Icons from "../assets/Icons";

const AssistantDashboard = () => {
  const [activeTab, setActiveTab] = useState("assistants");
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F5F7] font-sans p-6">
      <div className="bg-white rounded-[28px] p-6 max-w-6xl mx-auto relative">
        {/* ── Header row ── */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          {/* Tabs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("assistants")}
              className={`px-6 py-2.5 rounded-full font-semibold text-[15px] cursor-pointer transition-all ${
                activeTab === "assistants"
                  ? "bg-[#F3EDFF] text-[#5B0AFF]"
                  : "bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]"
              }`}
            >
              Assistants
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className={`px-6 py-2.5 rounded-full font-semibold text-[15px] cursor-pointer transition-all ${
                activeTab === "teams"
                  ? "bg-[#F3EDFF] text-[#5B0AFF]"
                  : "bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]"
              }`}
            >
              Teams
            </button>
          </div>

          {/* Search + filter + create */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                {Icons.search}
              </span>
              <input
                type="text"
                placeholder="Search"
                className="w-56 h-11 pl-11 pr-4 rounded-full border border-[#E5E7EB] text-[14px] text-[#1F2937] placeholder-[#9CA3AF] outline-none focus:border-[#5B0AFF]"
              />
            </div>

            <button className="w-11 h-11 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] cursor-pointer transition-colors">
              {Icons.filter}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowCreateMenu((s) => !s)}
                className="h-11 px-6 rounded-full bg-[#5B0AFF] text-white font-semibold text-[15px] flex items-center gap-2 hover:bg-[#4A08D4] active:scale-[0.99] cursor-pointer transition-all"
              >
                Create
                <span className={`transition-transform ${showCreateMenu ? "rotate-180" : ""}`}>
                  {Icons.chevron}
                </span>
              </button>

              {showCreateMenu && (
                <>
                  {/* Click-outside backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setShowCreateMenu(false)} />

                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-[#F3F4F6] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-20">
                    <button className="w-full text-left flex items-start gap-3 px-5 py-4 bg-[#F5F3FF] hover:bg-[#EEE6FF] cursor-pointer transition-colors">
                      <span className="text-[#5B0AFF] mt-0.5">{Icons.person}</span>
                      <span>
                        <span className="block text-[#5B0AFF] font-semibold text-[15px] mb-0.5">
                          New Assistant
                        </span>
                        <span className="block text-[#5B0AFF] text-[13px] leading-snug opacity-80">
                          Build one dedicated AI assistant for a specific role.
                        </span>
                      </span>
                    </button>

                    <button className="w-full text-left flex items-start gap-3 px-5 py-4 bg-white cursor-not-allowed">
                      <span className="text-[#1F2937] mt-0.5">{Icons.team}</span>
                      <span>
                        <span className="flex items-center gap-2 mb-0.5">
                          <span className="text-[#1F2937] font-semibold text-[15px]">
                            Assistant Team
                          </span>
                          <span className="text-[11px] font-medium text-[#EA580C] bg-[#FFEDD5] rounded-full px-2 py-0.5">
                            Coming Soon
                          </span>
                        </span>
                        <span className="block text-[#9CA3AF] text-[13px] leading-snug">
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

        {/* ── Content ── */}
        {activeTab === "assistants" ? <AssistantsView /> : <TeamsView />}
      </div>
    </div>
  );
};

export default AssistantDashboard;