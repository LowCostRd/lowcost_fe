import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SideBar from "../component/SideBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.split("/")[2] ?? "my-assistants";

  const handleTabChange = (tab: string) => {
    navigate(`/dashboard/${tab}`);
  };

  return (
    <div className="flex h-screen bg-[#F7F6F9] font-sans overflow-hidden">
      <SideBar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 h-screen overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Dashboard;