// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import SideBar from "../component/SideBar";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const segment = location.pathname.split("/")[2] ?? "my-assistants";

//   const TAB_ALIAS: Record<string, string> = {
//     "create-assistant": "my-assistants",
    
//   };
  
//   const activeTab = TAB_ALIAS[segment] ?? segment;

//   const handleTabChange = (tab: string) => {
//     navigate(`/dashboard/${tab}`);
//   };

//   return (
//     <div className="flex h-screen bg-[#F7F6F9] font-sans overflow-hidden">
//       <SideBar activeTab={activeTab} onTabChange={handleTabChange} />
//       <main className="flex-1 h-screen overflow-y-auto">
//         <Outlet /> 
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SideBar from "../component/SideBar";
import { useEffect } from "react";
import { useUIStore } from "../store/UseUIStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const segment = location.pathname.split("/")[2] ?? "my-assistants";

  const TAB_ALIAS: Record<string, string> = {
    "create-assistant": "my-assistants",
  };

  const activeTab = TAB_ALIAS[segment] ?? segment;

  const { lastTabPaths, setLastTabPath } = useUIStore();

  // useEffect(() => {
  //   if (segment) setLastTabPath(segment, location.pathname);
  // }, [location.pathname, segment, setLastTabPath]);

  useEffect(() => {
    if (segment) setLastTabPath(activeTab, location.pathname); 
  }, [location.pathname, segment, setLastTabPath, activeTab]);
  
  const handleTabChange = (tab: string) => {
    const last = lastTabPaths[tab];
    navigate(last || `/dashboard/${tab}`);
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