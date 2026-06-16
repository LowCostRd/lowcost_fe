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
    {
    id: "2",
    name: "Amara",
    specialty: "General Practice",
    phone: "(505) 987-6543",
    status: "Active",
    callsToday: 200,
  },
];

const AssistantAvatar = () => (
  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9B6FF] to-[#5B0AFF] flex items-center justify-center shrink-0">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-3.6 3.36-6 7.5-6s7.5 2.4 7.5 6" strokeLinecap="round" />
    </svg>
  </div>
);

// export const AssistantCard = ({ assistant }) => (
//   <div className="min-h-screen  bg-[#F8F8F8] font-sans p-6 w-full rounded-[15px]">
//     <div className="w-full max-w-105 border border-[#EDEDED] rounded-2xl py-6 h-85 bg-white">
//     <div className="flex items-center gap-5 mb-5 px-5">
//       <AssistantAvatar />
//       <div>
//         <h3 className="font-semibold text-[#1F2937] text-[15px] leading-tight">{assistant.name}</h3>
//         <p className="text-[#6B7280] text-[15px] mt-1">{assistant.specialty}</p>
//       </div>
//     </div>

//     <hr className="border-[#E5E7EB] mb-4" />

//     <p className="font-bold text-[#1F2937] text-[15px] px-5  mb-1.5">{assistant.phone}</p>
//     <div className="flex items-center gap-2 text-[14px] mb-5 px-5">
        
//       <span className="flex items-center gap-1.5 text-[#29996A] font-medium">
//         {Icons.greenDots}
//         {assistant.status}
//       </span>
//       <span className="text-[#94A3B8]">|</span>
//       <span className="text-[#6B7280]">{assistant.callsToday} calls today</span>
//     </div>

//     <hr className="border-[#E5E7EB] mb-4" />

//     <div className="flex items-center gap-2 px-5 py-3">
//       <button className="w-16 h-16 rounded-full border border-[#94A3B8] flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] cursor-pointer transition-colors shrink-0">
//         {Icons.dots}
//       </button>
//       <button className="flex-1 py-3.5 rounded-full border border-[#94A3B8] text-[#6B7280] font-medium text-[14px] hover:bg-[#F9FAFB] cursor-pointer transition-colors">
//         View Details
//       </button>
//     </div>
//   </div>
//   </div>
// );

export const AssistantCard = ({ assistant }) => (
  <div className="border border-[#EDEDED] rounded-2xl py-6 bg-white">
    <div className="flex items-center gap-5 mb-5 px-5">
      <AssistantAvatar />
      <div>
        <h3 className="font-semibold text-[#1F2937] text-[15px] leading-tight">{assistant.name}</h3>
        <p className="text-[#6B7280] text-[15px] mt-1">{assistant.specialty}</p>
      </div>
    </div>

    <hr className="border-[#E5E7EB] mb-4" />

    <p className="font-bold text-[#1F2937] text-[15px] px-5 mb-1.5">{assistant.phone}</p>
    <div className="flex items-center gap-2 text-[14px] mb-5 px-5">
      <span className="flex items-center gap-1.5 text-[#29996A] font-medium">
        {Icons.greenDots}
        {assistant.status}
      </span>
      <span className="text-[#94A3B8]">|</span>
      <span className="text-[#6B7280]">{assistant.callsToday} calls today</span>
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

const AssistantsView = () => {
  if (ASSISTANTS.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] font-sans p-6 w-full rounded-[15px] flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-[#1F2937] font-bold text-[20px] mb-2">No assistants yet</h2>
        <p className="text-[#9CA3AF] text-[14px] leading-relaxed max-w-md">
          Create your first AI assistant to start handling calls for your business.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] font-sans p-6 w-full rounded-[15px]">
      <div className="grid grid-cols-4 gap-4">
        {ASSISTANTS.map((a) => (
          <AssistantCard key={a.id} assistant={a} />
        ))}
      </div>
    </div>
  );
};

export default AssistantsView;