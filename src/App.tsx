import React from "react";
import "./App.scss";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "./layout";
import { useBearStore } from "./store";
import { useWindowSize } from "./hooks/useWindowSize";
import { AppRoutes } from "./routes";
import { interceptors } from "./configs/axios.config";

function App(): React.ReactElement {
  const { width } = useWindowSize();
  const { screen, setScreen } = useBearStore.appStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (width < 600) {
      setScreen("MOBILE");
    } else {
      setScreen("DESKTOP");
    }
  }, [width]);

  React.useEffect(() => {
    interceptors(navigate);
  }, []);

  return (
    <div>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </div>
  );
}

export default App;
