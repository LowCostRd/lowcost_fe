import { useRoutes } from "react-router-dom";
import { Route } from "./route/Route";
import NetworkBanner from "./component/NetworkBanner";
import { useAppReady } from "./hooks/useAppReady";

function App() {
    useAppReady();
  const routing = useRoutes(Route);

  return (
    <>
      <NetworkBanner />
      {routing}
    </>
  );
}

export default App;