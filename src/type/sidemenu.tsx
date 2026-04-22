import { NavIcons } from "../component/NavIcon";


export interface NavItemType {
  id: string;
  label: string;
  icon: keyof typeof NavIcons;
}

export interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: (id: string) => void;
}

export interface SideBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}