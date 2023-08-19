import React from "react";
import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ROUTES } from "./configs/route.config";
import { AppLayout } from "./layout";
import { useBearStore } from "./store";
import { useWindowSize } from "./hooks/useWindowSize";

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
          <Routes>
            {ROUTES.map((route) => (
              <Route
                element={route.element}
                key={route.path}
                path={route.path}
              />
            ))}
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
