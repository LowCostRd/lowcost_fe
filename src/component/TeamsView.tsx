import Icons from "../assets/Icons";


const TeamsView = () => (
  <div className="bg-[#F7F8FA] rounded-2xl min-h-[480px] flex flex-col items-center justify-center text-center px-6 py-20">
    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
      {/* Faint grid backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          WebkitMaskImage: "radial-gradient(circle, black 35%, transparent 75%)",
          maskImage: "radial-gradient(circle, black 35%, transparent 75%)",
        }}
      />
      {/* Rotated diamond outline */}
      <div className="absolute w-16 h-16 border border-[#E5E7EB] rounded-2xl rotate-45 bg-white" />
      {/* Icon box */}
      <div className="relative w-14 h-14 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-center shadow-sm text-[#6B7280]">
        {Icons.team}
      </div>
    </div>

    <h2 className="text-[#1F2937] font-bold text-[20px] mb-2">
      Assistant Team feature coming soon!
    </h2>
    <p className="text-[#9CA3AF] text-[14px] leading-relaxed max-w-md">
      Group multiple AI assistants to work together across departments. One number,
      smarter routing.
    </p>
  </div>
);

export default TeamsView;