import type { PanelCardProps } from "../type/analytics";

const PanelCard = ({ icon, title, badge, children }: PanelCardProps) => (
    <div className="bg-white rounded-[14px]  flex flex-col ">
      <div className="flex items-center justify-between px-5 py-4  bg-[#F8F5FF]">
        <div className="flex items-center gap-4">
          <span className="text-[#7C3AED]">{icon}</span>
          <span className="text-[14px] font-semibold text-[#1F2937]">{title}</span>
        </div>
        {badge !== undefined && (
          <span className="text-[18px] font-bold text-[#1F2937]">{badge}</span>
        )}
      </div>
      <div className="px-5 py-1 flex-1">{children}</div>
    </div>
  );


  export default PanelCard;
  