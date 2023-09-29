import React from "react";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AppLayout } from "./layout";
import { useBearStore } from "./store";
import { useWindowSize } from "./hooks/useWindowSize";
import { AppRoutes } from "./routes";
import { interceptors } from "./configs/axios.config";
import { HomeLayout } from "./homeLayout";

function App(): React.ReactElement {
  const { width } = useWindowSize();
  const { screen, setScreen } = useBearStore.appStore();

  const navigate = useNavigate();
  console.log({ width });
  React.useEffect(() => {
    if (width < 650) {
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
      <HomeLayout>
        <AppRoutes />
      </HomeLayout>
    </div>
  );
}

export default App;
