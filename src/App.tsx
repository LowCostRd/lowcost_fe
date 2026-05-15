import { useRoutes } from "react-router-dom";
import { Route } from "./route/Route";
import NetworkBanner from "./component/NetworkBanner";

function App() {
  const routing = useRoutes(Route);

  return (
    <>
      <NetworkBanner />
      {routing}
    </>
  );
}

export default App;