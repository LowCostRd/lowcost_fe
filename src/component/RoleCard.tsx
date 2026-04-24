import type { Role } from "../type/assistant";
import Checkbox from "./Checkbox";

const RoleCard = ({
  role,
  isSelected,
  onToggle,
}: {
  role: Role;
  isSelected: boolean;
  onToggle: (id: string) => void;
}) => {

  const isLocked = !!role.locked;
  const isPinned = role.id === "answer_calls";



 const cardClass = isLocked && !isPinned
  ? "border-[#EF4444] bg-[#FFF0F3] shadow-[0_0_10px_-2px_rgba(239,68,68,0.2)] cursor-default"
  : isSelected
  ? "border-[#5B0AFF]  shadow-[0_0_10px_-2px_rgba(91,10,255,0.4)] cursor-pointer"
  : "border-[#94A3B8]  cursor-pointer";

  return (
    <div
      onClick={() => !isLocked && !isPinned && onToggle(role.id)}
      className={`relative flex flex-col p-7 rounded-[18px] border transition-all duration-200 ${cardClass}`}
    >
     
      <div className="absolute top-4 right-4">
        <Checkbox checked={isSelected} locked={isLocked} />
      </div>

      {/* Icon + Title */}
      <div className="flex items-center gap-3.5 mb-2 pr-6">
        <img src={role.icon} className="w-7 h-7"/>
        <h3 className="font-semibold text-[#1F2937] text-[14px] leading-snug">{role.title}</h3>
      </div>

      {/* Description */}
      <p className={`text-[13px] font-normal leading-snug text-[#6B7280]`}>
        {role.description}
      </p>
    </div>
  );
};

export default RoleCard;