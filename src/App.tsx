import React from "react";
import { useNavigate } from "react-router-dom";
import { useBearStore } from "./store";
import { useWindowSize } from "./hooks/useWindowSize";
import { AppRoutes } from "./routes";
import { interceptors } from "./configs/axios.config";
import { HomeLayout } from "./homeLayout";
import "./App.scss";

function App(): React.ReactElement {
  const { width } = useWindowSize();
  const { setScreen, setCollapsed } = useBearStore.appStore();

  const navigate = useNavigate();
  React.useEffect(() => {
    if (width < 650) {
      setScreen("MOBILE");
      setCollapsed(true);
    } else {
      setScreen("DESKTOP");
      setCollapsed(false);
    }
  }, [width]);

  React.useEffect(() => {
    interceptors(navigate);
  }, []);

  return (
    <div>
      <HomeLayout>
        <AppRoutes />
      </HomeLayout>
    </div>
  );
}

export default App;
