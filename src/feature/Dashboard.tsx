
import SideBar from "../component/SideBar";
 

import CallAnalyticsPage        from "../feature/pages/CallAnalyticsPage";
import MyAssistantsPage         from "../feature/pages/MyAssistantsPage";
import CallHandlingPage         from "../feature/pages/CallHandlingPage";
import PatientDirectoryPage     from "../feature/pages/PatientDirectoryPage";
import AppointmentWorkflowsPage from "../feature/pages/AppointmentWorkflowsPage";
import PracticeInformationPage  from "../feature/pages/PracticeInformationPage";
import EHRIntegrationsPage      from "../feature/pages/EHRIntegrationsPage";
import SettingsPage             from "../feature/pages/SettingsPage";
import HelpPage                 from "../feature/pages/HelpPage";
import { useState, type JSX } from "react";
 

const PAGE_MAP: Record<string, JSX.Element> = {
  "call-analytics":          <CallAnalyticsPage />,
  "my-assistants":           <MyAssistantsPage />,
  "call-handling":           <CallHandlingPage />,
  "patient-directory":       <PatientDirectoryPage />,
  "appointment-workflows":   <AppointmentWorkflowsPage />,
  "practice-information":    <PracticeInformationPage />,
  "ehr-integrations":        <EHRIntegrationsPage />,
  "settings":                <SettingsPage />,
  "help":                    <HelpPage />,
};

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("my-assistants");
    return(


  
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <SideBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 h-screen overflow-y-auto">
        {PAGE_MAP[activeTab] ?? <div className="p-8 text-gray-400">Page not found.</div>}
      </main>
    </div>

     
    );
}

export default Dashboard;