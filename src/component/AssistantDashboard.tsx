import { useState } from "react";
import AssistantsView from "./AssistantsView";
import TeamsView from "./TeamsView";
import Icons from "../assets/Icons";

import { useUIStore } from "../store/UseUIStore";
import CreateAssistantModal from "./CreateAssistantModal";

const AssistantDashboard = () => {
    const { assistantActiveTab, setAssistantActiveTab } = useUIStore();
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);



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
                  type="text"
                  placeholder="Search"
                  className="w-95 h-15 pl-11 pr-11 rounded-full border border-[#E5E7EB] text-[14px] text-[#1F2937] placeholder-[#6B7280] outline-none focus:border-[#5B0AFF]"
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#5B0AFF] transition-colors cursor-pointer">
                  {Icons.filter}
                </button>
              </div>

            <div className="relative">
              <button
                onClick={() => setShowCreateMenu((s) => !s)}
                className="h-15 px-6 rounded-full bg-[#5B0AFF] text-white font-semibold text-[15px] flex items-center gap-2 hover:bg-[#4A08D4] active:scale-[0.99] cursor-pointer transition-all"
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

                  <div className="absolute right-0 mt-2 w-110 bg-white rounded-2xl border border-[#F3F4F6] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden z-20">
                    <button className="w-full text-left flex items-start gap-3 px-5 py-4 bg-[#F3ECFF] cursor-pointer transition-colors" 
                    onClick={() => {
                    setShowCreateMenu(true);
                    setShowSpecialtyModal(true);
                  }}>
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
        {assistantActiveTab === "assistants" ? <AssistantsView /> : <TeamsView />}
      </div>
    </div>
  );
};

export default AssistantDashboard;