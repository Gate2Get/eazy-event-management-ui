import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";

import { AppLayout } from "./layout";
import { useBearStore } from "./store";
import { useWindowSize } from "./hooks/useWindowSize";
import { AppRoutes } from "./routes";

function App(): React.ReactElement {
  const { width } = useWindowSize();
  const { screen, setScreen } = useBearStore.appStore();

  React.useEffect(() => {
    if (width < 600) {
      setScreen("MOBILE");
    } else {
      setScreen("DESKTOP");
    }
  }, [width]);

  return (
    <div>
      <BrowserRouter>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
