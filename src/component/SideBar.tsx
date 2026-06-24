import { useEffect, useState } from "react";
import { NavIcons } from "../component/NavIcon";
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from "../component/Navigation";
import type { SideBarProps } from "../type/sidemenu";
import NavItem from "./NavItem";
import "./styles/sidebar.css";
import { useAuthStore } from "../store/AuthStore";
import { useGetStore } from "../store/GetStore";
import type { getUserResponse } from "../type/user";

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

const SideBar = ({ activeTab, onTabChange }: SideBarProps) => {
  const currentUser = useAuthStore((s) => s.currentUser);
  const get_user_by_id = useGetStore((s) => s.get_user_by_id);

  const [profile, setProfile] = useState<getUserResponse | null>(null);

  useEffect(() => {
    if (!currentUser?.id) return;
    get_user_by_id({ id: currentUser.id })
      .then(setProfile)
      .catch(() => {});
  }, [currentUser?.id, get_user_by_id]);

  const displayName = profile?.full_name ?? "";
  const initials = displayName ? getInitials(displayName) : "?";

  return (
    <aside className="w-100 bg-[#FFF] flex flex-col shrink-0 h-screen sticky top-0">

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
      </div>

      {/* Scrollable nav area */}
      <div className="flex-1 overflow-y-auto flex flex-col min-h-0 custom-scrollbar">
        <p className="text-[12px] font-normal text-[#BBBBBB] uppercase tracking-widest px-8 mb-7">
          Menu
        </p>

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

        <div className="flex flex-col gap-0.5 pt-3 mt-2 flex-1">
          {BOTTOM_NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onClick={onTabChange}
            />
          ))}
        </div>
      </div>

      {/* Profile footer */}
      <div className="flex items-center gap-5 px-8 py-5 border-t border-[#F2F2F2] bg-white sticky bottom-0">
        {displayName ? (
          <>
            <div className="w-18 h-18 rounded-full bg-[#F4E082] flex items-center justify-center text-[14px] font-semibold text-[#1F2937] shrink-0">
              {initials}
            </div>
            <span className="text-[14px] font-medium text-gray-700 flex-1 truncate">
              {displayName}
            </span>
          </>
        ) : (
          // Skeleton while fetching
          <>
            <div className="w-18 h-18 rounded-full bg-[#E5E7EB] animate-pulse shrink-0" />
            <div className="h-4 bg-[#E5E7EB] rounded animate-pulse flex-1" />
          </>
        )}
        <span className="cursor-pointer">
          <NavIcons.ChevronDown />
        </span>
      </div>

    </aside>
  );
};

export default SideBar;