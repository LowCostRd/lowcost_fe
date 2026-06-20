import Icons from "../assets/Icons";
import type { Agent } from "../type/assistant";

interface AssistantsViewProps {
  agents: Agent[];
  isLoading: boolean;
  searchQuery?: string;
}

const AssistantAvatar = ({ imageUrl }: { imageUrl?: string }) => (
  imageUrl ? (
    <img src={imageUrl} alt="Assistant" className="w-16 h-16 rounded-full object-cover shrink-0" />
  ) : (
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9B6FF] to-[#5B0AFF] flex items-center justify-center shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 20c0-3.6 3.36-6 7.5-6s7.5 2.4 7.5 6" strokeLinecap="round" />
      </svg>
    </div>
  )
);

export const AssistantCard = ({ agent }: { agent: Agent }) => (
  <div className="border border-[#EDEDED] rounded-2xl py-6 bg-white">
    <div className="flex items-center gap-5 mb-5 px-5">
      <AssistantAvatar imageUrl={agent.image_url} />
      <div>
        <h3 className="font-semibold text-[#1F2937] text-[15px] leading-tight">{agent.name}</h3>
        <p className="text-[#6B7280] text-[15px] mt-1">{agent.specialty}</p>
      </div>
    </div>

    <hr className="border-[#E5E7EB] mb-4" />

    <p className="font-bold text-[#1F2937] text-[15px] px-5 mb-1.5">(555) 987-6543</p>
    <div className="flex items-center gap-2 text-[14px] mb-5 px-5">
      <span className="flex items-center gap-1.5 text-[#29996A] font-medium">
        {Icons.greenDots}
        active
      </span>
      <span className="text-[#94A3B8]">|</span>
      <span className="text-[#6B7280]">0 calls today</span>
    </div>

    <hr className="border-[#E5E7EB] mb-4" />

    <div className="flex items-center gap-2 px-5 py-3">
      <button className="w-11 h-11 rounded-full border border-[#94A3B8] flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] cursor-pointer transition-colors shrink-0">
        {Icons.dots}
      </button>
      <button className="flex-1 py-3.5 rounded-full border border-[#94A3B8] text-[#6B7280] font-medium text-[14px] hover:bg-[#F9FAFB] cursor-pointer transition-colors">
        View Details
      </button>
    </div>
  </div>
);

// ── Skeleton card shown while loading ──
const SkeletonCard = () => (
  <div className="border border-[#EDEDED] rounded-2xl py-6 bg-white animate-pulse">
    <div className="flex items-center gap-5 mb-5 px-5">
      <div className="w-16 h-16 rounded-full bg-[#E5E7EB] shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[#E5E7EB] rounded w-3/4" />
        <div className="h-3 bg-[#E5E7EB] rounded w-1/2" />
      </div>
    </div>
    <hr className="border-[#E5E7EB] mb-4" />
    <div className="px-5 space-y-2 mb-5">
      <div className="h-4 bg-[#E5E7EB] rounded w-1/2" />
      <div className="h-3 bg-[#E5E7EB] rounded w-1/3" />
    </div>
    <hr className="border-[#E5E7EB] mb-4" />
    <div className="px-5 py-3 flex gap-2">
      <div className="w-11 h-11 rounded-full bg-[#E5E7EB]" />
      <div className="flex-1 h-11 rounded-full bg-[#E5E7EB]" />
    </div>
  </div>
);

const AssistantsView = ({ agents, isLoading, searchQuery }: AssistantsViewProps) => {
  // Only show the full skeleton grid on the very first load (no agents loaded yet).
  // While a search is in flight and we already have previous results, keep them
  // visible instead of blanking the whole grid out.
  if (isLoading && agents.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] font-sans p-6 w-full rounded-[15px]">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (!agents.length) {
    const isSearching = !!searchQuery?.trim();

    return (
      <div className="min-h-screen bg-[#F8F8F8] font-sans p-6 w-full rounded-[15px] flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-[#1F2937] font-bold text-[20px] mb-2">
          {isSearching ? "No results found" : "No assistants yet"}
        </h2>
        <p className="text-[#9CA3AF] text-[14px] leading-relaxed max-w-md">
          {isSearching
            ? `We couldn't find any assistants matching "${searchQuery}".`
            : "Create your first AI assistant to start handling calls for your business."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] font-sans p-6 w-full rounded-[15px]">
      <div className="grid grid-cols-4 gap-4">
        {agents.map((agent) => (
          <AssistantCard key={agent.agent_id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default AssistantsView;