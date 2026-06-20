import { useRoutes } from "react-router-dom";
import { Route } from "./route/Route";
import NetworkBanner from "./component/NetworkBanner";
import { useAppReady } from "./hooks/useAppReady";
import DesktopOnly from "./component/DesktopOnly";
import { ToastContainer } from "react-toastify";

function App() {
    useAppReady();
  const routing = useRoutes(Route);

  return (
     <DesktopOnly>
      <NetworkBanner />
      {routing}
      <ToastContainer />
        </DesktopOnly>
  );
}

export default App;