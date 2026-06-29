import { useEffect, useState } from "react";
import AssistantDashboard from "../../component/AssistantDashboard";
import MyAssistantsSetupPage from "./MyAssistantsSetupPage";
import { useAgentStore } from "../../store/AssistantStore";

const MyAssistantsPage = () => {
  const fetchAgents = useAgentStore((s) => s.fetchAgents);


  const [hasAnyAgents, setHasAnyAgents] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchAgents().then(() => {
      if (cancelled) return;
      // read the freshest agents list straight from the store
      const currentAgents = useAgentStore.getState().agents;
      setHasAnyAgents(currentAgents.length > 0);
    });
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (hasAnyAgents === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8]">
        <div className="w-10 h-10 border-4 border-[#E5E7EB] border-t-[#5B0AFF] rounded-full animate-spin" />
      </div>
    );
  }

  return hasAnyAgents ? <AssistantDashboard /> : <MyAssistantsSetupPage />;
};

export default MyAssistantsPage;