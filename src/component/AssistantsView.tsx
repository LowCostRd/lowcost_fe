import Icons from "../assets/Icons";


const ASSISTANTS = [
  {
    id: "1",
    name: "Front Desk Assistant",
    specialty: "Dental Practice",
    phone: "(555) 987-6543",
    status: "Active",
    callsToday: 0,
  },
];

const AssistantAvatar = () => (
  <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#C9B6FF] to-[#5B0AFF] flex items-center justify-center shrink-0">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-3.6 3.36-6 7.5-6s7.5 2.4 7.5 6" strokeLinecap="round" />
    </svg>
  </div>
);

export const AssistantCard = ({ assistant }) => (
  <div className="w-full max-w-[300px] border border-[#E5E7EB] rounded-2xl p-5 bg-white">
    <div className="flex items-center gap-3 mb-5">
      <AssistantAvatar />
      <div>
        <h3 className="font-semibold text-[#1F2937] text-[16px] leading-tight">{assistant.name}</h3>
        <p className="text-[#9CA3AF] text-[14px]">{assistant.specialty}</p>
      </div>
    </div>

    <p className="font-bold text-[#1F2937] text-[18px] mb-1.5">{assistant.phone}</p>
    <div className="flex items-center gap-2 text-[14px] mb-5">
      <span className="flex items-center gap-1.5 text-[#16A34A] font-medium">
        <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
        {assistant.status}
      </span>
      <span className="text-[#E5E7EB]">|</span>
      <span className="text-[#9CA3AF]">{assistant.callsToday} calls today</span>
    </div>

    <hr className="border-[#F3F4F6] mb-4" />

    <div className="flex items-center gap-2">
      <button className="w-11 h-11 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] cursor-pointer transition-colors shrink-0">
        {Icons.dots}
      </button>
      <button className="flex-1 py-3 rounded-full border border-[#E5E7EB] text-[#374151] font-medium text-[15px] hover:bg-[#F9FAFB] cursor-pointer transition-colors">
        View Details
      </button>
    </div>
  </div>
);

const AssistantsView = () => {
  if (ASSISTANTS.length === 0) {
    return (
      <div className="bg-[#F7F8FA] rounded-2xl min-h-[480px] flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-[#1F2937] font-bold text-[20px] mb-2">No assistants yet</h2>
        <p className="text-[#9CA3AF] text-[14px] leading-relaxed max-w-md">
          Create your first AI assistant to start handling calls for your business.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5">
      {ASSISTANTS.map((a) => (
        <AssistantCard key={a.id} assistant={a} />
      ))}
    </div>
  );
};

export default AssistantsView;