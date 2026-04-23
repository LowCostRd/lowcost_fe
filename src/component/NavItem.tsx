import type { NavItemProps } from "../type/sidemenu";
import { NavIcons } from "./NavIcon";

const NavItem = ({ item, isActive, onClick }: NavItemProps) => {
  const Icon = NavIcons[item.icon];
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`flex items-center cursor-pointer gap-4 w-full py-5 text-[14px] font-medium transition-all duration-150 text-left
        ${isActive
          ? "bg-[#F3EDFF] border-r-4 border-[#5B0AFF] text-[#5B0AFF]"
          : "text-[#6B7280] hover:bg-gray-50"
        }`}
    >
      <span className="flex items-center gap-4 px-8">
        <span className={isActive ? "text-[#5B0AFF]" : "text-[#6B7280]"}>
          <Icon />
        </span>
        {item.label}
      </span>
    </button>
  );
};

export default NavItem;