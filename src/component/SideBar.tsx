import { NavIcons } from "../component/NavIcon";
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from "../component/Navigation";
import type { NavItemProps, SideBarProps } from "../type/sidemenu";



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

const SideBar = ({ activeTab, onTabChange }: SideBarProps) => {
  return (
    <aside className="w-100 bg-[#FFF] flex flex-col shrink-0 h-screen sticky top-0">
      
      {/* ── Fixed header: logo + search + "Menu" label ── */}
      <div className="shrink-0 pt-10">
        {/* Logo */}
        <div className="px-8 mb-10">
          <NavIcons.Logo />
        </div>

        {/* Search */}
        <div className="relative mb-7 px-8">
          <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none">
            <NavIcons.Search />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-15.5 rounded-[10px] pl-14 pr-8 py-2 px-8 border border-[#E5E7EB] text-[14px] text-[#6B7280] focus-within:border-[#7c3aed] caret-[#7c3aed] placeholder-[#6B7280] outline-none transition"
          />
          <span className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
            <NavIcons.CommandIcon />
          </span>
        </div>

        {/* Section label */}
        <p className="text-[12px] font-normal text-[#BBBBBB] uppercase tracking-widest px-8 mb-7">
          Menu
        </p>
      </div>

      {/* ── Scrollable nav area ── */}
      <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
        {/* Main nav */}
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onClick={onTabChange}
            />
          ))}

          <div className="px-8 mt-20">
            <hr className="border-[#F2F2F2] w-full" />
          </div>
        </nav>

        {/* Bottom nav */}
        <div className="flex flex-col gap-0.5 pt-3 mt-2 mb-50">
          {BOTTOM_NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onClick={onTabChange}
            />
          ))}
        </div>

        {/* User profile */}
        <div className="flex items-center gap-5 px-8 pt-3 mt-20 pb-6 fixed bottom-0 z-50 bg-white">
          <div className="w-18 h-18 rounded-full bg-[#F4E082] flex items-center justify-center text-[16px] font-bold text-[#1F2937] shrink-0">
            LE
          </div>
          <span className="text-[16px] font-medium text-gray-700 flex-1 truncate">
            Lucky Ekezie
          </span>

          <span className="cursor-pointer">
            <NavIcons.ChevronDown />
          </span>
        </div>
      </div>

    </aside>
  );
};

export default SideBar;