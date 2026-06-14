import AssistantDashboard from "../../component/AssistantDashboard";
import MyAssistantsSetupPage from "./MyAssistantsSetupPage";

const MyAssistantsPage = () => {
    // const { data: assistants, isLoading } = useGetAssistants();
  
    // if (isLoading) return <Loader />;

    const assistants = []
  
    return assistants?.length > 0 ? (
      <AssistantDashboard />
    ) : (
      <MyAssistantsSetupPage />
    );
  };

  export default MyAssistantsPage;